// import { css } from "@emotion/core"
// import { ReactComponent as PlayButton } from "@src/images/playButton.svg"
import { withProperties } from '@src/utils/type';
import { default as Video, Options } from '@vimeo/player';
import React from 'react';
//import Loading from '@src/components/Loading'

interface VimeoPlayerOptions extends Options {}

const useVimeoPlayer = (videoId: number, options?: VimeoPlayerOptions) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [player, setPlayer] = React.useState<Video>();

  React.useEffect(() => {
    if (ref.current) {
      const player = new Video(ref.current, {
        id: videoId,
        responsive: true,
        title: false,
        portrait: false,
        byline: false,
        ...(options || {}),
      });
      setPlayer(player);
    }
  }, [videoId, ref.current]);

  return { ref, player };
};

export interface PlayerContext {
  duration?: number;
  isPaused?: boolean;
  currentTime?: number;
  ref?: any;
  player?: Video;
  setCurrentTime?: (time: number) => void;
}
export const Context = React.createContext<PlayerContext>({});

const Player: React.FC<{}> = () => {
  const { ref } = React.useContext(Context);

  return <div className='w-full h-full bg-black' ref={ref} />;
};

/* <VimeoPlayerProvider>
  <VimeoPlayer />
</VimeoPlayerProvider> */

interface VideoProps {
  videoId: number;
  controls?: boolean;
  autoPlay?: boolean;
  children?: any;
  startPosition?: number;
}

const VimeoPlayer = ({ videoId, children, controls }: VideoProps) => {
  const { ref, player } = useVimeoPlayer(videoId, { controls: !!controls });
  const [duration, setDuration] = React.useState<number>(60 * 45);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [isPaused, setIsPaused] = React.useState(true);

  React.useEffect(() => {
    async function setPlayerInfo(): Promise<void> {
      if (!player) return;

      const duration = await player.getDuration();
      const currentTime = await player.getCurrentTime();
      setDuration(duration);
      setCurrentTime(currentTime);
    }

    if (player) {
      player.on('play', () => {
        setIsPaused(false);
      });

      player.on('timeupdate', (time: { duration: number; seconds: number }) => {
        setDuration(time.duration);
        setCurrentTime(time.seconds);
      });

      player.on('pause', () => {
        setIsPaused(true);
      });

      player.on('loaded', () => {
        setPlayerInfo();
      });
    }
  }, [player]);

  const value = { ref, player, duration, isPaused, currentTime, setCurrentTime };

  return <Context.Provider value={value}>{children || <Player />}</Context.Provider>;
};

export default withProperties(VimeoPlayer, { Player, Context });
