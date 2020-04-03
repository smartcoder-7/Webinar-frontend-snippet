import React, { Fragment } from 'react';
import { AttendedStatistic } from '../Attended/AttendedStatistic';
import Button from '@src/components/ui/Button';
import { navigate } from '@reach/router';
interface IAttended {
  data: object;
}
const Attended = (props: IAttended) => {
  const { data } = props;
  return (
    <Fragment>
      <AttendedStatistic data={data} />
      <Button.analytics onClick={() => navigate('./registrants')}>View attendees</Button.analytics>
    </Fragment>
  );
};

export default Attended;
