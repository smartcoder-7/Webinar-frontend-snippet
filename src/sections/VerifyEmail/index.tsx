import styled from '@emotion/styled-base';
import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
import queryString from 'query-string';
import Loading from '@src/components/Loading';
import { useVerifyTokenMutation } from '@src/fromBackend/schema';
import ErrorModal from '@src/components/ErrorModal';

const VerifyEmail: React.FC<any> = styled(({ location }) => {
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState('');

  const [verifyToken] = useVerifyTokenMutation();

  useEffect(() => {
    let { token }: any = location.search && queryString.parse(location.search);

    if (token) {
      (async () => {
        await verifyToken({
          variables: { token },
        })
          .then(() => {
            navigate('/complete-your-profile');
          })
          .catch(() => {
            setLoading(false);
            setErrors('Error validating email');
          });
      })();
    }
  }, []);

  return loading ? <Loading /> : errors ? <ErrorModal errors={errors} /> : null;
})``;

export default VerifyEmail;
