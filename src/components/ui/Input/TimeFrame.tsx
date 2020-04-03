import Dropdown from './Dropdown'
import React from 'react'
import { SessionOrDateOption } from '@src/utils/enumAnalytics';

interface Props {}

const options = [
    {
        value: SessionOrDateOption.BY_SESSION_DATE,
        option: SessionOrDateOption.BY_SESSION_DATE,
    },
    {
        value: SessionOrDateOption.BY_REGISTERED_DATE,
        option: SessionOrDateOption.BY_REGISTERED_DATE,
    },
]

const TimeFrame: React.FC<Props> = props => (
    <Dropdown options={options} {...props} />
)

export default TimeFrame
