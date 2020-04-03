import React from 'react';
import _ from 'lodash';
import tw from 'tailwind.macro';
import styled from '@emotion/styled';
import {TypingList}  from './Functions';
const TypingMessage = styled.span`
  ${tw`absolute text-xs text-gray-1 bg-white w-100`}
  bottom: 51px; 
  left: 0;
  padding-left: 10px;
`


interface MessageTypingProps {
  typingList: TypingList;
  conversationId: string;
}

export const MessageTyping: React.FC<MessageTypingProps> = ({ typingList, conversationId }) => {
  let usersTyping = '';
  const len = _.size(typingList[conversationId]);
  const firstUser = _.get(typingList[conversationId], 0, { firstName: 'Anomyous' });
  const secondUser = _.get(typingList[conversationId], 1, { firstName: 'Anomyous' });
  if (len > 2) {
    usersTyping = firstUser.firstName + ', ' + secondUser.firstName + ' and someone are typing...';
  } else if (len === 2) {
    usersTyping = firstUser.firstName + ' and ' + secondUser.firstName + ' are typing...';
  } else if (len === 1) {
    usersTyping = firstUser.firstName + ' is typing...';
  }
  return <TypingMessage>{usersTyping}</TypingMessage>;
};
