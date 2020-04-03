import { css } from '@emotion/core';
import ApolloForm from '@src/components/ApolloForm';
import { Form, Text } from '@src/components/ui';
import { Input } from '@src/components/ui/Input';
import { ReactComponent as Info } from '@src/images/info.svg';
import React from 'react';
import { EWebinarFragment, useUpdateEwebinarMutation } from '@src/fromBackend/schema';
import timeZones from '@src/utils/timeZones';
import { SettingsTitle } from '@src/sections/Dashboard/Webinar/Settings/DisplaySettings';
import { useFormContext } from 'react-hook-form';

const justInTimeOptions = [
  { value: 15, text: 'Every 15 minutes' },
  { value: 30, text: 'Every 30 minutes' },
];

interface SetScheduleProps {
  ewebinar: EWebinarFragment;
  className?: string;
  path: string;
}

const SetSchedule = ({ ewebinar }: SetScheduleProps) => {
  const [updateWebinar] = useUpdateEwebinarMutation();

  const scheduleSettingsNormalize = (originalData: EWebinarFragment, newData: any) => {
    if (originalData.scheduleSettings) {
      const newEndDate = newData.endDate;
      if (newEndDate.value && newEndDate.checked) {
        newData.endDate = newEndDate.value;
        newData.endDateEnabled = newEndDate.checked;
      } else {
        newData.endDate = originalData.endDate;
        newData.endDateEnabled = originalData.endDateEnabled;
      }
    }
    return newData;
  };

  return (
    ewebinar && (
      <ApolloForm
        showUnsavedChangesDialog
        defaultValues={ewebinar}
        onSubmit={async (data: any) => {
          data = scheduleSettingsNormalize(ewebinar, data);
          await updateWebinar({ variables: { data } });
        }}
      >
        <ContentForm ewebinar={ewebinar} />
      </ApolloForm>
    )
  );
};

interface ContentProps {
  ewebinar: EWebinarFragment;
}

const ContentForm = ({ ewebinar }: ContentProps) => {
  const { watch } = useFormContext();
  const oneTimeEvent = watch('oneTimeEvent');
  const isTimeMode = watch('justInTimeModeEnabled');

  return (
    <div className=''>
      <Form.SubmitButton containerId={'navbutton'} />
      <SettingsTitle>
        <div className='font-medium'>Set the schedule to publish your eWebinar</div>
        <div className='w-full flex flex-col md:flex-row md:justify-between mb-2'>
          <Form.Field
            name='oneTimeEvent'
            component={Input.oneTimeOrRecurringButton}
          />
        </div>
      </SettingsTitle>

      <div className='mb-6'>
        <div className='flex w-full'>
          <div className='w-5/12 mr-4'>
            <div className='mb-1'>
              <Text.body>Timezone</Text.body>
            </div>
            <Form.Field
              name='timeZone'
              search
              component={Input.dropdown}
              options={timeZones}
              placeholder='Choose timezone for webinar'
            />
          </div>

          <div className='w-3/12 lg:w-2/12'>
            <div className='mb-1'>
              <Text.body>Clock format</Text.body>
            </div>
            <Form.Field
              name={'use24HourClock'}
              component={Input.dropdown}
              options={[
                { text: '12 hour', key: false, value: false },
                { text: '24 hour', key: true, value: true },
              ]}
              placeholder='-- hour'
            />
          </div>
        </div>
      </div>

      {!oneTimeEvent && (
        <div className='mb-6'>
          {/* should be fixed by accept today as th defualt value */}
          <div className='mb-1'>
            <Text.body>Start Date</Text.body>
          </div>
          <div className='w-5/12'>
            <Form.Field name='startDate' component={Input.calendarInput} />
          </div>
        </div>
      )}
      {!oneTimeEvent && (
        <div className='mb-6'>
          <Text.body className='mb-1'>End Date</Text.body>
          <div className='w-5/12'>
            <Form.Field
              name='endDate'
              checked={ewebinar.endDateEnabled}
              toggle
              component={Input.calendarInput}
            />
            <Form.Field name='endDateEnabled' component='input' type='hidden' />
          </div>
        </div>
      )}
      {oneTimeEvent && (
        <div className='mb-6'>
          {/* should be fixed by accept today as th defualt value */}
          <div className='mb-1'>
            <Text.body>Event Date</Text.body>
          </div>
          <div className='w-5/12'>
            <Form.Field name='startDate' component={Input.calendarInput} />
          </div>
        </div>
      )}
      <div className='border-t border-gray-5 mb-6'/>
      {!oneTimeEvent && (
        <div className='flex flex-col'>
          <Text.subhead
            className='mb-4'
            css={css`
              max-width: 410px;
            `}
          >
            Frequency
          </Text.subhead>

          <div className='w-8/12'>
            <Form.Field
              name='scheduleSettings.onWeekDays'
              component={Input.frequencyCheck}
              placeholder='Selected days of the week'
            />
          </div>
          {/* the chose Everyday will hide all the checkbox */}
        </div>
      )}
      <div>
        <div
          className='mb-6'
          css={
            oneTimeEvent === true &&
            css`
              pointer-events: none;
            `
          }
        >
          <Text.body className='mb-2'>Start times</Text.body>
          <Form.Field
            name='scheduleSettings.atMinutes'
            component={Input.specificTimes}
          />
        </div>
        <div
          className='mb-4'
          css={
            oneTimeEvent === true &&
            css`
              pointer-events: none;
            `
          }
        >
          <Text.body className='mb-2'>Just in time mode</Text.body>
          <div className='flex '>
            <Form.Field
              name='justInTimeModeEnabled'
              component={Input.toggleOnOff}
            />

            <div className='ml-5 flex flex-col w-full pt-1'>
              <Text.body>Intervals of</Text.body>
              <div className='flex items-center mt-2'>
                <div className='w-48'>
                  <Form.Field
                    name='scheduleSettings.justInTimeIntervalMinutes'
                    placeholder='Choose how often'
                    component={Input.dropdown}
                    options={justInTimeOptions}
                    disabled={!isTimeMode}
                  />
                </div>
                <Info className='ml-3' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetSchedule;
