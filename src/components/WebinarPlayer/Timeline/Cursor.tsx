import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { navigate } from '@reach/router';
import { Input } from '@src/components/ui';
import { InteractionType } from '@src/fromBackend/schema';
import { ReactComponent as Tool } from '@src/images/tool.svg';
import * as d3 from 'd3';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import tw from 'tailwind.macro';

import { ZoomScaleProviderContext } from '.';
import { WebinarPlayerContext } from '..';
import { getCardBodyByType } from '../InteractionsStream/cards';
import useD3 from './useD3';

const InteractionTypeDropdownField = styled((props: { className?: string }) => {
  const { playbackPosition, currentRoom } = React.useContext(WebinarPlayerContext);

  const options = Object.values(InteractionType)
    .map((interactionType: string) => {
      const body = getCardBodyByType({ type: interactionType } as any);

      if (!body) return null;
      const { name } = body;

      return {
        value: interactionType,
        text: name,
        onClick: (_: any, { value: type }: { value: string }) =>
          currentRoom &&
          navigate(
            `./interactions/new?type=${type}&room=${currentRoom.type}&playbackPosition=${playbackPosition}`
          ),
      };
    })
    .filter((d) => !!d);
  return (
    <Input.dropdown
      {...props}
      css={css`
        &.dropdown {
          border-color: #39a1b2 !important;
          background: #39a1b2 !important;
        }

        &.dropdown {
          * {
            color: white !important;
          }
        }

        &.dropdown .menu {
          background: #39a1b2;
          border: #39a1b2 !important;
        }
        &.dropdown .menu > .item {
          color: white !important;
          border: #39a1b2 !important;
        }
      `}
      name='type'
      text='Add interaction'
      renderLabel={() => 'Add interaction'}
      options={options}
    />
  );
})`
  ${tw`border-none shadow-none`}

  &:focus {
    box-shadow: none !important;
    color: white !important;
  }
  * {
    box-shadow: none !important;
  }
`;

const Cursor = (_props: { isHidden?: boolean }) => {
  const { height, zoom, zoomScale, zoomRef } = React.useContext(ZoomScaleProviderContext);

  const { setPlaybackPosition, playbackPosition } = React.useContext(WebinarPlayerContext);
  const panelWidth = 180;
  const cursorWidth = 40;

  const [isDragging, setIsDragging] = React.useState(false);
  const timelineMenuRef = React.createRef<HTMLDivElement>();

  const ref = useD3<SVGSVGElement>(
    (root) => {
      if (ref && ref.current) {
        const dropdownNode = d3.select(timelineMenuRef.current);

        if (!isDragging) {
          const xOffset = (playbackPosition && zoomScale!(playbackPosition)) || 0;
          const width = zoom!.translateExtent()[1][0];

          if ((width && xOffset > width) || xOffset < 0) {
            dropdownNode.style('opacity', 0);
            root.style('opacity', 0);
          } else {
            dropdownNode.style('opacity', 1);
            root.style('opacity', 1);
          }

          root.raise().attr('x', `${xOffset - cursorWidth / 2}px`);
          dropdownNode.style('left', `${xOffset - panelWidth / 2}px`);
        }

        const updateCursorPosition = (xOffset: number) => {
          root.raise().attr('x', `${xOffset - cursorWidth / 2}px`);
          dropdownNode.style('left', `${xOffset - panelWidth / 2}px`);

          const appearAt = zoomScale!.invert(xOffset);
          setPlaybackPosition && appearAt && setPlaybackPosition(appearAt);
        };

        d3.select(zoomRef!.current).on('click.cursor', () => {
          var dimensions = zoomRef!.current!.getBoundingClientRect();
          const containerOffset = dimensions.left;
          const xOffset = d3.event.x - containerOffset;
          console.log({ x: d3.event.x, xOffset, zoomScale, scaled: zoomScale!.invert(xOffset) });
          updateCursorPosition(xOffset);
        });

        root.call(
          d3

            .drag<any, any, any>()
            .subject(() => playbackPosition && zoomScale!(playbackPosition))

            .on('start', (_) => {
              root.style('cursor', 'grabbing');
              setIsDragging(true);
            })
            .on('end', (_) => {
              root.style('cursor', 'grab');
              setIsDragging(false);
            })
            .on('drag', () => {
              // const node = root.node()
              // const xOffset = d3.mouse(node!)[0]

              const width = zoom!.translateExtent()[1][0];

              let xOffset = d3.event.x;
              if (width && xOffset > width) xOffset = width;
              if (xOffset < 0) xOffset = 0;

              updateCursorPosition(xOffset);
            })
        );
        // .on("start", d => circle.filter(p => p === d).raise().attr("stroke", "black"))
      }
    },
    [zoom, zoomScale, timelineMenuRef.current, playbackPosition, isDragging]
  );

  React.useEffect(() => {}, [playbackPosition, zoomScale, timelineMenuRef.current]);

  if (playbackPosition === undefined) return null;

  // const appearAt = Math.round(zoomScale.invert(Math.round(xOffset)))
  const el = document.getElementById('timelineTrack');
  return (
    <>
      <svg className='absolute overflow-visible top-0' width={zoom!.translateExtent()[1][0]}>
        <svg
          ref={ref}
          y={0}
          x={0 - cursorWidth / 2}
          width={cursorWidth}
          className='overflow-visible absolute top-0 relative pointer-events-all'
        >
          <rect y={0} height={height} x={0} width={cursorWidth} fill='transparent' />
          <rect y={0} height={height} x={cursorWidth / 2} width='3px' fill='#39a1b2' />
          <Tool y={height / 2 - 10} width={cursorWidth} alignmentBaseline='middle' />
        </svg>
      </svg>
      {el &&
        ReactDOM.createPortal(
          <div
            ref={timelineMenuRef}
            style={{ left: 0 - panelWidth / 2 }}
            className='overflow-visible z-50  absolute top-0  pointer-events-all'
          >
            <div
              className={`  shadow  rounded bg-blue-3  `}
              style={{ width: panelWidth, pointerEvents: 'all' }}
            >
              <InteractionTypeDropdownField />
            </div>
          </div>,
          el
        )}
    </>
  );

  // return (
  //   <div
  //     className='absolute w-full  top-0'
  //     css={[
  //       {
  //         height: `${height! - height! / 4}px `,
  //       },
  //     ]}
  //   >
  //     <div ref={ref} className='absolute w-full h-full '>
  //       <div className='cursorContainer absolute w-full h-full'>
  //         <div
  //           css={[
  //             {
  //               position: 'absolute',
  //               height: `${height! - height / 4}px`,
  //               bottom: `${height! / 4}px)`,
  //             },
  //           ]}
  //           className='cursor bg-blue-3 shadow w-1 z-30 flex flex-col justify-end items-center'
  //         >
  //           <div
  //             className={'  flex overflow-visible items-center justify-center'}
  //             css={{ height: height }}
  //           >
  //             <Tool />
  //           </div>
  //         </div>
  //       </div>

  //       <div
  //         className={`timelineMenu absolute z-50  shadow  rounded bg-blue-3  `}
  //         css={[
  //           {
  //             top: `-${height! / 4 - 10}px`,
  //             left: zoom!.translateExtent()[0][0] - panelWidth / 2,
  //             width: `${panelWidth}px`,
  //           },
  //         ]}
  //       >
  //         <InteractionTypeDropdownField
  //           onChange={(type: string) => {
  //             currentRoom &&
  //               navigate(
  //                 `./interactions/new?type=${type}&room=${currentRoom.type}&playbackPosition=${playbackPosition}`
  //               );
  //           }}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Cursor;
