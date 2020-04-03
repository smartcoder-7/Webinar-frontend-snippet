import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Text } from '@src/components/ui';
import { ReactComponent as NotificationHeadingIcon } from '@src/images/notificationHeadingIcon.svg';

import NotificationModal from './NotificationModal';
import NotificationSettingModal from './NotificationSettingModal';
import NotificationSection from './NotificationSetting';
import Loading from '@src/components/Loading';
import {
  EWebinarFragment,
  NotificationFragment,
  NotificationType,
  useDeleteNotificationMutation,
  useGetEwebinarNotificationsQuery,
} from '@src/fromBackend/schema';

interface NotificationsProps {
  ewebinar: EWebinarFragment;
  className?: string;
}

const Notifications: React.FC<NotificationsProps> = styled(({ ewebinar }: NotificationsProps) => {
  const notificationsQuery = useGetEwebinarNotificationsQuery({
    variables: { ewebinarId: ewebinar.id },
  });

  const [showModal, setShowModal] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | undefined>();
  const [selectedNotificationType, setSelectedNotificationType] = useState<NotificationType>();
  const [deleteNotification] = useDeleteNotificationMutation();

  if (!notificationsQuery.data || !notificationsQuery.data.notifications) {
    return <Loading />;
  }

  // notifications
  const notifications: NotificationFragment[] = notificationsQuery.data.notifications;

  console.log('notifications', notifications);

  const handleAddNotification = (type: NotificationType) => {
    setSelectedNotificationId(undefined);
    setSelectedNotificationType(type);
    setShowModal(true);
  };

  const handleAddSettingNotification = () => {
    // setSelectedNotificationId(null)
    setShowSettingModal(true);
  };

  const handleEditNotification = (type: NotificationType, id: string) => {
    setSelectedNotificationId(id);
    setSelectedNotificationType(type);
    setShowModal(true);
  };

  const handleDeleteNotification = async (id: string) => {
    await deleteNotification({ variables: { id } });
    await notificationsQuery.refetch();
  };

  return (
    <div className='p-6 bg-white shadow-lg'>
      <div className='flex justify-between flex-wrap border-b border-gray-5 pb-4'>
        <div className='flex items-center w-full md:w-1/3'>
          <NotificationHeadingIcon />
          <Text.subhead className='pl-4 font-medium'>Registrant notifications</Text.subhead>
        </div>
        <div className='flex-shrink flex items-center antialias font-thin text-sm'>
          <div className=''>
            <span className=' text-gray-2'>From name: </span>
            <span className='font-medium'>{ewebinar.notificationSettings!.fromName}</span>
            {/* need to read from the user info */}
          </div>
          <div className='ml-3'>
            <span className='text-gray-2'>Reply-to email: </span>
            <span className='font-medium'>{ewebinar.notificationSettings!.fromEmail}</span>
            {/* need to read from the user info */}
          </div>
          <button
            type='button'
            className='outline-none'
            onClick={() => handleAddSettingNotification()}
          >
            <Text.body className='ml-3 text-blue-3 text-sm antialiased font-semibold'>
              Edit
            </Text.body>
          </button>
        </div>
      </div>
      {/* notification  sections */}
      <NotificationSection
        heading='Registration Confirmation'
        buttonText='Add a confirmation'
        notifications={notifications}
        type={NotificationType.Confirmation}
        handleAddNotification={handleAddNotification}
        handleEditNotification={handleEditNotification}
        handleDeleteNotification={handleDeleteNotification}
      />
      <NotificationSection
        heading='Reminders (before eWebinar)'
        buttonText='Add a reminder'
        notifications={notifications}
        type={NotificationType.Reminder}
        handleAddNotification={handleAddNotification}
        handleEditNotification={handleEditNotification}
        handleDeleteNotification={handleDeleteNotification}
      />
      <NotificationSection
        heading='Follow ups (after eWebinar)'
        buttonText='Add a follow-up'
        notifications={notifications}
        type={NotificationType.FollowUp}
        handleAddNotification={handleAddNotification}
        handleEditNotification={handleEditNotification}
        handleDeleteNotification={handleDeleteNotification}
      />
      {/* notification modal */}
      <NotificationModal
        showModal={showModal}
        setShowModal={setShowModal}
        type={selectedNotificationType!}
        ewebinar={ewebinar}
        notification={
          selectedNotificationId === undefined
            ? undefined
            : notifications.find((n) => n.id === selectedNotificationId)
        }
        onSubmit={() => notificationsQuery.refetch()}
      />

      {/* NotificationSettingModal */}
      <NotificationSettingModal
        ewebinar={ewebinar}
        showSettingModal={showSettingModal}
        setShowSettingModal={setShowSettingModal}
      />
    </div>
  );
})``;

export default Notifications;
