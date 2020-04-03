import ApolloForm from '@src/components/ApolloForm';
import { Form, Text } from '@src/components/ui';
import { Input } from '@src/components/ui/Input';
import { ReactComponent as Info } from '@src/images/info.svg';
import React, { useState } from 'react';
import { EWebinarFragment, useUpdateEwebinarMutation } from '@src/fromBackend/schema';

interface ScheduleProps {
  ewebinar: EWebinarFragment;
}

interface justInTimeHoursOfOperations {
  day: string;
  times: number[];
}

const ScheduleSettings = ({ ewebinar }: ScheduleProps) => {
  const [updateEWebinar] = useUpdateEwebinarMutation();

  const scheduleSettingsRepair = (originalData: EWebinarFragment, newData: any) => {
    if (originalData.scheduleSettings) {
      const scheduleSettings = originalData.scheduleSettings;
      const endDateEnabled = originalData.endDateEnabled;

      scheduleSettings.blackoutPeriods = (scheduleSettings.blackoutPeriods || []).map(
        ({ __typename, ...blackoutPeriods }) => blackoutPeriods
      );
      scheduleSettings.justInTimeHoursOfOperations = (
        scheduleSettings.justInTimeHoursOfOperations || []
      ).map(({ __typename, ...justInTimeHoursOfOperations }) => justInTimeHoursOfOperations);
      delete scheduleSettings.__typename;

      newData.endDateEnabled = endDateEnabled;
      newData.scheduleSettings.justInTimeHoursOfOperations = (
        newData.scheduleSettings.justInTimeHoursOfOperations || []
      ).filter(
        (justInTimeHoursOfOperation: justInTimeHoursOfOperations) =>
          justInTimeHoursOfOperation.times !== null &&
          justInTimeHoursOfOperation.times[0] &&
          justInTimeHoursOfOperation.times[1]
      );
      newData.scheduleSettings = { ...scheduleSettings, ...newData.scheduleSettings };
    }
    delete newData.onTimeOfOperationCheckbox;
    return newData;
  };

  return (
    <ApolloForm
      showUnsavedChangesDialog
      defaultValues={ewebinar}
      onSubmit={async (data: any) => {
        data = scheduleSettingsRepair(ewebinar, data);
        await updateEWebinar({ variables: { data } });
      }}
    >
      <ContentForm ewebinar={ewebinar} />
    </ApolloForm>
  );
};

interface ContentScheduleSettingProps {
  ewebinar: EWebinarFragment;
}

const ContentForm = ({ ewebinar }: ContentScheduleSettingProps) => {
  const initIsTimeOfOperation =
    ewebinar.justInTimeModeEnabled &&
    (ewebinar.scheduleSettings?.justInTimeHoursOfOperations || []).length > 0;
  const [isTimeOfOperation, setIsTimeOfOperation] = useState(initIsTimeOfOperation);

  return (
    <div className=''>
      <div className='flex justify-between pb-4'>
        <div className='w-full'>
          <div className='pb-6 border-b border-gray-5 mb-3 flex justify-between'>
            <Text.subhead>Schedule settings</Text.subhead>
            <Form.SubmitButton containerId={'navbutton'} />
          </div>
          <div className=''>
            <Text.subhead className='my-6'>Registration form display options</Text.subhead>
            <Text.body className='mb-2 -mt-2'>Number of sessions to display</Text.body>
            <div className='flex items-center mt-2 mb-4'>
              <div className='w-3/12'>
                <Form.Field
                  name='scheduleSettings.numberOfSessions'
                  placeholder='Choose number'
                  component={Input.dropdown}
                  options={[
                    { value: 1, text: '1 session' },
                    { value: 2, text: '2 session' },
                    { value: 3, text: '3 session' },
                    { value: 4, text: '4 session' },
                    { value: 5, text: '5 session' },
                    { value: 6, text: '6 session' },
                  ]}
                />
              </div>
              <Text.note className='text-gray-500 ml-4'>*Description goes here</Text.note>
            </div>

            <Text.body className='mt-6'>Replay Video</Text.body>
            <div className='flex w-full items-center mt-2 border-b border-gray-5 pb-6'>
              <Form.Field
                name='scheduleSettings.showReplaySession'
                component={Input.toggleOnOff}
                leftLabel='ON'
                rightLabel='OFF'
              />
              <Text.note className='text-gray-500 ml-4 mr-6'>*Description goes here</Text.note>
            </div>

            <div className='flex mt-5 items-center'>
              <Text.subhead className=''>Hours of operation</Text.subhead>
              <Info className='ml-3' />
            </div>
            <div className='flex items-center mt-2'>
              <Form.Field
                name='onTimeOfOperationCheckbox'
                optionInitChecked={
                  ewebinar.justInTimeModeEnabled &&
                  (ewebinar.scheduleSettings!.justInTimeHoursOfOperations || []).length > 0
                }
                component={Input.toggleOnOff}
                onChange={(checked: boolean) => setIsTimeOfOperation(checked)}
                leftLabel='ON'
                rightLabel='OFF'
              />
              <Text.note className='text-gray-500 ml-4'>*Description goes here</Text.note>
            </div>
            <div className=''>
              {ewebinar.justInTimeModeEnabled && isTimeOfOperation && (
                <Form.Field
                  name='scheduleSettings.justInTimeHoursOfOperations'
                  component={Input.specificTimesOperation}
                />
              )}
              <Form.Field
                name='scheduleSettings.justInTimeWeekDays'
                component='input'
                type='hidden'
              />
            </div>
            <Form.Field name='justInTimeModeEnabled' component='input' type='hidden' />
          </div>
          <Form.ErrorMessage />
        </div>
      </div>
    </div>
  );
};

export default ScheduleSettings;
