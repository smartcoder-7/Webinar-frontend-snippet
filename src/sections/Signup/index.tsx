import React from 'react';
import Sidebar from './Sidebar';
import SignupForm from './SignupForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import config from '../../config';

interface SignupFormsComponent extends React.FunctionComponent {
  Forms?: React.FunctionComponent;
}

interface SignupComponent extends React.FunctionComponent {
  Main?: SignupFormsComponent;
}

const stripePromise = loadStripe(config.STRIPE_PK);

// @ts-ignore
export const Signup: SignupComponent = styled.div`
  ${tw`flex flex-col`}

  // @ts-ignore
  ${({ theme }) => theme.media('md')} {
    ${tw`flex-row`}
  }
`;

const Main = styled.div`
  ${tw`p-6 flex-1`}

  // @ts-ignore
  ${({ theme }) => theme.media('md')} {
    ${tw`p-12`}
  }
`;

Signup.defaultProps = {
  className: `container w-full h-full mx-auto`,
  style: { minHeight: '100vh' },
  children: (
    <React.Fragment>
      <Sidebar />
      <Main>
        <Elements stripe={stripePromise}>
          <SignupForm />
        </Elements>
      </Main>
    </React.Fragment>
  ),
};
