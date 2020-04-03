import gql from 'graphql-tag';
import useApolloEntity from './useApolloEntity';

const GET_INTERACTION_RESULTS = gql`
  query reactionResults($ewebinarSetId: String!, $from: String!, $to: String!) {
    reactionResults(ewebinarSetId: $ewebinarSetId, from: $from, to: $to) {
      totalCount
      respondants
      detailsFields {
        feedbackRating
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
      interaction {
        id
        appearAt
        type
        details {
          title
          description
          imageMediaUrl
          imageMediaUrl
          answer1
          answer2
          answer3
          answer4
        }
      }
    }
  }
`;

const useEwebinarInteractionsResult = () => {
  const reactionResults = useApolloEntity({
    useQuery: {
      get: {
        query: GET_INTERACTION_RESULTS,
        extractEntity(data: any): any {
          if (!data || !data.reactionResults) return null;
          return data.reactionResults;
        },
      },
    },
  });
  return reactionResults;
};

export default useEwebinarInteractionsResult;
