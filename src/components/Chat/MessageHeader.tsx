import React from 'react';
import { MessageHeader as MessageHeaderStyled}  from './styled';
import ChatIcon from '@src/images/ChatIcon.svg';
import Arrow from '@src/images/Arrow.svg';

interface MessageHeaderProps {
  toggleChat: () => void;
  scrollToBottom: () => void;
  countNewMessages : number,
  presenterFirstName: string,
  isOpenChat: boolean,
}
export const MessageHeader: React.FC<MessageHeaderProps> = ({
  toggleChat,
  scrollToBottom,
  countNewMessages,
  presenterFirstName,
  isOpenChat
}) => {


  return (
    <MessageHeaderStyled
          onClick={() => {
            toggleChat();
            scrollToBottom();
          }}
        >
          <div className='chat-icon'>
            {countNewMessages > 0 && <div className='badge' />}
            <img src={ChatIcon} />
          </div>
          {!isOpenChat ? (
            <span>
              {countNewMessages
                ? countNewMessages > 10
                  ? '10+ new messages!'
                  : countNewMessages === 1
                  ? countNewMessages + ' new message!'
                  : countNewMessages + ' new messages!'
                : 'Send a message'}{' '}
            </span>
          ) : (
            <span>Chat with host, {presenterFirstName}</span>
          )}
          <div
            className='arrow-up'
            style={{
              transform: !isOpenChat ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          >
            <img src={Arrow} />
          </div>
        </MessageHeaderStyled>
  );
};
