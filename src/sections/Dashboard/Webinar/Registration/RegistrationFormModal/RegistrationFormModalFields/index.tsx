import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import css from '@emotion/css';
import { EWebinarFragment } from "@src/fromBackend/schema"
import ScheduleDropdownInput from '@src/components/ScheduleDropdownInput';
import RedCircularButton from './RedCircularButton';
import { Form, Input, Modal } from '@src/components/ui';
import { ReactComponent as Plus } from '@src/images/plus.svg';
import { ReactComponent as Close } from '@src/images/close.svg';
import { PageBuilderModes } from '@src/sections/Dashboard/Webinar/Registration';
import PageBuilder from '@src/sections/Dashboard/Webinar/Registration/PageBuilder';
import {
  RegistrationFormField,
  RegistrationFormSettings,
} from '@src/fromBackend/schema';
import useEwebinarSession from '@src/hooks/useEwebinarSession';

interface RegistrationFormModalFieldsProps {
  registrationFormSettings: RegistrationFormSettings;
  mode: PageBuilderModes;
  ewebinar: EWebinarFragment;
  onClose?: () => any;
}

const RegistrationFormModalFields: React.FC<
  RegistrationFormModalFieldsProps
> = ({ mode, onClose, registrationFormSettings, ewebinar }) => {
  const useEwebinarSessionHook = useEwebinarSession();
  const sessions = useEwebinarSessionHook.get({
    data: {
      ewebinarSetId: ewebinar.set.id,
      clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const ewebinarSession = sessions.data ? sessions.data.ewebinarSession : [];
  const { watch, control } = useFormContext();
  const showConsentCheckbox = watch('showConsentCheckbox');
  const conditionsAgreed = watch('conditionsAgreed') || !showConsentCheckbox;
  const { fields, append, remove } = useFieldArray<RegistrationFormField>({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'fields', // unique name for your Field Array
  });

  const generateFieldId = (fields: any): number => {
    fields = fields as RegistrationFormField[]
    return fields[fields.length - 1].fieldId + 1
  }

  return (
    <Modal
      closeOnClickOutside={false}
      onClose={onClose}
      className={`${mode !== 'public' ? 'absolute z-10 h-auto' : ''}`}
      lock={mode === 'public'}
      modelClassName='self-start my-4'
    >
      {onClose && <Modal.Close onClick={onClose} />}
      <Modal.Title className='flex px-8 py-5 justify-between'>
        <Form.Field.Input
          name='title'
          component={PageBuilder.TextEdit}
          className='text-lg outline-none'
          disabled={mode !== 'edit'}
          mode={mode}
        />
        {/*mode !== 'edit' &&
          <button className='text-gray-1 text-sm outline-none' onClick={onClose}>Cancel</button>
          */}
      </Modal.Title>
      <Modal.Body>
        <div
          className={`pb-2 text-color-input-field text-normal font-normal ${
            mode === 'public' ? '' : 'opacity-30'
          }`}
        >
          Select a date / time
        </div>
        <Form.Field
          name='session'
          ewebinarSession={ewebinarSession}
          component={ScheduleDropdownInput}
          isRegister={mode !== 'public'}
          className='mb-4'
        />
        {mode === 'public' && <Form.ErrorMessage />}
        {fields.map((formField, index) => {
          return (
            <div key={formField.fieldId} className='pt-2 pb-2'>
              <div className='flex justify-between items-end leading-tight pb-1'>
                {/* field w/o optional */}
                <div className='inline-flex text-md'>
                  <Form.Field
                    name={`fields[${index}].fieldName`}
                    highlight={mode === 'edit' && formField.isRemovable}
                    mode={mode}
                    disabled={mode !== 'edit'}
                    data-text='Enter field name here'
                    component={PageBuilder.TextEdit}
                    className='outline-none font-normal'
                    css={[css``]}
                    defaultValue={formField.fieldName}
                  />

                  <Form.Field.Input
                    type='hidden'
                    name={`fields[${index}].fieldId`}
                    component={Input}
                    defaultValue={formField.fieldId}
                  />

                  <Form.Field.Input
                    type='hidden'
                    name={`fields[${index}].fieldType`}
                    component={Input}
                    defaultValue={formField.fieldType}
                  />

                  <Form.Field.Input
                    type='hidden'
                    name={`fields[${index}].order`}
                    component={Input}
                    defaultValue={formField.order}
                  />

                  <Form.Field.Input
                    type='hidden'
                    name={`fields[${index}].isRemovable`}
                    component={Input}
                    defaultValue={formField.isRemovable}
                  />

                  {watch(`fields[${index}].isRequired`) ? (
                    <span className='text-coral-1'>*</span>
                  ) : (
                    <span className='pl-1 text-gray-1 font-light'>(optional)</span>
                  )}
                </div>

                {/* required with checkbox */}
                <div className='text-md text-gray-1 mr-5'>
                  {mode === 'edit' && (
                    <Form.Field.Input
                      name={`fields[${index}].isRequired`}
                      defaultValue={formField.isRequired}
                      disabled={!formField.isRemovable}
                      component={Input.checkbox}
                      css={
                        mode !== 'edit' && [
                          css`
                            display: none;
                          `,
                        ]
                      }
                      label={
                        <span
                          className={`pl-2 ${
                            formField.isRemovable && !formField.isRequired
                              ? 'cursor-pointer'
                              : 'text-gray-1'
                          }`}
                        >
                          Required?
                        </span>
                      }
                    />
                  )}
                </div>
              </div>

              {/* input w/o cross */}
              <div className='relative'>
                {mode === 'edit' && formField.isRemovable && (
                  <RedCircularButton
                    content={
                      <Close
                        css={css`
                          width: 0.375rem;
                          height: 0.375rem;
                          * {
                            fill: white;
                          }
                        `}
                      />
                    }
                    onClick={() => remove(index)}
                    className='absolute flex -mt-3 -mr-3 h-5 w-5 shadow-close'
                  />
                )}
                <Form.Field
                  name={`attendeeFields.{${formField.fieldId}}.value`}
                  type={formField.fieldType}
                  disabled={mode === 'edit'}
                  defaultValue=''
                  component={Input}
                  className='opacity-100'
                />
                <Form.Field.Input
                  type='hidden'
                  name={`attendeeFields.{${formField.fieldId}}.fieldName`}
                  component={Input}
                  defaultValue={formField.fieldName}
                />
                 <Form.Field.Input
                  type='hidden'
                  name={`attendeeFields.{${formField.fieldId}}.isRequired`}
                  component={Input}
                  defaultValue={formField.isRequired}
                />
              </div>
            </div>
          );
        })}

        {mode === 'edit' && (
          <button
            type='button'
            className='appearance-no focus:outline-none mt-2 mb-4 p-2 relative flex w-full bg-coral-2 rounded text-coral-3 font-normal'
            onClick={() =>
              append({
                fieldId: generateFieldId(fields),
                fieldName: '',
                fieldType: 'text',
                isRequired: false,
                isRemovable: true,
                order: fields.length,
              })
            }
          >
            <RedCircularButton
              content={<Plus className='w-2 h-2' />}
              as='div'
              className='relative focus:outline-none inline-flex mr-4 ml-1 shadow-md'
              type='button'
              onClick={() =>
                append({
                  fieldId: generateFieldId(fields),
                  fieldName: '',
                  fieldType: 'text',
                  isRequired: false,
                  isRemovable: true,
                  order: fields.length,
                })
              }
            />
            Add another custom field
          </button>
        )}
        {mode === 'public' && <Form.ErrorMessage />}

        {/* action buttons */}
        <div className='flex justify-between items-center pt-2'>
          <div className='flex flex-row items-baseline'>
            {mode === 'edit' ? (
              <>
                <Form.Field
                  name='showConsentCheckbox'
                  component={Input.checkbox}
                  defaultValue={registrationFormSettings.showConsentCheckbox}
                  label=''
                />
                {showConsentCheckbox ? (
                  <Form.Field
                    name='consentCheckboxText'
                    highlight={true}
                    mode={mode}
                    data-text='Enter "I consent ..." language'
                    component={PageBuilder.TextEdit}
                    className='ml-2 whitespace-no-wrap overflow-hidden outline-none text-gray-1 text-sm'
                  />
                ) : (
                  <span className='whitespace-no-wrap pl-2 text-sm text-gray-3 opacity-50'>
                    Require attendee consent
                  </span>
                )}
              </>
            ) : showConsentCheckbox ? (
              <Form.Field
                name='conditionsAgreed'
                component={Input.checkbox}
                defaultValue={false}
                label={
                  <span className='whitespace-no-wrap pl-2 text-sm text-gray-3 opacity-50'>
                    {registrationFormSettings.consentCheckboxText}
                  </span>
                }
              />
            ) : null}
          </div>

          {/* form submit */}
          {mode === 'public' ? (
            <Form.SubmitButton
              className={`appearance-none font-bold rounded-full text-sm bg-teal-4 text-white px-6 py-2 focus:outline-none focus:shadow ${
                conditionsAgreed
                  ? 'bg-blue-3 cursor-pointer'
                  : 'bg-gray-1 cursor-not-allowed'
              }`}
              disabled={!conditionsAgreed}
            >
              Register
            </Form.SubmitButton>
          ) : (
            <>
              <Form.SubmitButton containerId={'navbutton'} />
              <PageBuilder.Button
                name='registerButton'
                mode={mode}
                className='appearance-none font-bold rounded-full text-sm bg-teal-4 text-white px-6 py-2 focus:outline-none focus:shadow bg-blue-3 cursor-pointer'
              />
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationFormModalFields;
