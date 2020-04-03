import styled from '@emotion/styled-base';
import css from '@emotion/css';
import React from 'react';
import NavBar, { NavbarItemsProps } from '@src/components/NavBar';
import { ReactComponent as Profile } from '@src/images/profile.svg';
import { ReactComponent as Plan } from '@src/images/plan.svg';
import { ReactComponent as Team } from '@src/images/team.svg';
import { ReactComponent as Integrations } from '@src/images/integrations.svg';
import FixedHeader from '@src/components/FixedHeader';
import Header from '@src/components/Header';

interface MainProps {
  children?: any;
  className?: any;
}

const navbarItems: Array<NavbarItemsProps> = [
  {
    heading: 'My Profile',
    icon: Profile,
    route: '/profile/edit',
  },
  {
    heading: 'My Plan',
    icon: Plan,
    route: '/profile/plan',
  },
  {
    heading: 'My Team',
    icon: Team,
    route: '/profile/team',
  },
  {
    heading: 'Integrations',
    icon: Integrations,
    route: '/profile/integrations',
  },
];

const Main: React.FC<MainProps> = styled(({ className, children }) => {
  return (
    <div
      className={'bg-blue-1 h-full ' + className}
      css={css`
        min-height: 100vh;
      `}
    >
      <FixedHeader>
        <Header linkText='Back to eWebinars' />
        <NavBar navbarItems={navbarItems} />
      </FixedHeader>
      <div
        className='bg-blue-1'
        css={css`
          padding-top: 8rem;
        `}
      />
      <div className='container mx-auto my-8 bg-white px-10 shadow-lg h-auto'>{children}</div>
    </div>
  );
})``;

export default Main;
