import React, { useState, SyntheticEvent } from 'react';
import Truncate from 'react-truncate';
import Loading from '@src/components/Loading';
import {
  ConversationFragment,
  ConversationTypeFilter,
  useConversationsQuery,
  ConversationFilters,
  useArchiveConversationMutation,
} from '@src/fromBackend/schema';
import MessageThread from '@src/components/Chat/MessageThread';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import imgArrow from '@src/images/arrowRight.svg';
import timeSince from '@src/utils/timeSince';
import moment from 'moment-timezone';
import tw from 'tailwind.macro';
import styled from '@emotion/styled';

const FilterDropdownStyle = styled.div`
  .text {
    ${tw`text-gray-3 text-16/5 mr-3 leading-4.5`}
    font-weight: 300 !important;
  }
  .item .text {
    ${tw`text-16/5`}
  }
`;
const FilterDropdownWrap = styled.div`
  ${tw`justify-between w-full text-sm pt-4 px-4 pb-3 flex flex-no-wrap items-start sticky top-0 bg-white`}
  z-index: 99;
  .chat-title {
    ${tw`text-xl text-gray-3 hidden`}
    line-height: 25px;
  }
`;

const ChatItem = styled.li`
  ${tw`list-opacity-0 cursor-pointer`}
  list-style: none;
  &:first-of-type {
    .list-message {
      ${tw`border-t`}
    }
  }
`;

const ChatItemBox = styled.a`
  ${tw`flex p-3 border-solid border-b border-blue-1`}
  @media screen and (max-width: 640px) {
    padding: 1rem;
    .conversation-avatar {
      width: initial;
      margin-right: 1rem;
    }
    .conversation-content {
      width: 100%;
    }
  }
`;

const ChatItemBoxLeftChild = styled.div`
  ${tw`w-1/5 flex justify-center items-center`}
`;

const ChatItemBoxRightChild = styled.div`
  ${tw`w-4/5`}
`;

const ChatItemCircleProfile = styled.div`
  ${tw`rounded-full w-10 h-10 flex justify-center items-center relative bg-blue-6 text-gray-2 text-16/5`}
`;

const ChatItemDotSigned = styled.div`
  ${tw`absolute rounded-full w-4 h-4 bg-blue-3`}
  left: -5px;
  top: -1px;
`;

const ChatItemHead = styled.div`
  ${tw`flex`}
  > div {
    max-width: 110px;
  }
`;

const ChatItemStatusTime = styled.div`
  ${tw`ml-auto text-17/5 text-gray-18`}
`;

const ChatItemBody = styled.div`
  ${tw`text-17/5 text-gray-18`}
`;

const ConversationContainer = styled.div`
  ${tw`flex flex-row w-full h-full`}
  box-shadow: -4px 0 2px 0 rgba(0,0,0,0.09);
  &.startPosition {
    transform: translateX(calc(100% - 300px));
  }
  &.endPosition {
    transform: translateX(0);
  }
  @media screen and (max-width: 640px) {
    &.startPosition {
      transform: translateX(0);
    }
    .chat-list {
      width: 100%;
    }
    .chat-title {
      display: block !important;
    }
    .menu {
      left: -110% !important;
    }
    .chat-conversation {
      position: absolute;
      width: 100%;
      z-index: 99999;
      height: 100%;
    }
  }
`;

const ChatContainer = styled.div`
  ${tw`border-r h-full bg-white overflow-y-auto border-gray-17`}
  width: 300px;
`;

const ThreadContainer = styled.div`
  ${tw`flex-1`}
  &.none {
    ${tw`hidden`}
  }
`;

const imgTagsArrow = <img src={imgArrow} />;

// filter options
const options = [
  {
    key: 1,
    text: 'Inbox',
    value: ConversationTypeFilter.Inbox,
  },
  {
    key: 2,
    text: 'In live Session',
    value: ConversationTypeFilter.Live,
  },
  {
    key: 3,
    text: 'Unread',
    value: ConversationTypeFilter.Unread,
  },
  {
    key: 4,
    text: 'Archived',
    value: ConversationTypeFilter.Archived,
  },
];

