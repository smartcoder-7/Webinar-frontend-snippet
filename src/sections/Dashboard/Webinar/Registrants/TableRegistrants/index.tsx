import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Column, Table, AutoSizer, TableCellRenderer, TableCellProps } from 'react-virtualized';
import 'react-virtualized/styles.css';
import {
  GetRegistrantsOrderBy,
  OrderDirection,
  ReactionForAttendeeFragment,
  InteractionFragment,
  InteractionType,
  EwebinarReactionFragment,
} from '@src/fromBackend/schema';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Emoji } from 'emoji-mart';
import { ReactComponent as ArrowDownIcon } from '@src/images/arrowDown.svg';

const getEmoji = (value: number): string => {
  switch (value) {
    case 1:
      return 'sob';
    case 2:
      return 'disappointed';
    case 3:
      return 'neutral_face';
    case 4:
      return 'smiley';
    default:
      return 'star-struck';
  }
};

export interface RegistrantHeaderItemProps {
  active: boolean;
  name: string;
  onClick: () => void;
}

const TableRegistrantsComponent = styled.div`
  ${tw`
   p-6 pt-0 
  `}
  margin-top: -20px;
  .ReactVirtualized__Grid ReactVirtualized__Table__Grid,
  .ReactVirtualized__Grid__innerScrollContainer,
  .ReactVirtualized__Table__row registrants__table__row {
    outline: none;
  }
  .registrants__table__header {
    .registrants__table__row {
      ${tw`
        border-b-0
      `}
    }
  }
  .registrants__table__row {
    ${tw`
      border-b border-gray-300
    `}
  }
`;

const TableCell = styled.div`
  ${tw`
    text-gray-700 font-normal text-sm text-gray-2 flex items-center block
  `}
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  a, span, div {
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
  }
`;

const TableHeader = styled.div`
  ${tw`flex text-xs text-gray-2 font-normal capitalize cursor-pointer`}
  align-items: center;
  svg {
    ${tw`ml-2`}
    transition: transform 0.5s;
    transform: rotate(180deg);
    &.asc {
      transform: rotate(0deg);
    }
  }
`;

type PollAnswerKey = 'answer1' | 'answer2' | 'answer3' | 'answer4';

interface TableRegistrantsProps {
  onChangeOrderBy: (orderBy: GetRegistrantsOrderBy) => void;
  onLoadMore: () => void;
  currentOrderBy: GetRegistrantsOrderBy;
  currentOrderDirection: OrderDirection;
  interaction?: InteractionFragment;
  data?: ReactionForAttendeeFragment[];
}

const renderColumn = ({
  label,
  dataKey,
  orderBy,
  width,
  flexGrow,
  currentOrderDirection,
  currentOrderBy,
  cellRenderer,
  onChangeOrderBy,
}: {
  label: string;
  dataKey: string;
  orderBy: GetRegistrantsOrderBy;
  currentOrderBy: GetRegistrantsOrderBy;
  currentOrderDirection: OrderDirection;
  width: number;
  flexGrow?: number;
  cellRenderer?: TableCellRenderer;
  onChangeOrderBy: (orderBy: GetRegistrantsOrderBy) => void;
}) => {
  return (
    <Column
      flexGrow={flexGrow}
      label={label}
      dataKey={dataKey}
      width={width}
      cellRenderer={cellRenderer}
      headerRenderer={() => (
        <TableHeader onClick={() => onChangeOrderBy(orderBy)}>
          {label}
          {orderBy === currentOrderBy && (
            <ArrowDownIcon
              className={`ml-2 ${currentOrderDirection === OrderDirection.Asc ? 'asc' : ''}`}
            />
          )}
        </TableHeader>
      )}
    />
  );
};

const getResponseColumn = ({
  interaction,
  currentOrderBy,
  currentOrderDirection,
  onChangeOrderBy,
}: {
  interaction: InteractionFragment;
  currentOrderBy: GetRegistrantsOrderBy;
  currentOrderDirection: OrderDirection;
  onChangeOrderBy: (orderBy: GetRegistrantsOrderBy) => void;
}) => {
  switch (interaction.type) {
    case InteractionType.Poll:
      return renderColumn({
        currentOrderBy,
        currentOrderDirection,
        onChangeOrderBy,
        label: 'Response',
        dataKey: 'reaction',
        orderBy: GetRegistrantsOrderBy.PollAnswer,
        width: 100,
        cellRenderer: ({ cellData }: TableCellProps) => {
          const reaction = cellData as EwebinarReactionFragment;
          if (!reaction || !reaction.pollAnswer) return <TableCell/>;
          const pollAnswerKey = reaction.pollAnswer as PollAnswerKey;
          const pollValue = interaction.details![pollAnswerKey];
          return <TableCell>{pollValue}</TableCell>;
        },
      });
    case InteractionType.Feedback:
      return renderColumn({
        currentOrderBy,
        currentOrderDirection,
        onChangeOrderBy,
        label: 'Response',
        dataKey: 'reaction',
        orderBy: GetRegistrantsOrderBy.FeedbackRating,
        width: 80,
        cellRenderer: ({ cellData }: TableCellProps) => {
          const reaction = cellData as EwebinarReactionFragment;
          if (!reaction || !reaction.feedbackRating) return <TableCell/>;
          return (
            <TableCell>
              <Emoji emoji={getEmoji(reaction.feedbackRating || 5)} set='emojione' size={25} />{' '}
              <span className='ml-2'>{reaction.feedbackRating}</span>
            </TableCell>
          );
        },
      });
    case InteractionType.Question:
      return renderColumn({
        currentOrderBy,
        currentOrderDirection,
        onChangeOrderBy,
        label: 'Response',
        dataKey: 'reaction',
        orderBy: GetRegistrantsOrderBy.FeedbackRating,
        width: 80,
        cellRenderer: ({ cellData }: TableCellProps) => {
          const reaction = cellData as EwebinarReactionFragment;
          if (!reaction || !reaction.detailsFields) return <TableCell/>;
          return (
            <TableCell>
              {reaction.detailsFields && reaction.detailsFields.question
                ? reaction.detailsFields.question.answer
                : ''}
            </TableCell>
          );
        },
      });
    default:
      return null;
  }
};

