import { navigate } from '@reach/router';
import ApolloForm from '@src/components/ApolloForm';
import Logo from '@src/components/Logo';
import { Form, Input, Text } from '@src/components/ui';
import { getUrlParameter } from '@src/utils/getUrlParameter';
import React from 'react';
import * as yup from 'yup';
import { useChangePasswordMutation } from '@src/fromBackend/schema';
import { css } from "@emotion/core"

interface Props {}

interface ChangePasswordInputs {
  email: string;
  password: string;
  token: string;
}

const validationSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords do not match')
    .required('Password confirm is required'),
});

const ChangePassword: React.FC<Props> = () => {
  const [changePasswordMutation] = useChangePasswordMutation();
  const email = getUrlParameter('email');
  const token = getUrlParameter('token');
  return (
    <div>
      <div className='container mx-auto h-100vh items-center flex'>
        <div
          className='w-1/3 mx-auto flex flex-col items-center'
          css={css`
          margin-bottom: calc((100vh - 25rem) * 0.3);
        `}
        >
          <Logo className='mt-32 mb-6' />
          <Text.title className='mb-6'>Set a new password</Text.title>
          <ApolloForm
            className='w-full'
            validationSchema={validationSchema}
            onSubmit={async (values: ChangePasswordInputs & { passwordConfirm?: string }) => {
              const data = Object.assign({}, values);
              delete data.passwordConfirm;
              await changePasswordMutation({ variables: { data } });
              navigate('/login');
            }}
          >
            <Form.Field
              name='email'
              placeholder='Email'
              component={Input}
              defaultValue={email}
              className='hidden'
            />
            <Form.Field
              name='token'
              placeholder='Token'
              component={Input}
              defaultValue={token}
              className='hidden'
            />
            <Form.Field
              name='password'
              type='password'
              autoComplete='new-password'
              placeholder='New password'
              component={Input}
            />
            <Form.Field
              className='mt-6'
              name='passwordConfirm'
              type='password'
              autoComplete='new-password'
              placeholder='Confirm new password'
              component={Input}
            />
            <Form.ErrorMessage />
            <div className='flex items-center mt-6'>
              <Form.SubmitButton
                style={{ backgroundColor: '#FF7470' }}
                className='flex-grow-0 leading-none p-3 px-6 rounded-full text-white'
              >
                Set password
              </Form.SubmitButton>
              <div
                className='cursor-pointer text-center p-2 w-1/2 rounded-full'
                onClick={() => navigate('/login')}
              >
                <Text className='text-gray-500'>Back to Login</Text>
              </div>
            </div>
          </ApolloForm>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
