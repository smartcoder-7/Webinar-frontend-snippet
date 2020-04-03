import { InteractionFragment, InteractionType, RoomType } from '@src/fromBackend/schema';
import React from 'react';

import { Mode, WebinarPlayerContext } from '..';
import { dataFromInteractions } from '../';
import InteractionCard from './cards';

const useScrollToChildren = (): [React.RefObject<HTMLDivElement>, (index: number) => any] => {
  const ref = React.useRef<HTMLDivElement>(null);
  const scrollToChildNode = React.useCallback((index) => {
    if (ref.current) {
      const el = ref.current!.children[index];

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, []);
  return [ref, scrollToChildNode];
};
interface Props {
  isEdit?: boolean;
  offset?: boolean;
  playbackPosition?: number;

  startsAt?: number;
  isAttendee?: boolean;
  attendeeId?: string;
}

export const getLastInteractionIndex = (
  interactions: InteractionFragment[],
  playbackPosition: number
): number => {
  return (
    interactions &&
    interactions
      .sort((a: InteractionFragment, b: InteractionFragment) => a.appearAt - b.appearAt)
      .reduce<any>((index, _, currentIndex) => {
        const a = interactions[currentIndex];
        const b = interactions[currentIndex + 1];

        if (playbackPosition > a.appearAt && (b ? playbackPosition < b.appearAt : true)) {
          return currentIndex;
        } else {
          return index;
        }
      }, -1)
  );
};

const InteractionsStream: React.FC<Props> = ({ attendeeId, startsAt }) => {
  const {
    ewebinar,
    rooms,
    playbackPosition,
    mode,
    interactions: interactionsQuery,
    setPlaybackPosition,
  } = React.useContext(WebinarPlayerContext);
  const isEdit = mode === Mode.edit;
  const isAttendee = mode === Mode.live;
  const [ref, scrollToChildNode] = useScrollToChildren();

  const interactionsData =
    (interactionsQuery && interactionsQuery.data && interactionsQuery.data.interactions) || [];
  const allInteractions: InteractionFragment[] = rooms
    ? [
        ...interactionsData,
        {
          id: 'endStream',
          type: InteractionType.EndStream,
          room: RoomType.Presentation,
          appearAt: rooms.maxDuration,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as InteractionFragment,
      ]
    : [];

  const interactions = rooms && allInteractions && dataFromInteractions(allInteractions, rooms);

  const index =
    playbackPosition && interactions && getLastInteractionIndex(interactions, playbackPosition);
  React.useEffect(() => {
    if (index !== undefined) {
      scrollToChildNode(index);
    }
  }, [index]);
  if (!rooms || !ewebinar || !ewebinar || !playbackPosition || !setPlaybackPosition) return null;
  return (
    <div ref={ref} className='p-6 overflow-auto overflow-x-hidden h-full'>
      {interactions &&
        interactions
          .filter((interaction: InteractionFragment) => {
            return (
              isEdit ||
              (interaction.appearAt !== undefined &&
                playbackPosition &&
                interaction.appearAt <= playbackPosition)
            );
          })
          .map((interaction: InteractionFragment, i: number) =>
            interaction ? (
              <InteractionCard
                key={i}
                isEdit={isEdit}
                isAttendee={isAttendee}
                active
                onClick={() => {
                  !isAttendee && setPlaybackPosition(interaction.appearAt);
                }}
                rooms={rooms}
                playbackPosition={playbackPosition || 0}
                interaction={interaction}
                startsAt={startsAt}
                ewebinarId={ewebinar.id}
                attendeeId={attendeeId}
              />
            ) : null
          )}
    </div>
  );
};

export default InteractionsStream;
