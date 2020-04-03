import React from 'react';
import css from '@emotion/css';
import NotFoundPage from '@src/pages/404';
import { MutationResult, QueryResult } from '@apollo/react-common';

export enum LoadingErrors {
  WebinarNotAvailable = 'WebinarNotAvailable',
  VideoNotAvailable = 'VideoNotAvailable',
}

interface LoadingProps {
  query?: QueryResult<any, any> | MutationResult<any>;
  error?: LoadingErrors;
  local?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ query, error, local }) => {
  if (error) {
    switch (error) {

      default:
        return <NotFoundPage />;
    }
  }

  if (query && query.error) {
    // TODO: Handle no network error vs not found error vs unauthenticated error

    return <NotFoundPage/>
  }

  return (
    <img
      alt='Loading'
      css={
        local
          ? ''
          : css`
              position: fixed;
              top: calc(50% - 1.75rem);
              left: calc(50% - 1.75rem);
              width: ${local ? '1rem' : '3.5rem'};
              height: ${local ? '1rem' : '3.5rem'};
            `
      }
      src={require('@src/images/spinner.svg').default}
    />
  );
};

export default Loading;
