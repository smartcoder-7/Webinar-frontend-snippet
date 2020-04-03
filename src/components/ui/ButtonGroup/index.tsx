import styled from '@emotion/styled';
import { withProperties } from '@src/utils/type';
import React from 'react';
import tw from 'tailwind.macro';

interface Props {
  children: any;
  className?: any;
}

const ButtonGroup = styled(({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
})<Props>`
  ${tw`rounded-full bg-white border border-gray-300 text-gray-2 text-sm inline-flex mr-4`}

  & > *:first-of-type {
    ${tw`rounded-l-full`}
  }
  & > *:last-child {
    ${tw`rounded-r-full`}
  }
`;

const Button = styled(({ children, ...props }: any) => {
  return <button {...props}>{children}</button>;
})`
  ${tw`appearance-none whitespace-no-wrap focus:outline-none px-4 py-2 border-r border-gray-300 flex items-center`}
`;

export default withProperties(ButtonGroup, { Button });
