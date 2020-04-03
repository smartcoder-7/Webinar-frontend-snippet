import React from 'react';
import { Form, Input } from '@src/components/ui';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import ChatIcon from '@src/images/ChatIcon.svg';
import { FormStateProxy, FormContextValues } from 'react-hook-form';
import _ from 'lodash';
const imgChatIcon = <img src={ChatIcon} />;
import { IoMdArrowUp } from 'react-icons/io';

const ChatSubmit = styled.div`
  ${tw`justify-between p-2 pl-5 pr-5 flex items-center bg-blue-1`}
  .btn-mobile {
    ${tw`hidden`}
  }

  @media screen and (max-width: 640px) {
    button {
      ${tw`flex justify-center items-center w-10 h-10`}
      font-size: 1.5rem !important;
      border-radius: 50% !important;
    }
    .btn-mobile {
      ${tw`block`}
    }
    .btn {
      ${tw`hidden`}
    }
    .btn-default {
      ${tw`hidden`}
    }
  }
`;

const ChatSubmitW = styled.div`
  ${tw`text-right outline-none `}
`;

const ChatSubmitW1 = styled.div`
  ${tw`w-9/12 outline-none bg-blue-1`}
  caret-color: #39a1b2;
  input {
    border-color: transparent;
    &:focus {
      border-color: transparent;
      box-shadow: initial !important;
    }
  }
`;
const ButtonSendAttendee = styled.button`
  ${tw`flex justify-center items-center appearance-none focus:outline-none bg-blue-3 text-white`}
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
const ButtonSendMod = styled.button`
  ${tw`appearance-none focus:outline-none bg-blue-3 text-white`}
  font-size: 12px;
  line-height: 15px;
  padding: 3px 11px;
  border-radius: 11px;
`;

interface MessageInputBoxProps {
  isOpen?: boolean;
  isAttendee?: boolean;
  onSubmit: (message: string) => any;
  onTypingMessage: () => void;
  stateChatThread?: boolean;
  chattingWith: string;
}
export const MessageInputBox: React.FC<MessageInputBoxProps> = ({
  isOpen,
  onSubmit,
  onTypingMessage,
  isAttendee,
  chattingWith,
}) => {
  /* focus input */
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef]);

  return (
    <Form
      defaultValues={{
        message: '',
      }}
      onSubmit={async (
        values: any,
        _defaultValues?: any,
        _formState?: FormStateProxy,
        formHandlers?: FormContextValues<any>
      ) => {
        await onSubmit(values.message);
        formHandlers && formHandlers.reset();
      }}
    >
      {isOpen ? (
        <ChatSubmit>
          <ChatSubmitW>{imgChatIcon}</ChatSubmitW>
          <ChatSubmitW1>
            <Form.Field.Input
              name='message'
              type='text'
              component={Input}
              className='pt-3 pb-3 bg-transparent border-transparent pr-4 outline-none'
              placeholder={
                isAttendee ? `Ask ${chattingWith} anything...` : `Reply to ${chattingWith}`
              }
              autoComplete='off'
              inputRef={inputRef}
              onChange={_.debounce(onTypingMessage, 500)}
            />
          </ChatSubmitW1>
          <div>
            {isAttendee === false ? (
              <ButtonSendMod type='submit'>
                <IoMdArrowUp className='btn-mobile' />
                <span className='btn-default'>Send</span>
              </ButtonSendMod>
            ) : (
              <ButtonSendAttendee type='submit'>
                <IoMdArrowUp />
              </ButtonSendAttendee>
            )}
          </div>
        </ChatSubmit>
      ) : (
        ''
      )}
    </Form>
  );
};
