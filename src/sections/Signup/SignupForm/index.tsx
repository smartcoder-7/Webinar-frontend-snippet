import { css } from '@emotion/core';
import { navigate } from '@reach/router';
import ApolloForm from '@src/components/ApolloForm';
import { Form, Input, Text } from '@src/components/ui';
import {
  BillingCycle,
  RegisterUserAndTeamInput,
  useRegisterMutation,
  PublicInvitedUser,
} from '@src/fromBackend/schema';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import tw from 'tailwind.macro';
import * as yup from 'yup';
import InvitedWarningModal from '@src/components/InvitedWarningModal';
import { CreatePaymentMethodData, StripeCardElement } from '@stripe/stripe-js';

const paymentProvidersSrc = require('./paymentProviders.png');

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),

  password: yup.string().required(),

  team: yup.object().shape({
    address: yup.object().shape({
      address1: yup.string().required(),
      address2: yup.string(),
      city: yup.string().required(),
      postal: yup.string().required(),
      country: yup.string().required(),
    }),
  }),
});

const BillingAddressAndCC = () => {
  const [selectProvince, setSelectProvince] = useState(Input.state);

  const handleCountryChange = (value: string) => {
    console.log(value);
    if (value == 'US') {
      setSelectProvince(Input.state);
      console.log('Switch to States');
    }
    if (value == 'CA') {
      setSelectProvince(Input.province);
      console.log('Switch to Provinces');
    }
  };

  return (
    <div
      className='flex flex-wrap px-2 -mx-2'
      css={css`
        width: calc(100% + 1rem);
      `}
    >
      <Text.subtitle className='w-full pb-4 px-2'>Your card details</Text.subtitle>
      <Form.Field
        component={Input.stripeCard}
        name='card'
        placeholder='16 digit card number'
        type='password'
        className='w-1/2'
      />

      <img alt='cards' className='px-2 w-1/2 mb-6 object-fit' src={paymentProvidersSrc} />

      <div className={`flex flex-wrap mt-8 px-2 -mx-2`}>
        <Text.subtitle className='w-full pb-4 px-2 -mt-8'>Your billing address</Text.subtitle>

        <Form.Field
          component={Input}
          name='team.address.address1'
          autoComplete='address-line1'
          placeholder='Address Line 2'
        />
        <Form.Field
          component={Input}
          name='team.address.address2'
          autoComplete='address-line2'
          placeholder='Address Line 1'
        />
        <Form.Field
          component={Input}
          name='team.address.city'
          autoComplete='address-level2'
          placeholder='City'
        />
        <Form.Field component={Input} name='team.address.postal' placeholder='Postal code' />
        <Form.Field
          component={Input.country}
          autoComplete='country-name'
          name='team.address.country'
          placeholder='Your country'
          onChange={handleCountryChange}
        />
        <Form.Field
          component={selectProvince}
          autoComplete='province'
          name='team.address.province'
          placeholder='Select province'
        />
      </div>
    </div>
  );
};

const SignupForm = () => {
  const [registerMutation] = useRegisterMutation();
  const [invitedUser, setInvitedUser] = useState<PublicInvitedUser | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (user: RegisterUserAndTeamInput) => {
    //event.preventDefault();
    try {
      if (!stripe || !elements) {
        // TODO: Make sure to disable form submission until Stripe.js has loaded.
        console.log('Stripe elements not loaded.');
        throw 'Error registering.  Please retry in a few seconds.';
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        console.log('Card element not loaded');
        throw 'Error registering.  Please retry in a few seconds.';
      }

      const address = user.team.address!;

      const paymentData: CreatePaymentMethodData = {
        type: 'card',
        card: cardElement as StripeCardElement,
        billing_details: {
          address: {
            line1: address.address1!,
            line2: address.address2 ? address.address2! : undefined,
            city: address.city!,
            postal_code: address.postal!,
            state: address.province!,
            country: address.country!,
          },
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      };

      const { error, paymentMethod } = await stripe.createPaymentMethod(paymentData);

      if (error) {
        console.log('[error]', error);
        throw error;
      }

      const data: RegisterUserAndTeamInput = { ...user };
      delete (data as any).card;

      data.team.billingCycle = BillingCycle.Month;
      data.team.last4 = paymentMethod!.card!.last4 || '';
      data.team.ccType = paymentMethod!.card!.brand || '';
      data.team.paymentMethodID = paymentMethod!.id || '';

      const registerQuery = await registerMutation({ variables: { data } });

      if (registerQuery.errors) {
        throw registerQuery.errors;
      }

      navigate('/complete-your-profile');
    } catch (e) {
      if (e.graphQLErrors) {
        if (
          e.graphQLErrors[0].extensions &&
          e.graphQLErrors[0].extensions.code === 'INVITED_USER' &&
          e.graphQLErrors[0].extensions.exception &&
          e.graphQLErrors[0].extensions.exception.invitedUser
        ) {
          setInvitedUser(e.graphQLErrors[0].extensions.exception.invitedUser);
        } else {
          throw e;
        }
      }
    }
  };

  return (
    <ApolloForm
      onSubmit={handleSubmit}
      defaultValues={{
        // Create the hierarchy needed in the Forms
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        team: {
          address: {
            city: '',
            country: '',
            address1: '',
            address2: '',
            postal: '',
          },
        },
      }}
      validationSchema={validationSchema}
    >
      <div className='flex flex-row mb-8 justify-center justify-between'>
        <Text.title>Start Your 14 Day Free Trial</Text.title>
      </div>

      <div
        className='flex flex-wrap -mx-2'
        css={css`
          ${Form.Field} {
            ${tw`w-1/2 px-2 mb-4`}
          }
          ${Form.Field.Input} {
            ${tw`mb-2`}
          }
        `}
      >
        <Form.Field
          component={Input}
          name='firstName'
          autoComplete='given-name'
          placeholder='First name'
        />

        <Form.Field
          component={Input}
          name='lastName'
          autoComplete='family-name'
          placeholder='Last name'
        />

        <Form.Field
          component={Input}
          name='email'
          autoComplete='email'
          placeholder='Your email (used to login)'
        />

        <Form.Field
          component={Input}
          name='password'
          placeholder='Set a password'
          type='password'
        />

        <BillingAddressAndCC />
      </div>
      <Form.ErrorMessage />
      <Form.SubmitButton className='appearance-none font-bold rounded-full text-sm text-white bg-coral-1 px-6 py-3 focus:outline-none focus:shadow'>
        CREATE MY ACCOUNT
      </Form.SubmitButton>

      {invitedUser && (
        <InvitedWarningModal
          invitedUser={invitedUser}
          onClose={() => {
            setInvitedUser(null);
          }}
        />
      )}
    </ApolloForm>
  );
};

export default SignupForm;
