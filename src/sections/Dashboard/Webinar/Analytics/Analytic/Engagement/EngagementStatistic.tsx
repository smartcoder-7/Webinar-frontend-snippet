import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { EngagementItem } from '../Item';
import { Rectangle } from '../Item';
import tw from 'tailwind.macro';
import { Engagement } from '@src/fromBackend/schema';

const StatisticItem = styled.div`
  ${tw`flex items-center justify-between`}
  margin-bottom: 8px;
  min-width: 205px;
  font-size: 13px;
  line-height: 16px;
  .title {
    flex: 1;
    padding-left: 12px;
    ${tw`inline-block`}
  }
  .lightgreen {
    ${tw`text-blue-3`}
  }
  .lightpink {
    ${tw`text-orange-2`}
  }
`;
interface IEngagementStatistic {
  data: Engagement;
}
export const EngagementStatistic = (props: IEngagementStatistic) => {
  const { data } = props;
  return (
    <Fragment>
      <StatisticItem>
        <Rectangle color='light' />
        <p className='title lightgreen'>Total interactions</p>
        <span>{data.totalInteractions || 0}</span>
      </StatisticItem>

      <StatisticItem>
        <Rectangle />
        <p className='title lightpink'>Total reactions</p>
        <span>{data.totalReactions || 0}</span>
      </StatisticItem>

      <EngagementItem data={data} />
    </Fragment>
  );
};
