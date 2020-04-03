import {
  SocketChatResponse,
  MessageFragment,
  ConversationQuery,
  Message,
  Conversation,
  ConversationForAttendeeQuery,
  SocketAttendeeResponse,
  SocketUserResponse,
} from '@src/fromBackend/schema';
import { GET_CONVERSATION } from '@src/hooks/useConversation';
import deepCopy from '@src/utils/deepCopy';

export interface TypingList {
  [key: string]: [SocketAttendeeResponse | SocketUserResponse];
}
// create last message & new message structure
export const formatNewMessage = (newMessageData: SocketChatResponse): MessageFragment => {
  return {
    ...newMessageData.message,
    user: {
      ...newMessageData.user,
      __typename: 'User',
    },
    __typename: 'Message',
  } as MessageFragment;
};

// archive conversation flag
export const setArchiveConversationFlag = async (conversationData: any) => {
  conversationData.updateQuery((previousResult: ConversationQuery) => {
    return {
      ...previousResult,
      isArchived: true,
    };
  });
};

// get time in room seconds of last attendee message
export const getTIRCLastAttendeeMesage = (messages: Message[]) => {
  let tirc = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].fromAttendee) {
      tirc = messages[i].timeInRoomSecs;
      break;
    }
  }
  return tirc;
};

// get first moderator message (attendee view)
export const getFirstastModeratorMesage = (messages: Message[]) => {
  let firstModeratorMessage: Message | null = null;
  for (let i = 0; i < messages.length; i++) {
    if (!messages[i].fromAttendee) {
      firstModeratorMessage = messages[i];
      break;
    }
  }
  return firstModeratorMessage;
};

export const updateAttendeeConversation = (
  newMessageData: SocketChatResponse,
  conversation: Conversation | null,
  conversationData: any,
  isOpenChat: boolean,
  setCountNewMessages: (countNewMessages: number) => void,
  countNewMessages: number
) => {
  if (!conversation) {
    // first message of conversation
    conversationData && conversationData.refetch && conversationData.refetch();
  } else {
    // conversation exists
    conversationData &&
      conversationData.updateQuery((previousResult: ConversationForAttendeeQuery) => {
        let newResultCoversation = previousResult.conversationForAttendee;

        // is new message
        const isNewMessage = !newResultCoversation.messages.find((message) => {
          return newMessageData.message && message.id === newMessageData.message.id;
        });

        if (isNewMessage) {
          // add to message list
          newResultCoversation = {
            ...newResultCoversation,
            ...newMessageData.conversation,
            hasUnreadMessages: newMessageData.hasUnreadMessages,
            __typename: 'Conversation',
          };
          newResultCoversation.messages.push(formatNewMessage(newMessageData));
          if (!isOpenChat) {
            setCountNewMessages(countNewMessages + 1);
          }
          newResultCoversation.lastMessage = formatNewMessage(newMessageData);
        }

        return {
          conversationForAttendee: newResultCoversation,
        };
      });
  }
};

export const updateModeratorConversation = async (
  newMessageData: SocketChatResponse,
  conversationData: any,
  refetchConversation: any,
  scrollToBottom : () => void,
  getModeratorConversationResponse: any
) => {
  // selected conversation
  let selectedConversation: ConversationQuery | null;

  try {
    // read particular conversation from cache
    selectedConversation = conversationData.client.cache.readQuery({
      query: GET_CONVERSATION,
      variables: {
        id: newMessageData.conversation.id,
      },
    });
  } catch (e) {
    // read query throws error because object doesn't exist
    // i.e first message of conversation, fetch conversations with current filter from server
    refetchConversation && refetchConversation(false);
    return;
  }
  // deep copy current state of conversation
  selectedConversation = deepCopy(selectedConversation);
  // is new message
  const isNewMessage = !selectedConversation!.conversation.messages.find((message) => {
    return newMessageData.message && message.id === newMessageData.message.id;
  });
  scrollToBottom();
  if (!isNewMessage) return;

  // is filter changed
  const isFilterChanged =
    selectedConversation!.conversation.isArchived !== newMessageData.conversation.isArchived;

  // update conversation data
  selectedConversation = {
    conversation: {
      ...selectedConversation!.conversation,
      ...newMessageData.conversation,
      hasUnreadMessages: newMessageData.hasUnreadMessages,
      __typename: 'Conversation',
    },
  };

  // add new message and last message
  selectedConversation.conversation.messages.push(formatNewMessage(newMessageData));
  selectedConversation.conversation.lastMessage = formatNewMessage(newMessageData);

  // update cache data
  getModeratorConversationResponse.client.writeQuery({
    query: GET_CONVERSATION,
    data: selectedConversation,
    variables: {
      id: newMessageData.conversation.id,
    },
  });

  // refetch conversation when conversation moved from one filter to another
  isFilterChanged && refetchConversation && refetchConversation(true);
};
export const infoUser = (conversation: Conversation | null) => {
  const user = {
    'firstName': (conversation && conversation.attendee.firstName) || ' ',
    'lastName' : (conversation && conversation.attendee.lastName) || ' ',
    'email' : (conversation && conversation.attendee.email) || ' ',
    'phone' :
    conversation && conversation.attendee.attendeeFields['phone']
      ? conversation.attendee.attendeeFields['phone']
      : '',
    'initials' : '',
  };
  user.initials = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
  return user;
};
