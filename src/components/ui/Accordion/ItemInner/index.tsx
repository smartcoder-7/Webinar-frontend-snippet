import styled, {StyledComponent} from '@emotion/styled';
import tw from 'tailwind.macro';

const ItemInner: StyledComponent<any, any, any> = styled.div`
    ${tw`overflow-hidden relative`}
    max-height: 0;
    transition-duration: 0.5s;
    transition-property: max-height;
    z-index: 1;

    &.opened {
        ${tw`overflow-visible`}
        max-height: 100rem;
        transition-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
        transition-duration: 0.3s;
        transition-property: max-height;
        z-index: 19;
    }
`;

export default ItemInner;
