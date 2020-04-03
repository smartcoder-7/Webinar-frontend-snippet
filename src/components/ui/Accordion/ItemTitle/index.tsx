import styled, {StyledComponent} from '@emotion/styled';
import tw from 'tailwind.macro';

const ItemTitle: StyledComponent<any, any, any> = styled.div`
    ${tw`text-gray-2 text-sm flex items-center uppercase cursor-pointer`}
    font-size: 11px;
    color: #39A1B2;
    svg path {
        fill: #39a1b2;
    }
    &.opened {
        svg path {
            fill: #39A1B2;
        }
    }
`;

export default ItemTitle;
