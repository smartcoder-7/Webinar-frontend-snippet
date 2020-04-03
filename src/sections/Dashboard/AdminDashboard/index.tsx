import React from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Router, Match } from '@reach/router';
import { Chat } from '@src/components/Chat';
import FilterInteractionResults from '@src/sections/Dashboard/Webinar/Interactions/FilterInteractionResult';
import Header from '@src/components/Header';
import NavBar, { NavbarItemsProps } from '@src/components/NavBar';
import VimeoPlayer from '@src/components/VimeoPlayer';
import { ReactComponent as AnalyticsIcon } from '@src/images/analytics.svg';
import { ReactComponent as ChatIcon } from '@src/images/chatBubble.svg';
import { ReactComponent as InteractionsIcon } from '@src/images/interactions.svg';
import { ReactComponent as RegistrantsIcon } from '@src/images/registrationrate.svg';

import Analytics from '../Webinar/Analytics';
import FixedHeader from '@src/components/FixedHeader';
import { usePublicSetQuery } from '@src/fromBackend/schema';
import Loading, { LoadingErrors } from '@src/components/Loading';
import RegistrantsResults from '../Webinar/RegistrantsResults';
import DashboardFilter from '@src/components/DashboardFilter';

const ChatSection = styled.div`
  ${tw`bg-blue-1 pt-header pb-4 px-4`}
  min-height:100vh;
  @media screen and (max-width: 640px) {
    padding: 7rem 0 0 0 !important;
  }
`;

const AdminDashboard: React.FC<{
  setId?: string;
}> = ({ setId }) => {
  const setQuery = usePublicSetQuery({ variables: { id: setId! } });
  const { isCollapsed } = React.useContext(DashboardFilter.Context);

  if (!setQuery.data || !setQuery.data.publicSet) {
    return <Loading query={setQuery} />;
  }
  const set = setQuery.data.publicSet!;

  if (!set.publicWebinar) {
    return <Loading error={LoadingErrors.WebinarNotAvailable} />;
  }

  const ewebinar = set.publicWebinar;
  const videoId = ewebinar.vimeoVideoId;

  // has unread conversations
  const hasUnreadConversations = ewebinar && ewebinar.unreadConversationsCount > 0;

  if (!videoId) {
    return <Loading />;
  }

  return (
    <div className='bg-white h-100vh'>
      <FixedHeader>
        <Header className='pl-4' ewebinar={ewebinar} />
        <NavBar
          className='pl-12'
          navbarItems={navbarItems(setId!, hasUnreadConversations)}
          showButton={true}
          buttonText='Continue'
        />
        <Match path='/portal/dashboard/:setId/chat'>
          {(props) => (!props.match ? <DashboardFilter.Header /> : null)}
        </Match>
      </FixedHeader>

      {/* delete h-100vh */}
      <ChatSection>
        <div className='w-full h-full mx-auto' style={{ paddingTop: isCollapsed ? 0 : 55 }}>
          <VimeoPlayer controls={false} videoId={videoId}>
            <Router className='w-full h-full'>
              <Chat ewebinar={ewebinar} set={set} path='/chat' />
              <RegistrantsResults set={set} path='/registrants' />
              <FilterInteractionResults set={set} path='/interactions/*' />
              <Analytics ewebinar={ewebinar} set={set} path='/*' />
            </Router>
          </VimeoPlayer>
        </div>

      </ChatSection>
    </div>
  );
};

const navbarItems = (setId: string, hasUnreadConversations: boolean): Array<NavbarItemsProps> => {
  return [
    {
      heading: 'Interactions',
      icon: InteractionsIcon,
      route: `/portal/dashboard/${setId}/interactions`,
      next: `/portal/dashboard/${setId}/interactions`,
    },
    {
      heading: 'Analytics',
      icon: AnalyticsIcon,
      route: `/portal/dashboard/${setId}/analytics`,
      next: `/portal/dashboard/${setId}/analytics`,
    },
    {
      heading: 'Registrants',
      icon: RegistrantsIcon,
      route: `/portal/dashboard/${setId}/registrants`,
      next: `/portal/dashboard/${setId}/registrants`,
    },
    {
      heading: 'Chat',
      icon: ChatIcon,
      route: `/portal/dashboard/${setId}/chat`,
      next: `/portal/dashboard/${setId}/chat`,
      hasUnreadConversations: hasUnreadConversations,
    },
  ];
};

const AdminDashboardWithFilter: React.FC<{
  setId?: string;
}> = ({ setId }) => {
  return (
    <DashboardFilter>
      <AdminDashboard setId={setId} />
    </DashboardFilter>
  );
};

export default AdminDashboardWithFilter;
