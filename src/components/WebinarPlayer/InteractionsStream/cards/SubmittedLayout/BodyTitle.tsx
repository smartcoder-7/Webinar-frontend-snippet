import React from 'react';
import styled, { StyledComponent } from '@emotion/styled';
// import tw from 'tailwind.macro';

interface BodyTitleProps {
  children: string;
}
const BodyTitle: StyledComponent<any, BodyTitleProps, any> = styled(({ children }) => {
  return <h4 className='text-sm leading-9/2 font-medium mx-1 mb-6 text-gray-21'>{children}</h4>;
})`
`;

export default BodyTitle;
