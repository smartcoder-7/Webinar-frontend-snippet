import React, { FunctionComponent } from "react"
import { css } from "@emotion/core"
import cn from "classnames"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: any
  onClick?: any
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  form?: string
}

const Button: FunctionComponent<ButtonProps> = props => {
  return (
    <button
      {...props}
      type={props.type || "button"}
      css={css`
        :disabled {
          opacity: 0.5;
        }
      `}
      className={cn(props.className, "appearence-none outline-none whitespace-no-wrap")}
    >
      {props.children}
    </button>
  )
}

export default Button
