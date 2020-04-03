import React from 'react';
import { Interaction, ReactionResultDetails } from '@src/fromBackend/schema';

interface QuestionProps {
  interaction: Interaction;
  detailsFields: ReactionResultDetails;
}

const Question: React.FC<QuestionProps> = ({
  interaction
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
    </div>
  );
};

export default Question;
