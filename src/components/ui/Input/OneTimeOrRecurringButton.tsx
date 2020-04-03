import React, { useState } from "react"

import { Text } from "@src/components/ui"
import RadioButton from "@src/components/ui/RadioButton"
import { useFormContext } from "react-hook-form"

const isTrue = (str: any) => str === "true"

const Option = ({ className, option, value, onChange }: any) => (
  <label className={className}>
    <div className="flex items-center my-2 mr-2">
      <RadioButton.Option
        value={option}
        checked={value == option}
        onChange={onChange}
      />
      <RadioButton />
      <Text.body className="text-sm ml-1 mr-3">
        {(!option && "Recurring") || "One time event"}
      </Text.body>
    </div>
  </label>
)

const OneTimeOrRecurringButton = ({ name, onChange }: any) => {
  const { getValues } = useFormContext()
  const [enabled, setEnabled] = useState(getValues()[name])

  const handleChange = (event: any) => {
    let value = isTrue(event.target.value)
    setEnabled(value)
    onChange(value)
  }

  return (
    <div>
      <div className="flex">
        {[false, true].map((item, index) => (
          <Option
            key={index}
            className="mr-1 mb-1"
            value={enabled}
            option={item}
            onChange={handleChange}
          />
        ))}
      </div>
      {/* the content decided by the radio button */}
    </div>
  )
}

export default OneTimeOrRecurringButton
