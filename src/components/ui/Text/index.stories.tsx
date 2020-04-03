import React from "react"
import Text from "./"

export default { title: "UI/Text", component: Text }

export const text = () => <Text>Lorem ipsum dolor sit amet</Text>

export const title = () => <Text.title>Lorem ipsum dolor sit amet</Text.title>
export const headline = () => (
  <Text.headline>Lorem ipsum dolor sit amet</Text.headline>
)
export const subhead = () => (
  <Text.subhead>Lorem ipsum odlor sit amet</Text.subhead>
)
export const subtitle = () => (
  <Text.subtitle>Lorem ipsum dolor sit amet</Text.subtitle>
)
export const body = () => (
  <Text.body>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores provident
    rerum quaerat inventore, laborum cupiditate praesentium error mollitia in
    suscipit aliquam. Laboriosam iusto accusamus repudiandae tempora eos fugit
    esse praesentium.
  </Text.body>
)
export const note = () => (
  <Text.note>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores provident
    rerum quaerat inventore
  </Text.note>
)
