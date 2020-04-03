import React, { useState } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { Emoji } from 'emoji-mart';
import BaseCardBody from '@src/components/Card/Base/BaseCardBody';
import BaseCardBodyContent from '@src/components/Card/Base/BaseCardBodyContent';
import BaseCardButton from '@src/components/Card/Base/BaseCardButton';
import tw from 'tailwind.macro';
import { Form, Input } from '@src/components/ui';
import { InteractionCardProps } from './index';
import { InteractionState } from '@src/modules/Interaction/enum';
import Feedback from '@src/sections/Dashboard/Webinar/Interactions/InteractionResults/InteractionTemplate/InteractionCards/Feedback';
import { Interaction, ReactionResultDetails } from '@src/fromBackend/schema';
import FeedbackSubmiitedCard from '@src/components/WebinarPlayer/InteractionsStream/cards/CardSubmitted/FeedbackSubmittedCard';

interface IEmoji {
  icon: string;
  value: string;
}

interface IRatingTextProp {
  selected?: boolean;
}

const CheckBoxWrapperStyleComponent = styled.div`
  ${tw`flex justify-between items-center`}
`;

const CheckBoxStyleComponent = styled.div`
  ${tw`text-center`}
`;
const FooterStyleComponet = styled.div`
  ${tw`text-center mt-2`}
`;

const RatingText: StyledComponent<any, IRatingTextProp, any> = styled.p`
  color: ${({ selected }) => (selected ? '#53a3a8' : '#537175')};
`;

const FeedBackCard: React.FC<InteractionCardProps> = ({
  interactionState,
  interaction,
  attendeeName,
  answer,
}) => {
  const [feedbackSelected, setFeedbackSelected] = useState('');
  const { details, feedbackResult, reaction } = interaction;
  const interacted = !!reaction;

  const buttonText = (details && details.buttonText) || 'Submit';
  const feedbackEmojiList: IEmoji[] = [
    {
      icon: 'sob',
      value: '1',
    },
    {
      icon: 'disappointed',
      value: '2',
    },
    {
      icon: 'neutral_face',
      value: '3',
    },
    {
      icon: 'smiley',
      value: '4',
    },
    {
      icon: 'star-struck',
      value: '5',
    },
  ];

  const [feedback, setFeedback] = useState<IEmoji>({ icon: '', value: '' });
  const onChangeItem = (value: string) => {
    const feedbackItem = feedbackEmojiList.find((feedback) => {
      return feedback.value === value;
    });
    setFeedback(feedbackItem as IEmoji);
    setFeedbackSelected(value);
  };

  React.useEffect(() => {
    const feedbackItem = feedbackEmojiList.find((item) => {
      return item.value === answer;
    });
    setFeedback(feedbackItem as IEmoji);
  }, [answer]);

  if (interacted || interactionState !== InteractionState.Normal) {
    return interactionState !== InteractionState.Result ? (
      feedback ? (
        <BaseCardBody>
          <FeedbackSubmiitedCard
            feedback={{
              length: feedbackEmojiList.length,
              feedbackRate: feedback,
            }}
            attendeeName={attendeeName}
          />
        </BaseCardBody>
      ) : null
    ) : (
      <BaseCardBody>
        <Feedback
          detailsFields={feedbackResult!.detailsFields as ReactionResultDetails}
          interaction={interaction as Interaction}
        />
      </BaseCardBody>
    );
  }
  return (
    <BaseCardBody>
      <BaseCardBodyContent
        content={(details && details.description) || ''}
        style={{ textAlign: 'center' }}
      />
      <CheckBoxWrapperStyleComponent>
        {feedbackEmojiList.map(({ icon, value }: IEmoji, idx: number) => (
          <CheckBoxStyleComponent key={idx}>
            <RatingText selected={feedbackSelected === value}>{idx + 1}</RatingText>
            <Emoji emoji={icon} set='emojione' size={25} />
            <div>
              <Form.Field
                component={Input.radio}
                name='details.answer'
                valueName='radiovalue'
                value={value}
                onChange={onChangeItem}
                checked={feedbackSelected === value}
              />
            </div>
          </CheckBoxStyleComponent>
        ))}
      </CheckBoxWrapperStyleComponent>
      <FooterStyleComponet>
        <BaseCardButton value={buttonText} />
      </FooterStyleComponet>
    </BaseCardBody>
  );
};

export default FeedBackCard;
