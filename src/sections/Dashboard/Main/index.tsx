import { Link } from '@reach/router';
import Header from '@src/components/Header';
import FixedHeader from '@src/components/FixedHeader';
import { Button, Text } from '@src/components/ui';
import useUser from '@src/hooks/useUser';
import React from 'react';
import { satisfyWebinarFilter } from '@src/utils/filter';
import CreateEwebinarModal from './CreateEwebinarModal';
import EwebinarList from './EwebinarList';
import ShareWebinarModal from './ShareWebinarModal';
import SearchForm from './SearchForm';
// import config from '@src/config'
import { Data } from '@src/hooks/useApolloEntity';
import {
  EWebinar,
  User,
  UserState,
  useSetsQuery,
  SetsQuery,
  EWebinarDescriptionFragment,
} from '@src/fromBackend/schema';

let welcomeMessages: any = {};

welcomeMessages[UserState.New] = 'Hey {firstName} — Let’s build your first eWebinar!';
welcomeMessages[UserState.HasCreated] = 'Lets publish your first eWebinar, {firstName}!';
welcomeMessages[UserState.HasPublished] = 'Welcome back, {firstName}!';

const UserWelcomeSection = ({ user }: { user: User }) => {
  return (
    <div className='flex justify-between items-center container mx-auto pb-3'>
      <Text.title>{welcomeMessages[user.state].replace('{firstName}', user.firstName)}</Text.title>
      <Link to='new'>
        <button className='appearance-none font-bold rounded-full text-sm text-white bg-blue-3 px-5 py-3  focus:outline-none focus:shadow'>
          {user.state === UserState.New ? (
            <span className='inline-flex items-center'>
              Get started
              <span className='ml-3 text-lg leading-none'>{'➞'}</span>
            </span>
          ) : (
            <span className='inline-flex items-center'>
              Create new eWebinar
              <span className='ml-3 text-lg leading-none'>{'＋'}</span>
            </span>
          )}
        </button>
      </Link>
    </div>
  );
};

const Main: React.FunctionComponent = () => {
  const User = useUser();
  const user: Data<User> = User.get();
  const [showModal, setShowModal] = React.useState(false);
  const setsQuery = useSetsQuery();
  const [ewebinarModalId, setEWebinarModalId] = React.useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = React.useState('');
  const onClose = () => {
    setSearchTerm('');
  };

  const showShareModal = (show: boolean, ewebinar?: EWebinar) => {
    setShowModal(show);
    setEWebinarModalId(ewebinar ? ewebinar.id : undefined);
  };

  // all sets
  const sets = setsQuery.data && setsQuery.data.sets;

  // categorize as published/draft
  let publishedSets: SetsQuery['sets'] = [];
  let draftSets: SetsQuery['sets'] = [];

  // selected ewebinar for sharing
  let ewebinarModal: EWebinarDescriptionFragment | undefined;

  sets?.map((set) => {
    const isPublic = !!set.publicWebinar;
    const webinar = isPublic ? set.publicWebinar! : set.draftWebinar;

    // set selected ewebinar for sharing
    if (ewebinarModalId && webinar.id === ewebinarModalId) {
      ewebinarModal = webinar;
    }

    // filter set
    if (satisfyWebinarFilter(webinar, searchTerm)) {
      isPublic ? publishedSets.push(set) : draftSets!.push(set);
    }
  });

  return (
    <div>
      <FixedHeader>
        <Header className='mb-5' />
        <div className='bg-white'>{user.data && <UserWelcomeSection user={user.data} />}</div>
      </FixedHeader>
      <div className='w-full min-h-screen shadow-inner bg-blue-1 pb-12 pt-48'>
        <div className='container mx-auto'>
          <div className='flex justify-between'>
            {publishedSets && publishedSets.length > 0 ? (
              <Text.subhead>
                Published
                <span className='ml-2 m-l-auto'>({publishedSets.length})</span>
              </Text.subhead>
            ) : (
              <div>{/* this is added to keep search ui aligned */}</div>
            )}

            <div className='flex flex-row'>
              <SearchForm
                searchTerm={searchTerm}
                onHandleSearchTerm={setSearchTerm}
                onClose={onClose}
              />
              <Button className='text-sm text-blue-3'>
                <div onClick={() => setShowModal(true)} className='ml-4 inline-flex items-center'>
                  Share all
                  <img
                    className='ml-3 text-blue-3'
                    src={require('@src/images/share.svg').default}
                  />
                </div>
              </Button>
            </div>
          </div>
          <EwebinarList
            publishedSets={publishedSets}
            draftSets={draftSets}
            showShareModal={showShareModal}
          />
        </div>
      </div>

      <ShareWebinarModal
        showModal={showModal}
        user={user}
        showShareModal={showShareModal}
        ewebinar={ewebinarModal}
      />
      <CreateEwebinarModal />
    </div>
  );
};

export default Main;
