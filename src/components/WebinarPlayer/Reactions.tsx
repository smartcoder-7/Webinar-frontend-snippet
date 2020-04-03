import React from 'react';

interface Props {}
import styled, { StyledComponent } from '@emotion/styled';
import useEwebinarReactions from '@src/hooks/useEwebinarReaction';

import { ReactComponent as ThumbsUpIcon } from '@src/images/thumbsUp.svg';
import tw from 'tailwind.macro';
import { ReactComponent as MsgIcon } from '@src/images/msg.svg';
import { ReactionEventName, RoomType } from '@src/fromBackend/schema';
import { WebinarPlayerContext } from '.';

const ThumbsUp: StyledComponent<any, any, any> = styled.div`
  ${tw`mr-4`}
  transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;

  &:hover {
    transform: scale(1.1, 1.1);
    -webkit-transform: scale(1.1, 1.1);
    -moz-transform: scale(1.1, 1.1);
  }
`;

const Reactions: React.FC<Props> = () => {
  const { ewebinar, startTime, playbackPosition, rooms } = React.useContext(WebinarPlayerContext);

  if (!ewebinar) {
    return null;
  }
  const eWebinarReaction = useEwebinarReactions();
  const [reactions, setReactions] = React.useState(0);
  const thumbsUpRef = React.useRef<any>(null);

  const renderReactions = () => {
    let id = 0;
    const reactionElements: any = [];

    for (; id < reactions; id++) {
      reactionElements.push({
        id,
        type: 'like',
      });
    }
    return reactionElements.map((reaction: any) => {
      const { id, type } = reaction;
      const rect = thumbsUpRef.current;

      const removeDeactiveReaction = (evt: any) => {
        const id = parseInt(evt.target.getAttribute('data-id'));
        reactionElements.filter((item: any) => item.id !== id);
      };

      return (
        <ThumbsUpIcon
          data-id={id}
          onAnimationEnd={removeDeactiveReaction}
          key={id}
          className={`${type} absolute z-30`}
          style={{ top: `${rect.offsetTop}px`, left: `${rect.offsetLeft}px` }}
        />
      );
    });
  };

  const onSendReaction = async () => {
    if (rooms && ewebinar && ewebinar && startTime) {
      setReactions(reactions + 1);

      // TODO: Do we need to send all this in or could we just send in AttendeeId?
      await eWebinarReaction.create({
        data: {
          startTime: new Date(startTime),
          reactionAppearAt: playbackPosition,
          ewebinarId: ewebinar.id,
          detailsFields: {},
          eventName: ReactionEventName.Like,
          reactionAppearRoom: RoomType.Presentation,
        },
      });
    }
  };
  return (
    <>
      <div ref={thumbsUpRef} className='absolute z-30 flex items-center bottom-0 right-0 m-6'>
        <ThumbsUp onClick={onSendReaction}>
          <ThumbsUpIcon />
        </ThumbsUp>
        <MsgIcon />
      </div>
      <div className='reactions w-full z-10 h-full absolute top-0 left-0'>{renderReactions()}</div>
    </>
  );
};

export default Reactions;
