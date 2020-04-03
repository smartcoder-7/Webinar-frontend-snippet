import tw from 'tailwind.macro';
import styled from '@emotion/styled';

export const Closed = styled.div`
  cursor: pointer;
  ${tw`absolute w-2`}
  top: 10px;
  right: 10px;
  @media screen and (max-width: 640px) {
    ${tw`hidden`}
  }
`;

export const ChatItemCircle = styled.div`
  ${tw`rounded-full w-10 h-10 flex justify-center items-center`}
  background-color: #D4DDDD;
  color: #537175;
  font-size: 13px;
`;

export const IntroChatEmail = styled.div`
  color: #39a1b2;
`;

export const IntroChatPhone = styled.div`
  ${tw`text-gray-400`}
  color: #AAB3B5;
`;

export const IntroChat = styled.div`
  ${tw`text-sm`}
`;

export const HeadChatBox = styled.div`
  ${tw`flex`}
`;

export const HeadChatBoxLeft = styled.div`
  ${tw`w-1/5 flex justify-center relative`}
`;

export const HeadChatBoxRight = styled.div`
  ${tw`w-4/5`}
`;

export const HeadChatWrap = styled.div`
  ${tw`border-b p-3 pt-6 border-gray-400 relative bg-white`}
  position: sticky;
  top: 0;
  border-left: 0;
  .arrow-back {
    ${tw`hidden self-center font-bold cursor-pointer text-gray-21 text-31/5`}
  }
`;
export const MessageHeader = styled.button`
  ${tw`absolute top-0 w-full flex items-center bg-blue-1 py-4 px-5`}
  .chat-icon {
    ${tw`mr-4 relative`}
  }
  .arrow-up {
    ${tw`absolute`}
    right: 1rem;
  }
  .badge {
    ${tw`absolute w-3 h-3 bg-red-2 rounded-full`}
    right: -1px;
    top: -6px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  }
  span {
    ${tw`text-gray-2`}
  }
`;

export const MessageContent = styled.div`
  ${tw`flex w-full h-full justify-end flex-col`}
  @media screen and (max-width: 640px) {
    .message-input {
      ${tw`sticky bottom-0`}
    }
    .arrow-back {
      display: block !important;
    }
    .btn-close {
      ${tw`hidden`}
    }
  }
`;
