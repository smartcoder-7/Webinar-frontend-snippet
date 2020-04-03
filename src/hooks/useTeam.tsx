import gql from 'graphql-tag';
import { PRESENTER_FRAGMENT } from './useEWebinar';

const TEAM_FRAGMENT = gql`
  fragment Team on Team {
    id
    name
    logoMediaUrl
    subdomain
  }
`;

export const GET_MY_TEAM = gql`
  query myTeam {
    myTeam {
      id
      name
      logoMediaUrl
      subdomain
      users {
        role
        user {
          id
          firstName
          lastName
          email
          profileMediaUrl
        }
      }

      stripeCustomerId
      minimumPublicWebinars
      billingCycle
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($id: String!, $replacementId: String!) {
    removeUser(id: $id, replacementId: $replacementId) {
      ...Team
    }
  }
  ${TEAM_FRAGMENT}
`;

export const ADD_USER = gql`
  mutation addUser($data: UserAndPresenterInput!) {
    addUser(data: $data) {
      ...Team
    }
  }
  ${TEAM_FRAGMENT}
`;

export const UPDATE_USER = gql`
  mutation updateUser($data: UserAndPresenterInput!) {
    updateUser(data: $data) {
      ...Team
    }
  }
  ${TEAM_FRAGMENT}
`;

export const TEAM_FOR_SUBDOMAIN = gql`
  query teamForSubdomain($subdomain: String!) {
    teamForSubdomain(subdomain: $subdomain) {
      ...Team
    }
  }
  ${TEAM_FRAGMENT}
`;

export const MEMBER_FRAGMENT = gql`
  fragment Member on UserInTeam {
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
    assignedSets {
      id
    }
    presenter {
      ...Presenter
    }
    role
    invitationStatus
  }
  ${PRESENTER_FRAGMENT}
`;

export const GET_USERS = gql`
  query teamUsers($filters: UserFilters!) {
    teamUsers(filters: $filters) {
      ...Member
    }
  }
  ${MEMBER_FRAGMENT}
`;

export const RESEND_INVITATION_EMAIL = gql`
  mutation resendInvitationEmail($userId: String!, $teamId: String!) {
    resendInvitationEmail(userId: $userId, teamId: $teamId)
  }
`;
