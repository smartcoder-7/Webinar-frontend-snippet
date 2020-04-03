import React from 'react';
import { navigate } from '@reach/router';
import queryString from 'query-string';
import Loading from '@src/components/Loading';
import { useAcceptInvitationMutation } from '@src/fromBackend/schema';
import ErrorModal from '@src/components/ErrorModal';

const AcceptInvite: React.FC<any> = ({ location }) => {
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState('');

  const [acceptInvitation] = useAcceptInvitationMutation();

  React.useEffect(() => {
    const acceptInvitationAndRedirect = async () => {
      const { token }: any = location.search && queryString.parse(location.search);
      if (!token) {
        return;
      }
      try {
        await acceptInvitation({ variables: { token } });
        setLoading(false);
        navigate('/complete-your-profile');
      } catch (e) {
        setLoading(false);
        setErrors('Verification error');
      }
    };

    acceptInvitationAndRedirect();
  }, []);

  return loading ? <Loading /> : errors ? <ErrorModal errors={errors} /> : null;
};

export default AcceptInvite;
