import gql from 'graphql-tag';
import useApolloEntity from './useApolloEntity';
import { Conversation, Conversations } from '@src/fromBackend/schema';
import { SET_FRAGMENT } from '@src/hooks/SetQueries';

const CONVERSATION_FRAGMENT = gql`
  fragment Conversation on Conversation {
    id
    inEmail
    attendee {
      id
      attendeeFields
      startTime
      firstName
      lastName
      email
    }
    isArchived
    lastReadAt
    isAttendeeLive
    sortDate
    hasUnreadMessages
    lastMessage {
      id
      fromAttendee
      content
      timeSent
    }
    set {
      id
    }
    ewebinar {
      id
    }
    isAttendeeLive
  }
  ${SET_FRAGMENT}
`;

const CONVERSATIONS_FRAGMENT = gql`
  fragment Conversations on Conversations {
    conversations {
      ...Conversation
    }
    total
    nextCursor
  }
  ${CONVERSATION_FRAGMENT}
`;

const MESSAGE_FRAGMENT = gql`
  fragment Message on Message {
    id
    timeSent
    roomType
    timeInRoomSecs
    fromAttendee
    user {
      id
      firstName
      lastName
      profileMediaUrl
    }
    content
  }
`;

export const GET_CONVERSATION = gql`
  query conversation($id: String!) {
    conversation(id: $id) {
      ...Conversation
      messages {
        ...Message
      }
    }
  }
  ${CONVERSATION_FRAGMENT}
  ${MESSAGE_FRAGMENT}
`;

const GET_CONVERSATION_FOR_ATTENDEE = gql`
  query conversationForAttendee($attendeeId: AttendeeIDInput!) {
    conversationForAttendee(attendeeId: $attendeeId) {
      ...Conversation
      messages {
        ...Message
      }
    }
  }
  ${CONVERSATION_FRAGMENT}
  ${MESSAGE_FRAGMENT}
`;

export const GET_CONVERSATIONS = gql`
  query conversations($filters: ConversationFilters!) {
    conversations(filters: $filters) {
      conversations {
        ...Conversation
      }
      total
      nextCursor
    }
  }
  ${CONVERSATIONS_FRAGMENT}
`;

export const ARCHIVE_CONVERSATION = gql`
  mutation ArchiveConversation($id: String!) {
    archiveConversation(id: $id)
  }
`;

export const SEEN_CONVERSATION = gql`
  mutation seenConversation($id: String!) {
    seenConversation(id: $id) {
      ...Conversation
    }
  }
`;

const useConversation = () => {
  return useApolloEntity({
    useQuery: {
      conversation: {
        query: GET_CONVERSATION,
        returnPartialData: true,
        extractEntity(data: any): Conversation | null {
          return data && data.conversation;
        },
      },
      conversations: {
        query: GET_CONVERSATIONS,
        returnPartialData: true,
        extractEntity(data: any): Conversations | null {
          return data && data.conversations;
        },
      },
      conversationForAttendee: {
        query: GET_CONVERSATION_FOR_ATTENDEE,
        extractEntity(data: any): Conversation | null {
          return data && data.conversationForAttendee;
        },
      },
    },
  });
};

export default useConversation;
