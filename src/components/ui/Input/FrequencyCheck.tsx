// import styled from "@emotion/styled"
import React, { useState } from 'react';

// import Dropdown from './Dropdown';
import { Input, Form } from '@src/components/ui';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  value: any;
}

const frequencyOfWeek = [
  { value: 'individual', text: "Selected days of the week" },
  { value: 'all', text: "Everyday" },
  { value: 'weekdays', text: "Weekdays" },
];
const daysCheck = [
  { option: 'Mon', value: 'Mon' },
  { option: 'Tue', value: 'Tue' },
  { option: 'Wed', value: 'Wed' },
  { option: 'Thu', value: 'Thu' },
  { option: 'Fri', value: 'Fri' },
  { option: 'Sat', value: 'Sat' },
  { option: 'Sun', value: 'Sun' },
];
// the checkbox need a label
const FrequencyCheck: React.FC<Props> = ({ name, ...props }) => {
  const { setValue } = useFormContext();
  const [isDisable, setIsDisable] = useState(false);

  const initOptionCheck = props.value || [true, true, true, true, true, true, true];
  const [optionCheck, setOptionCheck] = useState(initOptionCheck);

  if (!props.value) {
    optionCheck.map((val: boolean, index: number) => setValue(`${name}.${index}`, val))
    
  }

  const setValueSelected = (optionCheck: boolean[], disabled: boolean) => {
    optionCheck.map((val, index) => setValue(`${name}.${index}`, val));
    setOptionCheck(optionCheck);
    setIsDisable(disabled);
    setValue(name, optionCheck);
  }

  const setValueChecked = (value: boolean, index: number) => {
    const checked = [...optionCheck];
    checked[index] = value;
    setOptionCheck(checked)
    setValue(name, checked);
  }

  const handleDropdown = (value: any) => {
    switch (value) {
      case 'all':
        setValueSelected([true, true, true, true, true, true, true], true)
        break;
      case 'weekdays':
        setValueSelected([true, true, true, true, true, false, false], true)
        break;
      default:
        setValueSelected([false, false, false, false, false, false, false], false)
        break;
    }
  }

  return (
    <div className='mb-6'>
      <Input.dropdown
        placeholder="Selected days of the week"
        options={frequencyOfWeek}
        onChange={handleDropdown}
      />

      {/* <Checkbox /> */}
      <div className='flex flex-wrap w-full justify-between ml-1'>
        {daysCheck.map((day, index) => (
          <div key={day.value} className='text-md text-gray-1 mr-2 flex'>
            <Form.Field.Input
              name={`${name}.${index}`}
              component={Input.checkbox}
              className='flex flex-no-wrap mt-3 checkbox'
              label={<label className='text-color-input text-xs ml-2'>{day.option}</label>}
              disabled={isDisable}
              onChange={(checked: boolean) => setValueChecked(checked, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequencyCheck;
