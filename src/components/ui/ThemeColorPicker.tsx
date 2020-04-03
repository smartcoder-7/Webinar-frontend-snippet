import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ChromePicker } from 'react-color';
import { css } from '@emotion/core';
import tw from 'tailwind.macro';
import { withProperties } from '@src/utils/type';

import { ReactComponent as ArrowDown } from '@src/images/arrowDown.svg';

import { Input } from '@src/components/ui';
import Downshift from 'downshift';
import DropdownComponent from '@src/components/ui/Dropdown';

import RadioButton from '@src/components/ui/RadioButton';
import { Text } from '@src/components/ui';

interface OptionsProps {
  default: boolean;
  title: string;
  name: string;
  value: string;
  primaryColor: string;
  highlightColor: string;
  font: string;
  preview: boolean;
}

let displayOptions: Array<OptionsProps> = [
  {
    default: false,

    title: 'Sunset theme',
    name: 'Sunset theme',
    value: 'sunset',
    primaryColor: '#EBA289',
    highlightColor: '#39A1B2',
    font: 'Sans-serif',
    preview: true,
  },
  {
    default: true,
    title: 'Ocean theme',
    name: 'Ocean theme',
    value: 'ocean',
    primaryColor: '#6CB3C4',
    highlightColor: '#FF7470',
    font: 'Sans-serif',
    preview: true,
  },
  {
    default: false,
    title: 'Use my logo colours',
    name: 'My logo colour',
    value: 'myLogo',
    primaryColor: 'gray',
    highlightColor: '',
    font: 'Sans-serif',
    preview: true,
  },
];

let customOption: OptionsProps = {
  default: false,
  name: 'Custome theme',
  title: 'Use a custom colour (#hex)',
  value: 'custom',
  primaryColor: '#D7D7D7',
  highlightColor: '',
  font: '',
  preview: false,
};

const Option = styled(({ name, className, option, value = 'custom', ...props }: any) => {
  return (
    <label className={'w-full ' + className}>
      <div className='flex w-full items-center mb-3'>
        <div
          className={props.noDot ? '' : 'h-5 w-5 flex items-center justify-center rounded-full mr-3'}
          css={css`
            border: ${option.value === 'myLogo' ? '2px solid #BBBBBB' : ''};
            background-color: ${option.primaryColor};
          `}
        />
        <RadioButton.Option value={option.value} checked={value === option.value} name={name} {...props} />
        <RadioButton />
        <Text.body className='text-sm text-gray-2'>{option.title}</Text.body>
      </div>
    </label>
  );
})`
  ${tw`flex select-none cursor-pointer flex-1 flex-col items-center justify-center`}
  input:checked ~ * {
    ${tw`text-teal-2`}
  }
`;

interface ThemeColorPickerProps {
  [key: string]: any;
  primaryColor?: string;
}

const ThemeColorPicker = styled(
  ({
    onChange,
    onColorChange,
    value,
    initialSelectedItem = null,
    placeholder,

    primaryColor,
  }: ThemeColorPickerProps) => {
    const [bgColor, setBgColor] = useState(primaryColor);

    return (
      <Downshift onChange={onChange} initialSelectedItem={value || initialSelectedItem}>
        {({ isOpen, getRootProps }) => {
          const options: Array<OptionsProps> = [...displayOptions, customOption] || [];

          const selectedOption = options.find((option: any) => option.value === value) || customOption;

          const selectedColor = selectedOption.primaryColor;

          const rootProps = getRootProps();

          return (
            <DropdownComponent closeOnSelect={false}>
              <DropdownComponent.Reference>
                <div {...rootProps} ref={rootProps.ref}>
                  {/* need to be disable 
                  when mode !== "public" && !props.hidePreview */}
                  <Input
                    as='button'
                    // {...toggleButtonProps}
                    className='flex justify-between items-center whitespace-no-wrap border-none shadow-none'
                  >
                    <div
                      className='h-4 w-4 flex items-center justify-center rounded-full mr-3'
                      style={{
                        backgroundColor: `${primaryColor ? primaryColor : selectedColor}`,
                      }}
                    />
                    <span className='text-sm text-gray-2 font-semibold'>
                      {selectedOption && selectedOption.name ? selectedOption.name : placeholder}
                    </span>
                    <ArrowDown
                      className={`self-center transition-transform transition-100 ml-3 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </Input>
                </div>
              </DropdownComponent.Reference>
              <DropdownComponent.Options
                cursorStyle='cursor-auto'
                className='z-themepicker'
                scroll
                fullHeight
                modifiers={{
                  preventOverflow: { enabled: true },
                  hide: { enabled: false },
                }}
              >
                <div className='text-sm text-gray-2 text-gray-15 font-thin pt-4 pl-4'>Select your theme:</div>
                <div className='flex flex-col border-b border-gray-5 px-5 py-4'>
                  <fieldset className='w-full'>
                    <div className='flex flex-col items-center w-full'>
                      {options &&
                        options.slice(0, -1).map((option: any, index: number) => (
                          <Option
                            name={name}
                            key={index}
                            value={value}
                            onChange={(e: any) => {
                              onChange(e);
                            }}
                            option={option}
                            className='pr-2'
                          />
                        ))}
                    </div>
                  </fieldset>
                </div>

                <div className='px-5'>
                  <div className='text-sm text-gray-2 text-gray-15 font-thin mb-4'></div>

                  <Option
                    name={selectedOption && selectedOption.name}
                    value={selectedOption && selectedOption.value}
                    onChange={(e: any) => {
                      onChange(e);
                    }}
                    option={customOption}
                    noDot={true}
                  />
                  <ChromePicker
                    css={css`
                      border: none !important;
                      box-shadow: none !important;

                      > * {
                        & :first-of-type {
                          border: 1px solid #99acae;
                          border-radius: 5px !important;
                        }
                        &:not(:first-of-type) {
                          padding: 16px 0 !important;
                        }
                      }
                    `}
                    color={bgColor}
                    onChange={(color) => {
                      customOption.primaryColor = color.hex;

                      setBgColor(color.hex);
                      onColorChange(color.hex);
                      onChange('Custome theme');
                    }}
                  />
                </div>
              </DropdownComponent.Options>
            </DropdownComponent>
          );
        }}
      </Downshift>
    );
  }
)``;

export default withProperties(ThemeColorPicker, {
  displayOptions,
  customOption,
});
