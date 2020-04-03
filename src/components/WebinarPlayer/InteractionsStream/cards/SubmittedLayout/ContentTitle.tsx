import React from 'react';

const ContentTitle: React.FunctionComponent<{}> = ({ children }) => {
  return <p className='text-base leading-normal mb-2 text-gray-21 font-medium'>{children}</p>;
};

export default ContentTitle;
