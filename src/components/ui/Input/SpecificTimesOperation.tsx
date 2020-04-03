import React from 'react';
import styled from '@emotion/styled';

import 'rc-time-picker/assets/index.css';
import moment, { Moment } from 'moment';
import TimePicker from 'rc-time-picker';
import { capitalize } from '../../../utils/string';
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
    height: 30px;
    border: 1px solid #a0aec0;
    cursor: pointer;
    text-align: center;
  }
  & i.rc-time-picker-clear-icon {
    display: none;
  }
`;

interface TimeRangeProps {
  day: string;
  times: number[];
  onChange: (day: string, times: number[]) => void;
}

const TimeRangeInput: React.FC<TimeRangeProps> = (props: TimeRangeProps) => {
  const { day, times, onChange } = props;

  const startTime = (times?: number[]) => {
    if (!times || !times[0]) {
      return null;
    }
    return minutesToMoment(times[0]);
  };

  const endTime = (times?: number[]) => {
    if (!times || !times[1]) {
      return null;
    }
    return minutesToMoment(times[1]);
  };

  const onChangeStartMinutes = (startTime: Moment) => {
    const minutes = momentToMinutes(startTime);
    onChange(day, [minutes, times[1]]);
  };
  const onChangeEndMinutes = (endTime: Moment) => {
    const minutes = momentToMinutes(endTime);
    onChange(day, [times[0], minutes]);
  };
  const closeStartMinute = () => {
    if (times !== null && times[0] && times[1] && (times[0] > times[1])) {
      onChange(day, [times[1], times[1]])
    }
  }
  const closeEndMinute = () => {
    if (times !== null && times[0] && times[1] && (times[0] > times[1])) {
      onChange(day, [times[0], times[0]])
    }
  }


  return (
    <div className='flex items-center lg:w-9/12 md:w-11/12 justify-between mb-4'>
      <div className=''>{capitalize(day)}</div>
      <div className='justify-end'>
        <StyledTimePicker
          value={startTime(times)}
          onChange={(e: Moment) => onChangeStartMinutes(e)}
          onClose={closeStartMinute}
        />
        <span className='mr-4 text-base'>to</span>
        <StyledTimePicker 
          value={endTime(times)} 
          onChange={(e: any) => onChangeEndMinutes(e)}
          onClose={closeEndMinute} 
        />
      </div>
    </div>
  );
};

interface FrequencyProps {
  weekdays: { [day: string]: boolean };
  onChange: (weekdays: { [day: string]: boolean }) => void;
}

const JustInTimeHoursOfOperactionFrequencyInput: React.FC<FrequencyProps> = (
  props: FrequencyProps
) => {
  const { weekdays, onChange } = props;
  const onChangeCheck = (day: string, value: boolean) => {
    const days = { ...weekdays, ...{ [day]: value } };
    onChange(days);
  };
  return (
    <div className='flex flex-wrap lg:w-9/12 md:w-11/12 justify-between ml-1 mb-5 mt-6'>
      {Object.keys(weekdays).map((day: string, idx: number) => (
        <div key={idx} className='text-md text-gray-1 mr-2 flex'>
          <label className='flex flex-row leading-tight whitespace-no-wrap items-center'>
            <input
              name='checkbox'
              defaultChecked={weekdays[day]}
              type='checkbox'
              className='border-none cursor-pointer checkbox'
              onChange={(e: any) => onChangeCheck(day, e.target.checked)}
            />
            <label className='text-color-input text-xs ml-2'>{capitalize(day)}</label>
          </label>
        </div>
      ))}
    </div>
  );
};

enum Weekdays {
  Mon = 'mon',
  Tue = 'tue',
  Wed = 'wed',
  Thu = 'thu',
  Fri = 'fri',
  Sat = 'sat',
  Sun = 'sun',
}

interface HourOfOperation {
  day: Weekdays;
  times: number[];
}

interface OperactionProps {
  value: HourOfOperation[];
  weekdays: boolean[];
  onChange: (output: HourOfOperation[]) => void;
}

type HourOfOperationMap = { [day: string]: number[] };

const SpecificTimesOperation: React.FC<OperactionProps> = (props: OperactionProps) => {
  const { onChange } = props;
  const value = Array.isArray(props.value) ? props.value : [];

  const inputTimesMaps: HourOfOperationMap = {};
  value.forEach((input) => {
    inputTimesMaps[input.day] = input.times;
  });

  const weekdays = {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  };

  value.forEach((t: { day: Weekdays; times: number[] }) => {
    weekdays[t.day as Weekdays] = true;
  });

  const onTimeRangeChange = (day: string, times: number[]): void => {
    const hourOfOperationTime = { [day]: times };
    const hours: HourOfOperationMap = { ...inputTimesMaps, ...hourOfOperationTime };
    const hourOfOperactions = Object.keys(hours).map((day) => {
      return {
        day: day as Weekdays,
        times: hours[day],
      };
    });

    onChange(hourOfOperactions);
  };

  const onWeekdaysChange = (weekdays: { [day: string]: boolean }): void => {
    const hours = Object.keys(weekdays)
      .filter((day) => weekdays[day])
      .map((day) => {
        const times = inputTimesMaps[day] ? inputTimesMaps[day] : [];
        return { day: day as Weekdays, times };
      });
    onChange(hours);
  };

  const copyToAll = () => {
    const firstTime = value[0].times;
    const operationTime = [...value];
    operationTime.map((operation) => (operation.times = firstTime));
    onChange(operationTime);
  };

  return (
    <>
      <JustInTimeHoursOfOperactionFrequencyInput weekdays={weekdays} onChange={onWeekdaysChange} />
      {value.length > 1 && (
        <div
          className='float-right lg:mr-20 md:mr-16 md:pb-4 cursor-pointer text-blue-400'
          onClick={copyToAll}
        >
          Copy to all
        </div>
      )}
      {value.map((item: { day: string; times: number[] }) => (
        <TimeRangeInput key={item.day} onChange={onTimeRangeChange} {...item} />
      ))}
    </>
  );
};

export default SpecificTimesOperation;
