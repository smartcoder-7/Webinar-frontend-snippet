import React from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import tw from 'tailwind.macro';
interface ContentProps {
  className?: string;
  children: React.ElementType;
}

const Content: StyledComponent<any, ContentProps, any> = styled(({ className, children }) => {
  return <p className={` ${className}`}>{children}</p>;
})`
  ${tw`text-sm leading-5 text-gray-2`}
`;

export default Content;
