import React, { FunctionComponent, ReactElement, useCallback } from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

interface Props {
    title?: string;
    titlePercent?: string;
    titlePercentColor?: string;
    icon?: ReactElement;
    isShow?: boolean
    onExpand?: Function,
    onClose?: Function,
    isHasSubContent?: boolean;
    subContent?: JSX.Element;
}

export const AccordionItemComponent = styled.li<{ isShow?: boolean }>`
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    .line {
        ${tw`flex justify-between items-center relative cursor-pointer`}
        padding: 20px 1.5rem 16px 1.5rem;
        background-color: #fff;
        z-index: 2;
        .header {
            ${tw`flex flex-1 justify-between`}
            .title {
                ${tw`text-gray-2 text-sm flex items-center font-bold uppercase`}
                font-size: 11px;
                color: #0E282D;
                font-family: "CircularStd";
                letter-spacing: 1px;
                line-height: 14px;
            }
        }
        .title-count {
            ${tw`pr-2`}
            font-size: 18px;
            color: #0E282D;
        }
        .icon {
            ${tw`bg-contain bg-no-repeat`}
            width: 1.2rem;
            height: 1.2rem;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABGklEQVR4Ae3RAcZCQRiF4buDfwshBGi+2UQgcIGAVtpSIuS/KyilG+UTcbk6zIH3GQBm3mM6AAAAAAAAAACA+eqf/yZBXcV/2XeCVPYx1FXj/FjGUMd45AQp/1HHGGLZNL+e61jHnKDmv8652YT1IvPfE2LX/Sh27/ycsF60yT/lk58JYn6eU4MJccjnlAmZ/33i0OAH4jg9Qcw/5g9YJpS+m6n0xvzpCfVe+nn59S7kGyYo+YYJWz3fO+E2PaFs9XzPhMy/6fmWCXq+YUJs9HzrhLh+JsQmrnq+bYKeb52g53snXPR88wQ93z9Bz/dP0PP9E/R89wQ93zpBz7dO0POtE/R86wQ93zpBzzdP+MoHAAAAAAAAAADAExTnTW20AtjhAAAAAElFTkSuQmCC);
            opacity: 0.6;
        }
        .icon-wrap {
            svg path {
                fill: #B8C5C6;
            }
        }
    }
    .inner {
        ${tw`overflow-hidden relative`}
        max-height: 0;
        z-index: 1;
        .content {
            ${tw`opacity-0`}
            margin-bottom: 20px;
            padding: 0 52px 0;
            padding-top: 0 !important;
        }
    }
    ${(props: Props) => props.isShow ? `
    .line {
        .icon {
            transform: rotate(180deg);
        }
        .icon-wrap {
            svg path {
                fill: #537175;
            }
        }
    }
    .inner {
        max-height: 100rem;
        overflow: visible;
        z-index: 19;
        .content {
            opacity: 1;
        }
    }` : ''}
`;

const Item: FunctionComponent<Props> = ({ title, titlePercent, titlePercentColor, isShow, icon, onClose, onExpand, children, isHasSubContent, subContent }) => {
    const onClick = useCallback(() => {
        if (isShow) {
            onClose && onClose()
        } else {
            onExpand && onExpand()
        }
    }, [isShow]);
    const currentTitlePercentColor = isShow ? '#0E282D' : (titlePercentColor || '#0E282D');
    return (
        <>
            <AccordionItemComponent isShow={isShow}>
                <div className={`line ${(isHasSubContent && subContent && !isShow) && 'pb-4'}`} onClick={onClick}>
                    <div className="header">
                        <div className={"title"}>
                            <span className="icon-wrap mr-2">{icon}</span>
                            {title}
                        </div>
                    </div>
                    {
                        titlePercent && <span className="title-count" style={{ color: currentTitlePercentColor }}>{titlePercent}</span>
                    }
                    <span className={"icon"} />
                </div>
                <div className={"inner"}>
                    <div className={"content"}>
                        {children}
                    </div>
                </div>
            </AccordionItemComponent>
            {(isHasSubContent && subContent && !isShow) && subContent}
        </>
    )
};

export default Item;
