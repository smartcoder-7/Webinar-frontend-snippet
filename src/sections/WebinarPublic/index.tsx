import { Router } from '@reach/router';
import React from 'react';
import View from './View';
import Register from "@src/sections/WebinarPublic/Register"
import Unsubscribe from "@src/sections/Unsubscribe"


const WebinarPublic: React.FC = () => {
  return (
    <Router>
      <View path='/webinar/:setId/view/:attendeeId' />
      <Unsubscribe path='/webinar/:setId/unsubscribe/:attendeeId' />
      <Register path='/webinar/:setId/*' />
    </Router>
  );
};

export default WebinarPublic;
