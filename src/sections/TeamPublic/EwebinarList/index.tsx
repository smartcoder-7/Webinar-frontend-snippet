import { Link } from '@reach/router';
import { Text, Button } from '@src/components/ui';
import { navigate } from '@reach/router';
import React from 'react';
import { css } from '@emotion/core';
import {
  EWebinarPublicDescriptionFragment,
  TeamFragment,
  usePublicSetsQuery,
} from '@src/fromBackend/schema';
import Loading from '@src/components/Loading';

const EwebinarListItem: React.FC<{ ewebinar: EWebinarPublicDescriptionFragment }> = ({
  ewebinar,
}) => {
  return (
    <Link
      to={`/webinar/${ewebinar.set.id}/register`}
      className='WebinarListItem bg-white mt-6 p-6 w-full rounded-lg shadow-md flex relative'
    >
      <div className='flex-shrink-0 w-3/12 h-32 pr-4'>
        <div
          className='rounded-lg h-full overflow-hidden'
          css={css`
            background-color: #ccc;
            background-image: url(${ewebinar.registrationPageSettings?.headerSection
              ?.mainMediaUrl});
          `}
        />
      </div>
      <div className='w-9/12 flex flex-col justify-between'>
        <div>
          <div className='flex justify-between'>
            <Text.headline className='mb-2 pr-4 truncate'>{ewebinar.title}</Text.headline>
            <Button.blueRounded onClick={() => navigate(`/webinar/${ewebinar.set.id}`)}>
              {ewebinar.registrationPageSettings!.headerSection!.ctaTopBtnText || 'Register now!'}
            </Button.blueRounded>
          </div>
          <div className='w-9/12 mb-8'>
            <Text.body
              className='overflow-hidden'
              css={css`
                color: #5b5e6d;
              `}
            >
              {ewebinar.registrationPageSettings!.headerSection!.subtitle ||
                'A must attend eWebinar.'}
            </Text.body>
          </div>
        </div>
        <div className='Details inline-flex items-center w-full justify-between whitespace-no-wrap'>
          {ewebinar.presenters && ewebinar.presenters.length > 0 && (
            <Text.body className='text-gray-2'>
              Hosted by{' '}
              <span className='text-gray-3 font-medium'>{ewebinar.presenters[0].name}</span>
            </Text.body>
          )}
          <div className='inline-flex w-1/2'>
            <img src={require('@src/images/calendar.svg').default} alt='calendar svg' />
            <Text.body className='text-blue-3 ml-2'>August 15th, 2019</Text.body>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface Props {
  team: TeamFragment;
}

const EwebinarList: React.FunctionComponent<Props> = ({ team }) => {
  const setsQuery = usePublicSetsQuery({ variables: { teamId: team.id } });
  if (!setsQuery.data || !setsQuery.data.publicSets) {
    return <Loading query={setsQuery} />;
  }
  const sets = setsQuery.data.publicSets;
  const ewebinars = sets.map((s) => s.publicWebinar!);

  return (
    <div>
      {ewebinars.map((ewebinar) => (
        <EwebinarListItem key={ewebinar.id} ewebinar={ewebinar} />
      ))}
    </div>
  );
};

export default EwebinarList;
