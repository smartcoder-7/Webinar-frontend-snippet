import styled, {StyledComponent} from '@emotion/styled';
import tw from 'tailwind.macro';

const ItemLine: StyledComponent<any, any, any> = styled.div`
    ${tw`flex justify-between items-center relative`}
    padding: 18px 1.5rem 15px 1.5rem;
    background-color: #fff;
    z-index: 2;
`;

export default ItemLine;
