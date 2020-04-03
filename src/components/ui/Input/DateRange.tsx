import Dropdown from './Dropdown';

import React from 'react';
import {DateRangeOption} from '@src/utils/enumAnalytics';
import {enumValuesToArray} from '@src/utils/type';

interface Props {
}

const options = enumValuesToArray(DateRangeOption, undefined, 'option');

const DateRange: React.FC<Props> = props => (
    <Dropdown options={options} {...props} />
);

export default DateRange;
