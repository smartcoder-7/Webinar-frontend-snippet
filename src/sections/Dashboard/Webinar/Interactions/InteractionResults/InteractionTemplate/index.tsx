import React from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import InteractionIcon from './InteractionLayout/InteractionIcon';
import InteractionBody from './InteractionLayout/InteractionBody';
import InteractionTail from './InteractionLayout/InteractionTail';
import { Interaction, ReactionResultDetails } from '@src/fromBackend/schema'

interface InteractionTemplateProps {
  className?: string;
  interaction: Interaction;
  detailsFields: ReactionResultDetails;
  totalCount: number;
  respondants: number;
}

const InteractionStyle = styled.div`
  ${tw`m-auto mb-5`}
  max-width: 90%;
`

const InteractionTemplate: React.FC<InteractionTemplateProps> = ({
  className,
  interaction,
  detailsFields,
  totalCount,
  respondants
}) => {

  return (
    <InteractionStyle>
      <div className={className}>
        <div
          className="capitalize bg-cyan-2 flex items-center"
          css={{ borderRadius: '26px 26px 0 0', height: '45px' }}
        >
          <div className="px-3 flex items-center text-white">
            <InteractionIcon
              interaction={interaction}
            />
          </div>
        </div>
        <div
          className={`flex items-center border border-gray-17 py-4 border-b-0 pb-0`}
        >
          <div className="px-3 flex items-center">
            <InteractionBody
              interaction={interaction}
              detailsFields={detailsFields}
              totalCount={totalCount}
              respondants={respondants}
            />
          </div>
        </div>
        <div
          className={`flex items-center border border-t-0 border-gray-17 py-4`}
          css={{ borderRadius: '0 0 26px 26px', height: '52px' }}
        >
          <div className="px-3 flex items-center w-full justify-between">
            <InteractionTail
              interaction={interaction}
              detailsFields={detailsFields}
              respondants={respondants}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
    </InteractionStyle>
  );
};

export default InteractionTemplate;
