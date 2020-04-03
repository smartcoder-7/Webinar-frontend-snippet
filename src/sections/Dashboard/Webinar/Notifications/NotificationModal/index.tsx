import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import CopyToClipboard from 'react-copy-to-clipboard';

import { useFormContext } from 'react-hook-form';
import { Form, Input, Modal } from '@src/components/ui';
import { ReactComponent as NotificationHeadingIcon } from '@src/images/notificationHeadingIcon.svg';
import SendBySelector from './SendBySelector';
import { GET_EWEBINAR_NOTIFICATIONS } from '@src/hooks/NotificationQueries';
import {
  EWebinarFragment,
  NotificationFragment,
  NotificationInput,
  NotificationType,
  SendBy,
  SendTo,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  WhenUnit,
} from '@src/fromBackend/schema';
import { ReactComponent as Info } from '@src/images/info.svg';
import ApolloForm from '@src/components/ApolloForm';
import * as yup from 'yup';
import { ERROR_MESSAGE_MAX_CHARACTER, MAX_CHARACTER } from '@src/modules/ErrorMessage/constant';
import styled, { StyledComponent } from '@emotion/styled';

interface NotificationSection {
  heading: string;
  editHeading: string;
  sendBy: SendBy;
  subject: string;
  message: string;
  when: number;
  whenUnit: WhenUnit;
  followupSection: boolean;
  followupDefault?: SendTo;
  offsetDescription: string;
}

interface IErrorMessage {
  isError: boolean;
}

const sections: {
  Confirmation: NotificationSection;
  Reminder: NotificationSection;
  FollowUp: NotificationSection;
} = {
  Confirmation: {
    heading: 'New Registration Confirmation',
    editHeading: 'Edit Registration Confirmation',
    sendBy: SendBy.Email,
    subject: 'Hey { first name }, you succesfully registered for { eWebinar title }',
    message:
      '{ eWebinar title } will start at { eWebinar time }. The subject of the eWebinar is...',
    when: 15,
    whenUnit: WhenUnit.Minutes,
    followupSection: false,
    offsetDescription: ' after Registration',
  },
  Reminder: {
    heading: 'New Reminder',
    editHeading: 'Edit Reminder',
    sendBy: SendBy.Email,
    subject: 'Your eWebinar is about to start!',
    message: '{ first name }, { eWebinar title } is about to start in { eWebinar time left }.',
    when: 15,
    whenUnit: WhenUnit.Minutes,
    followupSection: false,
    offsetDescription: ' before eWebinar starts',
  },
  FollowUp: {
    heading: 'New Follow up',
    editHeading: 'Edit Follow up',
    sendBy: SendBy.Email,
    subject: '{ first name }, thanks for watching!',
    message: `Hope you found { eWebinar title } useful.  If you have any additional questions please reach out, I'd be happy to help.\n\nIf you'd like you can watch the replay here: { ewebinar replay link }.`,
    when: 1,
    whenUnit: WhenUnit.Hours,
    followupSection: true,
    followupDefault: SendTo.AllAttendees,
    offsetDescription: ' after eWebinar ends',
  },
};

const followupOptions = [
  { key: 'a', value: SendTo.AllAttendees, text: 'All' },
  { key: 'b', value: SendTo.DidNotAttend, text: 'Did not attend' },
  { key: 'c', value: SendTo.LeftEarly, text: 'Left Early' },
  { key: 'd', value: SendTo.WatchedUntilEnd, text: 'Watched until the end' },
];

const FieldLabel: React.FC<{ title: string; className?: string }> = ({ title, className }) => (
  <div className={`text-lg text-color-input-field pb-2 ${className}`}>{title}</div>
);

const ErrorMessage: StyledComponent<any, IErrorMessage, any> = styled(
  ({ isError }) =>
    isError && <div className='ui red pointing basic label'>{ERROR_MESSAGE_MAX_CHARACTER}</div>
)``;

