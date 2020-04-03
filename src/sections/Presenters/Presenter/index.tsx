import React, { FunctionComponent } from 'react';
import { Text } from '@src/components/ui';
import Button from '@src/components/ui/Button/index';
import { ReactComponent as CloseIcon } from '@src/images/close.svg';
import { PresenterFragment, InvitationStatus } from '@src/fromBackend/schema';

interface PresenterProps {
  presenter: PresenterFragment;
  openEditPresenter: (presenter: PresenterFragment) => void;
  removePresenter: (id: string) => void;
}

const ProfilePicture: FunctionComponent<{ pictureUrl?: string | null }> = ({ pictureUrl }) => {
  return (
    <div className='cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-full overflow-hidden h-6 w-6  flex items-center justify-center bg-cover'>
      {pictureUrl && <img className='w-6 h-6' src={pictureUrl} />}
    </div>
  );
};

export const Presenter: FunctionComponent<PresenterProps> = ({
  presenter,
  openEditPresenter,
  removePresenter,
}) => {
  let statusText = '';
  if (presenter.user && presenter.user.currentTeamRelation) {
    const invitationStatus = presenter.user.currentTeamRelation.invitationStatus;
    if (invitationStatus === null || invitationStatus === InvitationStatus.Accepted) {
      statusText = 'Active';
    }
  }
  return (
    <div className='flex justify-between py-2 border-b-2 border-gray-200'>
      <div
        className={`w-5/12 flex flex-no-wrap items-center cursor-pointer`}
        onClick={() => {
          openEditPresenter(presenter);
        }}
      >
        <ProfilePicture pictureUrl={presenter.profileMediaUrl} />
        <Text className='text-gray-2 mx-2'>
          {presenter.name}{' '}
          {statusText && presenter.user && presenter.user.currentTeamRelation && (
            <span className='text-coral-1 pl-3'>
              *Also an {statusText} {presenter.user.currentTeamRelation.role}
            </span>
          )}
        </Text>
      </div>
      <div className='w-5/12 flex items-center pl-2'>
        <Text className={`text-gray-2 ${!presenter.bio && 'text-gray-4'}`}>
          {presenter.bio ? `${presenter.bio.substr(0, 50)}...` : 'Not yet filled out'}
        </Text>
      </div>
      <div className='w-2/12 flex items-center justify-end'>
        <Button
          className='font-medium text-blue-3'
          onClick={() => {
            openEditPresenter(presenter);
          }}
        >
          Edit
        </Button>
        <Button
          disabled={presenter.user ? true : false}
          className={presenter.user && 'opacity-0 cursor-default'}
          onClick={() => {
            removePresenter(presenter.id);
          }}
        >
          <CloseIcon className='h-3 px-4' />
        </Button>
      </div>
    </div>
  );
};

export default Presenter;
