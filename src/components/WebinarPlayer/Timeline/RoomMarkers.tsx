import { RoomType } from '@src/fromBackend/schema';
import React from 'react';

import { EwebinarRoom, WebinarPlayerContext } from '..';
import { ZoomScaleProviderContext } from './';

const RoomMarkers = () => {
  const { rooms } = React.useContext(WebinarPlayerContext);
  const { zoomScale, x, height } = React.useContext(ZoomScaleProviderContext);
  x;
  if (!rooms) return null;
  console.log({ rooms });
  return (
    <g>
      {rooms!.map((room: EwebinarRoom, index: number) => (
        <>
          {room.type === RoomType.Presentation && (
            <rect
              x={room && zoomScale!(room.appearAt)}
              y={height / 4}
              height={height / 2}
              width={room && zoomScale!(rooms[index + 1].appearAt) - zoomScale!(room.appearAt)}
              fill={'#D4DDDD'}
            />
          )}
          <rect
            key={index}
            x={zoomScale!(room.appearAt)}
            y={height / 4}
            height={height / 2}
            width={1}
            fill={'#7C8A8D'}
          />
        </>
      ))}
      {rooms.map((room: EwebinarRoom, index: number) => (
        <text
          key={index}
          textAnchor='middle'
          alignmentBaseline='middle'
          x={
            zoomScale
              ? zoomScale(room.appearAt! + room.duration / 2)
              : x!(room.appearAt! + room.duration / 2)
          }
          y={height! / 8}
          textRendering='geometricPrecision'
          fill={'#7C8A8D'}
          fontSize={14}
        >
          {room.title}
        </text>
      ))}
    </g>
  );
};

export default RoomMarkers;
