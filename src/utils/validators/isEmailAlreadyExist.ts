import config from '@src/config';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: config.GRAPHQL_SERVER_URL
});

const isEmailAlreadyExistQuery = gql`
query isEmailAlreadyExist($email: String!) {
  isEmailAlreadyExist(email: $email)
}`;

const fetchEmailAlreadyExist = async (variables: any): Promise<boolean> => {

  return await client.query({
    query: isEmailAlreadyExistQuery,
    variables: variables
  })
  .then(data => { return data.data.isEmailAlreadyExist })
  .catch(() => { return false })
}

export const isEmailAlreadyExist = (email: string): Promise<boolean> => {
  return fetchEmailAlreadyExist({ email });
}