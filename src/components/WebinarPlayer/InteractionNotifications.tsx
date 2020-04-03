import React from 'react';

import InteractionNotify from '@src/components/Notification/Interaction';
import { WebinarPlayerContext } from '.';
interface Props {}

const InteractionNotifications: React.FC<Props> = () => {
  const { interactions, playbackPosition } = React.useContext(WebinarPlayerContext);
  if (!interactions || !interactions.data || !interactions.data.interactions) return null;
  return (
    <div className='z-10 absolute' style={{ right: '40px', top: '60px' }}>
      {interactions.data.interactions
        .filter((interaction: any) => {
          return (
            playbackPosition &&
            playbackPosition >= interaction.appearAt &&
            playbackPosition <= interaction.appearAt + 10
          );
        })
        .map((interaction: any) => (
          <InteractionNotify interaction={interaction} key={interaction.id} />
        ))}
    </div>
  );
};

export default InteractionNotifications;
