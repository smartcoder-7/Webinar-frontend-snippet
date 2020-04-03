import React from 'react';
// import styled from '@emotion/styled';
import { Interaction, ReactionResultDetails } from '@src/fromBackend/schema';

interface PollResultProps {
  interaction: Interaction;
  detailsFields: ReactionResultDetails;
}

const getAnswers = (interaction: any, detailsFields: any) => {
  const { details }= interaction;
  const answers = Object.keys(details)
    .filter(key => key.indexOf('answer') !== -1 && details[key]  )
    .map((key: string):any => ({
      key,
      description: details[key] || '',
      count: detailsFields 
        && detailsFields[key]
        && detailsFields[key].count
          ? detailsFields[key].count
          : 0,
      percent: detailsFields
        && detailsFields[key]
        && detailsFields[key].percent
        ? detailsFields[key].percent
          : 0
    }));
  return answers;
};

const PollResult: React.FC<PollResultProps> = ({
  interaction,
  detailsFields
}) => {
  const answers = getAnswers(interaction, detailsFields);

  const colors = ['bg-orange-2', 'bg-teal-4', 'bg-purple-1', 'bg-gray-1']
  
  return (
    <div className='block'>
      <p className='text-black'>
        {
          interaction.details
          && interaction.details.title
            ? interaction.details.title
            : ''
        }
      </p>
      {
        answers.map((answer, idx) => (
          <div className='mb-4 mt-4 block' key={idx}>
            <label className='block text-gray-700 text-sm mb-1'>
              {answer.percent}% {answer.description}
            </label>
            <div
              className={`h-2 ${colors[idx]} rounded-full`}
              style={{width: `${answer.percent}%`}}
            />
          </div>
        ))
      }
    </div>
  );
};

export default PollResult;
