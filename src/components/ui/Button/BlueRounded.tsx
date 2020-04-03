import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import Button from './Button';
import { css } from '@emotion/core';

const BlueRounded = styled(Button)`
  ${tw`flex items-center px-4 font-bold py-2 text-white bg-blue-3 rounded-full`}
  ${css`
    :disabled {
      background-color: #a2d0d9;
    }
  `}
`;

export default BlueRounded;
