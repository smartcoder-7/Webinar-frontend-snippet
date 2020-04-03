import { Router } from '@reach/router';
import Loading from '@src/components/Loading';
import config from '@src/config';
import { useMeQuery, useSetsQuery } from '@src/fromBackend/schema';
import ChatSocket from '@src/modules/Socket/ChatSocket';
import Socket from '@src/modules/Socket/Socket';
import React from 'react';

const Admin = React.lazy(() => import('@src/sections/Dashboard/AdminDashboard'));

const Webinar = React.lazy(() => import('./Webinar'));

const Main = React.lazy(() => import('./Main'));

const Portal: React.FC = () => {
  const meQuery = useMeQuery();
  const setsQuery = useSetsQuery();

  React.useEffect(() => {
    if (!setsQuery.data || !setsQuery.data.sets) {
      return;
    }

    const sets = setsQuery.data.sets;
    const ewebinars = sets.map((s) => s.draftWebinar);

    const isUploading = ewebinars.reduce<boolean>(
      (accumulator, current) =>
        accumulator ||
        (current.uploadStatus && !current.uploadStatus.done && !current.uploadStatus.localUpload)
          ? true
          : false,
      false
    );

    if (isUploading) {
      setsQuery.startPolling(3000);
    } else {
      setsQuery.stopPolling();
    }
  }, [setsQuery]);

  if (!meQuery.data || !meQuery.data.me) {
    return <Loading query={meQuery} />;
  }

  if (!setsQuery.data || !setsQuery.data.sets) {
    return <Loading query={setsQuery} />;
  }

  const me = meQuery.data.me;

  const onConnect = (socket: ChatSocket): void => {
    socket.send({
      token: me.tokens.accessToken,
    });
  };

  return (
    <Socket
      uri={config.CHAT_SERVER_URL}
      onConnect={onConnect}
      options={{ token: me.tokens.accessToken }}
    >
      <React.Suspense fallback={<Loading />}>
        <Router>
          <Admin path='/portal/dashboard/:setId/*' />
          <Webinar path='/portal/webinar/:ewebinarId/*' />
          <Main path='/portal/*' />
        </Router>
      </React.Suspense>
    </Socket>
  );
};

export default Portal;
