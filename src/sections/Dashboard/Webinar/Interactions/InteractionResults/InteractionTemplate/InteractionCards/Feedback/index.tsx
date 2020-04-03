import React from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Interaction, ReactionResultDetails } from '@src/fromBackend/schema';
import { Emoji } from 'emoji-mart'

interface FeedbackProps {
  interaction: Interaction;
  detailsFields: ReactionResultDetails;
}

const FeedbackStyle = styled.p`
  ${tw`flex justify-center items-center text-base mt-2`}
  line-height: 18px;
  color: #537175;
  .rate-num {
    ${tw`font-bold`}
    font-family: 'CircularStd';
    margin: 0 0.2rem 0 0.5rem;
  }
`;


const typeIcon = (value?: Number): string => {
  switch(value) {
    case 1: 
      return 'sob' 
    case 2:
      return 'disappointed' 
    case 3:
      return 'neutral_face'
    case 4: 
      return 'smiley'
    case 5: 
      return 'star-struck'
  }
  return 'neutral_face' // default icon
}

const Feedback: React.FC<FeedbackProps> = ({ 
  interaction,
  detailsFields
}) => {
  return (
    <div className="block">
      <div className="block">
        <label className="block text-gray-700 text-sm mb-1">
          <p>
            {
              interaction.details 
              && interaction.details.title
                ? interaction.details.title
                : ''}
          </p>
          <FeedbackStyle>
            <Emoji
              emoji={
                typeIcon(
                  Math.round(
                    detailsFields &&
                    detailsFields.feedbackRating
                      ? detailsFields.feedbackRating
                      : 0
              ))}
              set='emojione'
              size={25}
            />
            
            <span className='rate-num'>
              { detailsFields &&
                detailsFields.feedbackRating
                  ? detailsFields.feedbackRating
                    : 0}
            </span>
            average rating
          </FeedbackStyle>
        </label>
      </div>
    </div>
  );
};

export default Feedback;
