import React, { useContext, useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { format } from 'date-fns';
import {
  AttendeeFragment,
  Conversation,
  Message,
  MessageInput,
  AttendeeId,
  useConversationForAttendeeLazyQuery,
  useConversationLazyQuery,
  SocketChatResponse,
  MessageType,
  useSeenConversationMutation,
} from '@src/fromBackend/schema';
import { MessageInputBox } from '@src/components/Chat/MessageInputBox';
import { MessageBubble } from '@src/components/Chat/MessageBubble';
import { MessageHeader } from '@src/components/Chat/MessageHeader';
import { SocketContext } from '@src/modules/Socket/Socket';
import { WebinarPlayerContext } from '@src/components/WebinarPlayer';
import ChatSocket, { WebSocketEventType } from '@src/modules/Socket/ChatSocket';
import Event from '@src/modules/Socket/Event';
import { MessageTyping } from '@src/components/Chat/MessageTyping';
import config from '@src/config';
import Close from '@src/images/close.svg';
import * as MessageStyled from './styled';
import * as FunctionsMessage from './Functions';
import moment from 'moment';
import _ from 'lodash';
import injectWelcomeMessageVariables from '@src/utils/injectVariables/welcomeMessage';
import deepCopy from '@src/utils/deepCopy';

const imgClose = <img src={Close} />;

interface MessageThreadProps {
  conversationId?: string;
  attendee?: AttendeeFragment;
  className?: string;
  archiveConversation?: () => void;
  setStateChatThread?: (set: boolean) => void;
  stateChatThread?: boolean;
  refetchConversation?: (resetConversation: boolean) => void;
  setIsSeek?: (set: boolean) => void;
  isSeek?: boolean;
}

let lastMessageId: string | null = null;

const MessageThread: React.FC<MessageThreadProps> = ({
  conversationId,
  attendee,
  className,
  archiveConversation,
  setStateChatThread,
  stateChatThread,
  refetchConversation,
  isSeek,
  setIsSeek,
}) => {
  const bodyRefThread = React.useRef<HTMLDivElement>(null);
  const timeoutEndPointRef = React.useRef<any>(null);
  const timeoutRef = React.useRef<any>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // webinar player context
  const webinarPlayer = React.useContext(WebinarPlayerContext);
  // socket context
  const socket: ChatSocket = useContext(SocketContext);

  // number of new messages, used for attendee view
  const [countNewMessages, setCountNewMessages] = useState(0);
  // state isOpen for attendee
  const [isOpenChat, setIsOpenChat] = React.useState(false);

  // Open Chat Pop-up when Attendee click to arrow
  const [isOpen, setIsOpen] = React.useState(true);

  // typing messages
  const [typingList, setTypingList] = useState<FunctionsMessage.TypingList>({});
  // is message from attendee
  const isAttendee: boolean = !!attendee;

  // get presenter info
  let presenterFirstName: string = '';
  if (
    webinarPlayer &&
    webinarPlayer.ewebinar &&
    webinarPlayer.ewebinar.presenters &&
    webinarPlayer.ewebinar.presenters.length > 0
  ) {
    presenterFirstName = webinarPlayer.ewebinar.presenters[0].name;
  }
  let conversation: Conversation | null = null;
  let messages: Message[] = [];
  let conversationData: any;

  //mark as read
  const [seenConversationMutation] = useSeenConversationMutation();
  const seenConversation = async (id: string) => {
    await seenConversationMutation({
      variables: {
        id,
      },
    });
  };

  // scroll to bottom
  const scrollToBottom = () => {
    // We should delay to scroll when message rendering .
    if (timeoutEndPointRef.current) clearTimeout(timeoutEndPointRef.current);
    timeoutEndPointRef.current = setTimeout(() => {
      const target = messagesEndRef.current;
      target && target.scrollIntoView({ block: 'center' });
    }, 500);
  };
  // handle scroll
  const handleScroll = (event: { target: any }) => {
    // if attendee don't do anything
    if (isAttendee) return;

    let node = event.target;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
    if (bottom) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        // if has unread messages, mark as read
        conversation && conversation.hasUnreadMessages && seenConversation(conversation.id);
      }, config.SEEN_CONVERSATION_TIMEOUT);
    } else {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  };

  //when Body of thread message have no scroll.
  React.useEffect(() => {
    if (bodyRefThread.current && !bodyRefThread.current.scrollTop && !stateChatThread) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        // if has unread messages, mark as read
        conversation && conversation.hasUnreadMessages && seenConversation(conversation.id);
      }, config.SEEN_CONVERSATION_TIMEOUT);
    } else {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [stateChatThread, messagesEndRef.current]);

  React.useEffect(() => {
    scrollToBottom();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (timeoutEndPointRef.current) clearTimeout(timeoutEndPointRef.current);
    };
  }, [conversationId, messages.length, messagesEndRef.current]);

  // is unique identifier provided
  const isUniqueIdentifierDefined: boolean = !!(conversationId || attendee);

  // fetch conversation data
  const [
    getAttendeeConversationQuery,
    getAttendeeConversationResponse,
  ] = useConversationForAttendeeLazyQuery();
  const [
    getModeratorConversationQuery,
    getModeratorConversationResponse,
  ] = useConversationLazyQuery();

  React.useEffect(() => {
    if (attendee) {
      let attendeeId: AttendeeId = attendee.attendeeId!;
      delete attendeeId.__typename;
      // attendee
      getAttendeeConversationQuery({
        variables: {
          attendeeId,
        },
      });
    } else {
      // moderator
      getModeratorConversationQuery({
        variables: {
          id: conversationId ? conversationId.toString() : '',
        },
      });
    }
  }, [conversationId, JSON.stringify(attendee)]);

  // set conversation data
  conversationData = isAttendee
    ? getAttendeeConversationResponse
    : getModeratorConversationResponse;

  // set conversation
  conversation =
    conversationData && conversationData.data
      ? isAttendee
        ? conversationData.data.conversationForAttendee
        : conversationData.data.conversation
      : null;

  // set messages
  if (conversation) {
    messages = conversation.messages;
  }

  // get time in room seconds of last attendee message
  let tirc = 0;
  if (messages) {
    tirc = FunctionsMessage.getTIRCLastAttendeeMesage(messages);
  }

  // get first moderator message (attendee view)
  let firstModeratorMessage: Message | null = null;
  if (messages) {
    firstModeratorMessage = FunctionsMessage.getFirstastModeratorMesage(messages);
  }

  React.useEffect(() => {
    //seek video from time "tirc"
    tirc = tirc < config.TIME_TO_SEEK ? 0 : tirc;
    if (isSeek) {
      webinarPlayer.setPlaybackPosition && webinarPlayer.setPlaybackPosition(tirc);
    }
  }, [tirc]);

  let timeInWebinarSecs = webinarPlayer.playbackPosition || null;
  if (
    webinarPlayer.playbackPosition &&
    webinarPlayer.duration &&
    webinarPlayer.playbackPosition > webinarPlayer.duration
  ) {
    timeInWebinarSecs = null;
  }
  const sendMessage = (content: string, type: MessageType) => {
    if (type !== MessageType.Typing && !content.trim()) {
      return;
    }
    const now = new Date();

    const message: MessageInput = {
      conversationId,
      fromAttendee: isAttendee,
      timeSent: now,
      timeInWebinarSecs: isAttendee ? timeInWebinarSecs : null,
      content,
      type,
    };

    socket.send({ chat: message });
  };
  const receiveMessage = (e: any) => {
    console.log('MT Got e ', e.data);
    const data: SocketChatResponse = JSON.parse(e.data);
    if (data.typing && conversation && data.conversation.id === conversation.id) {
      const whoTyping = data.typing.fromAttendee ? data.attendee : data.user;
      const currentTyping: FunctionsMessage.TypingList = deepCopy(typingList);
      if (
        currentTyping.hasOwnProperty(data.conversation.id) &&
        whoTyping &&
        _.findIndex(currentTyping[data.conversation.id], whoTyping) === -1
      ) {
        currentTyping[data.conversation.id].push(whoTyping);
      } else if (whoTyping) {
        currentTyping[data.conversation.id] = [whoTyping];
      }
      setTypingList(currentTyping);
    } else if (data.message) {
      const whoEntered = data.message.fromAttendee ? data.attendee : data.user;
      const currentTyping: FunctionsMessage.TypingList = deepCopy(typingList);
      if (
        currentTyping.hasOwnProperty(data.conversation.id) &&
        whoEntered &&
        _.findIndex(currentTyping[data.conversation.id], whoEntered) > -1
      ) {
        const idx = _.findIndex(currentTyping[data.conversation.id], whoEntered);
        currentTyping[data.conversation.id].splice(idx, 1);
        _.size(currentTyping[data.conversation.id]) === 0 &&
          delete currentTyping[data.conversation.id];
      }
      setTypingList(currentTyping);
    }
    // validate data
    if (e.type !== 'message' || !data || !data.message || !data.conversation || !data.user) {
      return;
    }
    // same message
    if (data.message.id === lastMessageId) return;

    // last message
    lastMessageId = data.message.id;

    // conditional cache update
    isAttendee
      ? FunctionsMessage.updateAttendeeConversation(
          data,
          conversation,
          conversationData,
          isOpen,
          setCountNewMessages,
          countNewMessages
        )
      : FunctionsMessage.updateModeratorConversation(
          data,
          conversationData,
          refetchConversation,
          scrollToBottom,
          getModeratorConversationResponse
        );
  };
  const toggleChat = () => {
    setIsOpenChat && setIsOpenChat(!isOpenChat);
    // Set 'hasNewMessage' to false when clicked 'MessageHeader'
    setCountNewMessages(0);
  };
  // read constants
  const infoUser = FunctionsMessage.infoUser(conversation);

  if (isAttendee) {
    className = 'absolute bottom-0 bg-white z-50';
  }
  return (
    <div
      className={`flex w-full justify-end flex-col ${className}
      ${isAttendee ? (!isOpenChat ? 'h-55px' : 'h-2/3') : 'h-full'}
      `}
      style={{
        transform: isAttendee && !isOpenChat ? 'translateY(calc(100% - 55px))' : 'translateY(0)',
        transition: '0.3s all ease',
      }}
    >
      {isAttendee ? (
        <MessageHeader
          toggleChat={toggleChat}
          scrollToBottom={scrollToBottom}
          countNewMessages={countNewMessages}
          presenterFirstName={presenterFirstName}
          isOpenChat={isOpenChat}
        />
      ) : (
        ''
      )}
      <Event event={WebSocketEventType.message} handler={receiveMessage} />
      <MessageStyled.MessageContent>
        {isUniqueIdentifierDefined && (
          <>
            {!isAttendee && (
              <MessageStyled.HeadChatWrap>
                <MessageStyled.Closed
                  onClick={() => setStateChatThread && setStateChatThread(true)}
                >
                  {' '}
                  {imgClose}{' '}
                </MessageStyled.Closed>
                <MessageStyled.HeadChatBox>
                  <MdKeyboardArrowLeft
                    className='arrow-back'
                    onClick={() => setStateChatThread && setStateChatThread(true)}
                  />
                  <MessageStyled.HeadChatBoxLeft>
                    <MessageStyled.ChatItemCircle>{infoUser.initials}</MessageStyled.ChatItemCircle>
                  </MessageStyled.HeadChatBoxLeft>
                  <MessageStyled.HeadChatBoxRight>
                    <MessageStyled.IntroChat>
                      <h6>{infoUser.firstName + ' ' + infoUser.lastName}</h6>
                      <MessageStyled.IntroChatEmail>{infoUser.email}</MessageStyled.IntroChatEmail>
                      <MessageStyled.IntroChatPhone>{infoUser.phone}</MessageStyled.IntroChatPhone>
                    </MessageStyled.IntroChat>
                  </MessageStyled.HeadChatBoxRight>
                </MessageStyled.HeadChatBox>
              </MessageStyled.HeadChatWrap>
            )}
            <div
              ref={bodyRefThread}
              onScroll={handleScroll}
              className={`${
                isAttendee ? (isOpenChat ? 'block pt-20' : 'hidden') : ''
              } p-4 min-h-98 h-full overflow-y-auto bg-white justify-end`}
              css={isOpenChat && { boxShadow: '' }}
            >
              {!isAttendee && conversation && (
                <div className='flex flex-col items-center'>
                  {/* archive conversation */}
                  {!conversation.isArchived && (
                    <button
                      className='appearance-none font-bold rounded-full text-xs text-white bg-blue-3 px-3 py-1 focus:outline-none focus:shadow mb-4'
                      onClick={() => {
                        FunctionsMessage.setArchiveConversationFlag(conversationData);
                        archiveConversation && archiveConversation();
                      }}
                    >
                      Archive conversation
                    </button>
                  )}

                  {/* attended session info */}
                  <div className='flex flex-col items-center text-gray-1 text-xs mb-6'>
                    <div>Session Attended</div>
                    <div>{format(new Date(conversation!.attendee.startTime), 'MMMM d, Y @ p')}</div>
                  </div>
                </div>
              )}

              {/* print messages */}
              {messages && messages.length > 0
                ? messages.map((message, index) => {
                    return (
                      <MessageBubble
                        fromName={
                          message.fromAttendee
                            ? conversation!.attendee.firstName!
                            : message.user!.firstName
                        }
                        setIsSeek={setIsSeek}
                        key={message.id}
                        message={message}
                        isAttendee={isAttendee}
                        isModeratorFirstMessage={
                          !!firstModeratorMessage && firstModeratorMessage!.id === message.id
                        }
                        {...(index - 1 > 0 && { previousMessage: messages[index - 1] })}
                        {...(index === messages.length - 1 ? { divRef: messagesEndRef } : {})}
                      />
                    );
                  })
                : isAttendee &&
                  attendee &&
                  attendee.joinTime && (
                    <MessageBubble
                      fromName={presenterFirstName}
                      setIsSeek={setIsSeek}
                      message={
                        {
                          fromAttendee: false,
                          timeSent: moment(attendee.joinTime)
                            .add(config.WELCOME_MESSAGE_TO_SHOW_AFTER_SECS, 's')
                            .toDate(),
                          content: injectWelcomeMessageVariables(
                            webinarPlayer.ewebinar?.chatSettings?.privateWelcomeMessage || '',
                            attendee
                          ),
                        } as Message
                      }
                      isAttendee={isAttendee}
                      isModeratorFirstMessage={true}
                      isWelcomeMessage={true}
                    />
                  )}
              {conversation && typingList[conversation.id] && (
                <MessageTyping
                  typingList={typingList}
                  conversationId={conversation && conversation.id}
                />
              )}
            </div>

            <div
              className='message-input'
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <MessageInputBox
                isAttendee={isAttendee}
                onSubmit={(message: string) => {
                  if (message && message.trim().length > 0) {
                    sendMessage(message, MessageType.Chat);
                  }
                }}
                onTypingMessage={() => {
                  sendMessage('', MessageType.Typing);
                }}
                isOpen={isOpen}
                stateChatThread={stateChatThread}
                chattingWith={
                  isAttendee
                    ? presenterFirstName
                    : (conversation && conversation.attendee.firstName!) || ''
                }
              />
            </div>
          </>
        )}
      </MessageStyled.MessageContent>
    </div>
  );
};

export default MessageThread;
