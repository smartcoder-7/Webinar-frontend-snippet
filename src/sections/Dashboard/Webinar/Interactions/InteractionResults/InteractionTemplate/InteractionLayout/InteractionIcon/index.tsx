import React from 'react';
import { ReactComponent as HandoutIcon } from '@src/images/handout.svg';
import { ReactComponent as SpecialOfferIcon } from '@src/images/interaction.svg';
import { ReactComponent as PollIcon } from '@src/images/poll.svg';
import { ReactComponent as QuestionIcon } from '@src/images/chatHelp.svg';
import { ReactComponent as ReactOutIcon } from '@src/images/editTool.svg';
import { InteractionType, Interaction } from '@src/fromBackend/schema';

interface InteractionIconProps {
  interaction: Interaction;
}

const InteractionIcon: React.FC<InteractionIconProps> = ({
  interaction 
}) => {
  const { type } = interaction;

  const renderIconByType = () => {
    switch (type) {
      case InteractionType.Poll:
        return (
          <>
            <PollIcon className={`mr-2`} />
            <span>Poll results</span>
          </>
        )
      case InteractionType.SpecialOffer:
        return (
          <>
            <SpecialOfferIcon className={`mr-2`} />
            <span>Special Offer taken</span>
          </>
        )

      case InteractionType.Handout:
        return (
          <>
            <HandoutIcon className={`mr-2`} />
            <span>Free Handout downloads</span>
          </>
        )

      case InteractionType.Question:
        return (
          <>
            <QuestionIcon className={`mr-2`} />
            <span>Question answered</span>
          </>
        )
      
      case InteractionType.Feedback:
        return (
          <>
            <ReactOutIcon className={`mr-2`} />
            <span>Feedback results</span>
          </>
        )
      default:
        return null;
    }
  };
  
  return renderIconByType();
};

export default InteractionIcon;
