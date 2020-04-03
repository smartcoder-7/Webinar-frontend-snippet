import gql from 'graphql-tag';
import useApolloEntity from './useApolloEntity';
import { EWebinar } from '@src/fromBackend/schema';
import { EWEBINAR_REACTION_FRAGMENTS } from './useEwebinarReaction';

const REGISTRANT_FRAGMENT = gql`
  fragment ReactionForAttendee on ReactionForAttendee {
    id
    attendeeId {
      visitorId
      startTime
      setId
    }
    firstName
    lastName
    email
    visitorId
    registeredDate
    watchedPercent
    watchedReplayPercent
    startTime
    set {
      id
    }
    ewebinar {
      id
    }
    reaction {
      ...EwebinarReaction
    }
  }
  ${EWEBINAR_REACTION_FRAGMENTS}
`;

const GET_REGISTRANTS = gql`
  query registrants($filter: GetRegistrantsInput!) {
    registrants(filter: $filter) {
      attendees {
        ...ReactionForAttendee
      }
      total
      nextCursor
    }
  }
  ${REGISTRANT_FRAGMENT}
`;

const useEWebinarRegistrants = () => {
  return useApolloEntity({
    useQuery: {
      registrants: {
        query: GET_REGISTRANTS,
        extractEntity(data: any): EWebinar | null {
          if (!data || !data.registrants) return null;
          return data.registrants;
        },
      },
    },
  });
};

export default useEWebinarRegistrants;
