import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useApolloEntity from './useApolloEntity';

export const USER_FRAGMENT = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
    state
    profileMediaUrl
    version
    isVerified
    team {
      id
      name
      subdomain
      logoMediaUrl
      address {
        country
      }
    }
    currentTeamRelation {
      id
      role
      invitationStatus
    }
  }
`;

const ME_FRAGMENT = gql`
  fragment Me on Me {
    id
    firstName
    lastName
    email
    state
    profileMediaUrl
    version
    isVerified
    team {
      id
      name
      subdomain
      logoMediaUrl
      address {
        country
      }
    }
    currentTeamRelation {
      id
      role
      invitationStatus
      invitedByUser {
        id
        firstName
        lastName
      }
    }
    tokens {
      accessToken
    }
  }
`;

export const SKIP_VERIFY_EMAIL = gql`
  mutation skipVerifyEmail {
    skipVerifyEmail {
      ...User
    }
  }
  ${USER_FRAGMENT}
`;

export const ME = gql`
  query me {
    me {
      ...Me
    }
  }
  ${ME_FRAGMENT}
`;

export const CHECK_EMPTY_PASSWORD = gql`
  query checkEmptyPassword {
    checkEmptyPassword
  }
`;

export const UPDATE_ME = gql`
  mutation updateMe($data: UpdateUserAndTeamInput!) {
    updateMe(data: $data) {
      ...Me
    }
  }
  ${ME_FRAGMENT}
`;

export const REGISTER = gql`
  mutation register($data: NewUserAndTeamInput!) {
    registerUserAndTeam(data: $data) {
      ...Me
    }
  }
  ${ME_FRAGMENT}
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...Me
    }
  }
  ${ME_FRAGMENT}
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      ...Me
    }
  }
  ${ME_FRAGMENT}
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;

export const RESEND_CONFIRMATION_EMAIL = gql`
  mutation resendConfirmationEmail {
    resendConfirmationEmail
  }
`;

export const VERIFY_TOKEN = gql`
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      ...Me
    }
  }
  ${ME_FRAGMENT}
`;

export const ACCEPT_INVITATION = gql`
  mutation acceptInvitation($token: String!) {
    acceptInvitation(token: $token) {
      ...Me
    }
  }
  ${ME_FRAGMENT}
`;

export const REJECT_INVITATION = gql`
  mutation rejectInvitation($token: String!) {
    rejectInvitation(token: $token)
  }
`;

const useUser = () => {
  const client = useApolloClient();

  return useApolloEntity<{
    get: any;
  }>({
    useQuery: {
      get: {
        query: ME,
        extractEntity(data: any): any {
          return data && data.me;
        },
      },
    },
    useMutation: {
      register: { mutation: REGISTER },
      login: {
        mutation: LOGIN,
        refetchQueries: () => [`me`],
      },
      logout: {
        mutation: LOGOUT,
        refetchQueries: () => [`me`],
        onCompleted: () => {
          client.resetStore();
        },
      },
    },
  });
};

export default useUser;
