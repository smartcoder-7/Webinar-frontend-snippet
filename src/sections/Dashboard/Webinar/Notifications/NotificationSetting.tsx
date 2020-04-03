import React from 'react';
import styled from '@emotion/styled';

import { Text } from '@src/components/ui';
import { ReactComponent as Add } from '@src/images/add.svg';
import { ReactComponent as Close } from '@src/images/close.svg';
import { NotificationFragment, NotificationType, SendBy } from '@src/fromBackend/schema';

const sections: {
  [key: string]: any;
} = {
  Confirmation: 'after someone registers',
  Reminder: 'before it starts',
  FollowUp: 'after it ends',
};

interface NotificationSectionProps {
  heading: string;
  buttonText: string;
  notifications: NotificationFragment[];
  type: NotificationType;
  handleAddNotification: (type: NotificationType) => any;
  handleEditNotification: (type: NotificationType, id: string) => any;
  handleDeleteNotification: (id: string) => any;
}

const NotificationSection = styled(
  ({
    heading,
    buttonText,
    notifications = [],
    type,
    handleAddNotification,
    handleEditNotification,
    handleDeleteNotification,
  }: NotificationSectionProps) => {
    const oneTypeNotifications = notifications.filter((notification) => notification.type === type);

    return (
      <div className='pt-6 pb-8'>
        {/* section heading row */}
        <div className='flex pb-2'>
          <span className='w-4/12 pr-2'>
            <span className='Title pr-6 text-lg font-medium'>{heading}</span>
          </span>
          <span className='w-8/12'>
            <button className='flex items-center' onClick={() => handleAddNotification(type)}>
              <Add />
              <span className='pl-4 text-md text-blue-3 font-medium'>{buttonText}</span>
            </button>
          </span>
        </div>

        {/* section notifications */}
        {oneTypeNotifications.map((notification) => (
          <div className='flex ml-8 py-2 border-b-2 border-blue-1' key={notification.id}>
            <span className='w-4/12 pr-2'>
              <Text.body className='text-md text-gray-2'>
                {notification.whenNumber !== 0 ? `${notification.whenNumber} ${notification.whenUnit} ` : 'Right '}
                {sections[notification.type]}
              </Text.body>
            </span>

            <span className='w-5/12'>
              <Text.body className='text-md text-gray-2'>
                an {notification.sendBy === SendBy.Email ? 'Email' : 'SMS'} is sent
              </Text.body>
            </span>

            <button type='button' className='w-1/12 px-2' onClick={() => handleEditNotification(type, notification.id)}>
              <Text.body className='text-md text-blue-3'>Edit</Text.body>
            </button>

            <button type='button' className='w-2/12 px-2 text-md text-blue-3'>
              <Text.body className='text-md text-blue-3'>Send a test</Text.body>
            </button>

            <button
              type='button'
              className='w-1/12 px-2 text-md flex justify-center'
              onClick={() => handleDeleteNotification(notification.id)}
            >
              <Close className='w-3 h-3' />
            </button>
          </div>
        ))}
      </div>
    );
  }
)``;

export default NotificationSection;
