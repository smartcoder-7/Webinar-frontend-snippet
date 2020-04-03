import Dropdown from './Dropdown';

import React from 'react';
import {AttendanceOption} from '@src/utils/enumAnalytics';

interface Props {
}

const options = [
    {
        value: AttendanceOption.DidNotAttend,
        text: 'Didn\'t attend',
    },
    {
        value: AttendanceOption.WatchedReplay,
        text: 'Watched replay',
    },
    {
        value: AttendanceOption.Attended,
        text: 'Attended'
    }
];

const Attendance: React.FC<Props> = props => (
    <Dropdown options={options} {...props} />
);

export default Attendance;
