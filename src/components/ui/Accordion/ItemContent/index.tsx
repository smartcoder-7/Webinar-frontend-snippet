import styled, {StyledComponent} from '@emotion/styled';
import tw from 'tailwind.macro';

const ItemContent: StyledComponent<any, any, any> = styled.div`
    ${tw`p-6`}
    opacity: 0;
    transform: translateY(1rem);
    transition-timing-function: linear;
    transition-duration: 0.1s;
    transition-property: opacity, transform;
    transition-delay: 0.5s;
    transition: all 0.2s;
    padding-top: 0 !important;
    
    &.opened {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0.2s;
        transition-timing-function: ease-in-out;
        transition-duration: 0.2s;
        transition-property: opacity, transform;
    }
`;

export default ItemContent;
