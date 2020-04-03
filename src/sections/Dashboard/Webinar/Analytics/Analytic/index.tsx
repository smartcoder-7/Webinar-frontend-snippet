import React, { FunctionComponent } from 'react';
import _ from 'lodash';
import { Accordion } from '@src/components/ui';
import { ReactComponent as RegistrationRateIcon } from '@src/images/registrationrate.svg';
import { ReactComponent as AttendanceIcon } from '@src/images/attendance.svg';
import { ReactComponent as EngagementIcon } from '@src/images/engagement.svg';
import { Context } from '../index';
import { analyticsSectionType } from '@src/utils/enumAnalytics';
import Attended from './Attended/Attended';
import Engagement from './Engagement/Engagement';
import Registration from './RegistrationRate/Registration';
import AttendanceSub from './Attended/AttendanceSub';
import EngagementSub from './Engagement/EngagementSub';

const sessionKeys: analyticsSectionType[] = [
  analyticsSectionType.REGISTRATION_RATE,
  analyticsSectionType.ATTENDANCE,
  analyticsSectionType.ENGAGEMENT,
];

const Analytic: FunctionComponent<{}> = () => {
  const { onCurrentSectionChange, currentSection, data } = React.useContext(Context);

  if (!data) {
    return null;
  }

  return (
    <Accordion
      initialActiveSection={sessionKeys.indexOf(currentSection)}
      onActiveSectionChange={(index: number) => {
        onCurrentSectionChange && onCurrentSectionChange(sessionKeys[index]);
      }}
    >
      <Accordion.Item
        icon={<RegistrationRateIcon />}
        title='Registration Rate'
        titlePercent={`${_.floor(data.registrationRate!.ratePercent!, 2)}%`}
        titlePercentColor='#477DFF'
      >
        <Registration data={data.registrationRate as any} />
      </Accordion.Item>
      <Accordion.Item
        icon={<AttendanceIcon />}
        title='Attendance'
        titlePercent={`${_.floor(data.attendance!.ratePercent || 0, 2)}%`}
        titlePercentColor='#39a1b2'
        isHasSubContent={true}
        subContent={
          <AttendanceSub
            attendedCounter={
              data.attendance!.live!.stayedToEnd! + data.attendance!.live!.leftEarly!
            }
            watchedCounter={
              data.attendance!.replay!.stayedToEnd! + data.attendance!.replay!.leftEarly!
            }
          />
        }
      >
        <Attended data={data.attendance!} />
      </Accordion.Item>
      <Accordion.Item
        icon={<EngagementIcon />}
        title='Engagement'
        titlePercent={`${_.floor(data.engagement && data.engagement.engagementPercent || 0, 2)}%`}
        isHasSubContent={true}
        titlePercentColor='#f2c075'
        subContent={
          <EngagementSub
            interactionTotal={data.engagement && data.engagement.totalInteractions! || 0}
            reactionTotal={data.engagement && data.engagement.totalReactions! || 0}
          />
        }
      >
        <Engagement data={data.engagement!} />
      </Accordion.Item>
    </Accordion>
  );
};

export default Analytic;
