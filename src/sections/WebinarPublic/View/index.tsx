import MessageThread from '@src/components/Chat/MessageThread';
import WebinarPlayer, { WebinarPlayerContext } from '@src/components/WebinarPlayer';
import config from '@src/config';
import { useAttendeeJoinWebinarMutation } from '@src/fromBackend/schema';
import linkedin from '@src/images/linkedin.svg';
import ChatSocket from '@src/modules/Socket/ChatSocket';
import Socket from '@src/modules/Socket/Socket';
import React from 'react';

interface Props {
  setId?: string;
  attendeeId?: string;
}

const ChatHost = () => {
  const { ewebinar } = React.useContext(WebinarPlayerContext);
  if (!ewebinar) return null;
  const presenters = ewebinar.presenters || [];
  const presenter = presenters && presenters[0];

  return presenter ? (
    <div className='border-b border-gray-300 p-4 flex items-center'>
      <div
        className='h-10 w-10 bg-gray-2 rounded-full bg-center bg-cover mr-2'
        css={{
          backgroundImage: `url(${presenter.profileMediaUrl})`,
        }}
      />
      <div className='Details mr-5'>
        <div className='text-xs text-blue-3'>Chat host:</div>
        <span className='text-base leading-tight'>{`${presenter.name}`}</span>
      </div>
      <a className='self-end bg-blue-7' href='#'>
        <img style={{ padding: '2px' }} src={linkedin} />
      </a>
    </div>
  ) : null;
};
import Loading from '@src/components/Loading';
const ViewWebinar: React.FC<Props> = ({ setId, attendeeId }) => {
  const [joinWebinar, attendeeQuery] = useAttendeeJoinWebinarMutation();
  React.useEffect(() => {
    attendeeId &&
      joinWebinar({
        variables: { id: attendeeId, joinTime: new Date() },
      });
  }, [setId, attendeeId]);

  if (!attendeeQuery.data || !attendeeQuery.data.attendeeJoinWebinar) {
    console.log({ attendeeQuery });
    return <Loading query={attendeeQuery} />;
  }
  const attendee = attendeeQuery.data.attendeeJoinWebinar;

  if (!attendee.ewebinar) {
    return <Loading query={attendeeQuery} />;
  }

  const onConnect = (socket: ChatSocket): void => {
    socket.send({
      attendee: attendee.attendeeId,
    });
  };

  return (
    <Socket uri={config.CHAT_SERVER_URL} onConnect={onConnect}>
      <WebinarPlayer
        mode={WebinarPlayer.Mode.live}
        ewebinarId={attendee.ewebinar.id}
        attendeeId={attendeeId}
      >
        <WebinarPlayer.Left>
          <WebinarPlayer.Player />
        </WebinarPlayer.Left>
        <div className= "Right w-96 h-full flex flex-col relative">
          <ChatHost />
          <WebinarPlayer.InteractionsStream attendeeId={attendeeId} />

          {attendee && <MessageThread attendee={attendee} />}
        </div>
      </WebinarPlayer>
    </Socket>
  );
};

export default ViewWebinar;
