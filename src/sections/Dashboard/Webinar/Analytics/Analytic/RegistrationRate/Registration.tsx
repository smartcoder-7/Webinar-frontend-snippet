import React from 'react';
import { RegistrationItem } from '../Item';
interface IRegistration {
    data : {
        ratePercent: number,
        uniqueVisitors: number,
        registered: number
    }
}
const Registration= (props: IRegistration) => {
    const {data} = props
    return (
            <RegistrationItem data={data} />
    )
}

export default Registration;
