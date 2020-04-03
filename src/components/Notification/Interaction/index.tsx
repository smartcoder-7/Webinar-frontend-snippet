import React, { useState, ReactElement } from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { ReactComponent as HandoutIcon } from '@src/images/handout.svg';
import { ReactComponent as InteractionIcon } from '@src/images/interaction.svg';
import { ReactComponent as PollIcon } from '@src/images/poll.svg';
import { ReactComponent as QuestionIcon } from '@src/images/chatHelp.svg';
import { ReactComponent as TipIcon } from '@src/images/tip.svg';
import { ReactComponent as CloseIcon } from '@src/images/close.svg';
import { Interaction, InteractionType } from '@src/fromBackend/schema';

interface NotifyProps {
  interaction: Interaction;
  onClick?: (interaction: Interaction) => any;
  className?: string[];
}

interface NotifyComponentProps {
  showNotify: Boolean;
}

const NotifyComponent = styled.div<NotifyComponentProps>`
  ${tw`
        relative
        rounded-lg
        items-start
        mb-5
        p-5
        bg-teal-6
    `}
  width: 290px;
  display: ${(props) => (props.showNotify ? 'flex' : 'none')};
`;

const IconStyleComponent = styled.div`
  ${tw`
        relative
        flex
        justify-center
        items-start
        mr-3
        bg-white
        shadow-md
        rounded-lg
        p-3
    `}
  height: 50px;
  width: 50px;
  .header-icon {
    ${tw`
            text-teal-4
            flex
            justify-center
            items-center
        `}
    height: 30px;
    width: 30px;
  }
`;

const DetailStyleComponent = styled.div`
  ${tw`
        flex
        flex-col
        justify-start
        items-start
        content-center
        text-white
        h-full
    `}
  .title {
    ${tw`
            text-xs
        `}
  }
  .description {
    ${tw`
            text-base
            font-semibold
        `}
  }
`;

const ButtonCloseStyleComponent = styled.div`
  ${tw`
        absolute
        text-base
        flex
        justify-center
        items-center
        rounded-full
        bg-blue-5
    `}
  height: 16px;
  width: 16px;
  top: 7px;
  right: 7px;
  .icon-close {
    width: 6px;
    height: 6px;
  }
`;

const getNotifyBodyByType = (
  interaction: Interaction
): { body: string; icon?: ReactElement | null; title?: string } | null => {
  const { type, details } = interaction;
  if (!details) return null;
  switch (type) {
    case InteractionType.Welcome:
      return {
        body: details.title,
        icon: null,
      };
    case InteractionType.Handout:
      return {
        body: details.title,
        icon: <HandoutIcon className='header-icon' />,
        title: 'Free Handout',
      };
    case InteractionType.SpecialOffer:
      return {
        body: details.title,
        title: 'Special Offer',
        icon: <InteractionIcon className='header-icon' />,
      };
    case InteractionType.Tip:
      return {
        body: details.title,
        icon: <TipIcon className='header-icon' />,
        title: 'Tip',
      };
    case InteractionType.Question:
      return {
        body: details.title,
        title: 'Question',
        icon: <QuestionIcon className='header-icon' />,
      };
    case InteractionType.RequestToContact:
      return {
        body: details.title,
        title: 'May we reach out to you?',
      };
    case InteractionType.Feedback:
      return {
        body: details.title,
        icon: <QuestionIcon className='header-icon' />,
        title: 'Give us your feedback!',
      };
    case InteractionType.Poll:
      return {
        body: details.title,
        icon: <PollIcon className='header-icon' />,
        title: 'Poll start',
      };
    case InteractionType.PrivateMessage:
      return {
        body: details.title,
        icon: <QuestionIcon className='header-icon' />,
        title: 'Message',
      };
    case InteractionType.PublicPost:
      return {
        body: details.title,
        icon: <QuestionIcon className='header-icon' />,
        title: 'Post',
      };
    default:
      return null;
  }
};

const InteractionNotify: React.FC<NotifyProps> = ({ interaction }) => {
  const notifyBody = getNotifyBodyByType(interaction);
  if (!notifyBody) return <div />;
  const { body, icon, title } = notifyBody;
  const [showNotify, setShowNotify] = useState(true);

  return (
    <NotifyComponent className='notification slide-left' showNotify={showNotify}>
      <ButtonCloseStyleComponent onClick={() => setShowNotify(false)}>
        <CloseIcon className='icon-close' />
      </ButtonCloseStyleComponent>
      {icon && <IconStyleComponent>{icon}</IconStyleComponent>}
      <DetailStyleComponent>
        <p className='title'>{title}</p>
        <p className='description'>{body}</p>
      </DetailStyleComponent>
    </NotifyComponent>
  );
};

export default InteractionNotify;
