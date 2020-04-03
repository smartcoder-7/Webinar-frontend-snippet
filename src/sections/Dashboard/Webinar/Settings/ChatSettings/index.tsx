import { Link } from '@reach/router';
import ApolloForm from '@src/components/ApolloForm';
import { Form, Text } from '@src/components/ui';
import { Input } from '@src/components/ui/Input';
import css from '@emotion/css';
import useUser from '@src/hooks/useUser';
import { ReactComponent as Info } from '@src/images/info.svg';
import { ReactComponent as People } from '@src/images/people.svg';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { Popup } from 'semantic-ui-react';
import {
  EWebinarFragment,
  useUpdateEwebinarMutation,
  useMyTeamQuery,
} from '@src/fromBackend/schema';

interface ChatSettingsProps {
  ewebinar: EWebinarFragment;
}

const validationSchema = yup.object().shape({
  enableChat: yup.bool().required(),
  beforeSessionStart: yup.bool(),
  whenMessageReceived: yup.bool(),
});
const stylePopup = {
  borderRadius: '3px',
  padding: '1rem',
};

const ChatSettings = ({ ewebinar }: ChatSettingsProps) => {
  const myTeam: any = useMyTeamQuery();
  const User = useUser();
  const user = User.get();
  const [updateWebinar] = useUpdateEwebinarMutation();
  const ewebinarSet: any = ewebinar.set;
  let moderator = ewebinarSet.moderator || user.data;
  const chatSettingsValue: Partial<EWebinarFragment> = {
    id: ewebinar.id,
    enableChat: ewebinar.enableChat,
    chatSettings: ewebinar.chatSettings,
    set: ewebinar.set,
  };
  let listMyTeam: any = [];
  if (
    myTeam &&
    myTeam.data &&
    myTeam.data.myTeam &&
    myTeam.data.myTeam.users &&
    myTeam.data.myTeam.users.length > 0
  ) {
    myTeam.data.myTeam.users.map((team: any) => {
      listMyTeam.push({
        value: team.user.id,
        text: team.user.firstName + ' ' + team.user.lastName,
      });
    });
  }
  const onChangeData = (data: any) => {
    if (myTeam &&
      myTeam.data &&
      myTeam.data.myTeam &&
      myTeam.data.myTeam.users &&
      myTeam.data.myTeam.users.length > 0) {
      let chooseModerator: any = myTeam.data.myTeam.users.find(
        (team: any) => team.user.id === data
      );
      moderator = chooseModerator.user;
    }
  };
  const ChatSettingsForm = () => {
    const formHandlers = useFormContext();
    const enableChat = formHandlers.watch('enableChat');
    return (
      <div>
        <div className='border-b border-gray-5 flex justify-between items-baseline'>
          <Text.subhead className='mb-5 text-color-input-field text-xl'>Chat settings</Text.subhead>
          <div className='flex items-center'>
            <Form.SubmitButton containerId={'navbutton'} />
            <Text.body className='ml-2'>Enable chat</Text.body>
            <Form.Field
              className='mx-4 flex items-center'
              name='enableChat'
              component={Input.toggleOnOff}
              leftLabel='ON'
              rightLabel='OFF'
            />
            <Popup
              content={
                <div>
                  When chat is disabled, you cannot send or receive messages from your eWebinar.
                </div>
              }
              key='Enable chat'
              size='small'
              style={stylePopup}
              position='bottom center'
              header=''
              trigger={<Info className='cursor-pointer' />}
            />
          </div>
        </div>
        {enableChat ? (
          <div>
            <div className='border-b border-gray-5 py-5'>
              <div className='flex items-center'>
                <Text.body className='text-l text-color-input-field font-semibold'>
                  Moderator
                </Text.body>
                <Popup
                  content={
                    <div>
                      The moderator will get reminder emails and all chat notifications for the
                      eWebinar.
                    </div>
                  }
                  key='Moderator'
                  size='small'
                  style={stylePopup}
                  position='top center'
                  header=''
                  trigger={<Info className='ml-4 cursor-pointer' />}
                />
              </div>
              <div className='flex items-center p-3 border border-solid border-gray-5 rounded w-7/12 mt-3 mb-6'>
                <div
                  className='ProfileImage overflow-hidden bg-blue-1 rounded-full mr-3'
                  css={css`
                    width: 3rem;
                    height: 3rem;
                  `}
                >
                  {moderator && moderator.profileMediaUrl && (
                    <img src={moderator.profileMediaUrl} alt='avatar' />
                  )}
                </div>
                <Text.body className='text-gray-2 ml-5 font-semibold'>
                  {moderator.name || moderator.firstName + ' ' + moderator.lastName}
                </Text.body>
              </div>
              <Text.body>Change moderator</Text.body>
              <div className='flex items-center my-3'>
                <div className='w-7/12'>
                  <Form.Field
                    name='set.moderator.id'
                    placeholder='Select a team member'
                    component={Input.dropdown}
                    options={listMyTeam}
                    onChange={(selected: any) => {
                      onChangeData(selected);
                    }}
                  />
                  <Form.Field className='hidden' name='set.id' component={Input.toggleOnOff} />
                </div>
                <div className='flex w-5/12'>
                  <People className='mx-5' />
                  <Link to='/profile/team'>
                    <Text.body className='text-teal-4'>Manage my team</Text.body>
                  </Link>
                </div>
              </div>
            </div>
            <div className='border-gray-5 py-6'>
              <Text.body className='text-l text-color-input-field mb-2 font-semibold'>
                Moderator email notifications
              </Text.body>
              <div className='flex mt-5 mb-3 items-center'>
                <Form.Field
                  className='flex items-center'
                  name='chatSettings.emailBeforeSession'
                  component={Input.toggleOnOff}
                  leftLabel='ON'
                  rightLabel='OFF'
                />
                <div className='ml-2'>
                  <Text.body>10 minutes before a session starts</Text.body>
                </div>
              </div>
              <div className='flex items-center'>
                <Form.Field
                  className='flex items-center'
                  name='chatSettings.emailOnChatReceive'
                  component={Input.toggleOnOff}
                  leftLabel='ON'
                  rightLabel='OFF'
                />
                <Form.Field
                  className='hidden'
                  name='chatSettings.privateWelcomeMessage'
                  component={Input.toggleOnOff}
                />
                <div className='ml-2'>
                  <Text.body>When a message is received</Text.body>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex justify-center p-5'>
            <Text.body>
              When chat is disabled, you cannot send or receive messages from your eWebinar.
            </Text.body>
          </div>
        )}
      </div>
    );
  };

  return (
    <ApolloForm
      showUnsavedChangesDialog
      defaultValues={chatSettingsValue}
      validationSchema={validationSchema}
      onSubmit={async (data: any) => {
        await updateWebinar({ variables: { data } });
      }}
    >
      <ChatSettingsForm />
    </ApolloForm>
  );
};

export default ChatSettings;
