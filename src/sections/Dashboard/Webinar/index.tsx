import { Router } from '@reach/router';
import FixedHeader from '@src/components/FixedHeader';
import Header from '@src/components/Header';
import Loading from '@src/components/Loading';
import NavBar, { NavbarItemsProps } from '@src/components/NavBar';
import { EWebinarDescriptionFragment, useEwebinarQuery } from '@src/fromBackend/schema';
import Notifications from '@src/sections/Dashboard/Webinar/Notifications';
import Registration from '@src/sections/Dashboard/Webinar/Registration';
import Schedule from '@src/sections/Dashboard/Webinar/Schedule';
import ScheduleSettings from '@src/sections/Dashboard/Webinar/Schedule/ScheduleSettings';
import SetSchedule from '@src/sections/Dashboard/Webinar/Schedule/SetSchedule';
import Settings from '@src/sections/Dashboard/Webinar/Settings';
import ChatSettings from '@src/sections/Dashboard/Webinar/Settings/ChatSettings';
import DisplaySettings from '@src/sections/Dashboard/Webinar/Settings/DisplaySettings';
import Integrations from '@src/sections/Dashboard/Webinar/Settings/Integrations';
import React from 'react';

const Interactions = React.lazy(() => import('@src/sections/Dashboard/Webinar/Interactions'));
import UploadProgress from './UploadProgress';

const Webinar: React.FC<{
  ewebinarId?: string;
  className?: string;
  children?: any;
}> = ({ className, ewebinarId }) => {
  const ewebinarQuery = useEwebinarQuery({ variables: { id: ewebinarId! } });

  if (!ewebinarQuery.data || !ewebinarQuery.data.ewebinar) {
    return <Loading query={ewebinarQuery} />;
  }
  const ewebinar = ewebinarQuery.data.ewebinar;
  const showIntegrations = false;

  return (
    <div className={className}>
      <FixedHeader>
        <Header ewebinar={ewebinar} canEdit={true} />
        <NavBar navbarItems={navbarItems(ewebinar.id)} showButton={true} buttonText='Continue' />
      </FixedHeader>
      <div className='bg-blue-1 py-16 pt-header' style={{ minHeight: '100vh' }}>
        <div className='wide-container  mx-auto'>
          <Router>
            <Interactions path='interactions/*' ewebinarId={ewebinarId} />
          </Router>
        </div>
        <div className='container h-full mx-auto'>
          <React.Suspense fallback={<Loading />}>
            <Router>
              {/* <Interactions path='interactions/*' ewebinarId={ewebinarId} /> */}
              <Notifications path='notifications/*' ewebinar={ewebinar} />
              <Settings path='settings'>
                <DisplaySettings path='display/*' ewebinar={ewebinar} />
                <ChatSettings path='chat/*' ewebinar={ewebinar} />
                {showIntegrations && <Integrations path='integrations/*' ewebinar={ewebinar} />}
              </Settings>
              <Schedule path='schedule'>
                <SetSchedule path='set/*' ewebinar={ewebinar} />
                <ScheduleSettings path='settings/*' ewebinar={ewebinar} />
              </Schedule>
              <Registration path='/registration/*' ewebinar={ewebinar} />
            </Router>
          </React.Suspense>
        </div>
      </div>

      <UploadProgress ewebinar={(ewebinar as any) as EWebinarDescriptionFragment} />
    </div>
  );
};

const navbarItems = (ewebinarId: string): Array<NavbarItemsProps> => {
  return [
    {
      heading: 'Schedule',
      imgInactive: require('@src/images/calendarInactive.svg').default,
      imgActive: require('@src/images/calendarActive.svg').default,
      route: `/portal/webinar/${ewebinarId}/schedule`,
      routeDefault: `/portal/webinar/${ewebinarId}/schedule/set`,
      default: true,
      next: `/portal/webinar/${ewebinarId}/registration/page`,
    },
    {
      heading: 'Registration',
      imgInactive: require('@src/images/registration.svg').default,
      imgActive: require('@src/images/registrationActive.svg').default,
      route: `/portal/webinar/${ewebinarId}/registration`,
      routeDefault: `/portal/webinar/${ewebinarId}/registration/page`,
      next: `/portal/webinar/${ewebinarId}/notifications`,
    },
    {
      heading: 'Notifications',
      imgInactive: require('@src/images/notifications.svg').default,
      imgActive: require('@src/images/notificationsActive.svg').default,
      route: `/portal/webinar/${ewebinarId}/notifications`,
      next: `/portal/webinar/${ewebinarId}/interactions`,
    },
    {
      heading: 'Presentation',
      imgInactive: require('@src/images/video.svg').default,
      imgActive: require('@src/images/videoActive.svg').default,
      route: `/portal/webinar/${ewebinarId}/interactions`,
      next: `/portal/webinar/${ewebinarId}/settings/display`,
    },
    {
      heading: 'Settings',
      imgInactive: require('@src/images/settings.svg').default,
      imgActive: require('@src/images/settingsActive.svg').default,
      route: `/portal/webinar/${ewebinarId}/settings`,
      routeDefault: `/portal/webinar/${ewebinarId}/settings/display`,
      next: ``,
    },
  ];
};

export default Webinar;
