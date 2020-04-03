import styled, { StyledComponent } from '@emotion/styled';
import tw from 'tailwind.macro';

const TitleInput: StyledComponent<any, any, any> = styled.input`
  ${tw`
    appearance-none
    block
    antialiased
    rounded-none
    w-full
    font-light
    text-color-input
    resize-none
    overflow-auto
    border-b-2
    border-white
    border-dashed
    focus:outline-none
    font-display
    font-light
    text-2xl
    px-0
    py-0
    transition-opacity
    `}

  &:not([disabled]) {
    ${tw`
      hover:opacity-60
      hover:border-gray-1
      focus:opacity-60
      focus:border-gray-1
      focus:border-solid
    `}
  }

  &::placeholder {
    opacity: 1;
    ${tw`text-gray-1`}
  }
`;

export default TitleInput;
