import { css } from '@emotion/core';
import { InteractionFragment } from '@src/fromBackend/schema';
import { navigate } from '@reach/router';
import React from 'react';

import { dataFromInteractions, WebinarPlayerContext } from '..';
import { ZoomScaleProviderContext } from './';
import { getCardBodyByType } from '../InteractionsStream/cards';

interface TrackItem {
  appearAt: number;
  count?: number;
}

const useDataPoints = <T extends TrackItem & InteractionFragment>(
  data?: T[]
): (T & TrackItem)[] => {
  const { zoomScale, x, zoom } = React.useContext(ZoomScaleProviderContext);
  if (!data) return [];
  return data
    .map((d) => {
      return Object.assign({}, d, {
        appearAt: (zoomScale ? zoomScale(d.appearAt) : x!(d.appearAt)) as number,
      });
    })
    .map<T>((d) => {
      const count = d.count || 1;
      if (d.appearAt < 0)
        return {
          ...d,
          appearAt: 0,
          count,
        };

      const width = zoom!.translateExtent()[1][0];
      if (d.appearAt > width)
        return {
          ...d,
          appearAt: width,
          count,
        };

      return d;
    })
    .reduce<T[]>((mergedData, d) => {
      const previousIndex = mergedData.length - 1;
      const previous = mergedData[previousIndex];

      const distance = previous && d.appearAt - previous.appearAt;

      if (previous && distance < 20) {
        const count = previous.count ? previous.count + 1 : 2;

        return mergedData.slice(0, mergedData.length - 1).concat({
          ...previous,
          count,
        });
      }

      return mergedData.concat(d);
    }, []);
};

const Circles = () => {
  const { height } = React.useContext(ZoomScaleProviderContext);
  const { interactions, rooms, currentRoom } = React.useContext(WebinarPlayerContext);
  const r = 20;
  const data = useDataPoints(
    dataFromInteractions(
      rooms && interactions && interactions.data && interactions.data.interactions,
      rooms
    )
  ).map((interaction) => {
    const body = getCardBodyByType(interaction) || {};
    return {
      ...interaction,
      icon: body.icon,
    };
  });
  return (
    <g
      cursor='pointer'
      css={css`
        .icon * {
          fill: #7c8a8d !important;
        }
      `}
    >
      {data &&
        data.map((d) =>
          d.appearAt >= 0 ? (
            <g
              onClick={() => {
                !d.count && currentRoom && navigate(`./interactions/${d.id}`);
              }}
              cursor='pointer'
              key={d.appearAt}
            >
              <circle
                css={css`
                  &:hover {
                    filter: grayscale(100%) sepia(100%);
                  }
                `}
                cy={height / 2}
                cx={d.appearAt}
                stroke='#7C8A8D'
                fill={'white'}
                r={r}
              />

              {d.count ? (
                <text
                  y={height / 2}
                  x={d.appearAt}
                  stroke='#7C8A8D'
                  fill={'#7C8A8D'}
                  textAnchor='middle'
                  alignmentBaseline='middle'
                  children={d.count}
                />
              ) : (
                React.cloneElement(d.icon || <svg />, {
                  height: r,
                  width: r,
                  alignmentBaseline: 'central',
                  y: height! / 2 - r / 2,
                  x: d.appearAt - r / 2,
                  className: 'icon',
                })
              )}
            </g>
          ) : null
        )}
    </g>
  );
};

export default Circles;
