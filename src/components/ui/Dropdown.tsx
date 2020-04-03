// import styled from "@emotion/styled"
import tw from 'tailwind.macro';
import { withProperties } from '@src/utils/type';
import React from 'react';
import { Manager as PopperManager, Popper, Reference as PopperReference } from 'react-popper';
import * as PopperJS from "popper.js";

const useOnClickOutside = (cb: any) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    function onClick(e: any): any {
      if (ref && ref.current && !ref.current.contains(e.target)) {
        cb(e);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  });

  return ref;
};

const Dropdown = (props: any) => {
  const { closeOnSelect = true } = props;
  const [open, setOpen] = React.useState(!!props.isOpen);
  const toggleOpen = React.useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const onClose = React.useCallback(() => {
    setOpen(false);
  }, [open, setOpen]);
  const onClickOusideRef = useOnClickOutside(onClose);

  return (
    <PopperManager>
      <div ref={onClickOusideRef}>
        <div onClick={toggleOpen} className='cursor-pointer select-none'>
          {React.Children.toArray(props.children).filter(
            (child: any) => child.type.displayName === 'Dropdown.Reference'
          )}
        </div>
        {open && (
          <div onClick={closeOnSelect ? onClose : undefined}>
            {React.Children.toArray(props.children).filter(
              (child: any) => child.type.displayName === 'Dropdown.Options'
            )}
          </div>
        )}
      </div>
    </PopperManager>
  );
};
const Reference = ({ children }: any) => (
  <PopperReference>
    {({ ref: popperTargetRef }: any) => (
      <div className='text-color-input w-full inline-block' ref={popperTargetRef}>
        {children}
      </div>
    )}
  </PopperReference>
);

Reference.displayName = 'Dropdown.Reference';

interface OptionsProps {
  children: any;
  fullWidth?: boolean;
  fullHeight?: boolean;
  scroll?: boolean;
  cursorStyle?: string;
  className?: string;
  placement?: PopperJS.Placement;
  modifiers?: {
    [key: string]: any;
  };
}

const Options = ({ children, fullWidth, fullHeight, scroll, cursorStyle, className,placement='bottom', modifiers = {} }: OptionsProps) => {
  return (
    <Popper
      placement={placement}
      modifiers={{
        ...modifiers,
        setWidth: {
          enabled: fullWidth,
          order: 840,
          fn(data: any): any {
            //@ts-ignore
            data.offsets.popper.right = data.offsets.reference.right;
            data.offsets.popper.left = data.offsets.reference.left;

            const width = Math.round(data.offsets.reference.width);
            data.offsets.popper.width = width;
            data.styles.width = width.toString() + 'px';

            return data;
          },
        },
      }}
    >
      {({ ref, style, placement }) => {
        return (
          <div
            className={`flex flex-col justify-between z-50 my-1 py-1 text-sm font-light text-color-input-option transition-opacity transition-100 rounded-lg shadow-lg bg-white border border-gray-10 ${className} ${
              cursorStyle ? cursorStyle : 'cursor-pointer '
            } ${className}`}
            css={scroll && !fullHeight && tw`max-h-48 overflow-auto`}
            ref={ref}
            style={style}
            data-placement={placement}
          >
            {children}
          </div>
        );
      }}
    </Popper>
  );
};

Options.displayName = 'Dropdown.Options';

Options.Item = ({ children, className, ...props }: any) => {
  return (
    <div
      {...props}
      className={className + ' px-5 h-8 hover:bg-gray-200 hover:text-color-input whitespace-no-wrap flex items-center'}
    >
      {children}
    </div>
  );
};

export default withProperties(Dropdown, { Options, Reference });
