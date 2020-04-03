import React, { FunctionComponent, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis } from 'recharts';
import { analyticsSectionType } from '@src/utils/enumAnalytics';
import { Context, AnalyticsState } from '../';

import { WebinarPlayerContext } from '@src/components/WebinarPlayer';
const ChartComponent = styled.div`
  ${tw`absolute inset-0 z-50`};

  display: flex;
  .content {
    flex: 1;
    background: rgba(9, 9, 9, 0.7);
  }
  .line {
    position: absolute;
    width: 2px;
    background: #fff;
    top: 0;
    bottom: 0;
    left: 0%;
    transform: translateX(-1px);
  }
`;

const CustomTooltipComponent = styled.div`
  pointer-events: none;
  padding: 5px 10px;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  color: white;
  z-index: 10;
  opacity: 0;
  border-radius: 4px;
  transform: translate(-50%, -50px);
`;

const getColor = (key: string): string => {
  switch (key) {
    case 'replayWatched':
    case 'reactions':
      return '#E47D76';
    default:
      return '#4EB3B9';
  }
};

const AnalyticsChart: FunctionComponent<{}> = () => {
  const webinarPlayer = React.useContext(WebinarPlayerContext);
  const analyticsChartRef = useRef<HTMLDivElement>(null);
  const toolTipRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<LineChart>(null);
  const { currentSection, data } = React.useContext<AnalyticsState>(Context);
  const customMouseOver = useCallback(
    (e: any) => {
      if (!toolTipRef.current) return;
      let x = Math.round(e.cx);
      let y = Math.round(e.cy);
      const color = getColor(e.dataKey);
      toolTipRef.current.style.opacity = '1';
      toolTipRef.current.style.left = `${x}px`;
      toolTipRef.current.style.top = `${y}px`;
      toolTipRef.current.style.background = color;
      toolTipRef.current.innerHTML = e.payload[e.dataKey];
      analyticsChartRef.current!.style.cursor = 'pointer';
    },
    [toolTipRef.current]
  );
  const over = useCallback(() => {
    if (!toolTipRef.current) return;
    toolTipRef.current.style.opacity = '0';
    analyticsChartRef.current!.style.cursor = 'default';
  }, [toolTipRef.current]);

  const currentTime = webinarPlayer.vimeoPlaybackPosition || 0;
  if (
    [analyticsSectionType.ATTENDANCE, analyticsSectionType.ENGAGEMENT].indexOf(currentSection) ===
    -1
  )
    return null;

  if (!webinarPlayer || !webinarPlayer.duration) return null;
  const timeFramePosition = (currentTime / (webinarPlayer ? webinarPlayer.duration : 0)) * 100;
  const allLineProps = {
    activeDot: {
      onMouseOver: customMouseOver,
      onMouseLeave: over,
      onClick: (e: any) => {
        webinarPlayer.setPlaybackPosition && webinarPlayer.setPlaybackPosition(e.payload.timeframe);
      },
      r: 6,
      stroke: 'transparent',
      strokeWidth: 0,
      cursor: 'pointer',
    },
    strokeWidth: 2,
    stroke: '#4EB3B9',
    xAxisId: 'timeFrame',
    dot: {
      stroke: 'transparent',
      strokeWidth: 0,
      r: 0,
    },
  };
  const lines =
    currentSection === analyticsSectionType.ATTENDANCE
      ? [
          <Line
            key='liveAttendance'
            dataKey='liveAttendance'
            yAxisId='liveAttendance'
            {...allLineProps}
          />,
          <Line
            key='replayWatched'
            dataKey='replayWatched'
            yAxisId='replayWatched'
            {...allLineProps}
            stroke='#E47D76'
          />,
        ]
      : [
          <Line
            key='interactions'
            dataKey='interactions'
            yAxisId='interactions'
            {...allLineProps}
          />,
          <Line
            key='reactions'
            dataKey='reactions'
            yAxisId='reactions'
            {...allLineProps}
            stroke='#E47D76'
          />,
        ];
  const chartData = (data && data.chartData ? data.chartData : []).map((item: any) => ({
    ...item,
    timeFrame: (item.timeFrame * (webinarPlayer.duration || 600)) / 600,
  }));
  return (
    <ChartComponent ref={analyticsChartRef}>
      <div className='w-full h-full relative content'>
        <div className='line' style={{ left: `${timeFramePosition}%` }} />
        <ResponsiveContainer>
          <LineChart
            ref={chartRef}
            data={chartData}
            margin={{ top: 30, left: 0, right: 0, bottom: 0 }}
          >
            <Tooltip cursor={false} wrapperStyle={{ display: 'none' }} />
            {lines}
            <XAxis xAxisId='timeFrame' dataKey='timeFrame' type='number' hide />
          </LineChart>
        </ResponsiveContainer>
        <CustomTooltipComponent ref={toolTipRef} />
      </div>
    </ChartComponent>
  );
};

export default AnalyticsChart;
