import React, { useState, ReactElement } from 'react';
import TableRegistrants from './TableRegistrants';
import { ReactComponent as RegistrationRateIcon } from '@src/images/registrationrate.svg';
import {
  GetRegistrantsOrderBy,
  OrderDirection,
  EWebinarSetFragment,
  useRegistrantsQuery,
  InteractionFragment,
} from '@src/fromBackend/schema';
import DownloadCsvButton from './DownloadCsvButton';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import _ from 'lodash';
import DashboardFilter from '@src/components/DashboardFilter';
import { getDateStringForDashboardFilter } from '@src/utils/date';
import { apiUrl } from '@src/config';

export interface RegistrantsProps {
  data: any;
  headers: any;
  handleSort: Function;
}
const ContentTopRegistrants = styled.div<{ conpactHeader?: boolean }>`
  ${(props) =>
    props.conpactHeader
      ? tw`px-8 pt-6 flex flex-row justify-between border-gray-17`
      : tw`p-10 flex flex-row justify-between border-gray-17 border-t border-b border-solid`}
`;
const TotalRegistrants = styled.div`
  ${tw`flex`}
`;
const TextRegistrants = styled.div`
  ${tw`ml-2`}
  font-size: 18px;
`;

interface RenderProps {
  content: ReactElement;
  onDownloadCsv: () => void;
}

interface Props {
  set: EWebinarSetFragment;
  interaction?: InteractionFragment;
  conpactHeader?: boolean;
  render?: (props: RenderProps) => ReactElement;
}

const RegistrantsResult = ({ set, conpactHeader, interaction, render }: Props) => {
  const { from, to, engagement } = React.useContext(DashboardFilter.Context);
  const [orderBy, changeOrderBy] = useState<GetRegistrantsOrderBy>(
    GetRegistrantsOrderBy.RegisteredDate
  );
  const [orderDirection, changeOrderDirection] = useState<OrderDirection>(OrderDirection.Desc);
  const { data, loading, fetchMore } = useRegistrantsQuery({
    variables: {
      filter: {
        ewebinarSetId: set.id,
        orderBy,
        orderDirection,
        interactionId: interaction && interaction.id,
        engagement,
        sessionEndDate: getDateStringForDashboardFilter(to),
        sessionStartDate: getDateStringForDashboardFilter(from),
      },
    },
  });
  const loadMore = React.useCallback(() => {
    if (data && data.registrants && data.registrants.nextCursor && !loading) {
      fetchMore({
        variables: {
          filter: {
            ewebinarSetId: set.id,
            orderDirection,
            orderBy,
            nextCursor: data.registrants.nextCursor,
            interactionId: interaction && interaction.id,
            engagement,
            sessionEndDate: getDateStringForDashboardFilter(to),
            sessionStartDate: getDateStringForDashboardFilter(from),
          },
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            registrants: {
              ...fetchMoreResult.registrants,
              attendees: [...prev.registrants.attendees, ...fetchMoreResult.registrants.attendees],
            },
          });
        },
      });
    }
  }, [data, orderDirection, orderBy]);
  const onChangeOrderBy = (nextOrderBy: GetRegistrantsOrderBy) => {
    if (nextOrderBy === orderBy) {
      changeOrderDirection(
        orderDirection === OrderDirection.Asc ? OrderDirection.Desc : OrderDirection.Asc
      );
    } else {
      changeOrderDirection(OrderDirection.Asc);
      changeOrderBy(nextOrderBy);
    }
  };
  const onDownloadCsv = React.useCallback(() => {
    const filterQueryString = JSON.stringify({
      ewebinarSetId: set.id,
      orderBy,
      orderDirection,
      interactionId: interaction && interaction.id,
      engagement,
      sessionEndDate: getDateStringForDashboardFilter(to),
      sessionStartDate: getDateStringForDashboardFilter(from),
    });
    window.open(`${apiUrl}/v1/downloadCsv/${set.id}?filter=${filterQueryString}`);
  }, [orderBy, orderDirection, engagement, from, to, interaction]);
  const content = (
    <div>
      <ContentTopRegistrants conpactHeader={conpactHeader}>
        <TotalRegistrants>
          <RegistrationRateIcon />
          <TextRegistrants>
            {data && data.registrants && data.registrants.total}{' '}
            {interaction ? 'people responded' : 'registrants'}
          </TextRegistrants>
        </TotalRegistrants>
        {!conpactHeader && <DownloadCsvButton onClick={onDownloadCsv} />}
      </ContentTopRegistrants>
      <TableRegistrants
        data={(data && data.registrants && data.registrants.attendees) || []}
        onLoadMore={loadMore}
        interaction={interaction}
        onChangeOrderBy={onChangeOrderBy}
        currentOrderBy={orderBy}
        currentOrderDirection={orderDirection}
      />
    </div>
  );
  return render ? render({ content, onDownloadCsv }) : content;
};

export default RegistrantsResult;
