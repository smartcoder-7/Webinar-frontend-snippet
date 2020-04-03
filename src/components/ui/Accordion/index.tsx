import React, {FunctionComponent, useState, ReactElement, useCallback} from 'react';
import {animateScroll as scroll} from 'react-scroll';
import {withProperties} from '@src/utils/type';
import Item from './Item';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const AccordionList = styled.ul`
    ${tw`list-none m-0 p-0 bg-white rounded-none max-w-full`}
`;
interface Props {
    initialActiveSection: number;
    children: ReactElement[];
    onActiveSectionChange: (index: number) => void;
}


const Accordion: FunctionComponent<Props> = ({ children, initialActiveSection = 0, onActiveSectionChange }) => {
    const [active, onChangeActive] = useState(initialActiveSection);
    const onExpand = useCallback((index: number) => {
        onChangeActive(index);
        onActiveSectionChange(index);
        if (index === children.length - 1) {
            scroll.scrollToBottom();
        }
    }, [active]);
    const onClose = useCallback(() => {
        onChangeActive(-1);
        onActiveSectionChange(-1);
    }, [active]);
    const getChildren = useCallback(() => {
        return children
            ? children.map((child: ReactElement, index: number) => React.cloneElement(child, {
                isShow: active === index,
                key: index,
                onExpand: () => onExpand(index),
                onClose: () => onClose(),
            }))
            : null
    }, [active, children]);
    return (
        <AccordionList>
            {getChildren()}
        </AccordionList>
    );
};

export default withProperties(Accordion, {
    Item,
});
