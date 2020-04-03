import { ReactComponent as ViewersIcon } from '@src/images/viewers.svg';
import React from 'react';

const ViewerCount = () => {
  const [count, setCount] = React.useState(2);
  const [index, setIndex] = React.useState(0);
  const maxTimeout = 20000;
  const minTimeout = 1000;
  const minFake = -2;
  const maxFake = 4;
  React.useEffect(() => {
    setTimeout(() => {
      const newCount = Math.floor(count + Math.random() * (maxFake - minFake) + minFake);
      setCount(newCount > 1 ? newCount : 1);
      setIndex(index + 1);
    }, Math.floor(Math.random() * (maxTimeout - minTimeout)) + minTimeout);
  }, [index]);

  return (
    <div className='absolute bottom-0 left-0 flex items-center text-white'>
      <ViewersIcon className='mr-2' />
      <span className='shadow-lg'>{count}</span>
    </div>
  );
};

export default ViewerCount;
