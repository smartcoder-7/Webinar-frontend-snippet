import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import BaseCardBody from '@src/components/Card/Base/BaseCardBody';
import BaseCardBodyTitle from '@src/components/Card/Base/BaseCardBodyTitle';
import BaseCardButton from '@src/components/Card/Base/BaseCardButton';
import { Form, Input } from '@src/components/ui';
import { InteractionCardProps } from './index';
import QuestionSubmittedCard from '@src/components/WebinarPlayer/InteractionsStream/cards/CardSubmitted/QuestionSubmittedCard';
import { InteractionState } from '@src/modules/Interaction/enum';
import { Interaction } from '@src/fromBackend/schema';

const FooterStyleComponet = styled.div`
  ${tw`text-center mt-3`}
`;

const QuestionCard: FunctionComponent<InteractionCardProps> = ({
  interactionState,
  interaction,
  answer,
}) => {
  const { details, reaction } = interaction;
  const interacted = !!reaction;
  const buttonText = (details && details.buttonText) || 'Submit';
  if (interacted || interactionState === InteractionState.Submitted) {
    return (
      <BaseCardBody isViewResult>
        <QuestionSubmittedCard interaction={interaction as Interaction} answer={answer} />
      </BaseCardBody>
    );
  }

  return (
    <BaseCardBody>
      <BaseCardBodyTitle content={(details && details.title) || ''} />
      <Form.Field
        style={{
          'font-size': '0.8125rem',
        }}
        name='details.answer'
        className='w-full'
        placeholder={'Share your thoughts with us...'}
        component={Input.textarea}
      />

      <FooterStyleComponet>
        <BaseCardButton value={buttonText} />
      </FooterStyleComponet>
    </BaseCardBody>
  );
};

export default QuestionCard;
