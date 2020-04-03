import styled, { StyledComponent } from "@emotion/styled"
import tw from "tailwind.macro"

const Text: StyledComponent<any, any, any> & any = styled.span`
  ${tw`font-normal antialiased font-body text-color-input`}
`

Text.title = styled(Text.withComponent("h1"))`
  ${tw`font-display font-light leading-none text-3xl`}
`

Text.headline = styled(Text.withComponent("h2"))`
  ${tw`font-display text-xl`}
`

Text.subhead = styled(Text.withComponent("h2"))`
  ${tw`text-lg`}
`

Text.subtitle = styled(Text.withComponent("h2"))`
  ${tw`font-display`}
`

Text.body = styled(Text.withComponent("span"))`
  ${tw`text-base`}
`

Text.note = styled(Text.withComponent("span"))`
  ${tw`text-sm font-display`}
`

export default Text
