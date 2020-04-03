import Dropdown from './Dropdown';

import React from 'react';
import {EngagementsOption} from '@src/utils/enumAnalytics';

interface Props {
}

const options = [
    {
      value: EngagementsOption.DID_NOT_ENGAGED,
      option: EngagementsOption.DID_NOT_ENGAGED
    },
    {
        value: EngagementsOption.ENGAGED,
        option: EngagementsOption.ENGAGED,
    }
];

const Engagement: React.FC<Props> = props => (
    <Dropdown options={options} {...props} />
);

export default Engagement;