const TableRegistrants: React.FC<TableRegistrantsProps> = ({
  currentOrderBy,
  data,
  onLoadMore,
  onChangeOrderBy,
  interaction,
  currentOrderDirection,
}: TableRegistrantsProps) => {
  if (!data) return null;
  const onScroll = ({
    scrollTop,
    scrollHeight,
    clientHeight,
  }: {
    clientHeight: number;
    scrollHeight: number;
    scrollTop: number;
  }) => {
    const isScrollToEnd = scrollTop > scrollHeight - clientHeight - 50;
    if (isScrollToEnd) {
      onLoadMore();
    }
  };
  const renderColumn = ({
    label,
    dataKey,
    orderBy,
    width,
    flexGrow,
    cellRenderer,
  }: {
    label: string;
    dataKey: string;
    orderBy: GetRegistrantsOrderBy;
    width: number;
    flexGrow?: number;
    cellRenderer?: TableCellRenderer;
  }) => {
    return (
      <Column
        flexGrow={flexGrow}
        label={label}
        dataKey={dataKey}
        width={width}
        cellRenderer={cellRenderer}
        headerRenderer={() => (
          <TableHeader onClick={() => onChangeOrderBy(orderBy)}>
            {label}
            {orderBy === currentOrderBy && (
              <ArrowDownIcon
                className={`ml-2 ${currentOrderDirection === OrderDirection.Asc ? 'asc' : ''}`}
              />
            )}
          </TableHeader>
        )}
      />
    );
  };
  return (
    <TableRegistrantsComponent>
      <AutoSizer disableHeight>
        {({ width }: { width: number }) => {
          return (
            <Table
              className='pt-10'
              headerClassName='registrants__table__header'
              rowClassName='registrants__table__row'
              width={width}
              height={350}
              onScroll={onScroll}
              headerHeight={46}
              rowHeight={46}
              rowCount={data.length}
              rowGetter={({ index }: { index: number }) => data[index]}
            >
              {interaction &&
                getResponseColumn({
                  interaction,
                  currentOrderBy,
                  currentOrderDirection,
                  onChangeOrderBy,
                })}
              {renderColumn({
                label: 'First Name',
                dataKey: 'firstName',
                orderBy: GetRegistrantsOrderBy.FirstName,
                width: 80,
                cellRenderer: ({ cellData }: TableCellProps) => {
                  return <TableCell>{cellData}</TableCell>;
                },
              })}
              {renderColumn({
                label: 'Last Name',
                dataKey: 'lastName',
                orderBy: GetRegistrantsOrderBy.LastName,
                width: 80,
                cellRenderer: ({ cellData }: TableCellProps) => {
                  return <TableCell>{cellData}</TableCell>;
                },
              })}
              {renderColumn({
                label: 'Email',
                dataKey: 'email',
                orderBy: GetRegistrantsOrderBy.Email,
                flexGrow: 1,
                width: 100,
                cellRenderer: ({ cellData }: TableCellProps) => {
                  return (
                    <TableCell>
                      <a href={`mailto:${cellData}`}>{cellData}</a>
                    </TableCell>
                  );
                },
              })}
              {renderColumn({
                label: 'Registered Date',
                dataKey: 'registeredDate',
                orderBy: GetRegistrantsOrderBy.RegisteredDate,
                width: 120,
                cellRenderer: ({ cellData }: TableCellProps) => {
                  return <TableCell>{moment(cellData).format('MM/DD/YYYY HH:MM')}</TableCell>;
                },
              })}
              {renderColumn({
                label: 'Session Date',
                dataKey: 'startTime',
                orderBy: GetRegistrantsOrderBy.StartTime,
                width: 120,
                cellRenderer: ({ cellData }: TableCellProps) => {
                  return <TableCell>{moment(cellData).format('MM/DD/YYYY HH:MM')}</TableCell>;
                },
              })}
              {renderColumn({
                label: 'Watched Event %',
                dataKey: 'watchedPercent',
                orderBy: GetRegistrantsOrderBy.WatchedPercent,
                width: 120,
                cellRenderer: ({ cellData }: TableCellProps) => {
                  return <TableCell className='text-center'>{`${_.floor(cellData, 2)}%`}</TableCell>;
                },
              })}
              {renderColumn({
                label: 'Watched Replay %',
                dataKey: 'watchedReplayPercent',
                orderBy: GetRegistrantsOrderBy.WatchedReplayPercent,
                width: 120,
                cellRenderer: ({ cellData }: TableCellProps) => {
                  return <TableCell className='text-center'>{`${_.floor(cellData, 2)}%`}</TableCell>;
                },
              })}
            </Table>
          );
        }}
      </AutoSizer>
    </TableRegistrantsComponent>
  );
};

export default TableRegistrants;
