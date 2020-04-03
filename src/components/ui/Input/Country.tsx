import React from 'react';
import Input from './';

const countryMap = require('./Countries.json');

const countriesOptions = Object.keys(countryMap).map((k: any) => {
  return { value: k, text: countryMap[k], key: k };
});

interface Props {}

const Country: React.FC<Props> = (props) => (
  <Input.dropdown search placeholder='Choose Country' options={countriesOptions} {...props} />
);

export default Country;