interface ConversationListProps {
  changeSet?: (setId: string) => void;
  setIdFilter?: string;
  showConversations: boolean;
  stateChatThread?: boolean;
  setStateChatThread: (set: boolean) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  setIdFilter,
  changeSet,
  showConversations,
  stateChatThread,
  setStateChatThread,
}) => {
  const [typeFilter, setTypeFilter] = useState(ConversationTypeFilter.Inbox);
  const [isSeek, setIsSeek] = useState(true);
  const [currentConversation, setCurrentConversation] = useState<ConversationFragment | null>(null);
  const filters: ConversationFilters = {
    setId: setIdFilter,
    type: typeFilter,
  };
  const [archiveConversationMutation] = useArchiveConversationMutation();
  // fetch list of conversations
  const conversationsQuery = useConversationsQuery({
    variables: {
      filters,
    },
    fetchPolicy: 'network-only',
  });
  // show loading while fetching
  if (!conversationsQuery.data || !('conversations' in conversationsQuery.data)) {
    return <Loading local query={conversationsQuery} />;
  }

  // conversations
  const conversations = conversationsQuery.data.conversations.conversations;
  const sortedConversations = conversations
    ? conversations.sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime())
    : [];

  // update selected conversation
  const changeConversation = (conversation: ConversationFragment) => {
    if (!currentConversation || conversation.ewebinar.id !== currentConversation.ewebinar.id) {
      changeSet && changeSet(conversation.set.id);
    }
    setCurrentConversation(conversation);
  };
  // archive conversation
  const archiveConversation = async () => {
    await archiveConversationMutation({
      variables: {
        id: currentConversation!.id,
      },
    });
    refetchConversation(true);
    setStateChatThread(true);
  };
  // refresh conversation
  const refetchConversation = async (resetCurrentConversation: boolean) => {
    resetCurrentConversation && setCurrentConversation(null);
    conversationsQuery.refetch &&
      conversationsQuery.refetch({
        filters,
      });
  };
  // handle scroll
  const handleScroll = (event: { target: any }) => {
    let node = event.target;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
    if (bottom) {
      if (!conversationsQuery.data || !conversationsQuery.data.conversations.nextCursor) return;
      conversationsQuery.fetchMore({
        variables: {
          filters: {
            ...filters,
            cursor: conversationsQuery.data && conversationsQuery.data.conversations.nextCursor,
          },
        },
        updateQuery: (prev, next) => {
          return {
            ...prev,
            conversations: {
              ...prev.conversations,
              conversations: [
                ...prev.conversations.conversations,
                ...(next.fetchMoreResult ? next.fetchMoreResult.conversations.conversations : []),
              ],
              nextCursor: next.fetchMoreResult
                ? next.fetchMoreResult.conversations.nextCursor
                : null,
            },
          };
        },
      });
    }
  };

  return (
    <ConversationContainer
      className={stateChatThread ? `startPosition` : `endPosition`}
      onScroll={handleScroll}
    >
      {showConversations && (
        <ChatContainer className='chat-list'>
          <FilterDropdownWrap>
            <span className='chat-title'>Chat</span>
            <FilterDropdownStyle>
              <Dropdown
                inline
                options={options}
                defaultValue={options[0].value}
                selected
                onChange={(_event: SyntheticEvent, data: DropdownProps) => {
                  setTypeFilter(data.value as ConversationTypeFilter);
                  setCurrentConversation(null);
                }}
              />
            </FilterDropdownStyle>
          </FilterDropdownWrap>

          {/* no conversations found for filter */}
          {sortedConversations.length === 0 && (
            <div className='text-center text-gray-1 text-sm mt-6 px-4'>No conversations found</div>
          )}

          {/* print conversatioons */}
          {sortedConversations &&
            sortedConversations.map((conversation: ConversationFragment, index: number) => {
              let lastTimeSent = '';
              const timeSent = conversation.lastMessage ? conversation.lastMessage.timeSent : '';
              if (timeSent) {
                lastTimeSent = timeSince(
                  moment(timeSent)
                    .tz(moment.tz.guess())
                    .toDate()
                );
              }

              const firstName = conversation.attendee.firstName || ' ';
              const lastName = conversation.attendee.lastName || ' ';
              const initials =
                firstName && (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

              return (
                <ChatItem
                  key={index}
                  className={
                    currentConversation && currentConversation.id === conversation.id
                      ? 'bg-blue-1'
                      : ''
                  }
                  onClick={() => {
                    changeConversation(conversation);
                    setStateChatThread(false);
                    setIsSeek && setIsSeek(true);
                  }}
                >
                  <ChatItemBox className='list-message'>
                    <ChatItemBoxLeftChild className='conversation-avatar'>
                      <ChatItemCircleProfile>
                        {conversation.hasUnreadMessages ? <ChatItemDotSigned /> : ''}
                        {initials}
                      </ChatItemCircleProfile>
                    </ChatItemBoxLeftChild>
                    <ChatItemBoxRightChild className='conversation-content'>
                      <ChatItemHead>
                        {conversation.attendee && conversation.attendee.attendeeFields && (
                          <div className='font-medium text-gray-3 truncate'>{`${firstName} ${lastName}`}</div>
                        )}
                        {conversation.isAttendeeLive ? (
                          <ChatItemStatusTime className='text-red-2'>
                            In live session
                          </ChatItemStatusTime>
                        ) : (
                          <ChatItemStatusTime>{lastTimeSent}</ChatItemStatusTime>
                        )}
                        {imgTagsArrow}
                      </ChatItemHead>
                      <ChatItemBody
                        className={
                          conversation.hasUnreadMessages ? 'text-black font-bold' : 'text-gray-18'
                        }
                      >
                        {conversation.lastMessage && (
                          <Truncate lines={2}>{conversation.lastMessage.content}</Truncate>
                        )}
                      </ChatItemBody>
                    </ChatItemBoxRightChild>
                  </ChatItemBox>
                </ChatItem>
              );
            })}
        </ChatContainer>
      )}
      <ThreadContainer className={`chat-conversation ${stateChatThread ? 'none' : 'block'}`}>
        <MessageThread
          setIsSeek={setIsSeek}
          isSeek={isSeek}
          setStateChatThread={setStateChatThread}
          stateChatThread={stateChatThread}
          className='flex flex-1'
          conversationId={currentConversation ? currentConversation.id : undefined}
          archiveConversation={archiveConversation}
          refetchConversation={refetchConversation}
        />
      </ThreadContainer>
    </ConversationContainer>
  );
};

export default ConversationList;
