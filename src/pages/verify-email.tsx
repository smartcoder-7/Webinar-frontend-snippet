import React from 'react';

import Layout from '../components/Layout';
import VerifyEmail from '@src/sections/VerifyEmail';

const verifyEmail = ({ location }: any) => (
  <Layout isPublic={true} location={location}>
    <VerifyEmail location={location} />
  </Layout>
);

export default verifyEmail;
