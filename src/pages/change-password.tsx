import React from 'react';
import Layout from '../components/Layout';
import ChangePassword from '@src/sections/ChangePassword';

const dashboard = ({ location }: any) => (
  <Layout isPublic={true} location={location}>
    <ChangePassword path='/change-password' />
  </Layout>
);

export default dashboard;
