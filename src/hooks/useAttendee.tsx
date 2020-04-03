import gql from 'graphql-tag';
import { EWEBINAR_FRAGMENT } from '@src/hooks/useEWebinar';
import { INTERACTION_FRAGMENT } from '@src/hooks/useEwebinarInteractions';
import useApolloEntity from './useApolloEntity';
import { EWebinar } from '@src/fromBackend/schema';

const ATTENDEE_FRAGMENT = gql`
  fragment Attendee on Attendee {
    id
    attendeeId {
      visitorId
      startTime
      setId
    }
    firstName
    lastName
    visitorId
    startTime
    optOut
    joinTime
    set {
      id
    }
    ewebinar {
      id
    }
  }
`;

export const GET_ATTENDEE = gql`
  query getAttendee($id: String!) {
    attendee(id: $id) {
      ...Attendee
    }
  }
  ${ATTENDEE_FRAGMENT}
`;

export const REGISTER_ATTENDEE = gql`
  mutation registerAttendee($data: RegisterAttendeeInput!) {
    registerAttendee(data: $data) {
      ...Attendee
    }
  }
  ${ATTENDEE_FRAGMENT}
`;

export const UPDATE_START_TIME = gql`
  mutation updateStartTime($startTime: DateTime!, $id: String!) {
    updateStartTime(startTime: $startTime, id: $id) {
      ...Attendee
    }
  }
  ${ATTENDEE_FRAGMENT}
`;

export const CREATE_VISITOR = gql`
  mutation createVisitor($data: CreateVisitorInput!) {
    createVisitor(data: $data) {
      ...Attendee
    }
  }
  ${ATTENDEE_FRAGMENT}
`;

export const JOIN_WEBINAR = gql`
  mutation attendeeJoinWebinar($id: String!, $joinTime: DateTime!) {
    attendeeJoinWebinar(id: $id, joinTime: $joinTime) {
      ...Attendee
      ewebinar {
        ...EWebinar
        interactions {
          ...Interaction
        }
      }
    }
  }
  ${ATTENDEE_FRAGMENT}
  ${EWEBINAR_FRAGMENT}
  ${INTERACTION_FRAGMENT}
`;
const useAttendee = () => {
  return useApolloEntity({
    useQuery: {
      attendee: {
        query: GET_ATTENDEE,
        extractEntity(data: any): EWebinar | null {
          if (!data || !data.attendee) return null;
          return data.attendee;
        },
      },
    },
    useMutation: {
      create: {
        mutation: REGISTER_ATTENDEE,
      },
      updateStartTime: {
        mutation: UPDATE_START_TIME,
      },
    },
  });
};

export default useAttendee;

export const ATTENDEE_OPTOUT = gql`
  mutation attendeeOptOut($id: String!, $optOut: Boolean!) {
    attendeeOptOut(id: $id, optOut: $optOut) {
      id
      ewebinar {
        title
        team {
          name
          logoMediaUrl
        }
      }
    }
  }
`;
