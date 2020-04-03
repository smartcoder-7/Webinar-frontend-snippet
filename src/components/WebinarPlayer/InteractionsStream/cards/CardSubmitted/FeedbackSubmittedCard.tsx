import React from 'react';
import CardBody from '@src/components/WebinarPlayer/InteractionsStream/cards/SubmittedLayout/CardBody';
import CardWrapper from '@src/components/WebinarPlayer/InteractionsStream/cards/SubmittedLayout/CardWrapper';
import BodyContent from '../SubmittedLayout/BodyContent';
import ContentTitle from '../SubmittedLayout/ContentTitle';
import Content from '../SubmittedLayout/Content';
import { Emoji } from 'emoji-mart';
interface FeedbackSubmittedCardProps {
  attendeeName?: string;
  feedback: FeedbackItemProps;
}

export interface FeedbackItemProps {
  feedbackRate: { icon: string; value: string };
  length: number;
}

const FeedbackSubmiitedCard: React.FunctionComponent<FeedbackSubmittedCardProps> = ({
  attendeeName,
  feedback,
}) => {
  return (
    <CardWrapper>
      <CardBody>
        <BodyContent className='text-center items-center'>
          <Emoji emoji={feedback.feedbackRate.icon} set='emojione' size={25} />
          <ContentTitle>
            You rated us <span>{feedback.feedbackRate.value}</span>/{feedback.length}
          </ContentTitle>
          <Content className='px-2'>
            Thanks <span>{attendeeName}</span>! We will strive to keep improving.
          </Content>
        </BodyContent>
      </CardBody>
    </CardWrapper>
  );
};

export default FeedbackSubmiitedCard;
