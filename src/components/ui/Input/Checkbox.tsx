import styled from '@emotion/styled';
import React from 'react';

const Checkbox = styled(({ className, value, label = '', onChange, ...props }: any) => {
  const disbaled = props.disabled || false;
  return (
    <label className={'flex flex-row leading-tight whitespace-no-wrap items-center ' + className}>
      <input
        type='checkbox'
        className={'border-none cursor-pointer checkbox ' + props.className}
        onChange={(e: any) => {
          onChange(e.target.checked);
        }}
        disabled={disbaled}
        {...props}
      />
      {label}
    </label>
  );
})``;

export default Checkbox;
