import React from 'react';
import { analyticsSectionType } from '@src/utils/enumAnalytics';
import { withProperties } from '@src/utils/type';

import {
  AnalyticsFragment,
  EWebinarFragment,
  useGetAnalyticsQuery,
  useGetEwebinarInteractionsQuery,
  EWebinarSetFragment,
} from '@src/fromBackend/schema';
import Loading from '@src/components/Loading';
import { Router } from '@reach/router';
import AnalyticsChart from '@src/sections/Dashboard/Webinar/Analytics/Chart';
import AnalyticsResult from '@src/sections/Dashboard/Webinar/Analytics/Analytic';
import DashboardFilter from '@src/components/DashboardFilter';
import WebinarPlayer from '@src/components/WebinarPlayer';
import { getDateStringForDashboardFilter } from '@src/utils/date';

export interface AnalyticsState {
  data?: AnalyticsFragment | null;
  currentSection: analyticsSectionType;
  onCurrentSectionChange?: (section: analyticsSectionType) => void;
}

export const Context = React.createContext<AnalyticsState>({
  currentSection: analyticsSectionType.OPEN_RATE,
});

export interface AnalyticsProps {
  ewebinar: EWebinarFragment;
  set: EWebinarSetFragment;
}

const Analytics: React.FC<AnalyticsProps> = ({ set, ewebinar }) => {
  const { from, to, engagement } = React.useContext(DashboardFilter.Context);
  const interactionsQuery = useGetEwebinarInteractionsQuery({
    variables: { ewebinarId: set.id },
  });
  const [currentSection, onCurrentSectionChange] = React.useState<analyticsSectionType>(
    analyticsSectionType.REGISTRATION_RATE
  );

  const analyticsQuery = useGetAnalyticsQuery({ variables: {
    filter: {
      ewebinarSetId: set.id,
      engagement,
      sessionEndDate: getDateStringForDashboardFilter(to),
      sessionStartDate: getDateStringForDashboardFilter(from),
    }
  } });


  if (!interactionsQuery.data || !interactionsQuery.data.interactions) {
    return <Loading query={interactionsQuery} />;
  }

  const state: AnalyticsState = {
    data: analyticsQuery.data ? analyticsQuery.data.analytics : null,
    currentSection,
    onCurrentSectionChange,
  };
  return (
    <Context.Provider value={state}>
      <div className='wide-container h-full mx-auto shadow-lg'>
        <WebinarPlayer mode={WebinarPlayer.Mode.edit} ewebinarId={ewebinar.id}>
          <WebinarPlayer.Left>
            <div className='relative'>
              <Router>
                <AnalyticsChart path='/analytics' />
              </Router>
              <WebinarPlayer.Player />
            </div>
            <WebinarPlayer.Timeline />
          </WebinarPlayer.Left>
          <WebinarPlayer.Right>
            <Router>
              <WebinarPlayer.InteractionsStream path='/interactions' />
              <AnalyticsResult path='/analytics'/>
            </Router>
          </WebinarPlayer.Right>
        </WebinarPlayer>
      </div>
    </Context.Provider>
  );
};

export default withProperties(Analytics, { Context });
