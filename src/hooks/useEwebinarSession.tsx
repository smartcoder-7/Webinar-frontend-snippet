import gql from 'graphql-tag';
import useApolloEntity from './useApolloEntity';

const GET_EWEBINAR_SESSION = gql`
  query EwebinarSession($data: EwebinarSessionsInput!) {
    ewebinarSession(data: $data) {
      sessions {
        value
        text
      }
      timeZone
    }
  }
`;

const useEwebinarSession = () => {
  const eWebinarSessionSvc = useApolloEntity({
    useQuery: {
      get: {
        query: GET_EWEBINAR_SESSION,
      },
    },
  });
  return eWebinarSessionSvc;
};

export default useEwebinarSession;
