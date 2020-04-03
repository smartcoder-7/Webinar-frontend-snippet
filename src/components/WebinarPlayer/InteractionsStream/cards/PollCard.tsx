import React, { useState } from 'react';
import styled from '@emotion/styled';
import BaseCardBody from '@src/components/Card/Base/BaseCardBody';
import BaseCardBodyTitle from '@src/components/Card/Base/BaseCardBodyTitle';
import BaseCardButton from '@src/components/Card/Base/BaseCardButton';
import tw from 'tailwind.macro';
import { Form, Input } from '@src/components/ui';
import { InteractionCardProps } from './index';
import PollSubmittedCard from '@src/components/WebinarPlayer/InteractionsStream/cards/CardSubmitted/PollSubmittedCard';
import { InteractionState } from '@src/modules/Interaction/enum';
import PollResult from '@src/sections/Dashboard/Webinar/Interactions/InteractionResults/InteractionTemplate/InteractionCards/Poll';
import { Interaction, ReactionResultDetails } from '@src/fromBackend/schema';

const FooterStyleComponent = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const PollLabelStyleComponent = styled.div`
  margin-left: 0.5rem;
  overflow-wrap: break-word;
  max-width: 8rem;
  font-size: 0.8125rem;
`;

const PollStyle = styled.div<{ isChecked: boolean }>`
  ${tw`flex p-2 bg-blue-1 rounded-xl items-center mb-4 text-gray-2 font-body text-sm font-light leading-tight`}
  .label {
    ${tw`text-sm`}
    color: #0D1C1E;
  }
  ${(props) =>
    props.isChecked
      ? `.poll-label{
            color: black;	
            font-size: 0.875rem;	
            font-weight: 400;	
            line-height: 1.25;
    };`
      : null}
`;
const Poll: React.FC<InteractionCardProps> = ({ interactionState, interaction }) => {
  const { details, pollResult, reaction } = interaction;
  const interacted = !!reaction;
  const questions = details
    ? [details.answer1, details.answer2, details.answer3, details.answer4]
    : [];

  const [pollVal, setPollVal] = useState('');
  const onChange = (e: any) => setPollVal(e);

  const buttonText = (details && details.buttonText) || 'Submit';

  if (interacted || interactionState !== InteractionState.Normal) {
    return interactionState !== InteractionState.Result ? (
      <BaseCardBody isViewResult>
        <PollSubmittedCard interaction={interaction as Interaction} />
      </BaseCardBody>
    ) : (
      <BaseCardBody>
        <PollResult
          detailsFields={pollResult!.detailsFields as ReactionResultDetails}
          interaction={interaction as Interaction}
        />
      </BaseCardBody>
    );
  }
  return (
    <BaseCardBody>
      <BaseCardBodyTitle content={(details && details.title) || ''} />
      <div style={{ marginTop: '1rem' }}>
        {questions.map((question, idx) => {
          return (
            question && (
              <PollStyle key={idx} isChecked={pollVal === question}>
                <Form.Field
                  name='details.answer'
                  component={Input.radio}
                  valueName='radiovalue'
                  value={question}
                  onChange={onChange}
                  checked={pollVal === question}
                />
                <PollLabelStyleComponent className='poll-label'>{question}</PollLabelStyleComponent>
              </PollStyle>
            )
          );
        })}
      </div>
      <FooterStyleComponent>
        <BaseCardButton value={buttonText} />
      </FooterStyleComponent>
    </BaseCardBody>
  );
};

export default Poll;
