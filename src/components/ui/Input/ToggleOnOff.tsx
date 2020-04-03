import styled from '@emotion/styled';
import React, { useState } from 'react';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';

interface Props {
  leftLabel: string;
  rightLabel: string;
  checked: boolean;
  className?: string;
  onChange: (e: boolean) => any;
  optionInitChecked?: any; //inputValues boolean or undefined
}

const ToggleOnOff = styled(({ className, ...props }: Props) => {
  
  //inputValues boolean or undefined
  const setChecked = (inputValues: any, checked: boolean) => {
    if (inputValues) {
      return true;
    }
    return checked;
  };

  const inputValues = props.optionInitChecked || false;
  const checked = setChecked(inputValues, props.checked)
  const [isChecked, setIsChecked] = useState(checked);
  
  return (
    <Checkbox
      toggle
      checked={isChecked === true}
      onChange={() => {
        props.onChange(!isChecked);
        setIsChecked(!isChecked)
      }}
    />
  );
})``;

export default ToggleOnOff;
