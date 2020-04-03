import React, { FunctionComponent } from 'react';
import { css } from '@emotion/core';
import cn from 'classnames';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: any;
  onClick?: any;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  submitting: boolean;
}

const Submit: FunctionComponent<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      type={props.type || 'button'}
      css={css`
        :disabled {
          opacity: 0.5;
        }
      `}
      className={cn(
        'appearence-none outline-none whitespace-no-wrap flex items-center font-bold text-white bg-blue-3 rounded-full py-2 my-4 px-5 font-medium text-center',
        props.className
      )}
    >
      {props.submitting ? (
        <img className='w-5 h-5 mx-auto' src={require('@src/images/spinner.svg').default} />
      ) : (
        props.children
      )}
    </button>
  );
};

export default Submit;
