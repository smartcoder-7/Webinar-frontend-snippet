import React from 'react';
import styled from '@emotion/styled';
import { AttendedItem } from '../Item';
import {Rectangle} from '../Item';
import tw from 'tailwind.macro';
const StatisticItem = styled.div`
    ${tw`flex items-center justify-between`}
    margin-bottom: 8px;
    min-width: 205px;
    font-size: 13px;
    line-height: 16px;
    &.mt {
        margin-top: 18px;
    }
    .title {
        ${tw`inline-block`}
        width: 80%;
        padding-left: 12px;
      }
      .lightgreen {
          color: #4EB3B9;
      }
      .lightpink {
          color: #E47D76;
      }
`
interface IAttendedStatistic {
    data: any
}
export const AttendedStatistic= (props: IAttendedStatistic) => {
    const {data}= props
    if(!data) return null;
    return (
        <div>
        <StatisticItem>
            <Rectangle color="light"/>
            <p className="title lightgreen">Attended live</p>
        <span>{data.live.stayedToEnd + data.live.leftEarly}</span>
        </StatisticItem>

        <AttendedItem data={data.live}/>

        <StatisticItem className="mt">
            <Rectangle/>
            <p className="title lightpink">Watched replay</p>
            <span>{data.replay.stayedToEnd + data.replay.leftEarly}</span>
        </StatisticItem> 

        <AttendedItem data={data.replay}/>
        </div>
    )
}