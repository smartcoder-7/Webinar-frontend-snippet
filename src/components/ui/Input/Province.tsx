import React from 'react';
import Input from './';

const provinceMap = require('./Provinces.json');

const provincessOptions = Object.keys(provinceMap).map((k: any) => {
  return { value: k, text: provinceMap[k], key: k };
});

interface Props {}

const Province: React.FC<Props> = (props) => (  
  <Input.dropdown search placeholder='Choose a Province' options={provincessOptions} {...props} />
);

export default Province;