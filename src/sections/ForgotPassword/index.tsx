import { navigate } from '@reach/router';
import ApolloForm from '@src/components/ApolloForm';
import Logo from '@src/components/Logo';
import { Form, Input, Text } from '@src/components/ui';
import React from 'react';
import * as yup from 'yup';
import { ResetPasswordMutationVariables, useResetPasswordMutation } from '@src/fromBackend/schema';
import { css } from "@emotion/core"

interface Props {}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
});

const ForgotPassword: React.FC<Props> = () => {
  const [resetPasswordMutation] = useResetPasswordMutation();

  return (
    <div className='container mx-auto'>
      <div
        className='w-1/3 mx-auto flex flex-col items-center'
        css={css`
          margin-bottom: calc((100vh - 25rem) * 0.3);
        `}
      >
        <Logo className='my-32 mb-6' />
        <Text.title>Reset your password</Text.title>
        <Text.note className='text-gray-500 leading-snug text-center my-5 px-4'>
          Enter your email and we'll send you instructions to reset your password.
        </Text.note>
        <ApolloForm
          className='w-full'
          validationSchema={validationSchema}
          onSubmit={async (data: ResetPasswordMutationVariables) => {
            await resetPasswordMutation({ variables: { email: data.email } });
          }}
        >
          <Form.Field
            className='mb-2'
            name='email'
            type='email'
            placeholder='Email'
            component={Input}
          />
          <Form.ErrorMessage />
          <div className='flex items-center mt-6'>
            <Form.SubmitButton
              style={{ backgroundColor: '#FF7470' }}
              className='text-xs font-semibold flex-grow-0 leading-none py-4 px-6 rounded-full text-white'
            >
              RESET PASSWORD
            </Form.SubmitButton>
            <div
              className='cursor-pointer text-center p-2 w-1/2 rounded-full'
              onClick={() => navigate('/login')}
            >
              <Text className='text-sm text-gray-500'>Back to sign in</Text>
            </div>
          </div>
        </ApolloForm>
      </div>
    </div>
  );
};

export default ForgotPassword;
