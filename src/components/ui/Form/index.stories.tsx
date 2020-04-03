import { action } from '@storybook/addon-actions';
import React from 'react';

import Form from '.';
import Input from '../Input';

export default { title: 'Form', component: Form };

const onSubmit = (values: any) => {
  action('onSubmit')(values);
};

export const basic = () => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field
        name='test'
        placeholder='default submit test'
        component={Input}
      />
      <Form.SubmitButton />
    </Form>
  );
};

export const multipleFieldsWithSameName = () => {
  return (
    <Form onSubmit={onSubmit} mode={'onChange'}>
      <Form.Field name='test' placeholder='submit test' component={Input} />
      <Form.Field name='test' placeholder='submit test' component={Input} />
      <Form.SubmitButton />
    </Form>
  );
};

export const withSpecialInputTypes = () => {
  return (
    <Form onSubmit={onSubmit} mode={'onChange'}>
      <Form.Field name='test' component={Input.toggleOnOff} />

      <Form.SubmitButton />
    </Form>
  );
};
