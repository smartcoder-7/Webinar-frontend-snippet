import config from '@src/config';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: config.GRAPHQL_SERVER_URL
});

const teamForSubdomainQuery = gql`
query teamForSubdomain($subdomain: String!) {
  teamForSubdomain(subdomain: $subdomain) {
    id
    subdomain
  }
}`;

const fetchTeamForSubdomainExist = async (variables: any): Promise<boolean> => {

  return await client.query({
    query: teamForSubdomainQuery,
    variables: variables
  })
  .then(data => { return data.data ? true : false })
  .catch(() => { return false })
}

export const isSubdomainAlreadyExist = (subdomain: string): Promise<boolean> => {
  return fetchTeamForSubdomainExist({ subdomain });
}