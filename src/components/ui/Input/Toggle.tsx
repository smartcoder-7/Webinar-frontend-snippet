import React from 'react'
import styled from "@emotion/styled"
import tw from "tailwind.macro"

interface Props {
  leftLabel: string
  rightLabel: string
  value: boolean
  className?: string
  onChange: (value: boolean) => any
}

const Toggle = styled(({ className, ...props }: Props) => {
  return (
    <label className={className}>
      <span className="right">{props.leftLabel}</span>
      <input
        type="checkbox"
        className="input"
        checked={props.value}
        onChange={(e: any) => {
          props.onChange(e.target.checked)
        }}
      />
      <div className="switch">
        <span className="circle" />
      </div>
      <span className="left">{props.rightLabel}</span>
    </label>
  )
})`
  ${tw`inline-flex items-center select-none cursor-pointer`}

  .left,.right {
    ${tw`text-gray-1 text-sm `}
  }

  .input {
    ${tw`h-0 w-0 invisible`}
  }

  .switch {
    padding-right: 1px;
    transition: background-color;
    ${tw`flex-shrink-0 rounded-full  flex items-center bg-gray-1 cursor-pointer h-6 w-10 mx-2`}
  }

  .circle {
    ${tw`rounded-full w-5 h-5 shadow-inner bg-white shadow-md`}
    transform: scale(0.9);
    transition: margin-left 0.3s;
    margin-left: 2%;
  }

  input:checked + .switch .circle {
    transition: all 0.3s;
    margin-left: 46%;
  }

  input:checked + .switch {
    ${tw`bg-blue-3`} 
  }
`

export default Toggle
