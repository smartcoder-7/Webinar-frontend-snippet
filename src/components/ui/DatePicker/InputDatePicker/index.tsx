import styled from '@emotion/styled';
import React from 'react';

interface InputComponentProps {
    value?: any;
    onClick?: any;
    title?: any;
}

const InputDatePicker = styled(({value, title, onClick}: InputComponentProps) => {
    return (
        <div className="flex">
            <img
                className="w-5 h-5 mr-2 cursor-pointer"
                src={require('@src/images/calendar.png')}
                alt="calender"
                onClick={onClick}
            />
            <span
                className="text-sm flex items-center focus:outline-none"
                css={{
                    color: '#1B3439',
                    fontSize: '14px !important'
                }}
            >
                {value === '' ? title : value}
            </span>
        </div>
    );
})<InputComponentProps>``;

export default InputDatePicker;
