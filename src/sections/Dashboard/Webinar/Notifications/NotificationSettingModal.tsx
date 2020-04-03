import React from 'react';
import { Modal, Form, Input } from '@src/components/ui';
import ApolloForm from '@src/components/ApolloForm';
import * as yup from "yup"
import { EWebinarFragment, useUpdateEwebinarMutation } from "@src/fromBackend/schema"

interface NotificationSettingModalProps {
  ewebinar: EWebinarFragment;
  showSettingModal: boolean;
  setShowSettingModal: any;
  type?: string;
}

const validationSchema = yup.object().shape({
  notificationSettings: yup.object().shape({
    fromEmail: yup
      .string()
      .email()
  })
});

const NotificationSettingModal: React.FC<NotificationSettingModalProps> = ({
  showSettingModal,
  setShowSettingModal,
  ewebinar,
}) => {
  const [updateEWebinar] = useUpdateEwebinarMutation();

  if (!showSettingModal) return null;

  return (
    <Modal widthClass=''>
      <React.Fragment>
        <Modal.Close onClick={() => setShowSettingModal(false)} />
        <Modal.Title className='flex'>Notifications appear to come from...</Modal.Title>
        <Modal.Body>
          <ApolloForm
            defaultValues={ewebinar}
            onSubmit={async (data: any) => {
              await updateEWebinar({ variables: { data }});
              setShowSettingModal(false);
            }}
            validationSchema={validationSchema}
          >
            <div className='mb-6'>
              <label className=''>
                <div className='mb-3 -mt-2'>From name</div>
                <Form.Field
                  name='notificationSettings.fromName'
                  component={Input}
                  placeholder='Name emails come from'
                />
              </label>
            </div>
            <div className='mb-6'>
              <label className=''>
                <div className='mb-4 -mt-1'>Reply-to email</div>
                <Form.Field name='notificationSettings.fromEmail' component={Input} placeholder='noreply@ewebinar.com ' />
              </label>
            </div>
            <div className='flex justify-end'>
              <Form.SubmitButton
                className=' appearance-none font-bold rounded-full text-sm text-white bg-blue-3 px-6 py-2 focus:outline-none focus:shadow'
                dirtyText='Save'
                cleanText='Close'
              />
            </div>
          </ApolloForm>
        </Modal.Body>
      </React.Fragment>
    </Modal>
  );
};

export default NotificationSettingModal;
