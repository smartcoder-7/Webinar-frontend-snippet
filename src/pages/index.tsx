import React from 'react';

import Layout from '../components/Layout';
import TeamPublic from '../sections/TeamPublic';

const Index = ({ location }: any) => {
  console.log('location', location);
  return (
    <Layout isPublic={true} location={location}>
      <TeamPublic />
    </Layout>
  );
};

export default Index;
