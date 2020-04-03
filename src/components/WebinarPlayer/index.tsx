import Loading from '@src/components/Loading';
import { AttendeeFragment, EWebinar, InteractionFragment, RoomType, useEwebinarQuery, useGetAttendeeQuery, useGetEwebinarInteractionsViewModeQuery, useUpdateStartTimeMutation } from '@src/fromBackend/schema';
import { withProperties } from '@src/utils/type';
import React from 'react';

import InteractionNotifications from './InteractionNotifications';
import InteractionsStream from './InteractionsStream';
import TimeFrameControl from './TimeFrameControl';
import Timeline from './Timeline';
import useVimeoPlayer from './useVimeoPlayer';
import ViewerCount from './ViewerCount';

export { default as Rooms, EwebinarRoom } from './Rooms';
export { RoomType } from '@src/fromBackend/schema';

import { GetEwebinarInteractionsQueryResult } from '@src/fromBackend/schema';
import ExitRoom from './ExitRoom';
import WaitingRoom from './WaitingRoom';
import Video from '@vimeo/player';
import Controls from './Controls';
import useDebouncedCallback from '@src/hooks/useDebouncedCallback';
import Rooms, { EwebinarRoom } from './Rooms';
import { css } from '@emotion/core';
import tw from 'tailwind.macro';
import UpdateStartTime from '@src/components/WebinarPlayer/UpdateStartTime';

export enum Mode {
  edit,
  replay,
  live,
}

interface UseEwebinarPlayerOptions {
  mode: Mode;
  ewebinarId?: EWebinar['id'];
  attendeeId?: AttendeeFragment['id'];
}

interface Props extends UseEwebinarPlayerOptions {
  children?: any;
}

interface WebinarPlayerContext {
  isBuffering: boolean;
  playbackPosition: number;
  mode: Mode;
  vimeoPlaybackPosition: number;
  ref: React.Ref<HTMLDivElement>;
  setPlaybackPosition: (seconds: number) => any;
  setIsPlaying: (isPlaying: boolean) => any;
  isPlaying: boolean;
  ewebinar?: EWebinar;
  attendee?: AttendeeFragment;
  startTime?: number;
  rooms?: Rooms;
  domain?: [number, number];
  interactions: GetEwebinarInteractionsQueryResult;
  player?: Video;
  setIsFullScreen: (isFullScreen: boolean) => any;
  isFullScreen: boolean;
  vimeoDuration?: number;
  duration?: number;
  currentRoom?: EwebinarRoom;
}
export const WebinarPlayerContext = React.createContext<
  WebinarPlayerContext | Partial<WebinarPlayerContext>
>({});

export function dataFromInteractions(
  interactions?: InteractionFragment[],
  rooms?: Rooms
): InteractionFragment[] {
  if (!interactions || !rooms) return [];
  const data = interactions
    .map((interaction) => {
      const room = rooms.getRoom(interaction.room);
      return {
        ...interaction,
        appearAt: room!.appearAt + interaction.appearAt,
      };
    })
    .sort((a: any, b: any) => a.appearAt - b.appearAt);

  return data;
}

