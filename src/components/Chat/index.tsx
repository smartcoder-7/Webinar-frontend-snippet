import React, { useState } from 'react';
import {
  EWebinarSetFragment,
  EWebinarFragment,
  useGetEwebinarInteractionsQuery,
} from '@src/fromBackend/schema';
import ConversationList from '@src/components/Chat/ConversationList';
import Loading from '@src/components/Loading';
import WebinarPlayer from '@src/components/WebinarPlayer';
import tw from 'tailwind.macro';
import styled from '@emotion/styled';

const WrapConversation = styled.div`
  ${tw`flex h-full flex absolute z-9999 right-0`}
  max-width: 600px;
`;
const Conversation = styled.div`
  ${tw`mx-auto p-1`}
  @media screen and (max-width: 640px) {
    ${tw`h-full`}
    padding: 0 !important;
    .conversation-wrapper {
      ${tw`w-full`}
      max-width: initial;
    }
  }
`;
export interface ChatProps {
  set?: EWebinarSetFragment;
  showConversations?: boolean;
  ewebinar: EWebinarFragment;
}
export const Chat: React.FC<ChatProps> = ({ set, showConversations = false, ewebinar }) => {
  let [currentSet, setCurrentSet] = useState<string | undefined>(set ? set.id : undefined);
  const changeSet = (newSet: string) => {
    setCurrentSet(newSet);
  };
  const interactionsQuery = useGetEwebinarInteractionsQuery({
    variables: { ewebinarId: ewebinar.id },
  });
  const [stateChatThread, setStateChatThread] = useState(true);

  if (!interactionsQuery.data || !interactionsQuery.data.interactions) {
    return <Loading query={interactionsQuery} />;
  }

  return (
    <Conversation className='container'>
      <WebinarPlayer mode={WebinarPlayer.Mode.edit} ewebinarId={ewebinar.id}>
        <div className=' relative overflow-hidden shadow-lg flex h-full w-full'>
          <div className='Left w-2/3'>
            <div className='relative'>
              <WebinarPlayer.Player />
            </div>
            <WebinarPlayer.Timeline />
          </div>
          <WrapConversation className='conversation-wrapper'>
            <ConversationList
              stateChatThread={stateChatThread}
              setStateChatThread={setStateChatThread}
              setIdFilter={currentSet}
              changeSet={changeSet}
              showConversations={showConversations || true}
            />
          </WrapConversation>
        </div>
      </WebinarPlayer>
    </Conversation>
  );
};
