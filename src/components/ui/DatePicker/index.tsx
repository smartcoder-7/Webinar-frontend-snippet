import React, {FunctionComponent} from 'react';
import InputDatePicker from '@src/components/ui/DatePicker/InputDatePicker';
import {default as DatePickerUI} from 'react-datepicker';

interface Props {
    selected: Date | null;
    onChange: Function;
    selectsStart?: boolean;
    selectsEnd?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    minDate?: Date | null;
    title?: string;
}

const DatePicker: FunctionComponent<Props> = ({
                                                  selected,
                                                  onChange,
                                                  selectsStart,
                                                  selectsEnd,
                                                  startDate,
                                                  endDate,
                                                  minDate,
                                                  title
                                              }) => {
    return (
        <DatePickerUI
            selected={selected}
            onChange={(date: any) => onChange(date)}
            selectsStart={selectsStart}
            selectsEnd={selectsEnd}
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            title={title}
            customInput={<InputDatePicker/>}
        />
    );
};

export default DatePicker;
