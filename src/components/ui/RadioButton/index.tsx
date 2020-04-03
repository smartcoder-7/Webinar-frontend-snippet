import React from "react"
import styled, { StyledComponent } from "@emotion/styled"
import { css } from "@emotion/core"
import tw from "tailwind.macro"

const RadioButton: StyledComponent<any, any, any> & any = styled(
  ({ className }) => (
    <div className={className}>
      <div
        className="radio"
        style={{
          background: "",
        }}
      />
    </div>
  )
)`
  ${tw`mr-2`}

  .radio {
    ${tw`rounded-full shadow h-5 w-5 bg-white border border-gray-1`};
  }

  *:checked + & > .radio {
    background: radial-gradient(
      circle farthest-side at center center,
      #39a1b2 0%,
      #39a1b2 60%,
      #39a1b2 60%,
      white 10%
    );
    ${tw`rounded-full shadow h-5 w-5 border-gray-1`}
  }
`

interface RadioButtonOptionProps {
  className?: string
}

RadioButton.Option = ({ className, ...props }: RadioButtonOptionProps) => (
  <input
    css={css`
      ${tw`hidden`}

      &:not(:checked) ~ * {
        ${tw`text-color-input`}
      }
    `}
    className={className}
    type="radio"
    {...props}
  />
)

export default RadioButton
