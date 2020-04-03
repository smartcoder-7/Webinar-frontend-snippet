import { css } from '@emotion/core';
import styled, { StyledComponent } from '@emotion/styled';
import { ReactComponent as Close } from '@src/images/close.svg';
import React, { SyntheticEvent } from 'react';
import tw from 'tailwind.macro';

function useOnClickOutside(cb: (target: any) => any): React.Ref<HTMLDivElement> {
  const node = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClick = (e: any) => {
      const clickInside = node.current! && node.current!.contains(e.target);
      if (cb && !clickInside) {
        // inside click
        return cb(e.target);
      }
      // outside click
    };
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
  return node;
}

const focusableElsQueryString =
  'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';

function useLockFocusInside(): React.Ref<HTMLDivElement> {
  const node = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!node.current) return;
    const element: HTMLDivElement = node.current;
    const focusableEls = element.querySelectorAll(focusableElsQueryString) as NodeListOf<
      HTMLInputElement
    >;
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const KEYCODE_TAB = 9;
    const onKeyDownEvent = (e: any) => {
      var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;
      if (!isTabPressed) {
        return;
      }
      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    };
    element.addEventListener('keydown', onKeyDownEvent);
    return () => {
      element.removeEventListener('keydown', onKeyDownEvent);
    };
  });
  return node;
}

// Hook

function useLockBodyScroll(lock: boolean): void {
  React.useLayoutEffect(() => {
    // Get original body overflow

    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Prevent scrolling on mount
    if (lock) {
      document.body.style.overflow = 'hidden';
    }

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []); // Empty array ensures effect is only run on mount and unmount
}

const Modal: StyledComponent<any, any, any> & any = styled(
  ({
    // isRegister=false,
    lock = true,
    className,
    children,
    closeOnClickOutside,
    modelClassName = '',
    widthClass = 'min-w-30rem max-w-35rem',
    onClose = () => {},
  }) => {
    const ref = useOnClickOutside(closeOnClickOutside && onClose);
    const modalRef = useLockFocusInside();
    useLockBodyScroll(lock);
    return (
      <div
        className={className}
        style={{
          background: 'rgba(0,0,0,0.4)',
          overflowY: 'auto',
        }}
        ref={modalRef}
      >
        <div className='mx-auto flex items-center overflow-hidden flex-column h-full w-full'>
          <div
            ref={ref}
            className={`Modal bg-white shadow-2xl mx-auto rounded-xl relative ${modelClassName} ${widthClass}`}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
)`
  ${tw`fixed z-modal top-0 left-0 w-full h-full `}
  ${css`
    min-height: 20rem;
  `}
`;

Modal.Title = styled.div`
  ${tw`px-12 pr-16 py-5 rounded-t-xl bg-gray-6 text-xl`}
`;

Modal.Body = styled.div`
  ${tw`px-8 py-8 overflow-x-hidden overflow-y-auto`}
`;

Modal.Footer = styled.div`
  ${tw`px-8 py-5 rounded-b-xl border-t border-gray-6 bg-white`}
`;

interface CloseProps {
  onClick?: (e: SyntheticEvent) => any;
  color: string;
}

Modal.Close = ({ onClick, color = 'black' }: CloseProps) => (
  <button
    type='button'
    onClick={onClick}
    className='absolute appearance-none outline-none right-0 px-8'
    css={css`
      top: 1.9rem;
    `}
  >
    <Close
      className='w-3 h-3'
      css={
        color === 'white' &&
        css`
          * {
            fill: white;
          }
        `
      }
    />
  </button>
);

export default Modal;
