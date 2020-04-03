import styled from "@emotion/styled"
import React from "react"

const Radio = styled(
  ({ className, value, label = "", onChange, defaultValue, ...props }: any) => {
    return (
      <label className={"label leading-tight " + className}>
        <input
          type="radio"
          value={value}
          className={"border-none cursor-pointer " + props.className}
          onChange={(e: any) => {
            onChange(e.target.value)
          }}
          {...props}
        />
        {label}
      </label>
    )
  }
)``

export default Radio
