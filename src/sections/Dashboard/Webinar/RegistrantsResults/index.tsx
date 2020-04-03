import React from 'react';
import { EWebinarSetFragment } from '@src/fromBackend/schema';
import _ from 'lodash';
import Registrants from '../Registrants';

interface Props {
  set: EWebinarSetFragment;
}

const RegistrantsResults = ({ set }: Props) => {
  return (
    <div className='container mx-auto bg-white shadow-lg'>
      <Registrants set={set} />
    </div>
  );
};

export default RegistrantsResults;
