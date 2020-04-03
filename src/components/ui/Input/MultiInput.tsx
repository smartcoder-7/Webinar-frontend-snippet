import { css } from '@emotion/core';
import { ReactComponent as Close } from '@src/images/close.svg';
import React from 'react';

interface Props {
  format?: (value: any) => any;
  input: any;
  button?: String;
  value: any[];
  onChange: (values: []) => void;
}

const MultiInput: React.FC<Props> = (props: any) => {
  const value = props.value || [];
  const [inputValue, setInputValue] = React.useState(null);

  const onChange = () => {
    props.onChange([...value, inputValue]);
  };

  const onDelete = (_event: any, key: any) => {
    props.onChange(value.filter((_: any, index: any) => index != key));
  };

  const Values = ({ format }: { format?: (value: any) => any }) => {
    return (
      <div className='flex flex-wrap my-4 justify-start items-center'>
        {value.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className='flex items-center text-sm text-blue-3 border py-2 px-4 my-1 mx-1 rounded-full leading-none'
              css={css`
                background-color: #e0f3ee;
              `}
            >
              {format ? format(item) : item}
              <div>
                <Close
                  onClick={(event: any) => onDelete(event, index)}
                  className='ml-3 h-2 cursor-pointer'
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {value.length >= 1 && <Values format={props.format} />}
      <div className='flex items-center'>
        {React.createElement(props.input, {
          value: inputValue,
          onChange: (e: any) => {
            const newValue = e.target ? e.target.value : e;
            setInputValue(newValue);
            props.onChangeInput && props.onChangeInput(value.concat(newValue));
          },
        })}

        {props.button && (
          <button
            type='button'
            onClick={onChange}
            className='appearance-none focus:outline-none text-center cursor-pointer w-2/12 px-2 py-2 rounded-full self-stretch outline-none text-white'
            css={css`
              background-color: #537175;
            `}
          >
            {props.button}
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiInput;
