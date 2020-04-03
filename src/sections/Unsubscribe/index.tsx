import React, { useEffect } from 'react';
import { css } from '@emotion/core';
import { Modal } from '@src/components/ui';
import { useAttendeeOptOutMutation } from '@src/fromBackend/schema';
import Loading from '@src/components/Loading';
import queryString from 'query-string';
import { ReactComponent as CompanyLogo } from '@src/images/icon.svg';

const Unsubscribe: React.FC<any> = ({ location }: any) => {
  //const AttendeeModel = useAttendee()
  /*
  will need to add these params after the BE is sorted out
  company’s name;
  logo
  eWebinar name.
 */
  //need the ewebinarID
  // need to access to the user info from the hook
  // and get the user schama from it
  // const User = useUser()
  // let user = User.get()
  let eWebinarName = '<eWebinarName>';
  let teamName = 'eWebinar';
  let teamLogo = '';

  const [attendeeOptOut, attendeeQuery] = useAttendeeOptOutMutation();

  useEffect(() => {
    let { attendeeId }: any = location.search && queryString.parse(location.search);

    if (attendeeId) {
      attendeeOptOut({
        variables: { id: attendeeId, optOut: true },
      });
    }
  }, []);

  if (!attendeeQuery.data || !attendeeQuery.data.attendeeOptOut) {
    return <Loading query={attendeeQuery} />;
  }

  const attendee = attendeeQuery.data.attendeeOptOut;
  if (attendee.ewebinar) {
    eWebinarName = attendee.ewebinar.title;
  }
  if (attendee.ewebinar && attendee.ewebinar.team) {
    teamName = attendee.ewebinar.team.name ? attendee.ewebinar.team.name : teamName;
    teamLogo = attendee.ewebinar.team.logoMediaUrl ? attendee.ewebinar.team.logoMediaUrl : teamLogo;
  }

  return (
    <div className='unsubscribe'>
      <Modal
        className='bg-blue-1'
        isUnsubscribe={true}
        widthClass='w-8/12 lg:w-7/12 flex flex-col items-center justify-between'
      >
        <React.Fragment>
          <Modal.Body
            className='p-16'
            css={css`
              max-width: 634px;
            `}
          >
            <div className='flex flex-wrap md:flex-no-wrap md:justify-center md:items-center mb-5'>
              {teamLogo ? (
                <img alt='logo' className='w-32 h-auto' src={teamLogo} />
              ) : (
                <CompanyLogo className='w-10' />
              )}
              <span className='ml-2 text-3xl leading-tight text-gray-1 uppercase tracking-wide text-center'>
                {teamName}
              </span>
            </div>
            <div className='antialiased font-semibold text-2xl leading-normal text-center tracking-wider'>
              You've been unsubscribed from further communication about
              <br />
              {eWebinarName}
            </div>
          </Modal.Body>
        </React.Fragment>
      </Modal>
    </div>
  );
};

export default Unsubscribe;
