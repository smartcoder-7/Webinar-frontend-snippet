import React, { FunctionComponent, useState, useEffect } from "react"
import Calendar from "react-calendar"
import { css } from "@emotion/core"
import { Text } from "@src/components/ui"
import moment from "moment"
import { Dropdown } from "@src/components/ui/"
import RadioButton from "@src/components/ui/RadioButton"

const momentFormat: FunctionComponent<any> = date => date.format("MMMM Do YYYY")
const isTrue = (str: any) => str == "true"

const DropdownReference: FunctionComponent<{
  enabled: Boolean
  label?: string
  className?: string
  value: Date
}> = ({ enabled, value, label, className }) => (
  <div className={`flex flex-grow items-center px-3 py-2 border border-gray-500 rounded ${className}`}>
    <img
      className="w-5 h-5"
      src={require("@src/images/bitmap-opacity-100.png")}
      alt="calender"
    />{" "}
    { label && <Text className="ml-2">{label}</Text> }
    <Text.body
      css={css`
        color: #39a1b2;
      `}
      className="mx-2 text-sm font-medium"
    >
      {(!enabled && "Disabled") ||
        (value && momentFormat(moment(value))) ||
        "Enter date"}
    </Text.body>
    <Text.body className="text-gray-400 text-sm font-medium">
      {value &&
        momentFormat(moment(value)) === momentFormat(moment()) &&
        "*Today*"}
    </Text.body>
  </div>
)

const Option = ({ className, option, value, onChange }: any) => {
  return (
    <label className={className}>
      <div className="flex items-center my-2">
        <RadioButton.Option
          value={option}
          checked={value == option}
          onChange={onChange}
        />
        <RadioButton />
        <Text.body className="text-sm ml-1 mr-3">
          {(!option && "Never") || "End on"}
        </Text.body>
      </div>
    </label>
  )
}

interface CalendarInputProps {
  value: any;
  onChange?: any;
  toggle?: any;
  label: any;
  className: any;
  minDate: any;
  maxDate: any; 
  closeOnSelect: any;
  checked?: boolean;
}

const CalendarInput = ({ value, onChange, toggle, label, className, minDate, maxDate, closeOnSelect, checked }: CalendarInputProps) => {
  
  const initValueEnable = (checked: any) => {
    if (checked !== undefined) {
      return checked;
    }
    return true as any;
  };

  const [enabled, setEnabled] = useState(initValueEnable(checked));
  const [stateValue, setStateValue] = useState(value);

  const handleChange = (event: any) => {
    let value = isTrue(event.target.value);
    setEnabled(value);
  }

  const CalendarOnChange = (e: any) => {
    setStateValue(e);
  }
  
  useEffect(() => {
    toggle !== undefined && checked !== undefined 
      ? onChange({value: stateValue, checked: enabled, toggle}) 
      : onChange(stateValue)
  },[stateValue, enabled]);

  return (
    <div>
      <div className="flex">
        {toggle &&
          [false, true].map((item, index) => (
            <Option
              key={index}
              className="mr-1 mb-1"
              value={enabled}
              option={item}
              onChange={handleChange}
            />
          ))}
      </div>
      <Dropdown closeOnSelect={closeOnSelect === undefined ? true : closeOnSelect}>
        <Dropdown.Reference>
          <DropdownReference enabled={enabled} value={stateValue} label={label} className={className}/>
        </Dropdown.Reference>
        { enabled && (
          <Dropdown.Options>
            <Calendar className="border-none" minDate={minDate} maxDate={maxDate} onClickDay={CalendarOnChange} />
          </Dropdown.Options>
        )}
      </Dropdown>
    </div>
  )
}

export default CalendarInput
