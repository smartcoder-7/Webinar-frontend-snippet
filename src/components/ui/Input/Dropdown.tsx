import { ReactComponent as ArrowDown } from '@src/images/arrowDown.svg';

import styled from '@emotion/styled';
import Downshift from 'downshift';
import React from 'react';
import DropdownComponent from '../Dropdown';
import Input from './index';

interface OptionsProps {
  highlightedIndex: number | null;

  getMenuProps: any;
  getItemProps: any;
  className?: any;
  options: [any];
}

const Options: React.FunctionComponent<OptionsProps> = styled(
  ({ className, highlightedIndex, getMenuProps, getItemProps, options }) => {
    return options.length ? (
      <div className={className} {...getMenuProps()}>
        {options.map((item: any, index: any) => (
          <div
            key={index}
            {...getItemProps({
              index,
              item: item.value,
              className: `whitespace-no-wrap ${
                highlightedIndex === index ? 'bg-blue-1 p-3 cursor-pointer' : 'bg-white p-3 cursor-pointer'
              }`,
            })}
          >
            {item.option}
          </div>
        ))}
      </div>
    ) : null;
  }
)``;

interface DropdownOptions {
  [key: string]: any;
}

const Dropdown = ({ initialSelectedItem = null, className = '', ...props }: DropdownOptions) => {
  return (
    <Downshift onChange={props.onChange} initialSelectedItem={initialSelectedItem || props.value}>
      {({ getToggleButtonProps, getItemProps, isOpen, getMenuProps, getRootProps, selectedItem, highlightedIndex }) => {
        const toggleButtonProps = getToggleButtonProps({
          ...props,
          className: 'appearance-none text-left ' + className,
        });
        const options = props.options || [];

        const selectedOption = options.find(
          (option: { value: string | number; option: string | number }) => option.value === selectedItem
        );

        const rootProps = getRootProps();

        return (
          <DropdownComponent>
            <DropdownComponent.Reference>
              <div {...rootProps} ref={rootProps.ref}>
                <Input as='button' {...toggleButtonProps} className='flex justify-between whitespace-no-wrap'>
                  {selectedOption && selectedOption.option ? (
                    <>{selectedOption.option}</>
                  ) : (
                    <span className='text-gray-1'>{props.placeholder}</span>
                  )}
                  <ArrowDown
                    className={`self-center transition-transform transition-100 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  />
                </Input>
              </div>
            </DropdownComponent.Reference>
            <DropdownComponent.Options scroll fullWidth>
              <Options
                options={options}
                highlightedIndex={highlightedIndex}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
              />
            </DropdownComponent.Options>
          </DropdownComponent>
        );
      }}
    </Downshift>
  );
};
export default Dropdown;
