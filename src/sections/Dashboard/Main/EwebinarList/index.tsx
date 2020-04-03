import { Link } from '@reach/router';
import { ButtonGroup, Dropdown, Text } from '@src/components/ui';
import VideoPreview from '@src/components/VideoPreview';
import { GETS_SETS } from '@src/hooks/useEWebinar';
import React from 'react';
import { css } from '@emotion/core';
import {
  EWebinar,
  useDuplicateMutation,
  EWebinarDescriptionFragment,
  usePublishEwebinarMutation,
  useUnpublishEwebinarMutation,
  useDeleteEwebinarMutation,
  SetsQuery,
} from '@src/fromBackend/schema';

const getPresenterName = (ewebinar: EWebinarDescriptionFragment) => {
  return ewebinar.presenters && ewebinar.presenters[0] && ewebinar.presenters[0].name;
};

const EwebinarListItem: React.FC<{
  draftEwebinar: EWebinarDescriptionFragment;
  publicEwebinar?: EWebinarDescriptionFragment;
  showShareModal: Function;
  isPublishable: boolean;
}> = ({ draftEwebinar, publicEwebinar, showShareModal, isPublishable }) => {
  const [duplicateEwebinarQuery] = useDuplicateMutation({
    refetchQueries: () => [{ query: GETS_SETS }],
  });
  const [publishEwebinarQuery] = usePublishEwebinarMutation({
    refetchQueries: () => [{ query: GETS_SETS }],
  });
  const [unpublishEwebinarQuery] = useUnpublishEwebinarMutation({
    refetchQueries: () => [{ query: GETS_SETS }],
  });
  const [deleteEwebinarQuery] = useDeleteEwebinarMutation({
    refetchQueries: () => [{ query: GETS_SETS }],
  });

  const isPublished = !!publicEwebinar;
  const title = isPublished ? publicEwebinar!.title : draftEwebinar.title;
  const presenterName = getPresenterName(isPublished ? publicEwebinar! : draftEwebinar);
  const mainMediaUrl = draftEwebinar.registrationPageSettings?.headerSection?.mainMediaUrl;

  return (
    <div className='WebinarListItem bg-white mt-6 p-6 w-full rounded-lg shadow-md flex relative'>
      <Link
        to={`/portal/webinar/${draftEwebinar.id}/schedule/set`}
        className='flex-shrink-0 w-3/12 h-32 pr-4'
      >
        <div className='rounded-lg h-full overflow-hidden'>
          {mainMediaUrl ? (
            <div
              className='h-full w-full bg-center bg-cover bg-no-repeat'
              css={css`
                background-color: #ccc;
                background-image: url(${mainMediaUrl});
              `}
            />
          ) : (
            <VideoPreview ewebinar={isPublished ? publicEwebinar! : draftEwebinar} progressOnly />
          )}
        </div>
      </Link>
      <div className=' w-8/12'>
        <div>
          {(!isPublished || isPublishable) && (
            <span className='text-xs text-coral-1' style={{ marginTop: '-0.5rem' }}>
              {!isPublished ? 'Draft' : isPublishable ? 'Has Unpublished Changes' : ''}
            </span>
          )}
        </div>
        <Link to={`/portal/webinar/${draftEwebinar.id}/schedule/set`}>
          <Text.headline className='truncate'>{title}</Text.headline>
        </Link>
        <div className='Details inline-flex items-center mb-4'>
          <Text.body className='text-gray-2 text-sm'>
            Hosted by <span className='text-gray-3 font-medium'>{presenterName}</span>
          </Text.body>

          {/* <Text.body className="text-gray-1">
            <span className="mx-2">{"↻"}</span>
            Every 15 minutes
          </Text.body> */}
        </div>
        <div className='flex items-center'>
          {isPublished && (
            <ButtonGroup>
              <ButtonGroup.Button>
                <div
                  onClick={() => {
                    showShareModal(true, publicEwebinar!);
                  }}
                  className='inline-flex items-center'
                >
                  <img className='mr-2' src={require('@src/images/share.svg').default} />
                  Share
                </div>
              </ButtonGroup.Button>
              <ButtonGroup.Button>
                <Link
                  className='inline-flex items-center'
                  to={`/portal/dashboard/${draftEwebinar.set.id}/analytics`}
                >
                  <img className='mr-2' src={require('@src/images/analytics.svg').default} />
                  Analytics
                </Link>
              </ButtonGroup.Button>
              <ButtonGroup.Button>
                <Link
                  className='inline-flex items-center'
                  to={`/portal/dashboard/${draftEwebinar.set.id}/chat`}
                >
                  <img className='mr-2' src={require('@src/images/chat.svg').default} />
                  {publicEwebinar!.unreadConversationsCount > 0 && (
                    <span className='text-coral-1 mr-2'>
                      {publicEwebinar!.unreadConversationsCount} new{' '}
                    </span>
                  )}
                  Chat
                </Link>
              </ButtonGroup.Button>
            </ButtonGroup>
          )}

          <ButtonGroup>
            <ButtonGroup.Button>
              <Link
                className='inline-flex items-center'
                to={`/portal/webinar/${draftEwebinar.id}/schedule/set`}
              >
                <img className='mr-2' src={require('@src/images/edit.svg').default} />
                Edit
              </Link>
            </ButtonGroup.Button>
            <ButtonGroup.Button className={`${isPublishable ? '' : 'cursor-not-allowed'}`}>
              <div
                onClick={() => {
                  isPublishable &&
                    publishEwebinarQuery({
                      variables: {
                        setId: draftEwebinar.set.id,
                      },
                    });
                }}
                className={`inline-flex items-center ${isPublishable ? '' : 'opacity-40'}`}
              >
                <img className='mr-2' src={require('@src/images/publish.svg').default} />
                Publish
              </div>
            </ButtonGroup.Button>
          </ButtonGroup>
        </div>
      </div>
      <div className='absolute pr-4 right-0 top-0  cursor-pointer'>
        <Dropdown>
          <Dropdown.Reference>
            <div className='text-2xl text-gray-3'>…</div>
          </Dropdown.Reference>
          <Dropdown.Options>
            <div>
              {isPublished && (
                <>
                  <Dropdown.Options.Item>View Registrants</Dropdown.Options.Item>
                  <Dropdown.Options.Item>Edit Schedule</Dropdown.Options.Item>
                </>
              )}
              {!isPublished && (
                <Dropdown.Options.Item
                  onClick={() =>
                    deleteEwebinarQuery({
                      variables: {
                        id: draftEwebinar.id,
                      },
                    })
                  }
                  className='text-coral-1'
                >
                  Delete draft
                </Dropdown.Options.Item>
              )}

              <Dropdown.Options.Item
                onClick={() =>
                  duplicateEwebinarQuery({
                    variables: {
                      setId: draftEwebinar.set.id,
                    },
                  })
                }
              >
                Duplicate
              </Dropdown.Options.Item>

              {isPublished && (
                <Dropdown.Options.Item
                  className='text-coral-1'
                  onClick={() =>
                    unpublishEwebinarQuery({
                      variables: {
                        id: publicEwebinar!.id,
                      },
                    })
                  }
                >
                  Unpublish eWebinar
                </Dropdown.Options.Item>
              )}
            </div>
          </Dropdown.Options>
        </Dropdown>
      </div>
    </div>
  );
};

