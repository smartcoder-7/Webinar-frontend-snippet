import { css } from '@emotion/core';
import { navigate } from '@reach/router';
import ApolloForm from '@src/components/ApolloForm';
import Logo from '@src/components/Logo';
import { Form, Input, Text } from '@src/components/ui';
import { useLoginMutation } from '@src/fromBackend/schema';
import React from 'react';
import tw from 'tailwind.macro';
import * as yup from 'yup';
import { Link } from 'gatsby';
import ErrorModal from '@src/components/ErrorModal';

interface Props {}

interface LoginCreds {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
});

const Login: React.FC<Props> = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [error, setError] = React.useState<string>('');
  const [loginMutation] = useLoginMutation();
  return (
    <div className='container mx-auto h-100vh items-center flex'>
      <div
        className='w-1/3 mx-auto flex flex-col items-center'
        css={css`
          margin-bottom: calc((100vh - 25rem) * 0.3);
        `}
      >
        <Logo className='my-16' />
        <Text.title className='mb-6'>Login to your account</Text.title>
        <ApolloForm
          css={css`
            ${Form.Field} {
              ${tw`mb-6`}
            }
            ${Form.Field.Input} {
              ${tw`my-3`}
            }
          `}
          className={'w-full'}
          validationSchema={validationSchema}
          onSubmit={async ({ email, password }: LoginCreds) => {
            try {
              await loginMutation({ variables: { email, password } });
              navigate('/portal');
            } catch (e) {
              if (
                e.graphQLErrors[0].extensions &&
                e.graphQLErrors[0].extensions.code === 'SIGN_UP'
              ) {
                setError(e.graphQLErrors[0].message);
                setIsOpenModal(true);
              } else {
                setError(e.graphQLErrors[0].message);
              }
            }
          }}
        >
          <Form.Field name='email' placeholder='Email' autoComplete='email' component={Input} />
          <Form.Field
            name='password'
            type='password'
            autoComplete='current-password'
            placeholder='Password'
            component={Input}
          />
          {error && <div className='text-coral-1 text-sm'>{error}</div>}
          <div className='flex items-center mt-6'>
            <Form.SubmitButton className='flex-grow-0 leading-none p-3 px-6 rounded-full bg-coral-1 text-white'>
              LOGIN
            </Form.SubmitButton>
            <div className='ml-4 text-sm text-gray-1 leading-none  ml-auto whitespace-no-wrap'>
              <Link to='/forgot-password'>I lost my password</Link>
            </div>
          </div>
        </ApolloForm>
        {isOpenModal && <ErrorModal errors={error} showSignupButton={true} />}
      </div>
    </div>
  );
};

export default Login;
