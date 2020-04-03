import styled from "@emotion/styled"
import Downshift from "downshift"
import React from "react"
import { Manager, Popper, Reference } from "react-popper"
import tw from "tailwind.macro"

import Input from "./index"

interface OptionsProps {
  highlightedIndex: number | null
  inputValue: any
  getMenuProps: any
  getItemProps: any
  className?: any
  options: [any]
}

const Options: React.FunctionComponent<OptionsProps> = styled(
  ({
    className,
    highlightedIndex,
    inputValue,
    getMenuProps,
    getItemProps,
    options,
  }) => {
    const filteredOptions = options.filter(
      (item: any) => !inputValue || item.value.includes(inputValue)
    )
    return filteredOptions.length ? (
      <ul className={className} {...getMenuProps()}>
        {filteredOptions.map((item: any, index: any) => (
          <li
            key={index}
            {...getItemProps({
              index,
              item: item.value,
              className:
                highlightedIndex === index
                  ? "bg-blue-1 p-3 cursor-pointer"
                  : "bg-white p-3 cursor-pointer",
            })}
          >
            {item.value}
          </li>
        ))}
      </ul>
    ) : null
  }
)`
  ${tw`border border-gray-1 bg-white rounded-b shadow text-gray-2`}
  & > *:last-child {
    ${tw`rounded-b`}
  }
`

const Autocomplete = (props: any) => {
  // const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <Downshift onChange={props.onChange}>
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        reset,
        openMenu,
        clearSelection,
      }) => {
        const isValid = props.options.some(
          ({ value }: any) => value === inputValue
        )
        const inputProps = getInputProps({
          ...props,
          value: props.value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(e)
          },
          autoComplete: "off",

          onFocus: () => openMenu(),

          onBlur: () => {
            if (!isValid) {
              reset()
              clearSelection()
            }
          },
        })
        return (
          <div>
            <Manager>
              <Reference>
                {({ ref: popperTargetRef }) => (
                  <div ref={popperTargetRef}>
                    <Input {...inputProps} />
                  </div>
                )}
              </Reference>
              {isOpen && (
                <Popper
                  placement="bottom"
                  modifiers={{
                    setWidth: {
                      enabled: true,
                      order: 840,
                      fn(data: any): any {
                        //@ts-ignore
                        data.offsets.popper.right = data.offsets.reference.right
                        data.offsets.popper.left = data.offsets.reference.left

                        const width = Math.round(data.offsets.reference.width)
                        data.offsets.popper.width = width
                        data.styles.width = width.toString() + "px"

                        return data
                      },
                    },
                  }}
                >
                  {({ ref, style, placement }) => {
                    return (
                      <div
                        className="z-10"
                        ref={ref}
                        style={{
                          ...style,
                          marginTop: "-5px",
                        }}
                        data-placement={placement}
                      >
                        <Options
                          options={props.options}
                          highlightedIndex={highlightedIndex}
                          inputValue={inputValue}
                          getMenuProps={getMenuProps}
                          getItemProps={getItemProps}
                        />
                      </div>
                    )
                  }}
                </Popper>
              )}
            </Manager>
          </div>
        )
      }}
    </Downshift>
  )
}

export default Autocomplete
