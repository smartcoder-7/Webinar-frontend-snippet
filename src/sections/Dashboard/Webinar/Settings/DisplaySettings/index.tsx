import React, { useState } from 'react';
import ApolloForm from '@src/components/ApolloForm';
import { Form, Text } from '@src/components/ui';
import { Input } from '@src/components/ui/Input';
import { Popup } from 'semantic-ui-react';
import * as yup from 'yup';
import { ReactComponent as Info } from '@src/images/info.svg';
import DropdownPresenter from './DropdownPresenter';

import {
  AttendeeCounterOption,
  AttendeeReactionsOption,
  EWebinarFragment,
  useUpdateEwebinarMutation,
  usePresentersQuery,
} from '@src/fromBackend/schema';
import { useFormContext } from 'react-hook-form';

const attendeeCounterOptions = [
  { value: AttendeeCounterOption.Attending, text: 'Attending (Real time only)' },
  { value: AttendeeCounterOption.Attended, text: 'Attended (Accumulated across all sessions)' },
];

const reactionsOptions = [
  { value: AttendeeReactionsOption.RealTimeOnly, text: 'Real time only' },
  { value: AttendeeReactionsOption.AllReactions, text: 'Accumulated across all sessions' },
];

const validationSchema = yup.object().shape({
  viewerRoomSettings: yup.object().shape({
    attendeeCounter: yup.boolean(),
  }),
  exitRoomSettings: yup.object().shape({
    // redirectLink: yup.string().url(),
  }),
});

const stylePopup = {
  borderRadius: '3px',
  padding: '2rem',
};

export const SettingsTitle: React.FC = ({ children }) => {
  return (
    <div className='border-b border-gray-5 mb-3  flex justify-between items-baseline'>
      <Text.subhead className='mb-5 text-color-input-field text-xl'>{children}</Text.subhead>
    </div>
  );
};

export const SettingsSubtitle: React.FC = ({ children }) => {
  return <Text.subhead className='mb-2'>{children}</Text.subhead>;
};

interface DisplaySettingsProps {
  ewebinar: EWebinarFragment;
}

