import React from 'react';
import { OpenRateItem } from '../Item';
interface IOpenRate {
    data: {
        ratePercent: number,
        notificationSent: number,
        notificationOpened: number
    }
}
const OpenRate = (props: IOpenRate) => {
    const {data} = props
    return (
            <OpenRateItem data={data}/>
    )
}

export default OpenRate;
