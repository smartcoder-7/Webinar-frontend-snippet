import Dropdown from './Dropdown';

import React from 'react';
import {EngagementItemsOption} from '@src/utils/enumAnalytics';

interface Props {
}

const options = [
    {
        value: EngagementItemsOption.TOOK_POLL,
        option: EngagementItemsOption.TOOK_POLL,
    },
    {
        value: EngagementItemsOption.ANSWERED,
        option: EngagementItemsOption.ANSWERED,
    },
    {
        value: EngagementItemsOption.POSTED,
        option: EngagementItemsOption.POSTED,
    },
    {
        value: EngagementItemsOption.CHATTED,
        option: EngagementItemsOption.CHATTED,
    }
];

const EngageItem: React.FC<Props> = props => (
    <Dropdown options={options} {...props} />
);

export default EngageItem;
