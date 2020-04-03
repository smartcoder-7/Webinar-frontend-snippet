import { css } from "@emotion/core"
import { Input } from "@src/components/ui/Input"
import React from "react"
import tw from "tailwind.macro"

import MultiInput from "./MultiInput"

// the value of the option needs to be modify based on the setting of the form
const holidayBlackout = [
  { value: "NEW YEAR's Day", option: "NEW YEAR's Day" },
  { value: "Family Day", option: "Family Day" },
  { value: "Good Friday", option: "Good Friday" },
  { value: "Canada Day", option: "Canada Day" },
  { value: "Labour Day", option: "Labour Day" },
  { value: "Christmas Day", option: "Christmas Day" },
]

interface Props {}

interface SpecificTimesInputValue {
  date: any
}

const SpecificTimesInput = ({
  ...props
}: {
  onChange: (value: SpecificTimesInputValue) => SpecificTimesInputValue
  value: SpecificTimesInputValue
}) => {
  return (
    <div
      css={css`
        & > * {
          ${tw`mx-2`}
        }
        & > *:first-of-type {
          ${tw`ml-0`}
        }
      `}
      className="flex items-center w-full md:w-7/12"
    >
      <div className="w-full">
        <Input.dropdown
          name="holidays"
          options={holidayBlackout}
          placeholder="Search for a holiday to add"
          {...props}
        />
      </div>
    </div>
  )
}

const HolidayBlackout: React.FC<Props> = (props: any) => {
  const onChangeInput = (value: any) => {
    props.onChange(value)
  }

  return (
    <div className="w-full">
      <MultiInput
        format={(time: any) => (time ? <span>{time.toString()}</span> : null)}
        onChangeInput={onChangeInput}
        input={SpecificTimesInput}
        {...props}
      />
    </div>
  )
}

export default HolidayBlackout
