import * as d3 from 'd3';
import React from 'react';

import { WebinarPlayerContext } from '..';
import Circles from './Circles';
import Cursor from './Cursor';
import RoomMarkers from './RoomMarkers';
import ScaleSlider from './ScaleSlider';
import useD3 from './useD3';

const height = 140;

import formatTimeInRoomSecs from '@src/utils/formatTimeInRoomSecs';

const TimelineTrackLabels = () => {
  const { zoomScale, zoom } = React.useContext(ZoomScaleProviderContext);

  const min = zoomScale!.domain()[0];

  const max = zoomScale!.domain()[1];

  return (
    <g>
      <text x={0} y={height - 15} fill={'#7C8A8D'} textAnchor='start'>
        {formatTimeInRoomSecs(min)}
      </text>
      <text x={zoom!.translateExtent()[1][0]} y={height - 15} fill={'#7C8A8D'} textAnchor='end'>
        {formatTimeInRoomSecs(max)}
      </text>
    </g>
  );
};

interface ZoomScaleProviderContext {
  zoom?: d3.ZoomBehavior<SVGSVGElement, any>;
  x?: d3.ScaleLinear<number, number>;
  zoomRef?: React.RefObject<SVGSVGElement>;
  zoomTransform?: d3.ZoomTransform;
  zoomScale?: d3.ScaleLinear<number, number> & d3.ZoomScale;

  height: number;
}
export const ZoomScaleProviderContext = React.createContext<ZoomScaleProviderContext>({
  height,
});
const ZoomScaleProvider = (props: { children: any; domain: [number, number] }) => {
  const { domain } = props;
  const [width, setWidth] = React.useState(10);
  const x = React.useMemo(
    () =>
      d3
        .scaleLinear()
        .domain(domain)
        .range([0, width]),
    [width, domain]
  );
  const zoom = React.useMemo(
    () =>
      d3
        .zoom<SVGSVGElement, any>()

        .scaleExtent([1, (width * 30) / x(domain[1])])
        .translateExtent([
          [0, 0],
          [width, 0],
        ])
        .extent([
          [0, 0],
          [width, 0],
        ]),
    [x, width]
  );

  const [zoomTransform, setZoomTransform] = React.useState<
    ZoomScaleProviderContext['zoomTransform']
  >();
  const zoomRef = useD3((root) => {
    zoom.on('zoom', () => {
      setZoomTransform(d3.event.transform);
    });
    root.attr('height', height).call(zoom);
    // .on('wheel.zoom', null);
    // .on('dblclick.zoom', null);

    setZoomTransform(d3.zoomTransform(root.node()));
    // .on('.zoom', null);
    // .on('click.zoom', null)
    // .on('dblclick.zoom', null);

    root.on('resize', () => {
      setWidth(root.node().getBoundingClientRect().width);
    });

    window.addEventListener('resize', () => {
      setWidth(root.node().getBoundingClientRect().width);
    });

    setWidth(root.node().getBoundingClientRect().width);
  });

  const zoomScale = zoomTransform ? zoomTransform!.rescaleX(x) : x;

  if (!zoom || !x || !zoomRef) return null;

  return (
    <ZoomScaleProviderContext.Provider
      value={{ zoom, x, zoomRef, zoomTransform, zoomScale, height }}
    >
      {props.children}
    </ZoomScaleProviderContext.Provider>
  );
};

const TimelineTrack = () => {
  const { zoomRef, zoom } = React.useContext(ZoomScaleProviderContext);

  return (
    <div className='relative' id='timelineTrack'>
      <svg ref={zoomRef} style={{ width: '100%', overflow: 'visible' }}>
        <TimelineTrackLabels />
        <g>
          <rect
            cursor='pointer'
            y={height / 4}
            x={0}
            height={height / 2}
            width={zoom!.translateExtent()[1][0]}
            fill={'#F1F5F5'}
          />
        </g>

        <svg style={{ width: '100%', overflow: 'hidden' }}>
          <RoomMarkers />
        </svg>
        <Circles />
        <Cursor />
        <TranslateSlider />
      </svg>
    </div>
  );
};

const TranslateSlider = () => {
  const { zoom, zoomRef, zoomTransform } = React.useContext(ZoomScaleProviderContext);

  const ref = useD3((root) => {
    const drag = d3
      .drag()
      .on('start', () => {})
      .on('drag', () => {
        const x = d3.event.x;

        // x && zoom && zoom!.translateTo && d3.select(zoomRef!.current).call(zoom!.translateTo, x);
        const zoomRoot = d3.select(zoomRef!.current);
        zoomRef! && zoomRoot && zoomRoot.call(zoom!.translateTo as any, x);
      })
      .on('end', (_: any) => {});

    root.call(drag);
  });

  const width = zoomTransform
    ? Math.max(1, zoom!.translateExtent()[1][0] / zoomTransform.k)
    : zoom!.translateExtent()[1][0];

  const x = zoomTransform ? (zoomTransform.x / zoomTransform.k) * -1 : 0;

  return (
    <g>
      <rect
        ref={ref}
        x={0}
        y={height - 10}
        width={zoom!.translateExtent()[1][0]}
        height={10}
        cursor={'grab'}
        fill={'#F1F5F5'}
      />
      <rect
        ref={ref}
        x={x}
        y={height - 10}
        width={width}
        height={10}
        rx={5}
        cursor={'grab'}
        fill={'#537175'}
      />
    </g>
  );
};

const Timeline = () => {
  const { domain } = React.useContext(WebinarPlayerContext);
  if (!domain) return null;
  return (
    <ZoomScaleProvider domain={domain}>
      <TimelineTrack />
      <ScaleSlider />
    </ZoomScaleProvider>
  );
};

export default Timeline;
