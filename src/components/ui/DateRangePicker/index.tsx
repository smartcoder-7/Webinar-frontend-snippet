import React, {FunctionComponent, useState, Fragment} from 'react';
import styled, {StyledComponent} from '@emotion/styled';

import 'react-datepicker/dist/react-datepicker.css';
import tw from 'tailwind.macro';
import DatePicker from '@src/components/ui/DatePicker';

interface Props {}

const DatePickerGroup: StyledComponent<any, any, any> = styled.div`
    ${tw`flex items-center justify-between relative z-10 bg-white`}
`;

const DateRangePicker: FunctionComponent<Props> = ({}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <Fragment>
            <DatePickerGroup>
                <div className="w-1/2 mt-1">
                    <DatePicker
                        selected={startDate}
                        onChange={(date: any) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        title="Start date"
                    />
                </div>
                <div className="w-1/2 mt-1 text-right">
                    <DatePicker
                        selected={endDate}
                        onChange={(date: any) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        title="End date"
                    />
                </div>
            </DatePickerGroup>
        </Fragment>
    );
};

export default DateRangePicker;
