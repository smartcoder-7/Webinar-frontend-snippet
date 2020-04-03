import { withProperties } from "@src/utils/type"
import Dropdown from "./Dropdown"
import React from "react"

interface Props {}

const options = [
  {
    value: "Sans-serif",
    option: "Sans-serif",
  },
  {
    value: "Bold",
    option: "Bold",
  },
]

const Font: React.FC<Props> = props => <Dropdown {...props} options={options} />

const registerOptions = {
  validate: (value: any) => {
    const isValid = options.some((option: any) => option.value === value)

    return isValid
  },
}

export default withProperties(Font, { registerOptions })
