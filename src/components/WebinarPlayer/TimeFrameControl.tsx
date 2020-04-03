import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Slider from '@src/components/ui/Slider';

import { WebinarPlayerContext } from '.';

const TimeFrameControlComponent = styled.div`
  position: absolute;
  transform: translateY(5px);
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const convertSecondsToFormatInput = (totalSeconds: number): string => {
  let hours: number | string = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes: number | string = Math.floor(totalSeconds / 60);
  let seconds: number | string = totalSeconds % 60;

  minutes = String(minutes).padStart(2, '0');
  hours = String(hours).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  if (parseInt(hours, 10) <= 0) {
    return `-${minutes}:${seconds}`;
  }
  return `-${hours}:${minutes}:${seconds}`;
};

const tipFormatter = (currentTime: number, duration?: number): string => {
  if (duration) {
    const leaveTime = duration - currentTime;
    if (leaveTime === 0) return '0';
    return convertSecondsToFormatInput(leaveTime);
  }
  return '';
};

const TimeFrameControl: FunctionComponent<{}> = () => {
  const webinarPlayer = React.useContext(WebinarPlayerContext);

  const totalTime: number = webinarPlayer && webinarPlayer.duration ? webinarPlayer.duration : 0;
  return (
    <TimeFrameControlComponent>
      <Slider
        tipFormatter={(currentTime: number) => tipFormatter(currentTime, totalTime)}
        value={webinarPlayer.playbackPosition}
        trackStyle={{
          background: '#39A1B2',
          height: 5,
          borderWidth: 0,
        }}
        railStyle={{
          height: 5,
          background: '#D4DDDD',
          borderWidth: 0,
        }}
        handleStyle={{
          background: '#39A1B2',
          borderWidth: 0,
        }}
        activeDotStyle={{
          background: '#39A1B2',
          borderWidth: 0,
        }}
        min={0}
        max={webinarPlayer.duration}
        onChange={webinarPlayer.setPlaybackPosition}
      />
    </TimeFrameControlComponent>
  );
};

export default TimeFrameControl;
