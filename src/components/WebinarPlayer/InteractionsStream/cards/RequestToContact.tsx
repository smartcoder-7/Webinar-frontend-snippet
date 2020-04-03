import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import BaseCardBody from '@src/components/Card/Base/BaseCardBody';
import BaseCardBodyTitle from '@src/components/Card/Base/BaseCardBodyTitle';
import BaseCardButton from '@src/components/Card/Base/BaseCardButton';
import { Form, Input } from '@src/components/ui';
import tw from 'tailwind.macro';
import { InteractionCardProps } from './index';
import RequestToContactSubmittedCard from '@src/components/WebinarPlayer/InteractionsStream/cards/CardSubmitted/RequestToContactSubmittedCard';
import { InteractionState } from '@src/modules/Interaction/enum';
import { Interaction } from '@src/fromBackend/schema';

const FooterStyleComponet = styled.div`
  ${tw`
        text-center
        mt-2
        flex
        justify-end
    `}
`;
const CancelButtonComponent = styled.input`
  ${tw`h-8 w-20 rounded-xl text-xs bg-white text-center mr-2`}
  color: #537175;
  font-size: 0.8125rem;
  :hover {
    ${tw`cursor-pointer bg-gray-19`}
  }
`;

const RequestToContactCard: FunctionComponent<InteractionCardProps> = ({
  interactionState,
  interaction,
  attendeeName,
}) => {
  const { details, reaction } = interaction;
  const interacted = !!reaction;

  if (interacted || interactionState === InteractionState.Submitted) {
    return (
      <BaseCardBody isViewResult>
        <RequestToContactSubmittedCard
          interaction={interaction as Interaction}
          attendeeName={attendeeName as string}
        />
      </BaseCardBody>
    );
  }
  return (
    <BaseCardBody>
      <BaseCardBodyTitle content={(details && details.title) || ''} />
      <Form.Field
        name='details.phone'
        className='w-full my-2'
        placeholder={'Phone'}
        component={Input}
        style={{
          borderColor: `#DAE0E1`,
        }}
      />
      <Form.Field
        name='details.email'
        className='w-full my-2'
        placeholder={'Email'}
        component={Input}
        style={{
          borderColor: `#DAE0E1`,
        }}
      />
      <Form.Field
        name='details.contactTime'
        className='w-full my-2'
        placeholder={'Best time to contact you?'}
        component={Input}
        style={{
          borderColor: `#DAE0E1`,
        }}
      />
      <FooterStyleComponet>
        <CancelButtonComponent type='button' value='No thanks' onClick={() => {}} />
        <BaseCardButton value='Submit' />
      </FooterStyleComponet>
    </BaseCardBody>
  );
};

export default RequestToContactCard;
