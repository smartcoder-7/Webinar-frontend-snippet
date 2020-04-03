import React from "react"
import Input from "./index"
import { css } from "@emotion/core"
// import tw from "tailwind.macro"
interface Props {
  value?: string
  onChange?: (e: any) => any
  className?: string
}

const isColor = (strColor: string = "") => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ""
}

const Color: React.FC<Props> = ({ ...props }: Props) => {
  console.log({ color: props.value })
  return (
    <Input as="div" {...props} className={props.className + " flex"}>
      <div
        className="rounded w-5 h-5 mr-2"
        css={
          isColor(props.value)
            ? css`
                background-color: ${props.value};
              `
            : css`
                background-image: linear-gradient(
                  45deg,
                  #e4e4e4 45%,
                  tomato 45%,
                  tomato 55%,
                  #e4e4e4 55%
                );
              `
        }
      />
      <input
        {...props}
        css={css`
          color: ${props.value};
        `}
        className="w-full appearance-none outline-none"
      />
    </Input>
  )
}

export default Color
