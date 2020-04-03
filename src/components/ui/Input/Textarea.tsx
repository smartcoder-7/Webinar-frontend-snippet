import styled, { StyledComponent } from '@emotion/styled';
import tw from 'tailwind.macro';
import React from 'react';

const Textarea: StyledComponent<any, any, any> = styled(({ className, children, ...props }: any) => {
  return (
    <textarea
      className={className}
      {...props}
    >
      {children}
    </textarea>
  );
})`
  ${tw`
    font-body
    appearance-none
    block
    antialiased
    text-base
    border
    border-gray-1
    rounded
    w-full
    p-3
    font-light
    text-color-input
    leading-tight
    resize-none
    h-40
    focus:outline-none
    focus:shadow`}

  &::placeholder {
    opacity: 1;
    ${tw`text-gray-1`}
  }
`;

export default Textarea;
