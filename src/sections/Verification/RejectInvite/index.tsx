import React from 'react';
import queryString from 'query-string';
import Loading from '@src/components/Loading';
import { useRejectInvitationMutation } from '@src/fromBackend/schema';
import ErrorModal from '@src/components/ErrorModal';
import { Modal } from '@src/components/ui';
import { ReactComponent as CompanyLogo } from '@src/images/icon.svg';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

const RejectInvite: React.FC<any> = ({ location }) => {
  const [showMessage, setShowMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState('');

  const [rejectInvitation] = useRejectInvitationMutation();

  React.useEffect(() => {
    const rejectInvitationAndAlert = async () => {
      const { token }: any = location.search && queryString.parse(location.search);
      if (!token) {
        return;
      }
      try {
        await rejectInvitation({ variables: { token } });
        setLoading(false);
        setShowMessage(true);
      } catch (e) {
        setLoading(false);
        setErrors('Verification error');
      }
    };

    rejectInvitationAndAlert();
  }, []);

  const RejectedMessage = () => (
    <Modal
      className='bg-blue-1'
      widthClass='w-8/12 lg:w-7/12 flex flex-col items-center justify-between'
    >
      <React.Fragment>
        <Modal.Body
          className='p-16'
          css={css`
            max-width: 634px;
          `}
        >
          <div className='flex justify-center items-center mb-3'>
            <CompanyLogo className='w-10' />
            <span className='ml-2 text-3xl leading-10 text-gray-1'>eWebinar</span>
          </div>
          <div className='antialiased font-semibold text-xl leading-normal text-center'>
            You've been rejected the invitation.
            <br />
            Now you can{' '}
            <Link to='/signup' className='text-blue-600'>
              sign up
            </Link>{' '}
            as an admin of your team.
          </div>
        </Modal.Body>
      </React.Fragment>
    </Modal>
  );

  return loading ? (
    <Loading />
  ) : showMessage ? (
    <RejectedMessage />
  ) : errors ? (
    <ErrorModal errors={errors} />
  ) : null;
};

export default RejectInvite;
