import gql from 'graphql-tag';
import useApolloEntity from './useApolloEntity';

export const INTERACTION_FRAGMENT = gql`
  fragment Interaction on Interaction {
    id
    type
    room
    appearAt
    createdAt
    updatedAt
    details {
      imageMediaUrl
      title
      description
      buttonText
      resultsAppearAt
      answer1
      answer2
      answer3
      answer4
      downloadLink
      offerLink
      offerEndsIn
    }
  }
`;

export const INTERACTION_FRAGMENT_VIEW_MODE = gql`
  fragment InteractionViewMode on Interaction {
    ...Interaction
    reaction(attendeeId: $attendeeId) {
      detailsFields {
        poll {
          answer
        }
        feedback {
          answer
        }
        question {
          answer
        }
        requestToContact {
          phone
          email
          contactTime
        }
      }
    }
    pollResult {
      totalCount
      respondants
      detailsFields {
        answer1 {
          count
          percent
        }
        answer2 {
          count
          percent
        }
        answer3 {
          count
          percent
        }
        answer4 {
          count
          percent
        }
      }
    }
    feedbackResult {
      totalCount
      respondants
      detailsFields {
        feedbackRating
      }
    }
  }
  ${INTERACTION_FRAGMENT}
`;

const GET_EWEBINAR_INTERACTIONS = gql`
  query getEwebinarInteractions($ewebinarId: String!) {
    interactions(ewebinarId: $ewebinarId) {
      ...Interaction
    }
  }
  ${INTERACTION_FRAGMENT}
`;

export const GET_EWEBINAR_INTERACTIONS_VIEW_MODE = gql`
  query getEwebinarInteractionsViewMode($ewebinarId: String!, $attendeeId: String!) {
    interactions(ewebinarId: $ewebinarId) {
      ...InteractionViewMode
    }
  }
  ${INTERACTION_FRAGMENT_VIEW_MODE}
`;

export const GET_EWEBINAR_INTERACTION = gql`
  query getEwebinarInteraction($id: String!) {
    interaction(id: $id) {
      ...Interaction
    }
  }
  ${INTERACTION_FRAGMENT}
`;

const CREATE_EWEBINAR_INTERACTION = gql`
  mutation createInteraction($data: InteractionInput!) {
    createInteraction(data: $data) {
      ...Interaction
    }
  }
  ${INTERACTION_FRAGMENT}
`;

const UPDATE_EWEBINAR_INTERACTION = gql`
  mutation updateInteraction($data: InteractionInput!) {
    updateInteraction(data: $data) {
      ...Interaction
    }
  }
  ${INTERACTION_FRAGMENT}
`;

const DELETE_EWEBINAR_INTERACTION = gql`
  mutation deleteInteraction($id: String!) {
    deleteInteraction(id: $id)
  }
`;

const useEwebinarInteractions = (ewebinarId: string, attendeeId?: string) => {
  const Interaction = useApolloEntity({
    useQuery: {
      interactions: {
        query: GET_EWEBINAR_INTERACTIONS,
        variables: {
          ewebinarId,
        },
        extractEntity(data: any): any {
          return data && data.interactions;
        },
      },
      interactionsViewMode: {
        query: GET_EWEBINAR_INTERACTIONS_VIEW_MODE,
        variables: {
          ewebinarId,
          attendeeId,
        },
        extractEntity(data: any): any {
          return data && data.interactions;
        },
      },
    },
    useMutation: {
      create: {
        mutation: CREATE_EWEBINAR_INTERACTION,
        refetchQueries: [
          {
            query: GET_EWEBINAR_INTERACTIONS,
            variables: {
              ewebinarId,
            },
          },
        ],
      },
      update: {
        mutation: UPDATE_EWEBINAR_INTERACTION,
      },
      delete: {
        mutation: DELETE_EWEBINAR_INTERACTION,
        refetchQueries: [
          {
            query: GET_EWEBINAR_INTERACTIONS,
            variables: {
              ewebinarId,
            },
          },
        ],
      },
    },
  });

  return Interaction;
};

export default useEwebinarInteractions;