const useWebinarPlayer = ({
  mode,
  attendeeId,
  ...props
}: UseEwebinarPlayerOptions): WebinarPlayerContext => {
  const attendeeQuery = useGetAttendeeQuery({
    skip: !props.ewebinarId,
    variables: {
      id: attendeeId!,
    },
  });
  const attendee =
    attendeeQuery.data && attendeeQuery.data ? attendeeQuery.data.attendee : undefined;

  const attendeeEwebinarId = attendee && attendee.ewebinar && attendee.ewebinar.id;

  const ewebinarId = props.ewebinarId || attendeeEwebinarId;

  const ewebinarQuery = useEwebinarQuery({
    variables: {
      id: ewebinarId!,
    },
    skip: !ewebinarId,
  });
  const ewebinar = ewebinarQuery.data && (ewebinarQuery.data.ewebinar as EWebinar);
  const interactions = useGetEwebinarInteractionsViewModeQuery({
    variables: {
      ewebinarId: `${ewebinarId!}`,
      attendeeId: attendeeId || '',
    },
  });

  const startTime = attendee && attendee.startTime;

  const rooms = React.useMemo(() => ewebinar && Rooms.create(ewebinar), [ewebinar, ewebinar]);
  const [playbackPosition = rooms ? rooms!.domain[0] : 0, setPlaybackPosition] = React.useState<number>();

  React.useEffect(() => {
    const newPlaybackPosition = (Date.now() - new Date(startTime).getTime()) / 1000;

    if (startTime) {
      setPlaybackPosition(newPlaybackPosition);
    }
  }, [startTime]);

  const [vimeoPlaybackPosition, setVimeoPlaybackPosition] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(mode === Mode.live);

  const vimeoVideoId = ewebinar && ewebinar.vimeoVideoId;
  const { ref, player } = useVimeoPlayer(vimeoVideoId, {
    controls: false,
  });

  const currentRoom =
    rooms && (rooms.getRoomAt(playbackPosition) || rooms.getRoom(RoomType.Waiting));

  const interval = React.useRef<any>();
  React.useEffect(() => {
    async function updatePlaybackPosition() {
      if (!isPlaying) return;

      if (currentRoom && currentRoom.type !== RoomType.Presentation) {
        setPlaybackPosition(playbackPosition + 1);
      }
    }

    interval.current = setInterval(updatePlaybackPosition, 1000);
    return () => clearInterval(interval.current);
  }, [isPlaying, mode, playbackPosition, currentRoom]);

  React.useEffect(() => {
    if (!player) return;

    if (currentRoom && currentRoom.type === RoomType.Presentation && isPlaying) {
      player.play();
    }

    if (currentRoom && currentRoom.type !== RoomType.Presentation) {
      player.pause();
    }

    if (!isPlaying) {
      player.pause();
    }
  }, [player, isPlaying, currentRoom]);
  const [isBuffering, setIsBuffering] = React.useState(false);

  React.useEffect(() => {
    if (!player) return;

    player.on('bufferend', () => {
      setIsBuffering(false);
    });

    player.on('bufferstart', () => {
      setIsBuffering(true);
    });

    return () => {
      player.off('bufferstart');
      player.off('bufferend');
    };
  }, [player]);

  React.useEffect(() => {
    if (!player) return;

    player.on('timeupdate', ({ seconds }) => {
      if (currentRoom && currentRoom.type === RoomType.Presentation) {
        setVimeoPlaybackPosition(seconds);
        setPlaybackPosition(currentRoom.appearAt + seconds);
      }
    });

    return () => {
      player.off('timeupdate');
    };
  }, [player, isPlaying, currentRoom]);

  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const vimeoDuration = ewebinar?.duration || 30 * 60;
  const setVimeoPlaybackPositionDebounced = useDebouncedCallback(
    async (vimeoPlaybackPosition: number) => {
      if (player && vimeoPlaybackPosition > 0 && vimeoPlaybackPosition <= vimeoDuration) {
        await player.setCurrentTime(vimeoPlaybackPosition);

        if (!isPlaying) {
          await player.play();
          await player.pause();
        }
      }
    },
    30
  );

  React.useEffect(() => {
    const pause = async () => {
      if (!isPlaying && player) {
        await player.pause();
      }
    };

    player && player.on('play', pause);

    return () => player && player.off('play', pause);
  }, [isPlaying, player]);

  const domain = rooms && rooms?.domain;

  const webinarPlayer = {
    ref,
    mode,
    domain,
    playbackPosition,
    vimeoPlaybackPosition,
    setPlaybackPosition: async (playbackPosition: number) => {
      const currentRoom = rooms?.getRoomAt(playbackPosition);
      setPlaybackPosition(playbackPosition);
      const presentationRoom = rooms?.getRoom(RoomType.Presentation);
      const vimeoPlaybackPosition = Math.max(1, playbackPosition - presentationRoom!.appearAt);
      setVimeoPlaybackPositionDebounced(vimeoPlaybackPosition);
      if (currentRoom && currentRoom.type === RoomType.Presentation) {
        setVimeoPlaybackPosition(vimeoPlaybackPosition);
      }
    },
    setIsPlaying,
    isPlaying,
    isBuffering,
    ewebinar,
    attendee,
    interactions,
    vimeoDuration,
    duration: (rooms && rooms.maxDuration) || 0,

    rooms,
    currentRoom,
    setIsFullScreen,
    isFullScreen,
    player,
  };

  return webinarPlayer;
};

