import React from 'react';
import Input from './';

const stateMap = require('./States.json');

const statesOptions = Object.keys(stateMap).map((k: any) => {
  return { value: k, text: stateMap[k], key: k };
});

interface Props {}

const State: React.FC<Props> = (props) => (
  <Input.dropdown search placeholder='Choose a State' options={statesOptions} {...props} />
);

export default State;
