import React, { useState } from 'react';
import styled from '@emotion/styled';

import 'rc-time-picker/assets/index.css';
import moment, { Moment } from 'moment';
import TimePicker from 'rc-time-picker';
import MultiInput from './MultiInput';
import { minutesToMoment, momentToMinutes } from '../../../utils/date';

const now = moment()
  .hour(0)
  .minute(0);

const TimePickerInput = ({ className, onChange, value, ...props }: any) => (
  <TimePicker
    {...props}
    defaultValue={now}
    format={'h:mm a'}
    use12Hours
    inputReadOnly
    className={`${className} mr-3`}
    popupClassName={className}
    showSecond={false}
    onChange={onChange}
    hideDisabledOptions
    value={value}
    allowEmpty={false}
  />
);

const StyledTimePicker = styled(TimePickerInput)`
  & .rc-time-picker-panel-inner {
    padding: 7px 0 7px 0;
    border: 1px solid #979797;
    height: 200px;
    overflow: hidden;
  }

  & .rc-time-picker-panel-input-wrap {
    display: none;
  }

  & .rc-time-picker-panel-select-option-selected {
    background-color: #f1f5f5;
    font-weight: normal;
  }

  & .rc-time-picker-clear,
  & .rc-time-picker-clear-icon:after {
    font-size: 15px;
  }

  & .rc-time-picker-panel-select {
    max-height: 200px;
    font-size: 15px;
    border-width: 0;
    color: #537175;
    font-weight: 300;
    text-transform: uppercase;
    > ul li {
      text-transform: uppercase;
      margin: 5px 0 7px 0;
      padding: 1 0 4px 1px;
    }
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  & .rc-time-picker-panel-input,
  & .rc-time-picker-input {
    height: 35px;
    border: 1px solid #a0aec0;
    cursor: pointer;
    text-align: center;
  }
  & i.rc-time-picker-clear-icon {
    display: none;
  }
`;

interface Props {
  value: number[];
  onChange: (value: number[]) => void;
}

const SpecificTimes: React.FC<Props> = (props: Props) => {
  const formatTime = (momentDate: Moment) => {
    return momentDate.format('hh:mm A');
  };

  const value = props.value || [];
  const [inputValue, setInputValue] = useState(value);
  const initialValues = inputValue.map((minutes: number) => minutesToMoment(minutes));

  const onChange = (dates: Moment[]) => {
    const minutes: number[] = dates.map((dt) => momentToMinutes(dt));
    setInputValue(minutes);
  };

  props.onChange(inputValue);

  return (
    <MultiInput
      format={formatTime}
      value={initialValues}
      onChange={onChange}
      input={StyledTimePicker}
      button='Add time'
    />
  );
};

export default SpecificTimes;
