import React from 'react';
import CardBody from '@src/components/WebinarPlayer/InteractionsStream/cards/SubmittedLayout/CardBody';
import CardWrapper from '@src/components/WebinarPlayer/InteractionsStream/cards/SubmittedLayout/CardWrapper';
import BodyTitle from '../SubmittedLayout/BodyTitle';
import BodyContent from '../SubmittedLayout/BodyContent';
import ContentTitle from '../SubmittedLayout/ContentTitle';
import Content from '../SubmittedLayout/Content';
import { Interaction } from '@src/fromBackend/schema';

interface RequestToContactCardProps {
  attendeeName: string;
  interaction: Interaction;
}

const RequestToContactSubmittedCard: React.FC<RequestToContactCardProps> = ({
  interaction,
  attendeeName,
}) => {
  const { details } = interaction;
  return (
    <CardWrapper>
      <CardBody>
        <BodyTitle>{details?.title}</BodyTitle>
        <BodyContent className='text-center items-center'>
          <span className='mb-2 text-xl'>🙏</span>
          <ContentTitle>
            Thanks, <span>{attendeeName}</span>!
          </ContentTitle>
          <Content className='px-2'>We will reach out to you at your preferred time.</Content>
        </BodyContent>
      </CardBody>
    </CardWrapper>
  );
};

export default RequestToContactSubmittedCard;
