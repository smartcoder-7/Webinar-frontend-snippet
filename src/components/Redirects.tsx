import useUser from '@src/hooks/useUser';
import { navigate } from 'gatsby';
import React from 'react';

export const RedirectIfAuthenticated: React.FC<{}> = () => {
  const userSvc = useUser();
  const user = userSvc.get();
  React.useEffect(() => {
    if (user.called && user.data) {
      navigate('/portal');
    }
  }, [user.data, user.error, user.called]);

  return null;
};

export const RedirectIfUnauthenticated: React.FC<{}> = () => {
  const User = useUser();
  const user = User.get();

  React.useEffect(() => {
    if (user.called && !user.data && !user.loading) {
      navigate('/login');
    }
  }, [user.data, user.error, user.called]);

  return null;
};