const VimeoPlayer = () => {
  const { ref } = React.useContext(WebinarPlayerContext);

  return <div ref={ref} />;
};

const RoomSwitch: React.FC<{}> = () => {
  const { currentRoom } = React.useContext(WebinarPlayerContext);
  if (!currentRoom) return null;
  return (
    <div
      css={css`
        background: rgb(2, 0, 36);
        background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(20, 87, 101, 1) 100%);
      `}
      className='relative select-none h-full'
    >
      {currentRoom.type === RoomType.Waiting && (
        <div className='absolute w-full h-full'>
          <WaitingRoom />
        </div>
      )}
      {currentRoom.type === RoomType.Exit && (
        <div className='absolute w-full h-full'>
          <ExitRoom />
        </div>
      )}
      <div className={`h-full ${currentRoom.type !== RoomType.Presentation && 'opacity-0'}`}>
        <VimeoPlayer />
      </div>
    </div>
  );
};

const Player: React.FC<{}> = ({}) => {
  const { mode } = React.useContext(WebinarPlayerContext);
  return (
    <div className='relative '>
      {mode === Mode.live && (
        <>
          <InteractionNotifications />
          <Controls />
          <ViewerCount />
        </>
      )}

      {mode === Mode.replay && (
        <>
          <Controls />
          <TimeFrameControl />
        </>
      )}

      {mode == Mode.edit && (
        <>
          <Controls />
        </>
      )}

      <RoomSwitch />
    </div>
  );
};

const Left = ({ children }: { children: any }) => {
  const { mode } = React.useContext(WebinarPlayerContext);
  return (
    <div
      css={
        mode !== Mode.live &&
        css`
          max-height: 85vh;
        `
      }
      className='Left w-full border-r border-gray-1 h-full overflow-visible '
    >
      {children}
    </div>
  );
};

const Right = ({ children }: { children: any }) => {
  const { isFullScreen, mode } = React.useContext(WebinarPlayerContext);
  return !isFullScreen ? (
    <div
      className='Right w-96 flex flex-col relative max-h-full'
      css={
        mode !== Mode.live &&
        css`
          max-height: 85vh;
        `
      }
    >
      {children}
    </div>
  ) : null;
};

const WebinarPlayer: React.FC<Props> = ({ children, mode = Mode.live, ewebinarId, attendeeId }) => {
  const webinarPlayer = useWebinarPlayer({
    mode,
    ewebinarId,
    attendeeId,
  });
  const [updateStartTime] = useUpdateStartTimeMutation();

  if (attendeeId && !webinarPlayer.attendee) return <Loading query={webinarPlayer.attendee} />;
  if (!webinarPlayer.ewebinar) return <Loading query={webinarPlayer.ewebinar} />;
  // if (!webinarPlayer.vimeoDuration) return <Loading />;

  const onChangeStartTime = (delta: number) => {
    updateStartTime({
      variables: {
        id: attendeeId!,
        startTime: new Date(
          new Date(webinarPlayer.attendee!.startTime).getTime() - delta * 60 * 1000
        ),
      },
    });
  };

  return (
    <WebinarPlayerContext.Provider value={webinarPlayer}>
      <>
        <UpdateStartTime onChangeStartTime={onChangeStartTime} mode={mode} />
        <div
          className={`flex bg-white ${mode === Mode.live &&
            'h-screen items-stretch overflow-hidden'}`}
          css={
            mode !== Mode.live &&
            css`
              max-height: 85vh;
              ${tw`mx-48`}
            `
          }
        >
          {children}
        </div>
      </>
    </WebinarPlayerContext.Provider>
  );
};

export default withProperties(WebinarPlayer, {
  Right,
  Left,
  Timeline,
  Mode,
  Rooms,
  Player,
  InteractionsStream,
});