const TooltipContent = () => {
  const fieldContents = [
    { name: '{ name }', note: 'Name of the attendee' },
    { name: '{ first name }', note: 'Just their first name' },
    { name: '{ last name }', note: 'Just their last name' },
    { name: '{ ewebinar time }', note: 'The eWebinar scheduled time' },
    { name: '{ ewebinar title }', note: 'The title of the ewebinar' },
    { name: '{ ewebinar link }', note: 'The link to the ewebinar' },
    { name: '{ ewebinar replay link }', note: 'The eWebinar replay link' },
  ];

  return (
    <div className='flex flex-col'>
      <ReactTooltip data-event='click focus hover' id='user-merge-field'>
        <div className='w-full flex flex-col'>
          <div className='text-sm mb-2'>
            You can insert these merge fields in your message - Click the &nbsp;
            <b>{'{ field }'}</b> to copy to you clipboard:
          </div>

          <table>
            <tbody>
              {fieldContents.map((field) => (
                <tr key={field.name}>
                  <td>
                    <CopyToClipboard text={field.name} options={{ message: 'copied!' }}>
                      <span className='cursor-pointer antialiased font-semibold min-6-rem'>
                        {field.name}
                      </span>
                    </CopyToClipboard>
                  </td>
                  <td className='text-xxs pl-6'>{field.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReactTooltip>
    </div>
  );
};

const MessageField: React.FC<any> = ({ sections, type }) => {
  const [errorMaxCharacter, setErrorMaxCharacter] = useState<boolean>(false);
  const { watch } = useFormContext();
  const messageValue = watch('message');
  const sendBy = watch('sendBy');

  const checkCharacterIsValid = (e: any, type?: string) => {
    const hightlightMsg = (window.getSelection() || '').toString();
    const clipboardMsg = (e.clipboardData && e.clipboardData.getData('text/plain')) || '';
    const messageLen =
      type === 'clipboard'
        ? messageValue.length + clipboardMsg.length - hightlightMsg.length
        : messageValue.length;

    setErrorMaxCharacter(false);
    if (sendBy === SendBy.Sms && MAX_CHARACTER - messageLen <= 0) {
      type === 'clipboard' && setErrorMaxCharacter(true);
      e.preventDefault();
    }
  };

  return (
    <>
      {/* subject line */}
      <div
        className={`${
          sendBy === SendBy.Email ? 'h-auto' : 'h-0'
        } overflow-hidden transition-height transition-500 mb-6`}
      >
        <label>
          <div className='flex flex-row justify-between' style={{ alignItems: 'end' }}>
            <FieldLabel className='w-1/2' title='Subject line...' />
            <div
              className='cursor-pointer pointer-events-auto flex w-1/2 justify-end ml-3'
              data-class='bg-gray-2 opacity-100 flex flex-col w-2/3 md:w-1/2 lg:1/3 lg:max-w-25rem ml-4'
              data-tip=''
              data-event='click focus hover'
              data-for='user-merge-field'
            >
              <Info className='' />
              <TooltipContent />
              <span className='ml-2 antialiased font-semibold text-teal-2 text-sm'>
                Fields Legend
              </span>
            </div>
          </div>
          <Form.Field name='subject' component={Input} placeholder={sections[type].subject} />
        </label>
      </div>

      <div>
        <label>
          <FieldLabel title='The message they will see' />
          <Form.Field
            name='message'
            component={Input.textarea}
            onKeyPress={(e: any) => checkCharacterIsValid(e)}
            onPaste={(e: any) => checkCharacterIsValid(e, 'clipboard')}
            placeholder={sections[type].message}
            max={sendBy === SendBy.Sms ? MAX_CHARACTER : null}
          />
          <ErrorMessage isError={errorMaxCharacter} />
          <div
            className={`${
              sendBy === SendBy.Sms ? 'opacity-100' : 'opacity-0'
            } transition-opacity transition-500 flex justify-end`}
          >
            <span className='text-gray-1'>
              Remaining {MAX_CHARACTER - messageValue.length} / {MAX_CHARACTER} characters
            </span>
          </div>
        </label>
      </div>
    </>
  );
};

interface NotificationModalProps {
  showModal: boolean;
  setShowModal: any;
  type: NotificationType;
  notification?: NotificationFragment;
  ewebinar: EWebinarFragment;
  onSubmit: (e?: any) => any;
}

const validationSchema = yup.object().shape({
  message: yup.string().max(MAX_CHARACTER),
});

const NotificationModal: React.FC<NotificationModalProps> = ({
  showModal,
  setShowModal,
  type,
  notification,
  ewebinar,
  onSubmit,
}) => {
  const [updateNotificationMutation] = useUpdateNotificationMutation({
    refetchQueries: () => [{ query: GET_EWEBINAR_NOTIFICATIONS }],
  });

  const [createNotificationMutation] = useCreateNotificationMutation({
    refetchQueries: () => [{ query: GET_EWEBINAR_NOTIFICATIONS }],
  });

  // show modal or not
  if (!showModal) return null;

  // if notification data is provided then user is editing it
  const isEdit = notification !== undefined;

  // specify form default values
  let defaultValues: NotificationInput;

  if (isEdit) {
    defaultValues = Object.assign(notification, {
      ewebinarId: ewebinar.id,
    });
  } else {
    defaultValues = {
      type,
      ewebinarId: ewebinar.id,
      sendBy: sections[type].sendBy,
      whenNumber: sections[type].when, // TODO: Should probably be based on the other notifications already there
      whenUnit: sections[type].whenUnit,
      followUpTo: sections[type].followupDefault,
      subject: sections[type].subject,
      message: sections[type].message,
    };
  }

  return (
    <Modal widthClass='w-9/12'>
      <React.Fragment>
        <Modal.Close onClick={() => setShowModal(false)} />

        <Modal.Title className='flex items-center'>
          <NotificationHeadingIcon />
          <span className='pr-6' />
          {isEdit ? sections[type].editHeading : sections[type].heading}
        </Modal.Title>

        <ApolloForm
          defaultValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={async (data: any) => {
            const input: NotificationInput = Object.assign({}, data);
            input.whenNumber = parseInt(data.whenNumber);

            if (isEdit) {
              // update notification
              await updateNotificationMutation({ variables: { data: input } });
            } else {
              // create notification
              await createNotificationMutation({ variables: { data: input } });
            }

            setShowModal(false);
            onSubmit();
          }}
        >
          <Modal.Body>
            <Form.Field name='ewebinarId' component='input' type='hidden' />
            <Form.Field name='type' component='input' type='hidden' />

            {/* by field */}
            <Form.Field
              name='sendBy'
              component={SendBySelector}
              fieldLabel={<FieldLabel title='Send By' />}
            />

            <div className='mb-6'>
              <FieldLabel title='When' />
              <div className='flex items-center'>
                <Form.Field
                  name='whenNumber'
                  component={Input}
                  className='w-16 mr-6'
                  type='number'
                  min={0}
                  max={60}
                />
                <Form.Field className='w-32' component={Input.timeunit} name='whenUnit' />
                <span className='text-md text-gray-1 ml-6'>{sections[type].offsetDescription}</span>
              </div>
            </div>

            {/* follow up to */}
            {sections[type].followupSection && (
              <div className='relative mb-6 flex'>
                <div>
                  <FieldLabel title='Send this follow up to...' />
                  <Form.Field
                    className='w-64 mr-6'
                    component={Input.dropdown}
                    options={followupOptions}
                    name='followUpTo'
                  />
                </div>
              </div>
            )}

            {/* message */}
            <MessageField sections={sections} type={type} />
          </Modal.Body>
          <Modal.Footer>
            {/* action buttons */}
            <div className='flex justify-between items-center w-full'>
              <Form.ErrorMessage />

              {/* form submit */}
              <Form.SubmitButton
                className='ml-auto appearance-none font-bold rounded-full text-sm text-white bg-blue-3 px-6 py-2 focus:outline-none focus:shadow'
                dirtyText={isEdit ? 'Save Changes' : 'Add Notification'}
                cleanText={isEdit ? 'Close' : 'Add Notification'}
              />
            </div>
          </Modal.Footer>
        </ApolloForm>
      </React.Fragment>
    </Modal>
  );
};

export default NotificationModal;
