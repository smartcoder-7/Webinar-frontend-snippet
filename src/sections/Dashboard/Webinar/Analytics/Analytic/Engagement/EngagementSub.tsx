import React from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

interface IEngagementSub {
    interactionTotal: number;
    reactionTotal: number;
}


const EngagementSubItem = styled.div`
    ${tw`flex flex-row justify-between`}
    color: #0e282d;
    font-size: 13px;
    padding: 0 52px 0;
    line-height: 16px;
    margin-bottom: 8px;
    font-family: "CircularStd";
`;

const EngagementSub = (props: IEngagementSub) => {
    const { interactionTotal, reactionTotal } = props;
    return (
        <div className="pb-3">
            <EngagementSubItem className="flex flex-row justify-between">
                <span>Total interactions</span>
                <span>{interactionTotal}</span>
            </EngagementSubItem>
            <EngagementSubItem className="flex flex-row justify-between">
                <span>Total reactions</span>
                <span>{reactionTotal}</span>
            </EngagementSubItem>
        </div>
    );
}

export default EngagementSub;
