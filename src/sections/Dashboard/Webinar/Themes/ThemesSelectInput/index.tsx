import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Text } from '@src/components/ui';
import RadioButton from '@src/components/ui/RadioButton';
import { withProperties } from '@src/utils/type';
import React from 'react';
import tw from 'tailwind.macro';

export const Option = styled(({ className, option, value, ...props }: any) => (
  <label className={className}>
    <div className='flex items-center'>
      <RadioButton.Option value={option.name} checked={value === option.name} name='theme' {...props} />
      <RadioButton />
      <Text.body className='text-sm'>{option.name}</Text.body>
    </div>
    <div
      className={'h-24 w-full mt-2 flex items-center justify-center'}
      css={css`
        background-color: ${option.primaryColor};
      `}
    >
      {option.preview && (
        <div>
          <img src={require('@src/images/magnifyingGlass.svg').default} alt='preview' className='inline-block pr-2' />
          <Text.body className='text-white inline-block'>Preview</Text.body>
        </div>
      )}
    </div>
  </label>
))`
  ${tw`flex select-none cursor-pointer flex-1 flex-col items-center justify-center`}
  input:checked ~ * {
    ${tw`text-teal-2`}
  }
`;

interface OptionsProps {
  default: boolean;
  name: String;
  primaryColor: String;
  font: String;
  preview: boolean;
}

const options: Array<OptionsProps> = [
  {
    default: true,
    name: 'Theme 1',
    primaryColor: '#6CB3C4',
    font: 'Sans-serif',
    preview: true,
  },
  {
    default: false,
    name: 'Theme 2',
    primaryColor: '#99DB98',
    font: 'Sans-serif',
    preview: true,
  },
  {
    default: false,
    name: 'Theme 3',
    primaryColor: '#EBA289',
    font: 'Sans-serif',
    preview: true,
  },
];

const customOption: OptionsProps = {
  default: false,
  name: 'Custom',
  primaryColor: '#D7D7D7',
  font: '',
  preview: false,
};

const ThemesSelectInput = styled(({ className, onChange, value }: any) => {
  console.log('themes', { value });
  return (
    <div className={'flex flex-wrap pb-4 border-gray-300 mb-6 ' + className}>
      <fieldset className='w-full'>
        <div className='flex flex-wrap items-center text-center'>
          {options.map((option, index) => (
            <Option
              key={index}
              value={value}
              onChange={(e: any) => {
                onChange(e);
              }}
              option={option}
              className='pr-2'
            />
          ))}
          <Text.body className='w-20 flex-grow-0 text-sm text-gray-1'>Or...</Text.body>
          <Option value={value} onChange={onChange} option={customOption} className='pl-2' />
        </div>
      </fieldset>
    </div>
  );
})``;

export default withProperties(ThemesSelectInput, { options });
