import React from 'react';
import PollResult from '../../InteractionCards/Poll';
import SpecialOffer from '../../InteractionCards/SpecialOffer';
import HandOut from '../../InteractionCards/HandOut';
import { InteractionType, Interaction, ReactionResultDetails } from '@src/fromBackend/schema';
import Question from '../../InteractionCards/Question';
import Feedback from '../../InteractionCards/Feedback';

interface InteractionBodyProps {
  interaction: Interaction;
  detailsFields: ReactionResultDetails;
  totalCount: number;
  respondants: number;
}

const InteractionBody: React.FC<InteractionBodyProps> = ({
  interaction,
  detailsFields,
  totalCount
}) => {
  const { type } = interaction;
  const renderContentResult = () => {
    switch (type) {
      case InteractionType.Poll:
        return <PollResult
          interaction={interaction}
          detailsFields={detailsFields}
          />;
      case InteractionType.SpecialOffer:
        return <SpecialOffer
          interaction={interaction}
          detailsFields={detailsFields}
        />;

      case InteractionType.Handout:
        return <HandOut
          interaction={interaction}
          detailsFields={detailsFields}
          totalCount={totalCount}
        />;

      case InteractionType.Question:
        return <Question
          interaction={interaction}
          detailsFields={detailsFields}
        />;
      
      case InteractionType.Feedback:
        return <Feedback
          interaction={interaction}
          detailsFields={detailsFields}
        />;
      default:
        return null;
    }
  };

  return renderContentResult();
};

export default InteractionBody;
