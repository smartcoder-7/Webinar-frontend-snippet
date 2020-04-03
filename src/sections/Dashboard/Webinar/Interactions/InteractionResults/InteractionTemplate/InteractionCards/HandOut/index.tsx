import React from 'react';
import { Interaction, ReactionResultDetails } from '@src/fromBackend/schema';
import { ReactComponent as HandoutIcon } from '@src/images/handout.svg';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

interface HandOutProps {
  interaction: Interaction;
  detailsFields: ReactionResultDetails;
  totalCount: number;
}

const HandOutStyle = styled.p`
  ${tw`flex justify-center items-center text-base`}
  line-height: 18px;
  color: #537175;
  .download-num {
    ${tw`font-bold ml`}
    font-family: 'CircularStd';
    margin: 0 0.2rem;
  }
`;

const HandOut: React.FC<HandOutProps> = ({
  interaction,
  totalCount
}) => {
  return (
    <div className="block">
      <p className="text-black">
        {
          interaction.details
          && interaction.details.title
            ? interaction.details.title
            : ''
        }
      </p>
      <div className="mt-4 block">
        <label className="block text-gray-700 text-sm mb-1">
          <HandOutStyle>            
            <HandoutIcon className={`mr-2 text-cyan-2`} />
            <span className='download-num'>
              {totalCount}
            </span>
            downloads
          </HandOutStyle>
        </label>
      </div>
    </div>
  )
};

export default HandOut;
