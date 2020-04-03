import { Form, Input, Modal } from '@src/components/ui';

import React from 'react';

interface FieldLabelProps {
  title: string;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({ title }) => (
  <div className='text-md text-color-input-label pb-1'>{title}</div>
);

interface ModalTitleProps {
  type: string;
}

export const ModalTitle: React.FC<ModalTitleProps> = ({ type }) => {
  const body = getCardBodyByType({ type: type } as any);

  if (!body) return null;
  const { name, icon } = body;

  return (
    <Modal.Title className='flex items-center bg-blue-3 text-white'>
      {React.cloneElement(icon || <svg />, {
        fill: 'white',
        width: 25,
        height: 26,
        className: 'w-8 text-white',
      })}
      <span className='pr-6' />
      {name}
    </Modal.Title>
  );
};

interface ActionButtonsProps {
  isEdit?: boolean;
  onDelete?: () => any;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ isEdit = false, onDelete }) => (
  <div className='flex flex-1 justify-end items-end'>
    {/* preview */}
    {isEdit && (
      <button
        type='button'
        onClick={onDelete}
        className='appearance-none font-bold text-sm text-coral-1 px-6 py-2 focus:outline-none'
      >
        <span className='inline-flex items-center'>Delete</span>
      </button>
    )}

    {/* form submit */}
    <Form.SubmitButton className='appearance-none font-bold rounded-full text-sm text-white bg-blue-3 px-6 py-2 focus:outline-none focus:shadow'>
      <span className='inline-flex items-center'>Save</span>
    </Form.SubmitButton>
  </div>
);

interface AppearAtFieldProps {}

export const AppearAtField: React.FC<AppearAtFieldProps> = () => (
  <label>
    <FieldLabel title='Appear at time...' />
    <Form.Field disabled name='appearAt' component={Input.timeElapsed} placeholder={'00:30:00'} />
  </label>
);

export const Divider = () => <div className='h-1 border-b border-gray-6 my-6' />;

import { Router } from '@reach/router';
import InteractionModal from './InteractionModal';
import { getCardBodyByType } from '@src/components/WebinarPlayer/InteractionsStream/cards';

export default ({ ewebinarId }: any) => {
  return (
    <Router>
      <InteractionModal path={`:interactionId`} ewebinarId={ewebinarId} />
      <InteractionModal path='new' ewebinarId={ewebinarId} />
    </Router>
  );
};
