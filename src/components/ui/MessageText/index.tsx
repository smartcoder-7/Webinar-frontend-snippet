import React from 'react';
import { GraphQLError } from 'graphql';

interface ErrorMessageProps {
  errors: GraphQLError[];
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {
  return (
    <div className='w-full flex justify-center mt-3'>
      {errors.map((error, i) => {
        return (
          <span key={i} className='w-full text-coral-1'>
            {error.message}
          </span>
        );
      })}
    </div>
  );
};

export const TextMessage: React.FC<{ message: string | null }> = ({ message }) => {
  if (!message || message === '') {
    return null;
  }
  return (
    <div className='w-full flex justify-center'>
      <span className='w-full text-green-500'>{message}</span>
    </div>
  );
};

export default { TextMessage, ErrorMessage };
