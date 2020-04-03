import { withProperties } from "@src/utils/type"

import Button from "./Button"

import Analytics from "./Analytics"
import BlueText from "./BlueText"
import BlueRounded from "./BlueRounded"
import Submit from "./Submit"

export default withProperties(Button, {
  analytics: Analytics,
  blueText: BlueText,
  blueRounded: BlueRounded,
  submit: Submit,
})
