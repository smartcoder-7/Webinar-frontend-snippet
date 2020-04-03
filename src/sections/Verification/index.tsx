import React from 'react';
import { Router } from '@reach/router';
import AcceptInvite from '@src/sections/Verification/AcceptInvite';
import RejectInvite from '@src/sections/Verification/RejectInvite';

const Verification: React.FC = () => {
  return (
    <Router>
      <AcceptInvite path='/verification/accept-invite' />
      <RejectInvite path='/verification/reject-invite' />
    </Router>
  );
};

export default Verification;
