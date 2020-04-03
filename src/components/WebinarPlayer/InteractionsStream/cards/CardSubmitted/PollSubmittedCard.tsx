import React from 'react';
import CardBody from '@src/components/WebinarPlayer/InteractionsStream/cards/SubmittedLayout/CardBody';
import CardWrapper from '@src/components/WebinarPlayer/InteractionsStream/cards/SubmittedLayout/CardWrapper';
import BodyTitle from '../SubmittedLayout/BodyTitle';
import BodyContent from '../SubmittedLayout/BodyContent';
import ContentTitle from '../SubmittedLayout/ContentTitle';
import Content from '../SubmittedLayout/Content';
import { Interaction } from '@src/fromBackend/schema';

interface PollSubmittedCardProps {
  interaction: Interaction;
}

const PollSubmittedCard: React.FC<PollSubmittedCardProps> = ({ interaction }) => {
  const { details } = interaction;
  return (
    <CardWrapper>
      <CardBody>
        <BodyTitle>{details!.title} 👨‍💻👩‍💻</BodyTitle>
        <BodyContent className='text-center items-center'>
          <span className='mb-2 text-xl'>🙏</span>
          <ContentTitle>Your vote was submitted!</ContentTitle>
          <Content className='px-2'>
            The result will be revealed near the end of the eWebinar…
          </Content>
        </BodyContent>
      </CardBody>
    </CardWrapper>
  );
};

export default PollSubmittedCard;
