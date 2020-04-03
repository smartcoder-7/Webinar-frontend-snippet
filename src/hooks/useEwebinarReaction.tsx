import gql from "graphql-tag"

import useApolloEntity from "./useApolloEntity"

export const EWEBINAR_REACTION_FRAGMENTS = gql`
  fragment EwebinarReaction on Reaction {
    id
    reactionAppearAt
    reactionAppearRoom
    eventName
    pollAnswer
    feedbackRating
    detailsFields {
      feedback {
        answer
      }
      poll {
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
`
const CREATE_EWEBINAR_REACTION = gql`
  mutation createReaction(
    $data: ReactionInput!
  ) {
    createReaction(data: $data) {
      ...EwebinarReaction
    }
  }
  ${EWEBINAR_REACTION_FRAGMENTS}
`
const useEwebinarReactions = () => {
    const Reaction = useApolloEntity({
        useMutation: {
            create: {
                mutation: CREATE_EWEBINAR_REACTION,
            },
        },
    })

    return Reaction
}

export default useEwebinarReactions