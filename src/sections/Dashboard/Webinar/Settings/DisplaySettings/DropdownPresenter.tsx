import React from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { css } from '@emotion/core';
import { ReactComponent as ArrowDown } from '@src/images/arrowDown.svg';
import { ReactComponent as CheckedIcon } from '@src/images/checked-icon.svg';
import { Text } from '@src/components/ui';
import Downshift from 'downshift';
import DropdownComponent from '@src/components/ui/Dropdown';

interface OptionsProps {
  default: boolean;
  id: string;
  name: string;
  profileMediaUrl: string;
}

const Option = styled(({ className, option, onClick }: any) => {
  return (
    <label className={'w-full ' + className}>
      <div className='flex w-full items-center mb-3' onClick={() => onClick(option.id)}>
        {option.default ? <CheckedIcon className='mr-3' /> : <div className='mr-5' />}
        <Text.body
          className={
            option.default
              ? 'text-sm text-color-input-field font-semibold'
              : 'text-sm text-color-input-field'
          }
        >
          {option.name}
        </Text.body>
      </div>
    </label>
  );
})`
  ${tw`flex select-none cursor-pointer flex-1 flex-col items-center justify-center`}
  input:checked ~ * {
    ${tw`text-teal-2`}
  }
`;
interface DropDownProps {
  textDropdown: string;
  presenters: OptionsProps[];
  onSetSelect: (set: string) => void;
  onChange: (set: string) => void;
  value: string;
}

const DropdownPresenter = styled((props: DropDownProps) => {
  const { value, onChange, onSetSelect, textDropdown, presenters } = props;
  const currentPresenter = presenters.find(({ id }) => id === value) || {
    default: true,
    id: '0',
    name: 'None',
    profileMediaUrl: '',
  };

  return (
    <Downshift onChange={onChange} initialSelectedItem={currentPresenter.id}>
      {({ isOpen, getRootProps }) => {
        const options: Array<OptionsProps> = [...presenters] || [];
        options.map((option: any) => {
          if (option.id === currentPresenter.id) {
            option.default = true;
          } else {
            option.default = false;
          }
        });

        const rootProps = getRootProps();

        const onSetSelected = (val: any) => {
          options.map((option: any) => {
            if (option.id === val) {
              option.default = true;
            } else {
              option.default = false;
            }
          });
          onSetSelect(val);
          onChange(val);
        };

        return (
          <DropdownComponent>
            <DropdownComponent.Reference>
              <div {...rootProps} ref={rootProps.ref}>
                <div className='flex justify-between items-center max-h-full whitespace-no-wrap border-none shadow-none p-3'>
                  <div className="flex justify-between items-center">
                    <div
                      className='ProfileImage overflow-hidden bg-blue-1 rounded-full mr-3'
                      css={css`
                        width: 3rem;
                        height: 3rem;
                      `}
                    >
                      {currentPresenter && currentPresenter.profileMediaUrl ? (
                        <img src={currentPresenter.profileMediaUrl} alt='avatar' />
                      ) : (
                        <div />
                      )}
                    </div>
                    <span className='text-sm text-gray-2 font-semibold'>
                      {currentPresenter && currentPresenter.name}
                    </span>
                  </div>
                  <ArrowDown
                    className={`self-center transition-transform transition-100 ml-3 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </div>
              </div>
            </DropdownComponent.Reference>
            <DropdownComponent.Options
              cursorStyle='cursor-auto'
              className='z-themepicker w-56 border-none my-0 ml-5 shadown-dropdown -mt-5'
              placement='right-start'
              scroll
              fullHeight
              modifiers={{
                preventOverflow: { enabled: true },
                hide: { enabled: true },
              }}
            >
              <div className='text-sm text-gray-2 text-gray-15 font-thin pt-4 pl-4'>
                {textDropdown}
              </div>
              <div className='flex flex-col px-5 py-3'>
                <fieldset className='w-full'>
                  <div className='flex flex-col items-center w-full'>
                    {options &&
                      options.map((option: any, index: number) => (
                        <Option
                          key={index}
                          onClick={(option: any) => {
                            onSetSelected(option);
                          }}
                          option={option}
                          className='pr-2'
                        />
                      ))}
                  </div>
                </fieldset>
              </div>
              <div className='cursor-pointer text-sm text-blue-3 pl-4 pb-2 font-semibold'>
                Add someone new
              </div>
            </DropdownComponent.Options>
          </DropdownComponent>
        );
      }}
    </Downshift>
  );
})``;

export default DropdownPresenter;
