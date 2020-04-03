import React from "react"
import styled from "@emotion/styled"
import tw from "tailwind.macro"
import { withProperties } from "@src/utils/type"
import RadioButton from "@src/components/ui/RadioButton"
import Text from "@src/components/ui/Text"
import { SendBy } from "@src/fromBackend/schema"

interface OptionsProps {
  value: string
  label: string
}

const byOptions: Array<OptionsProps> = [
  { value: SendBy.Email,  label: "Email" },
  { value: SendBy.Sms, label: "SMS" },
]

const Option = styled(({ className, option, value, ...props }: any) => (
  <label className={"pr-6 " + className}>
    <div className="flex items-center">
      <RadioButton.Option
        value={option.value}
        defaultChecked={value === option.value}
        name="sendBy"
        {...props}
      />
      <RadioButton />
      <Text.body className="text-md">{option.label}</Text.body>
    </div>
  </label>
))`
  input:checked ~ * {
    ${tw`text-teal-2`}
  }
`

interface SendBySelectorProps {
  value: boolean
  fieldLabel: any
  props: any
}

const SendBySelector = styled(
  React.forwardRef(
    ({ fieldLabel, value, ...props }: SendBySelectorProps, ref) => {
      return (
        <div className="pb-6">
          {fieldLabel}
          <div className="flex">
            {byOptions.map(byOption => (
              <Option
                key={byOption.value}
                value={value}
                option={byOption}
                ref={ref}
                {...props}
              />
            ))}
          </div>
        </div>
      )
    }
  )
)``

export default withProperties(SendBySelector, { byOptions })
