import { ApolloQueryResult } from 'apollo-client/core/types';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { default as ApolloReactHooks } from '@apollo/react-hooks';

type QueryFunction<TData, TVariables> = (options?: {
  variables: TVariables;
}) => Promise<ApolloQueryResult<TData>>;

export function useQueryAsLazy<TData = any, TVariables = OperationVariables, TQuery = any>(
  query: (
    baseOptions?: ApolloReactHooks.QueryHookOptions<TQuery, TVariables>
  ) => QueryResult<TData, TVariables>
): QueryFunction<TData, TVariables> {
  const results = query({ skip: true });
  const refetch = results.refetch;

  const imperativelyCallQuery = (options?: {
    variables: TVariables;
  }): Promise<ApolloQueryResult<TData>> => {
    return refetch(options?.variables);
  };

  return imperativelyCallQuery;
}
