import Dropdown from './Dropdown';
import { WhenUnit } from '@src/fromBackend/schema';
import React from 'react';

interface Props {}

const options = [
  {
    value: WhenUnit.Minutes,
    text: 'Minutes',
  },
  {
    value: WhenUnit.Hours,
    text: 'Hours',
  },
  {
    value: WhenUnit.Days,
    text: 'Days',
  },
];

const TimeUnit: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <Dropdown ref={ref} options={options} {...props} />
));

export default TimeUnit;
