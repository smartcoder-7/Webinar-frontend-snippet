import { Text } from '@src/components/ui';
import cn from 'classnames';
import SEO from '@src/components/SEO';
import React, { ReactElement } from 'react';

import config from '@src/config';
import { Redirect } from '@reach/router';
import Loading from '@src/components/Loading';
import { navigate } from 'gatsby';
import { useMyTeamLazyQuery, useTeamForSubdomainLazyQuery } from '@src/fromBackend/schema';
import { css } from '@emotion/core';
import EwebinarList from '../EwebinarList';

interface Props {
  companyId?: string;
  location?: Location;
}

const Team: React.FC<Props> = ({ companyId, location }): ReactElement => {
  const [getSubdomainTeamQuery, getSubdomainTeamResponse] = useTeamForSubdomainLazyQuery();
  const [getMyTeamQuery, getMyTeamResponse] = useMyTeamLazyQuery();
  let team = null;
  const loc = location!;

  React.useEffect(() => {
    if (!companyId) {
      if (!loc.host || loc.host === config.DOMAIN) {
        // No subdomain
        navigate('/login');
        return;
      }

      // Check for subdomain
      const subdomain: string = loc.host.split('.')[0];
      getSubdomainTeamQuery({ variables: { subdomain } });
    } else {
      getMyTeamQuery({ variables: { id: companyId! } });
    }
  }, [companyId, loc.host]);

  let query: any = getSubdomainTeamResponse;

  if (
    getSubdomainTeamResponse &&
    getSubdomainTeamResponse.data &&
    getSubdomainTeamResponse.data.teamForSubdomain
  ) {
    team = getSubdomainTeamResponse.data.teamForSubdomain;
  }

  if (getMyTeamResponse && getMyTeamResponse.data && getMyTeamResponse.data.myTeam) {
    query = getMyTeamResponse;
    team = getMyTeamResponse.data.myTeam;
  }

  if (query && query.error) {
    return <Redirect to='/login' />;
  }

  if (!team) {
    return <Loading query={query} />;
  }

  return (
    <div className={cn('public-list')}>
      <SEO
        title={`${team ? team.name : 'EWebinar Team'}`}
        image={`${team ? team.logoMediaUrl : ''}`}
      />
      <div className='public-list__header bg-white'>
        <div className='flex flex-row container mx-auto py-6'>
          {team.logoMediaUrl && (
            <img
              src={team.logoMediaUrl}
              alt='logo'
              className='mr-2'
              css={css`
                height: 2.3rem;
              `}
            />
          )}
          <Text.title>Upcoming Webinars</Text.title>
        </div>
      </div>
      <div className='public-list__body w-full min-h-screen shadow-inner bg-blue-1 py-12'>
        <div className='container mx-auto'>
          <EwebinarList team={team} />
        </div>
      </div>
    </div>
  );
};

export default Team;
