import React from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

interface IAttendanceSub {
    attendedCounter: number;
    watchedCounter: number;
}

const AttendanceSubItem = styled.div`
    ${tw`flex flex-row justify-between`}
    padding: 0 52px 0;
    font-size: 13px;
    color: #0e282d;
    font-size: 13px;
    padding: 0 52px 0;
    line-height: 16px;
    margin-bottom: 8px;
    font-family: "CircularStd";
`;

const AttendanceSub = (props: IAttendanceSub) => {
    const { attendedCounter, watchedCounter } = props;
    // const renderAttendance = ()=> {
        
    // }
    return (
        <div className="pb-3">
            <AttendanceSubItem>
                <span>Attended live</span>
                <span>{attendedCounter}</span>
            </AttendanceSubItem>
            <AttendanceSubItem>
                <span>Watched replay</span>
                <span>{watchedCounter}</span>
            </AttendanceSubItem>
        </div>
    );
}

export default AttendanceSub;