interface Props {
  publishedSets: SetsQuery['sets'];
  draftSets: SetsQuery['sets'];
  showShareModal: (show: boolean, ewebinar?: EWebinar) => any;
}

const EwebinarList: React.FunctionComponent<Props> = ({
  publishedSets,
  draftSets,
  showShareModal,
}) => {
  return (
    <div>
      <div className='my-6'>
        {publishedSets && publishedSets.length > 0 && (
          <div className='mb-8'>
            {publishedSets.map((publishedSet) => (
              <EwebinarListItem
                key={publishedSet.publicWebinar!.id}
                draftEwebinar={publishedSet.draftWebinar}
                publicEwebinar={publishedSet.publicWebinar!}
                isPublishable={publishedSet.isPublishable}
                showShareModal={showShareModal}
              />
            ))}
          </div>
        )}

        {draftSets && draftSets.length > 0 && (
          <div>
            <Text.subhead>
              Drafts
              <span className='ml-2'>({draftSets.length})</span>
            </Text.subhead>
            <div>
              {draftSets.map((draftSet) => (
                <EwebinarListItem
                  key={draftSet.draftWebinar.id}
                  draftEwebinar={draftSet.draftWebinar}
                  isPublishable={true}
                  showShareModal={showShareModal}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EwebinarList;
