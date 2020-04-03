import React from 'react';
import { ReactComponent as DownloadIcon } from '@src/images/download-icon.svg';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import _ from 'lodash';

const DownloadText = styled.div`
  ${tw`ml-2 text-green-2`}
  font-size: 14px;
`;

const Download = styled.div`
  ${tw`flex`}
  align-items: center;
  cursor: pointer;
`;

interface Props {
  onClick: () => void;
}

const DownloadCsv = ({ onClick }: Props) => {
  return (
    <Download onClick={onClick}>
      <DownloadIcon />
      <DownloadText>Download</DownloadText>
    </Download>
  );
};

export default DownloadCsv;
