import css from '@emotion/css';
import React from 'react';
import FixedHeader from '@src/components/FixedHeader';
import Header from '@src/components/Header';
import { useCheckEmptyPasswordQuery, useMeQuery } from '@src/fromBackend/schema';
import UserEditForm from '@src/sections/Profile/UserEditForm';
import { Text } from '@src/components/ui';
import { Link } from '@reach/router';
import Loading from '@src/components/Loading';

interface WelcomeProps {
  firstName: string;
  className?: any;
  isInvitedUser?: boolean | false;
  invitedByUserName?: string;
}

const TextBodyUser = () => (
  <Text.body className='text-lg text-blue-4'>
    Lets <Text className='inline-block pb-2'>Complete your Profile</Text> below then Get Started on
    your first eWebinar.
  </Text.body>
);

const TextBodyInvitedUser: React.FC<{ firstName: string }> = ({ firstName }) => (
  <Text.body className='text-lg text-blue-4'>
    <Text className='inline-block pb-2'>{firstName}</Text> added you to their eWebinar team. Finish
    your profile below...
  </Text.body>
);

const WelcomeSection: React.FunctionComponent<WelcomeProps> = ({
  firstName,
  className,
  isInvitedUser,
  invitedByUserName,
}) => {
  let titleText = `Welcome aboard, ${firstName}!`;
  if (isInvitedUser) {
    titleText = `Welcome to the team, ${firstName}!`;
  }
  return (
    <div className={'container mx-auto flex items-center justify-between' + className}>
      <div className='flex justify-start content-end flex-wrap mt-3'>
        <div className='w-full mb-3'>
          <span className='font-display font-light leading-none text-3xl'>{titleText}</span>
        </div>
        <div className='inline-flex items-center mb-4'>
          {isInvitedUser ? (
            <TextBodyInvitedUser firstName={invitedByUserName ? invitedByUserName : ''} />
          ) : (
            <TextBodyUser />
          )}
        </div>
      </div>

      {!isInvitedUser && (
        <div className='w-40 mt-4 justify-center flex items-center'>
          <Link to='/portal'>
            <Text.body className='text-lg text-gray-1'>I'll do it later</Text.body>
          </Link>
        </div>
      )}
      <div id='navbutton' />
    </div>
  );
};

const CompleteYourProfile: React.FC<any> = ({ className }) => {
  const meQuery = useMeQuery();
  const checkEmptyPasswordQuery = useCheckEmptyPasswordQuery();

  if (!meQuery.data || !meQuery.data.me) return <Loading query={meQuery} />;

  if (!checkEmptyPasswordQuery.data) return <Loading query={checkEmptyPasswordQuery} />;

  const me = meQuery.data.me;

  if (!me.currentTeamRelation) return <Loading />

  const invitedByUser = me.currentTeamRelation.invitedByUser;
  let invitedUserName = invitedByUser
    ? [invitedByUser.firstName, invitedByUser.lastName].join(' ')
    : '';
  return (
    <div
      className={'bg-blue-1 h-full ' + className}
      css={css`
        min-height: 100vh;
      `}
    >
      <FixedHeader>
        <Header />
        <WelcomeSection
          firstName={me.firstName}
          className={className}
          isInvitedUser={checkEmptyPasswordQuery.data.checkEmptyPassword}
          invitedByUserName={invitedUserName}
        />
      </FixedHeader>
      <div
        className='bg-blue-1'
        css={css`
          padding-top: 8rem;
        `}
      />
      <div className='container mx-auto my-8 bg-white px-10 shadow-lg h-auto mt-16'>
        <UserEditForm
          mode={
            checkEmptyPasswordQuery.data.checkEmptyPassword ? 'invited-user-signup' : 'first-signup'
          }
        />
      </div>
    </div>
  );
};

export default CompleteYourProfile;
