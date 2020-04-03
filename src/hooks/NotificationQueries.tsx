import gql from 'graphql-tag';

export const NOTIFICATION_FRAGMENT = gql`
  fragment Notification on Notification {
    id
    type
    sendBy
    whenNumber
    whenUnit
    subject
    followUpTo
    message
  }
`;

export const GET_EWEBINAR_NOTIFICATIONS = gql`
  query getEwebinarNotifications($ewebinarId: String!) {
    notifications(ewebinarId: $ewebinarId) {
      ...Notification
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const CREATE_EWEBINAR_NOTIFICATION = gql`
  mutation createNotification($data: NotificationInput!) {
    createNotification(data: $data) {
      ...Notification
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const UPDATE_EWEBINAR_NOTIFICATION = gql`
  mutation updateNotification($data: NotificationInput!) {
    updateNotification(data: $data) {
      ...Notification
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const DELETE_EWEBINAR_NOTIFICATION = gql`
  mutation deleteNotification($id: String!) {
    deleteNotification(id: $id)
  }
`;
