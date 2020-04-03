import { Options, default as Player } from '@vimeo/player';
import React from 'react';

interface VimeoPlayerOptions extends Options {}

function useVimeoPlayer(
  videoId?: number | null,
  options?: VimeoPlayerOptions
): { ref: React.Ref<HTMLDivElement>; player: Player | undefined } {
  const ref = React.useRef<HTMLDivElement>(null);
  const [player, setPlayer] = React.useState<Player>();

  React.useEffect(() => {
    if (ref.current && videoId) {
      const player = new Player(ref.current, {
        id: videoId,
        responsive: true,
        title: false,
        portrait: false,
        autopause: false,
        byline: false,
        ...(options || {}),
      });
      setPlayer(player);
    }
  }, [videoId, ref.current]);

  return { ref, player };
}
export default useVimeoPlayer;
