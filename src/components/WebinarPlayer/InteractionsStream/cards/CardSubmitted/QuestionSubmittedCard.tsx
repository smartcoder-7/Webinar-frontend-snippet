import React from 'react';
import CardBody from '@src/components/WebinarPlayer/InteractionsStream/cards/SubmittedLayout/CardBody';
import CardWrapper from '@src/components/WebinarPlayer/InteractionsStream/cards/SubmittedLayout/CardWrapper';
import BodyTitle from '../SubmittedLayout/BodyTitle';
import BodyContent from '../SubmittedLayout/BodyContent';
import ContentTitle from '../SubmittedLayout/ContentTitle';
import Content from '../SubmittedLayout/Content';
import { Interaction } from '@src/fromBackend/schema';

interface QuestionSubmittedProps {
  answer?: string;
  interaction: Interaction;
}
const QuestionSubmittedCard: React.FunctionComponent<QuestionSubmittedProps> = ({
  answer,
  interaction,
}) => {
  const { details } = interaction;
  return (
    <CardWrapper>
      <CardBody>
        <BodyTitle>{details?.title}</BodyTitle>
        <BodyContent>
          <ContentTitle>Your answer:</ContentTitle>
          <Content className='px-2'>{answer}</Content>
        </BodyContent>
      </CardBody>
    </CardWrapper>
  );
};

export default QuestionSubmittedCard;
