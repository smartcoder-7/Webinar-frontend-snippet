import styled, {StyledComponent} from '@emotion/styled';
import tw from 'tailwind.macro';

const AccordionList: StyledComponent<any, any, any> = styled.ul`
    ${tw`list-none m-0 p-0 rounded-none`}
    background-color: #fff;
    max-width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export default AccordionList;
