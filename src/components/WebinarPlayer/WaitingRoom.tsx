import { css } from '@emotion/core';
import { RoomType } from '@src/fromBackend/schema';
import formatSeconds from '@src/utils/formatSeconds';
import React from 'react';

import { WebinarPlayerContext } from '.';
import usePreserveAspectRatio from './usePreserveAspectRatio';

const WaitingRoom: React.FC<{}> = () => {
  const { ewebinar, playbackPosition, rooms } = React.useContext(WebinarPlayerContext);
  if (!ewebinar || !ewebinar || playbackPosition === undefined || !rooms) return null;
  const presentationRoom = rooms.getRoom(RoomType.Presentation);
  if (!presentationRoom) return null;
  const presentationCountdown = playbackPosition - presentationRoom.appearAt;
  const preserveAspectRatio = usePreserveAspectRatio();
  return (
    <div
      css={css`
        background: rgb(2, 0, 36);
        background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(20, 87, 101, 1) 100%);
      `}
      className='Waiting  w-full h-full '
    >
      <div
        className=' flex w-full h-full flex-col items-center justify-center text-white text-lg absolute z-30 top-0 left-0'
        ref={preserveAspectRatio.ref}
        style={preserveAspectRatio.style}
      >
        <div className='logo w-16 absolute bottom-0 left-0 m-4' />
        <div className='GoingLive text-coral-1  flex items-center my-6'>
          <div
            css={{ borderRadius: '100%' }}
            className='w-2 h-2 flex-1 flex-shrink-0 inline-block bg-coral-1 border border-white mr-2'
          />
          Going live in...
        </div>
        <div className='Countdown text-5xl'>{formatSeconds(presentationCountdown * -1)}</div>
        <div className='Title text-lg w-128 text-center my-6'>{ewebinar.title}</div>
      </div>
    </div>
  );
};

export default WaitingRoom;
