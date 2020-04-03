import styled, {StyledComponent} from '@emotion/styled';
import tw from 'tailwind.macro';

const ItemHeader: StyledComponent<any, any, any> = styled.div`
    ${tw`flex justify-between`}
`;

export default ItemHeader;
