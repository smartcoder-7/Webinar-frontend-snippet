import formatTimeInRoomSecs from '@src/utils/formatTimeInRoomSecs';
import React from 'react';

import Input from './index';

interface TimeElapsedProps {
  value?: any;
}

const TimeElapsed: React.FC<TimeElapsedProps> = (props: TimeElapsedProps) => {
  return <Input {...props} value={formatTimeInRoomSecs(props.value)} />;
};

export default TimeElapsed;