const DisplaySettings: React.FC<DisplaySettingsProps> = ({ ewebinar }) => {
  const presentersQuery = usePresentersQuery({ variables: {} });
  const allPresenters: any = presentersQuery.data ? presentersQuery.data.presenters : [];

  const displaySettings: Partial<EWebinarFragment> = {
    id: ewebinar.id,
    viewerRoomSettings: ewebinar.viewerRoomSettings,
    exitRoomSettings: ewebinar.exitRoomSettings,
    presenters: ewebinar.presenters,
  };

  let listPresenters: any = ewebinar.presenters;
  const [updateSettings] = useUpdateEwebinarMutation();
  const [presenter1, setPresenter1] = useState(listPresenters[0]);
  const [presenter2, setPresenter2] = useState(
    listPresenters[1] || { default: false, id: '0', name: 'None', profileMediaUrl: '' }
  );
  let listPresenters1: any = [];
  let listPresenters2: any = [{ default: false, id: '0', name: 'None', profileMediaUrl: '' }];

  const setListPresenters = () => {
    if (allPresenters) {
      allPresenters.map((pre: any) => {
        if (pre.id !== presenter2?.id) {
          listPresenters1.push({
            default: pre.id === presenter1?.id,
            id: pre.id,
            name: pre.name,
            profileMediaUrl: pre.profileMediaUrl,
          });
        }
        if (pre.id !== presenter1?.id) {
          if (presenter2?.id !== '0') {
            listPresenters2.push({
              default: pre.id === presenter2?.id,
              id: pre.id,
              name: pre.name,
              profileMediaUrl: pre.profileMediaUrl,
            });
          } else {
            listPresenters2.push({
              default: false,
              id: pre.id,
              name: pre.name,
              profileMediaUrl: pre.profileMediaUrl,
            });
          }
        }
      });
    }
  };
  setListPresenters();
  const changeListSelect = () => {
    listPresenters1 = [];
    listPresenters2 = [{ default: false, id: '0', name: 'None' }];
    setListPresenters();
  };

  const AttenDeeCounterForm = () => {
    const formHandlers = useFormContext();
    const showAttendeeCounter = formHandlers.watch('viewerRoomSettings.attendeeCounter');
    const attendeeCounterOption = formHandlers.watch('viewerRoomSettings.attendeeCounterOption');
    return (
      <div className='my-5'>
        <div className='my-3 flex items-center'>
          <Form.Field
            className='mr-3'
            name={'viewerRoomSettings.attendeeCounter'}
            component={Input.toggleOnOff}
            leftLabel='ON'
            rightLabel='OFF'
          />
          <Text.body>Display Attendee Count</Text.body>
        </div>
        <div className='flex items-center'>
          <div className='w-7/12'>
            <Form.Field
              className={showAttendeeCounter ? '' : 'hidden'}
              name='viewerRoomSettings.attendeeCounterOption'
              placeholder='Choose how to count attendees...'
              component={Input.dropdown}
              checked={attendeeCounterOption}
              options={attendeeCounterOptions}
            />
          </div>
          {showAttendeeCounter && (
            <Popup
              content={
                <div>
                  <div className='mb-3'>
                    Real time means webinar counter is named <b>Attending</b>
                  </div>
                  <div>
                    Accumulated means webinar room counter is named <b>Attended</b>
                  </div>
                </div>
              }
              key='Tip Attendee'
              size='small'
              style={stylePopup}
              position='top center'
              wide
              header=''
              trigger={<Info className='ml-4 cursor-pointer' />}
            />
          )}
        </div>
      </div>
    );
  };
  const AttenDeeReactionsForm = () => {
    const formHandlers = useFormContext();
    const showAttendeeReactions = formHandlers.watch('viewerRoomSettings.attendeeReactions');
    const attendeeReactionsOption = formHandlers.watch(
      'viewerRoomSettings.attendeeReactionsOption'
    );
    return (
      <div className='my-5'>
        <div className='my-3 flex items-center'>
          <Form.Field
            className='mr-3'
            name='viewerRoomSettings.attendeeReactions'
            component={Input.toggleOnOff}
            leftLabel='ON'
            rightLabel='OFF'
          />
          <Text.body>Display attendee reactions</Text.body>
        </div>
        <div className='flex items-center'>
          <div className='w-7/12'>
            <Form.Field
              className={showAttendeeReactions ? '' : 'hidden'}
              name='viewerRoomSettings.attendeeReactionsOption'
              placeholder='Select...'
              component={Input.dropdown}
              checked={attendeeReactionsOption}
              options={reactionsOptions}
            />
          </div>
          {showAttendeeReactions && (
            <Popup
              content={
                <div>
                  <div className='mb-3'>
                    Real time means person sees thumbs up from other people currently live in a
                    session
                  </div>
                  <div>
                    Accumulated means person sees thumbs up from anybody that’s ever thumbs up in
                    any past sessions
                  </div>
                </div>
              }
              key='Tip Attendee'
              position='top center'
              style={stylePopup}
              wide 
              header=''
              trigger={<Info className='ml-4 cursor-pointer' />}
            />
          )}
        </div>
      </div>
    );
  };
  const ExitRoomForm = () => {
    const formHandlers = useFormContext();
    const showRedirectAfterExit = formHandlers.watch('exitRoomSettings.redirectAfterExit');
    return (
      <div className='mt-10 mb-4'>
        <div className='my-3'>
          <Text.subhead className='text-l text-color-input-field font-semibold'>
            Exit Room
          </Text.subhead>
        </div>

        <div className='mb-3 flex items-center'>
          <Form.Field
            className='mr-3'
            name='exitRoomSettings.showReplayLink'
            component={Input.toggleOnOff}
            leftLabel='ON'
            rightLabel='OFF'
          />
          <Text.body className='mb-1'>Display link to watch replay</Text.body>
        </div>

        <div className='mb-3 flex items-center'>
          <Form.Field
            className='mr-3'
            name='exitRoomSettings.redirectAfterExit'
            component={Input.toggleOnOff}
            leftLabel='ON'
            rightLabel='OFF'
          />
          <Text.body className='mb-1'>Link to redirect to after exit room</Text.body>
        </div>
        <div className='w-7/12'>
          <Form.Field
            className=''
            name='exitRoomSettings.redirectLink'
            placeholder='https://'
            component={Input}
            type={showRedirectAfterExit ? '' : 'hidden'}
          />
        </div>
      </div>
    );
  };

  return (
    <ApolloForm
      showUnsavedChangesDialog
      defaultValues={{
        ...displaySettings,
        presenterIds: ewebinar.presenters ? ewebinar.presenters.map(presenter => presenter.id).slice(0, 2): []
      }}
      validationSchema={validationSchema}
      onSubmit={async (data: any) => {
        const { presenterIds = [] } = data;
        // Ignore NULL Presenter ID
        const validPresenterIds = presenterIds? presenterIds.filter((presenterId: any) => !!presenterId) : [];
        const formData = {...data, presenterIds: validPresenterIds}
        await updateSettings({ variables: { data: formData } });
      }}
    >
      <Form.SubmitButton containerId={'navbutton'} />
      <SettingsTitle>Room display settings</SettingsTitle>

      <div className='mt-5'>
        <Text.subhead className='text-l text-color-input-field font-semibold'>
          Presentation Room
        </Text.subhead>

        <AttenDeeCounterForm />
        <AttenDeeReactionsForm />
      </div>
      <div className='mt-10 border-b border-gray-5 mb-3'>
        <div className='mb-3'>
          <Text.subhead className='text-l text-color-input-field font-semibold'>
            Presenters
          </Text.subhead>
        </div>
        <div>
          <Text.body>Presenter 1</Text.body>
        </div>
        <div className='flex items-center border border-solid border-gray-5 rounded w-7/12 mt-3 mb-6'>
          <Form.Field
            className='border-none w-full'
            name='presenterIds.0'
            textDropdown='Select presenter 1'
            component={DropdownPresenter}
            presenters={listPresenters1}
            onSetSelect={(option: string) => {
              setPresenter1(allPresenters.find((pre: any) => pre.id === option));
              changeListSelect();
            }}
          />
        </div>
        <div className='mb-3 mt-5'>
          <Text.body>Presenter 2</Text.body>
        </div>
        <div className='mb-10 flex items-center border border-solid border-gray-5 rounded w-7/12 mt-3 mb-6'>
          <Form.Field
            className='border-none w-full'
            name='presenterIds.1'
            textDropdown='Select presenter 2'
            component={DropdownPresenter}
            presenters={listPresenters2}
            onSetSelect={(option: string) => {
              let selectedOption: any;
              if (option !== '0') {
                selectedOption = allPresenters.find((pre: any) => pre.id === option);
              } else {
                selectedOption = { default: false, id: '0', name: 'None', profileMediaUrl: '' };
              }
              setPresenter2(selectedOption);
              changeListSelect();
            }}
          />
        </div>
      </div>
      <ExitRoomForm />
    </ApolloForm>
  );
};

export default DisplaySettings;
