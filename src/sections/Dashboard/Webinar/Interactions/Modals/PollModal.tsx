import React, { useState } from 'react';
import { Form, Input } from '@src/components/ui';
import { FieldLabel } from '../Modals';

const minimumQuestions: number = 2;
const maximumQuestions: number = 4;

interface AnswerProps {
  index: number;
  showRemoveButton: boolean;
  removeQuestion: (e?: any) => any;
}

const Answer: React.FC<AnswerProps> = ({ index, showRemoveButton = false, removeQuestion }) => (
  <div className='relative ml-6 py-2'>
    <label>
      <FieldLabel title={`Possible answer #${index}`} />
      <Form.Field
        name={`details.answer${index}`}
        component={Input}
        placeholder={`Option ${index}`}
      />
    </label>

    <div className='absolute bottom-0 left-0 rounded-full bg-blue-3 h-2 w-2 -ml-6 mb-6' />

    {showRemoveButton && (
      <button
        onClick={() => removeQuestion()}
        className='appearence-none absolute bg-coral-1 top-0 right-0 rounded-full w-6 h-6 mt-6 -mr-2 flex items-center justify-center text-white'
      >
        ✕
      </button>
    )}
  </div>
);

const Answers: React.FC<{}> = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(minimumQuestions);

  let answers: any = [];
  for (let i = 1; i <= numberOfQuestions; i++) {
    answers.push(
      <Answer
        key={i}
        index={i}
        showRemoveButton={i > minimumQuestions}
        removeQuestion={() => setNumberOfQuestions(numberOfQuestions - 1)}
      />
    );
  }

  return (
    <div>
      {answers}
      {numberOfQuestions < maximumQuestions && (
        <button
          className='appearance-none font-bold text-sm text-blue-3 px-6 py-2 focus:outline-none underline'
          onClick={() => setNumberOfQuestions(numberOfQuestions + 1)}
          type='button'
        >
          Add another answer choice
        </button>
      )}
    </div>
  );
};

const PollModal: React.FC<any> = () => {
  return (
    <div className='flex flex-col'>
      <div className='py-2'>
        <label>
          <FieldLabel title='Poll question / title:' />
          <Form.Field
            name='details.title'
            component={Input}
            placeholder={'Which came first, the chicken or the egg?'}
          />
        </label>
      </div>

      {/* Render answers */}
      <Answers />
    </div>
  );
};

export default PollModal;
