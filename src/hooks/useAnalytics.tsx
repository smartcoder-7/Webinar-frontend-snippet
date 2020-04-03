import gql from 'graphql-tag';

const ANALYTICS_FRAGMENT = gql`
  fragment Analytics on Analytics {
    registrationRate {
      ratePercent
      uniqueVisitors
      registered
    }
    openRate {
      ratePercent
      notificationSent
      notificationOpened
    }
    attendance {
      ratePercent
      live {
        stayedToEnd
        leftEarly
        averagePercentWatched
      }
      replay {
        stayedToEnd
        leftEarly
        averagePercentWatched
      }
    }
    engagement {
      totalInteractions
      totalReactions
      engagementPercent
      chatMessages
      question
      poll
      specialOffer
      handout
      requestToContact
      feedback
      tip
      privateMessage
      endStream
      welcome
      publicPost
      overallRating
    }
    chartData {
      timeFrame
      liveAttendance
      replayWatched
      interactions
      reactions
    }
  }
`;

export const GET_ANALYTICS = gql`
  query getAnalytics($filter: DashboardFilterInput) {
    analytics(filter: $filter) {
      ...Analytics
    }
  }
  ${ANALYTICS_FRAGMENT}
`;
