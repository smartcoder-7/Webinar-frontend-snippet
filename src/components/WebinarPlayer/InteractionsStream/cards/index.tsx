import styled from '@emotion/styled';
import { Link } from '@reach/router';
import ApolloForm from '@src/components/ApolloForm';
import {
  Interaction,
  InteractionFragment,
  InteractionType,
  InteractionViewModeFragment,
  ReactionEventName,
  useCreateReactionMutation,
} from '@src/fromBackend/schema';
import { ReactComponent as HandoutIcon } from '@src/images/handout.svg';
import { ReactComponent as InteractionIcon } from '@src/images/interaction.svg';
import { ReactComponent as FeedbackIcon } from '@src/images/interactionFeedback.svg';
import { ReactComponent as QuestionIcon } from '@src/images/interactionQuestion.svg';
import { ReactComponent as PollIcon } from '@src/images/poll.svg';
import { ReactComponent as ReactOutIcon } from '@src/images/profileUpload.svg';
import { ReactComponent as TipIcon } from '@src/images/tip.svg';
import { InteractionState } from '@src/modules/Interaction/enum';
import formatTimeInRoomSec from '@src/utils/formatTimeInRoomSecs';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import tw from 'tailwind.macro';

import { Rooms, WebinarPlayerContext } from '../..';
import FeedBackCard from './FeedbackCard';
import HandoutCard from './HandoutCard';
import PollCard from './PollCard';
import QuestionCard from './QuestionCard';
import RequestToContact from './RequestToContact';
import SpecialOfferCard from './SpecialOfferCard';
import TipCard from './TipCard';

// import WelcomeCard from './WelcomeCard';

interface CardProps {
  interaction: InteractionFragment;
  isEdit?: boolean;
  isAttendee?: boolean;
  active?: boolean;
  onClick?: (interaction: any) => any;
  className?: string[];
  ewebinarId: string;
  playbackPosition: number;
  rooms: Rooms;
  startsAt?: number;
  attendeeId?: string;
}
interface CardStyleComponent {
  active?: boolean;
  isEdit?: boolean;
  isAttendee?: boolean;
}

interface CardImageStyleComponent {
  floatText?: string;
}

interface HeaderStyleComponent {
  hasImage?: boolean;
}

const EndStreamStyleComponent = styled.div`
  ${tw`
        relative
        w-full
        my-8
    `}
  height: 1px;
  &::before {
    ${tw`
            absolute
            border
            border-solid
            border-gray-6
        `}
    content: '';
    width: 200px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::after {
    ${tw`
            absolute
            inset-auto
            border
            border-solid
            border-gray-6
            text-gray-6
            bg-white
            italic
            text-center
            text-xs
            z-10
            rounded-full
            py-1
        `}
    content: 'End';
    width: 70px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const CardStyleComponent = styled.div<CardStyleComponent>`
    ${tw` max-w-sm mb-2 transition-opacity opacity-50`}
    ${(props) => props.active && tw` opacity-100`}
    ${(props) => props.isEdit && tw`hover:opacity-100`}
    ${(props) => props.isAttendee && tw`opacity-100`}
    .interaction-edit {
      ${(props) => !props.active && tw`opacity-0`}
        ${tw`flex mb-1 items-center justify-between text-sm`}
    }
    &:hover .interaction-edit {
        ${tw`opacity-100`}
    }
`;

const CardImageStyleComponent = styled.img<CardImageStyleComponent>`
  ${tw`absolute z-0 w-full h-20 rounded-xl rounded-b-none`}
  min-height: 120px;
  filter: ${(props) => (props.floatText ? 'brightness(0.7)' : undefined)};
`;

const HeaderStyleComponent = styled.div<HeaderStyleComponent>`
  ${tw`relative flex w-full px-4 rounded-xl`}
  height: ${(props) => (props.hasImage ? '120px' : '44px')};
  background: #53A3A8;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;  

  .header-icon {
    ${(props) =>
      props.hasImage
        ? `
            background: #ffffff;
            padding: 11px;
            border-bottom-right-radius: 40px;
            border-bottom-left-radius: 40px;
            color: #39A1B2;
            font-size: 18px;
        `
        : `
            color: #ffff;
            font-size: 22px;
            margin-right: 14px;
        `}
        g {
          fill: #fff;
          opacity: 1;
        }
      fill: #fff;
  }
  .header-title {
    ${tw`flex items-center justify-between tracking-normal text-white`}
    height: 45px;
    ${(props) =>
      props.hasImage
        ? `
            justify-content: center;
            align-items: center;
            border-radius: 1em;
        `
        : `
            width: 100%;
        `}
  }
