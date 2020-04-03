import { css } from "@emotion/core"
// import { Form } from "@src/components/ui"
import { Input } from "@src/components/ui/Input"
import React from "react"
import tw from "tailwind.macro"

import MultiInput from "./MultiInput"

// have the calendarInput component at here
// when it is selected, pass the value to the bubble

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
      className="flex items-center w-full md:w-5/12"
    >
      <div className="w-full">
        <Input.calendarInput
          name="holidays"
          placeholder="Search for a holiday to add"
          {...props}
        />
      </div>
    </div>
  )
}

const SpecificTimesBlackout: React.FC<Props> = (props: any) => {
  const onChangeInput = (value: any) => {
    props.onChange(value)
  }

  return (
    <div className="w-full">
      <MultiInput
        format={(time: any) =>
          time ? <span>{time.toString().substring(4, 15)}</span> : null
        }
        onChangeInput={onChangeInput}
        input={SpecificTimesInput}
        {...props}
      />
    </div>
  )
}

export default SpecificTimesBlackout
