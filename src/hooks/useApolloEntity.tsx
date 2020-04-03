import { QueryResult } from '@apollo/react-common';
import { MutationHookOptions, QueryHookOptions, useMutation, useQuery } from '@apollo/react-hooks';

import stripTypenames from '@src/utils/stripTypenames';
import ApolloClient, { ApolloError, NetworkStatus } from 'apollo-client';
import { UpdateQueryFn } from 'apollo-client/core/watchQueryOptions';

export interface Data<T> {
  client: ApolloClient<any>;
  error?: ApolloError;
  loading: boolean;
  networkStatus: NetworkStatus;
  called: boolean;
  data: T;
}

export class ApolloEntity /*implements QueryResult*/ {
  client: ApolloClient<any>;
  error?: ApolloError;
  loading: boolean;
  networkStatus: NetworkStatus;
  called: boolean;
  data: any | undefined;
  updateQuery: UpdateQueryFn;

  extractEntity(data: any): any {
    return data;
  }

  constructor(queryResult: QueryResult) {
    Object.assign(this, queryResult);

    this.client = queryResult.client;
    this.error = queryResult.error;
    this.loading = queryResult.loading;
    this.called = queryResult.called;
    this.networkStatus = queryResult.networkStatus;
    this.updateQuery = queryResult.updateQuery;
    this.data = this.extractEntity(queryResult.data);
  }
}

export interface ApolloEntityMethods<T = any> {
  [key: string]: T;
}

interface UseApolloEntityOptions {
  useQuery?: ApolloEntityMethods<
    {
      extractEntity?(data: any): any;
    } & QueryHookOptions
  >;
  useMutation?: ApolloEntityMethods<MutationHookOptions>;
}

function useApolloEntity<T extends ApolloEntityMethods = ApolloEntityMethods>(
  options: UseApolloEntityOptions
): T & ApolloEntityMethods {
  const Entity = {} as any;

  if (options.useQuery) {
    Object.keys(options.useQuery).forEach((key) => {
      Entity[key] = (variables: any) => {
        const entity = useQuery(
          options.useQuery![key as any].query!,
          Object.assign(options.useQuery![key as any], {
            variables,
          })
        );

        const extractEntity = options.useQuery![key].extractEntity;

        return new ApolloEntity({
          ...entity,
          data: extractEntity ? extractEntity(entity.data) : entity.data,
        });
      };
    });
  }

  if (options.useMutation) {
    Object.keys(options.useMutation).forEach((key) => {
      const [mutation] = useMutation(
        options.useMutation![key].mutation!,
        options.useMutation![key]
      );
      Entity[key as keyof T] = (variables: any) =>
        mutation({ variables: stripTypenames(variables, '__typename') });
    });
  }

  return Entity;
}

export default useApolloEntity;