`;

export interface InteractionCardProps {
  interaction: InteractionViewModeFragment;
  interactionState?: string;
  answer?: string;
  attendeeName?: string;
}

interface CardBody {
  cardComponent?: React.FC<InteractionCardProps>;
  icon?: JSX.Element;
  title?: string;
  name?: string;
}

export const getCardBodyByType = (interaction: InteractionFragment): CardBody | undefined => {
  const { type } = interaction;
  switch (type) {
    case InteractionType.Handout:
      return {
        cardComponent: HandoutCard,
        icon: <HandoutIcon className='header-icon' />,
        name: 'Handout',
        title: 'Handout',
      };
    case InteractionType.SpecialOffer:
      return {
        cardComponent: SpecialOfferCard,
        name: 'Special Offer',
        title: 'Special Offer',
        icon: <InteractionIcon className='header-icon' />,
      };
    case InteractionType.Tip:
      return {
        cardComponent: TipCard,
        icon: <TipIcon className='header-icon' />,
        name: 'Tip',
        title: 'Tip',
      };
    case InteractionType.Question:
      return {
        cardComponent: QuestionCard,
        name: 'Question',
        title: 'Question',
        icon: <QuestionIcon className='header-icon' />,
      };
    case InteractionType.RequestToContact:
      return {
        cardComponent: RequestToContact,
        icon: <ReactOutIcon className='header-icon' />,
        name: 'Request to Contact',
        title: 'May we reach out to you?',
      };
    case InteractionType.Feedback:
      return {
        cardComponent: FeedBackCard,
        icon: <FeedbackIcon className='header-icon' />,
        name: 'Feedback',
        title: 'Give us your feedback!',
      };
    case InteractionType.Poll:
      return {
        cardComponent: PollCard,
        icon: <PollIcon className='header-icon' />,

        name: 'Poll',
        title: 'Poll',
      };
    default:
      return undefined;
  }
};

function capitalizeFirstLetter(str: string = ''): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getDetailsKeyFromInteractionType = (type: InteractionType): string | undefined => {
  switch (type) {
    case InteractionType.Feedback:
      return 'feedback';
    case InteractionType.Poll:
      return 'poll';
    case InteractionType.Question:
      return 'question';
    case InteractionType.RequestToContact:
      return 'requestToContact';
    default:
      return undefined;
  }
};

const getAnswerFieldInteraction = (Obj: Object, propVal: string | number): string =>
  _.invert(Obj)[propVal];

const InteractionCard: React.FC<CardProps> = ({
  isEdit,
  active,
  isAttendee,
  onClick,
  interaction,
  ewebinarId,
  rooms,
  playbackPosition,
  startsAt,
  attendeeId,
}) => {
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const [createReaction] = useCreateReactionMutation();
  const { details, reaction } = interaction as Interaction;
  const interacted = !!reaction;
  const [pollJustVotedTime, setPollJustVotedTime] = useState<number>(0);
  const [interactionState, setInteractionState] = useState(
    interacted ? InteractionState.Submitted : InteractionState.Normal
  );
  const { attendee } = useContext(WebinarPlayerContext);
  const attendeeName = `${attendee?.firstName} ${attendee?.lastName}`;

  useEffect(() => {
    const resultsAppearAt =
      pollJustVotedTime > 0 ? playbackPosition - pollJustVotedTime : playbackPosition;

    if (interacted || interactionState !== InteractionState.Normal) {
      // Show result after time is resultsAppearAt
      const isNeedShowResult = interactionState !== InteractionState.Result;
      const isAvailableResult = !!details!.resultsAppearAt && details!.resultsAppearAt! > 0;
      if (isNeedShowResult && isAvailableResult && resultsAppearAt >= details!.resultsAppearAt!) {
        setInteractionState(InteractionState.Result);
      }
      if (!!reaction) {
        const { detailsFields } = reaction;
        const key = getDetailsKeyFromInteractionType(interaction.type);
        if (key) {
          const answer = (detailsFields as any)[key].answer;
          [
            InteractionType.Poll,
            InteractionType.Feedback,
            InteractionType.Question,
            InteractionType.RequestToContact,
          ].includes(interaction.type) && setAnswer(answer);
        }
      }
    }
  }, [playbackPosition]);

  if (interaction.type === InteractionType.EndStream) return <EndStreamStyleComponent />;
  if (!interaction.details) return null;
  const {
    details: { title },
  } = interaction;

  const { cardComponent, title: cardTitle, icon, name } = getCardBodyByType(interaction) || {};

  const cardStatusChanged = (interaction: InteractionFragment) => {
    switch (interaction.type) {
      case InteractionType.Feedback:
      case InteractionType.Poll:
        setPollJustVotedTime(playbackPosition);
        setInteractionState(InteractionState.Submitted);
        return;

      case InteractionType.Question:
      case InteractionType.RequestToContact:
        return setInteractionState(InteractionState.Submitted);

      case InteractionType.SpecialOffer:
        return window.open(
          `${interaction.details!.offerLink || 'http://' + interaction.details!.offerLink}`
        );

      case InteractionType.Handout:
        return window.open(
          `${interaction.details!.downloadLink || 'http://' + interaction.details!.downloadLink}`
        );

      default:
        return false;
    }
  };

  return (
    <CardStyleComponent onClick={onClick} isEdit={isEdit} active={active} isAttendee={isAttendee}>
      {isEdit && (
        <div className={`interaction-edit`}>
          <div>
            {capitalizeFirstLetter(name)}
            <span className='text-blue-3'> at {formatTimeInRoomSec(interaction.appearAt)}s</span>
          </div>
          <Link to={`./${interaction.id}`} className='text-blue-3'>
            Edit
          </Link>
        </div>
      )}
      <ApolloForm
        onSubmit={async (data: any) => {
          [
            InteractionType.Poll,
            InteractionType.Feedback,
            InteractionType.Question,
            InteractionType.RequestToContact,
          ].includes(interaction.type) && setAnswer(data.details.answer);
          const room = rooms.getRoom(interaction.room);
          const reactionAppearAt = room && playbackPosition - room.appearAt;
          const detailsKey = getDetailsKeyFromInteractionType(interaction.type);
          await createReaction({
            variables: {
              data: {
                startTime: startsAt && new Date(startsAt),
                interactionId: interaction.id,
                ewebinarId: ewebinarId,
                eventName: ReactionEventName.Interacted,
                interactionType: interaction.type,
                detailsFields: detailsKey ? { [detailsKey]: { ...data.details } } : {},
                reactionAppearRoom: interaction.room,
                reactionAppearAt: parseInt(`${reactionAppearAt}`),
                pollAnswer:
                  interaction.type === InteractionType.Poll
                    ? getAnswerFieldInteraction(interaction.details as object, data.details.answer)
                    : undefined,
                feedbackRating:
                  interaction.type === InteractionType.Feedback
                    ? parseInt(data.details.answer)
                    : undefined,
                attendeeId: `${attendeeId}`,
              },
            },
            update: (_cache, mutationResult) => {
              if (mutationResult.data && mutationResult.data.createReaction) {
                return cardStatusChanged(interaction);
              }
              return false;
            },
          });
        }}
      >
        <div className='bg-white max-w-sm'>
          {(cardTitle || title) && (
            <HeaderStyleComponent className='w-full'>
              <div className='flex items-center'>{icon}</div>
              <div className='header-title'>
                <h4 className='truncate text-sm'>{cardTitle}</h4>
              </div>
            </HeaderStyleComponent>
          )}
          {cardComponent &&
            React.createElement(cardComponent, {
              interactionState,
              interaction,
              answer,
              attendeeName,
            })}
        </div>
      </ApolloForm>
    </CardStyleComponent>
  );
};

export default InteractionCard;
