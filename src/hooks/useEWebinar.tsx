import gql from 'graphql-tag';

import { EWebinar } from '../fromBackend/schema';
import useApolloEntity from './useApolloEntity';
import { USER_FRAGMENT } from './useUser';

export const PRESENTER_FRAGMENT = gql`
  fragment Presenter on Presenter {
    id
    createdAt
    updatedAt
    isActive
    profileMediaUrl
    name
    email
    phone
    company
    title
    bio
    socialLinks {
      facebook
      twitter
      linkedin
    }
    user {
      ...User
    }
  }
  ${USER_FRAGMENT}
`;

export const EWEBINAR_FRAGMENT = gql`
  fragment EWebinar on EWebinar {
    id
    title
    duration
    vimeoVideoId
    thumbnail
    waitingRoomDurationSecs
    exitRoomDurationSecs
    isPublished
    logoMediaUrl
    theme
    colorsMatchLogo
    primaryColor
    highlightColor
    font
    oneTimeEvent
    timeZone
    use24HourClock
    startDate
    duration
    endDateEnabled
    endDate
    justInTimeModeEnabled
    unreadConversationsCount
    presenters {
      ...Presenter
    }
    registrationPageSettings {
      headerSection {
        title
        subtitle
        teaserText
        ctaTopBtnText
        ctaBtnText
        mainMediaUrl
      }
      descriptionBlockSection {
        active
        description
        title
        mainMediaUrl
      }
      presentersSection {
        active
        title
        presenters {
          name
          avatarMediaUrl
          description
        }
      }
      reasonsSection {
        active
        title
        reasons {
          content
        }
      }
      testimonialsSection {
        active
        headerOne
        headerTwo
        logos {
          logoMediaUrl
        }
        testimonials {
          name
          avatarMediaUrl
          position
          description
        }
      }
      contactSection {
        title
        subtitle
        ctaBtnText
      }
      footerSection {
        tagline
        disclaimer
      }
    }
    registrationFormSettings {
      title
      fields {
        fieldId
        fieldName
        fieldType
        isRequired
        isRemovable
        order
      }
      showConsentCheckbox
      consentCheckboxText
      registerButton
    }
    thankyouPageSettings {
      headerSection {
        title
        subtitle
        sessionId
        mainMediaUrl
      }
      presentersSection {
        active
        title
        presenters {
          name
          avatarMediaUrl
          description
        }
      }
      shareSection {
        active
        title
        socialMedia {
          name
          url
        }
      }
      footerSection {
        tagline
        disclaimer
      }
    }
    scheduleSettings {
      onWeekDays
      atMinutes
      numberOfSessions
      showReplaySession
      justInTimeIntervalMinutes
      justInTimeHoursOfOperations {
        day
        times
      }
      justInTimeWeekDays
      blackoutPeriods {
        name
        startDay
        endDay
      }
    }
    notificationSettings {
      fromName
      fromEmail
    }
    enableChat
    chatSettings {
      emailBeforeSession
      emailOnChatReceive
      privateWelcomeMessage
    }
    viewerRoomSettings {
      attendeeCounter
      attendeeCounterOption
      attendeeReactions
      attendeeReactionsOption
    }
    exitRoomSettings {
      showReplayLink
      redirectAfterExit
      redirectLink
    }
    uploadStatus {
      stage
      localUpload
      progress
      done
      error
    }
    set {
      id
      moderator {
        id
        name
        profileMediaUrl
        email
      }
      isPublishable
    }
  }
  ${PRESENTER_FRAGMENT}
`;

export const CREATE_EWEBINAR = gql`
  mutation createEwebinar($data: CreateEwebinarInput!) {
    createEwebinar(data: $data) {
      id
      title
      vimeoVideoId
      thumbnail
    }
  }
`;

export const GET_EWEBINAR = gql`
  query ewebinar($id: String!) {
    ewebinar(id: $id) {
      ...EWebinar
    }
  }
  ${EWEBINAR_FRAGMENT}
`;

export const UPDATE_EWEBINAR = gql`
  mutation updateEwebinar($data: UpdateEwebinarInput!) {
    updateEwebinar(data: $data) {
      ...EWebinar
    }
    ${EWEBINAR_FRAGMENT}
  }
`;

export const DELETE_EWEBINAR = gql`
  mutation deleteEwebinar($id: String!) {
    deleteEwebinar(id: $id)
  }
`;

export const PUBLISH_EWEBINAR = gql`
  mutation publishEwebinar($setId: String!) {
    publishEwebinar(setId: $setId)
  }
`;

export const UNPUBLISH_EWEBINAR = gql`
  mutation unpublishEwebinar($id: String!) {
    unpublishEwebinar(id: $id) {
      id
      isPublished
    }
  }
`;

export const DUPLICATE_EWEBINAR = gql`
  mutation duplicate($setId: String!) {
    duplicateEwebinar(setId: $setId) {
      id
      isPublished
    }
  }
`;

export const EWEBINAR_DESCRIPTION = gql`
  fragment EWebinarDescription on EWebinar {
    id
    title
    isPublished
    primaryColor
    highlightColor
    font
    logoMediaUrl
    vimeoVideoId
    thumbnail
    oneTimeEvent
    startDate
    endDate
    justInTimeModeEnabled
    unreadConversationsCount
    registrationPageSettings {
      headerSection {
        subtitle
        mainMediaUrl
        ctaTopBtnText
      }
    }
    presenters {
      id
      name
      profileMediaUrl
    }
    uploadStatus {
      stage
      progress
      localUpload
      done
      error
    }
    set {
      id
      publicWebinar {
        id
      }
      draftWebinar {
        id
      }
    }
    scheduleSettings {
      showReplaySession
    }
  }
`;

export const EWEBINAR_PUBLIC_DESCRIPTION = gql`
  fragment EWebinarPublicDescription on EWebinar {
    id
    title
    isPublished
    primaryColor
    highlightColor
    font
    logoMediaUrl
    vimeoVideoId
    thumbnail
    oneTimeEvent
    startDate
    endDate
    justInTimeModeEnabled
    unreadConversationsCount
    registrationPageSettings {
      headerSection {
        subtitle
        mainMediaUrl
        ctaTopBtnText
      }
    }
    presenters {
      id
      name
      profileMediaUrl
    }
    set {
      id
    }
  }
`;

export const GETS_SETS = gql`
  query sets {
    sets {
      id
      moderator {
        id
        firstName
        lastName
      }
      publicWebinar {
        ...EWebinarDescription
      }
      draftWebinar {
        ...EWebinarDescription
      }
      isPublishable
    }
  }
  ${EWEBINAR_DESCRIPTION}
`;

export const GET_PUBLIC_SETS = gql`
  query publicSets($teamId: String!) {
    publicSets(teamId: $teamId) {
      moderator {
        id
        firstName
        lastName
      }
      publicWebinar {
        ...EWebinarPublicDescription
      }
    }
  }
  ${EWEBINAR_PUBLIC_DESCRIPTION}
`;

const useEWebinar = () => {
  return useApolloEntity({
    useQuery: {
      get: {
        query: GET_EWEBINAR,
        returnPartialData: true,
        extractEntity(data: any): EWebinar | null {
          if (!data || !data.ewebinar) return null;
          return data.ewebinar;
        },
      },
    },
    useMutation: {
      create: {
        mutation: CREATE_EWEBINAR,
        refetchQueries: () => [{ query: GETS_SETS }],
      },
      update: {
        mutation: UPDATE_EWEBINAR,
      },
    },
  });
};

export default useEWebinar;
