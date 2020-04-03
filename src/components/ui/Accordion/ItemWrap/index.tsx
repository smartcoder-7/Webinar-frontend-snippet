import styled, {StyledComponent} from '@emotion/styled';
import tw from 'tailwind.macro';

const ItemWrap: StyledComponent<any, any, any> = styled.li`
  ${tw`border border-solid border-gray-12`}
    
    &:first-of-type {
      ${tw`border-t-0`}
    }
`;

export default ItemWrap;
