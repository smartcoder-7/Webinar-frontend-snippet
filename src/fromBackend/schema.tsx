import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any,
};

export type AccessTokens = {
   __typename?: 'AccessTokens',
  refreshToken: Scalars['String'],
  accessToken: Scalars['String'],
};

export type Address = {
   __typename?: 'Address',
  address1?: Maybe<Scalars['String']>,
  address2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  province?: Maybe<Scalars['String']>,
  postal?: Maybe<Scalars['String']>,
  country: Scalars['String'],
};

export type AddressInput = {
  address1: Scalars['String'],
  address2?: Maybe<Scalars['String']>,
  city: Scalars['String'],
  province: Scalars['String'],
  postal: Scalars['String'],
  country: Scalars['String'],
};

export type Analytics = {
   __typename?: 'Analytics',
  registrationRate?: Maybe<RegistrationRate>,
  openRate?: Maybe<OpenRate>,
  attendance?: Maybe<Attendance>,
  engagement?: Maybe<Engagement>,
  chartData?: Maybe<Array<ChartPoint>>,
};

export type Asset = {
   __typename?: 'Asset',
  url: Scalars['String'],
  uploadUrl?: Maybe<Scalars['String']>,
};

export type Attendance = {
   __typename?: 'Attendance',
  ratePercent?: Maybe<Scalars['Float']>,
  live?: Maybe<AttendanceItem>,
  replay?: Maybe<AttendanceItem>,
};

export type AttendanceCount = {
   __typename?: 'AttendanceCount',
  timeFrame: Scalars['Float'],
  joined: Scalars['Float'],
  left: Scalars['Float'],
  replayJoined: Scalars['Float'],
  replayLeft: Scalars['Float'],
};

export type AttendanceItem = {
   __typename?: 'AttendanceItem',
  attended: Scalars['Float'],
  stayedToEnd: Scalars['Float'],
  leftEarly: Scalars['Float'],
  averagePercentWatched: Scalars['Float'],
};

export type Attendee = {
   __typename?: 'Attendee',
  id: Scalars['String'],
  attendeeId?: Maybe<AttendeeId>,
  visitorId: Scalars['String'],
  /** Set the attendee registered for */
  set: EWebinarSet,
  /** Webinar the attendee joined and setarted watching */
  ewebinar?: Maybe<EWebinar>,
  startTime?: Maybe<Scalars['DateTime']>,
  timezone: Scalars['String'],
  /** DateTime when attendee joined any webinar room. */
  joinTime?: Maybe<Scalars['DateTime']>,
  optOut: Scalars['Boolean'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  attendeeFields?: Maybe<Scalars['JSON']>,
  registeredDate: Scalars['DateTime'],
  watchedPercent?: Maybe<Scalars['Float']>,
  watchedReplayPercent?: Maybe<Scalars['Float']>,
  reactions?: Maybe<Array<Reaction>>,
  conversation?: Maybe<Conversation>,
};

/** Attendee counter option */
export enum AttendeeCounterOption {
  Attending = 'Attending',
  Attended = 'Attended'
}

export type AttendeeEntity = {
   __typename?: 'AttendeeEntity',
  id: Scalars['String'],
  attendeeFields: Scalars['String'],
  startTime: Scalars['DateTime'],
  timezone: Scalars['String'],
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName?: Maybe<Scalars['String']>,
};

export type AttendeeId = {
   __typename?: 'AttendeeID',
  visitorId: Scalars['String'],
  /** ID of eWebinar Set */
  setId: Scalars['String'],
  /** Starttime of this attenddees webinar */
  startTime: Scalars['DateTime'],
};

export type AttendeeIdInput = {
  visitorId: Scalars['String'],
  /** ID of eWebinar Set */
  setId: Scalars['String'],
  /** Starttime of this attenddees webinar */
  startTime: Scalars['DateTime'],
};

/** Attendee reactions option */
export enum AttendeeReactionsOption {
  RealTimeOnly = 'RealTimeOnly',
  AllReactions = 'AllReactions'
}

/** The subscription billing cycles */
export enum BillingCycle {
  Year = 'Year',
  Month = 'Month'
}

export type BlackoutPeriod = {
   __typename?: 'BlackoutPeriod',
  /** Represented as (Month * 31) + Day  */
  startDay?: Maybe<Scalars['Float']>,
  /** Represented as (Month * 31) + Day  */
  endDay?: Maybe<Scalars['Float']>,
  /** Name of Holiday */
  name?: Maybe<Scalars['String']>,
};

export type BlackoutPeriodInput = {
  /** Name of Holiday */
  name?: Maybe<Scalars['String']>,
  /** Represented as (Month * 31) + Day  */
  startDay?: Maybe<Scalars['Float']>,
  /** Represented as (Month * 31) + Day  */
  endDay?: Maybe<Scalars['Float']>,
};

/** Change password */
export type ChangePasswordInput = {
  token: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type ChartPoint = {
   __typename?: 'ChartPoint',
  timeFrame: Scalars['Float'],
  liveAttendance?: Maybe<Scalars['Float']>,
  replayWatched?: Maybe<Scalars['Float']>,
  interactions?: Maybe<Scalars['Float']>,
  reactions?: Maybe<Scalars['Float']>,
};

export type ChatSettings = {
   __typename?: 'ChatSettings',
  /** Send email to moderator 10 minutes before session starts */
  emailBeforeSession: Scalars['Boolean'],
  /** Send email to moderator when they receive chat message */
  emailOnChatReceive: Scalars['Boolean'],
  /** Private welcome message to show attendee coming into chat */
  privateWelcomeMessage: Scalars['String'],
};

export type ChatSettingsInput = {
  /** Send email to moderator 10 minutes before session starts */
  emailBeforeSession: Scalars['Boolean'],
  /** Send email to moderator when they receive chat message */
  emailOnChatReceive: Scalars['Boolean'],
  /** Private welcome message to show attendee coming into chat */
  privateWelcomeMessage: Scalars['String'],
};

export type Conversation = {
   __typename?: 'Conversation',
  id: Scalars['ID'],
  messages: Array<Message>,
  isArchived: Scalars['Boolean'],
  ewebinar: EWebinar,
  set: EWebinarSet,
  attendee: Attendee,
  /** This conversation has transitioned to an email conversation */
  inEmail: Scalars['Boolean'],
  lastReadAt?: Maybe<Scalars['DateTime']>,
  sortDate: Scalars['DateTime'],
  lastMessage?: Maybe<Message>,
  isAttendeeLive: Scalars['Boolean'],
  hasUnreadMessages: Scalars['Boolean'],
};

export type ConversationFilters = {
  type: ConversationTypeFilter,
  onlyAssigned?: Maybe<Scalars['Boolean']>,
  setId?: Maybe<Scalars['String']>,
  orderBy?: Maybe<ConversationOrderByFields>,
  orderDirection?: Maybe<OrderDirection>,
  cursor?: Maybe<Scalars['String']>,
};

/** Allow orderBy fields */
export enum ConversationOrderByFields {
  SortDate = 'SortDate',
  LastReadAt = 'LastReadAt'
}

export type Conversations = {
   __typename?: 'Conversations',
  conversations: Array<Conversation>,
  total: Scalars['Float'],
  nextCursor?: Maybe<Scalars['String']>,
};

export enum ConversationTypeFilter {
  Inbox = 'Inbox',
  Archived = 'Archived',
  Unread = 'Unread',
  Live = 'Live'
}

/** Create new ewebinar */
export type CreateEwebinarInput = {
  title: Scalars['String'],
  vimeoVideoId?: Maybe<Scalars['Float']>,
  thumbnail?: Maybe<Scalars['String']>,
};

export type CreateEWebinarSetInput = {
   __typename?: 'CreateEWebinarSetInput',
  id?: Maybe<Scalars['String']>,
  ewebinar: EWebinar,
};

export type CreateUploadUrlInput = {
  scope: Scalars['String'],
  id: Scalars['String'],
  name: Scalars['String'],
  fileType?: Maybe<Scalars['String']>,
};

/** Create new attendee */
export type CreateVisitorInput = {
  setId: Scalars['String'],
  lastVisitedDate?: Maybe<Scalars['DateTime']>,
};

/** Dashboard Filter Engagement */
export enum DashboardFilterEngagement {
  Registered = 'Registered',
  Attended = 'Attended',
  DidNotAttend = 'DidNotAttend',
  LeftEarly = 'LeftEarly',
  WatchedUntilEnd = 'WatchedUntilEnd',
  Interacted = 'Interacted',
  WatchedReplay = 'WatchedReplay'
}

/** Get registrants input */
export type DashboardFilterInput = {
  ewebinarSetId: Scalars['String'],
  sessionStartDate?: Maybe<Scalars['String']>,
  sessionEndDate?: Maybe<Scalars['String']>,
  engagement?: Maybe<DashboardFilterEngagement>,
};


export type EditPresenterInput = {
  id: Scalars['String'],
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  phone?: Maybe<Scalars['String']>,
  company?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  socialLinks?: Maybe<SocialLinkInput>,
};

export type EmailEntities = {
   __typename?: 'EmailEntities',
  logoMediaUrl?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  name1?: Maybe<Scalars['String']>,
  url1?: Maybe<Scalars['String']>,
  name2?: Maybe<Scalars['String']>,
  url2?: Maybe<Scalars['String']>,
  from?: Maybe<FromEntities>,
  to?: Maybe<ToEntities>,
  user?: Maybe<UserEntity>,
  team?: Maybe<TeamEntity>,
  ewebinar?: Maybe<EWebinarEntity>,
  message?: Maybe<MessageEntity>,
  messages?: Maybe<Array<MessageEntity>>,
  attendee?: Maybe<AttendeeEntity>,
};

export type EmailFields = {
   __typename?: 'EmailFields',
  logoMediaUrl?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  name1?: Maybe<Scalars['String']>,
  url1?: Maybe<Scalars['String']>,
  name2?: Maybe<Scalars['String']>,
  url2?: Maybe<Scalars['String']>,
};

export type Engagement = {
   __typename?: 'Engagement',
  /** total interactions */
  totalInteractions?: Maybe<Scalars['Float']>,
  /** total reactions */
  totalReactions?: Maybe<Scalars['Float']>,
  /** engagement percent */
  engagementPercent?: Maybe<Scalars['Float']>,
  /** chat message */
  chatMessages?: Maybe<Scalars['Float']>,
  /** questions answered */
  question?: Maybe<Scalars['Float']>,
  /** poll takens */
  poll?: Maybe<Scalars['Float']>,
  /** offer clicked */
  specialOffer?: Maybe<Scalars['Float']>,
  /** handout downloads */
  handout?: Maybe<Scalars['Float']>,
  /** contact request sent */
  requestToContact?: Maybe<Scalars['Float']>,
  /** rating given */
  feedback?: Maybe<Scalars['Float']>,
  /** tip */
  tip?: Maybe<Scalars['Float']>,
  /** private message */
  privateMessage?: Maybe<Scalars['Float']>,
  /** end stream */
  endStream?: Maybe<Scalars['Float']>,
  /** welcome */
  welcome?: Maybe<Scalars['Float']>,
  /** public Post */
  publicPost?: Maybe<Scalars['Float']>,
  /** overall rating */
  overallRating?: Maybe<Scalars['Float']>,
};

export type EWebinar = {
   __typename?: 'EWebinar',
  id: Scalars['String'],
  set: EWebinarSet,
  isPublished: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  team: Team,
  title: Scalars['String'],
  vimeoVideoId?: Maybe<Scalars['Float']>,
  thumbnail?: Maybe<Scalars['String']>,
  primaryColor: Scalars['String'],
  highlightColor: Scalars['String'],
  font: Scalars['String'],
  theme: Scalars['String'],
  colorsMatchLogo: Scalars['Boolean'],
  logoMediaUrl?: Maybe<Scalars['String']>,
  registrationPageSettings?: Maybe<RegistrationPageSettings>,
  registrationFormSettings: RegistrationFormSettings,
  thankyouPageSettings?: Maybe<ThankyouPageSettings>,
  viewerRoomSettings: ViewerRoomSettings,
  exitRoomSettings: ExitRoomSettings,
  /** Waiting room duration in seconds */
  waitingRoomDurationSecs: Scalars['Float'],
  /** Exit room duration in seconds */
  exitRoomDurationSecs: Scalars['Float'],
  oneTimeEvent: Scalars['Boolean'],
  timeZone: Scalars['String'],
  use24HourClock: Scalars['Boolean'],
  startDate?: Maybe<Scalars['DateTime']>,
  endDateEnabled?: Maybe<Scalars['Boolean']>,
  endDate?: Maybe<Scalars['DateTime']>,
  justInTimeModeEnabled: Scalars['Boolean'],
  scheduleSettings?: Maybe<ScheduleSettings>,
  presenters?: Maybe<Array<Presenter>>,
  notificationSettings?: Maybe<NotificationSettings>,
  enableChat: Scalars['Boolean'],
  chatSettings?: Maybe<ChatSettings>,
  uploadStatus?: Maybe<UploadStatus>,
  duration?: Maybe<Scalars['Float']>,
  notifications: Array<Notification>,
  attendees?: Maybe<Array<Attendee>>,
  conversations?: Maybe<Array<Conversation>>,
  interactions: Array<Interaction>,
  reactions?: Maybe<Array<Reaction>>,
  unreadConversationsCount: Scalars['Float'],
};

export type EWebinarEntity = {
   __typename?: 'EWebinarEntity',
  id: Scalars['String'],
  title: Scalars['String'],
  scheduleSettings: ScheduleSettings,
};

export type EwebinarSessionsInput = {
  ewebinarSetId: Scalars['String'],
  clientTimeZone: Scalars['String'],
};

export type EwebinarSessionsPayload = {
   __typename?: 'EwebinarSessionsPayload',
  sessions: Array<Session>,
  timeZone: Scalars['String'],
};

export type EWebinarSet = {
   __typename?: 'EWebinarSet',
  id: Scalars['String'],
  team: Team,
  ewebinars: Array<EWebinar>,
  reactions: Array<Reaction>,
  draftWebinar: EWebinar,
  publicWebinar?: Maybe<EWebinar>,
  moderator?: Maybe<User>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  deletedAt: Scalars['DateTime'],
  attendees: Array<Attendee>,
  conversations: Array<Conversation>,
  isPublishable: Scalars['Boolean'],
};

export type ExitRoomSettings = {
   __typename?: 'ExitRoomSettings',
  showReplayLink?: Maybe<Scalars['Boolean']>,
  redirectAfterExit?: Maybe<Scalars['Boolean']>,
  redirectLink?: Maybe<Scalars['String']>,
};

export type ExitRoomSettingsInput = {
  showReplayLink?: Maybe<Scalars['Boolean']>,
  redirectAfterExit?: Maybe<Scalars['Boolean']>,
  redirectLink?: Maybe<Scalars['String']>,
};

export type FeedbackDetailsFields = {
   __typename?: 'FeedbackDetailsFields',
  answer?: Maybe<Scalars['String']>,
};

/** Create reaction details */
export type FeedbackDetailsFieldsInput = {
  answer?: Maybe<Scalars['String']>,
};

export type FromEntities = {
   __typename?: 'FromEntities',
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

/** Get registrants input */
export type GetRegistrantsInput = {
  ewebinarSetId: Scalars['String'],
  sessionStartDate?: Maybe<Scalars['String']>,
  sessionEndDate?: Maybe<Scalars['String']>,
  engagement?: Maybe<DashboardFilterEngagement>,
  orderBy?: Maybe<GetRegistrantsOrderBy>,
  orderDirection?: Maybe<OrderDirection>,
  interactionId?: Maybe<Scalars['String']>,
  nextCursor?: Maybe<Scalars['String']>,
};

/** Get Registrants Order By */
export enum GetRegistrantsOrderBy {
  FirstName = 'FirstName',
  LastName = 'LastName',
  Email = 'Email',
  RegisteredDate = 'RegisteredDate',
  StartTime = 'StartTime',
  WatchedPercent = 'WatchedPercent',
  WatchedReplayPercent = 'WatchedReplayPercent',
  PollAnswer = 'PollAnswer',
  FeedbackRating = 'FeedbackRating'
}

export type Interaction = {
   __typename?: 'Interaction',
  id: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  ewebinar: EWebinar,
  type: InteractionType,
  room: RoomType,
  appearAt: Scalars['Float'],
  details?: Maybe<InteractionDetailFields>,
  reactions?: Maybe<Array<Reaction>>,
  pollResult?: Maybe<ReactionResult>,
  feedbackResult?: Maybe<ReactionResult>,
  reaction?: Maybe<Reaction>,
};


export type InteractionReactionArgs = {
  attendeeId: Scalars['String']
};

export type InteractionDetailFields = {
   __typename?: 'InteractionDetailFields',
  imageMediaUrl?: Maybe<Scalars['String']>,
  /** Question or title */
  title: Scalars['String'],
  /** Description or chat message body */
  description?: Maybe<Scalars['String']>,
  buttonText?: Maybe<Scalars['String']>,
  resultsAppearAt?: Maybe<Scalars['Float']>,
  answer1?: Maybe<Scalars['String']>,
  answer2?: Maybe<Scalars['String']>,
  answer3?: Maybe<Scalars['String']>,
  answer4?: Maybe<Scalars['String']>,
  downloadLink?: Maybe<Scalars['String']>,
  offerLink?: Maybe<Scalars['String']>,
  offerEndsIn?: Maybe<Scalars['Float']>,
};

/** Update interaction details */
export type InteractionDetailsInput = {
  imageMediaUrl?: Maybe<Scalars['String']>,
  /** Question or title */
  title: Scalars['String'],
  /** Description or chat message body */
  description?: Maybe<Scalars['String']>,
  buttonText?: Maybe<Scalars['String']>,
  resultsAppearAt?: Maybe<Scalars['Float']>,
  answer1?: Maybe<Scalars['String']>,
  answer2?: Maybe<Scalars['String']>,
  answer3?: Maybe<Scalars['String']>,
  answer4?: Maybe<Scalars['String']>,
  downloadLink?: Maybe<Scalars['String']>,
  offerLink?: Maybe<Scalars['String']>,
  offerEndsIn?: Maybe<Scalars['Float']>,
};

/** Update interaction */
export type InteractionInput = {
  id?: Maybe<Scalars['String']>,
  ewebinarId?: Maybe<Scalars['String']>,
  type: Scalars['String'],
  room: RoomType,
  appearAt: Scalars['Float'],
  details?: Maybe<InteractionDetailsInput>,
};

/** Interaction type */
export enum InteractionType {
  Welcome = 'Welcome',
  Feedback = 'Feedback',
  Handout = 'Handout',
  Poll = 'Poll',
  PublicPost = 'PublicPost',
  PrivateMessage = 'PrivateMessage',
  Question = 'Question',
  RequestToContact = 'RequestToContact',
  SpecialOffer = 'SpecialOffer',
  Tip = 'Tip',
  EndStream = 'EndStream'
}

/** The invite status */
export enum InvitationStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected'
}


export type JustInTimeHoursOfOperation = {
   __typename?: 'JustInTimeHoursOfOperation',
  day: WeekDays,
  times: Array<Scalars['Float']>,
};

export type JustInTimeHoursOfOperationInput = {
  day: WeekDays,
  times: Array<Scalars['Float']>,
};

export type LatestNotificationTimestamp = {
   __typename?: 'LatestNotificationTimestamp',
  id: Scalars['String'],
};

export type Me = {
   __typename?: 'Me',
  id: Scalars['String'],
  teamRelations: Array<TeamUserRelation>,
  currentTeamRelation?: Maybe<TeamUserRelation>,
  team: Team,
  presenter: Presenter,
  /** Webinars I've been assigned to as moderator */
  assignedSets?: Maybe<Array<EWebinar>>,
  version: Scalars['Float'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  profileMediaUrl?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName?: Maybe<Scalars['String']>,
  /** First + Last name */
  name: Scalars['String'],
  timezone: Scalars['String'],
  password?: Maybe<Scalars['String']>,
  state: UserState,
  isVerified?: Maybe<Scalars['Boolean']>,
  tokens: AccessTokens,
};

export type Message = {
   __typename?: 'Message',
  id: Scalars['ID'],
  conversation: Conversation,
  user?: Maybe<User>,
  set: EWebinarSet,
  fromAttendee: Scalars['Boolean'],
  roomType: Scalars['String'],
  timeInRoomSecs: Scalars['Float'],
  timeSent: Scalars['DateTime'],
  content: Scalars['String'],
  type: MessageType,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  lastMessage?: Maybe<Message>,
};

export type MessageEntity = {
   __typename?: 'MessageEntity',
  id: Scalars['String'],
  fromAttendee: Scalars['Boolean'],
  content: Scalars['String'],
  timeSent: Scalars['DateTime'],
};

export type MessageInput = {
  /** Conversation contains all info needed to add message */
  conversationId?: Maybe<Scalars['String']>,
  /** Fields necessary to identify fully an attendee.  Must be present if no conversationId present */
  attendeeId?: Maybe<AttendeeIdInput>,
  /** Moderator user ID - NULL if message is from Attendee */
  userId?: Maybe<Scalars['String']>,
  fromAttendee: Scalars['Boolean'],
  /** Unix timestamp which we can compare to startTime of ewebinar to determine time in room */
  timeSent: Scalars['DateTime'],
  /** 
 * Number of seconds into presentation taking starting from 0 at beginning of
   * waiting room.  Note for replays this values starts at waitingRoomDurationSecs
   * and the value would exclude any time the video has been paused
 */
  timeInWebinarSecs?: Maybe<Scalars['Float']>,
  /** Message content */
  content: Scalars['String'],
  /** Type of message sent via socket */
  type: Scalars['String'],
};

export type MessagePost = {
  chat?: Maybe<MessageInput>,
  token?: Maybe<Scalars['String']>,
  attendee?: Maybe<AttendeeIdInput>,
};

/** Type of message sent via socket */
export enum MessageType {
  Interaction = 'Interaction',
  Typing = 'Typing',
  Chat = 'Chat'
}

export type Mutation = {
   __typename?: 'Mutation',
  archiveConversation: Scalars['String'],
  seenConversation: Conversation,
  registerAttendee?: Maybe<Attendee>,
  updateStartTime?: Maybe<Attendee>,
  createVisitor?: Maybe<Attendee>,
  attendeeOptOut: Attendee,
  attendeeJoinWebinar: Attendee,
  createInteraction?: Maybe<Interaction>,
  updateInteraction: Interaction,
  deleteInteraction: Scalars['Boolean'],
  createNotification?: Maybe<Notification>,
  updateLatestTimestamp: Scalars['DateTime'],
  updateNotification: Notification,
  deleteNotification: Scalars['Boolean'],
  login: Me,
  logout?: Maybe<Scalars['Boolean']>,
  registerUserAndTeam: Me,
  registerUserInTeam: Me,
  verifyToken: Me,
  skipVerifyEmail: User,
  resendConfirmationEmail: Scalars['String'],
  resetPassword: Scalars['String'],
  changePassword: Me,
  acceptInvitation: Me,
  rejectInvitation: Scalars['Boolean'],
  scrapeVideoMetaFromURL?: Maybe<VideoMeta>,
  uploadVideo: Scalars['String'],
  startVideoUpload: StartVideoUploadInfo,
  setLocalVimeoUploadDone: EWebinar,
  createVimeoUploadUrl: Asset,
  createUploadUrl: Asset,
  createEwebinar?: Maybe<EWebinar>,
  updateEwebinar: EWebinar,
  deleteEwebinar: Scalars['String'],
  publishEwebinar: Scalars['Boolean'],
  unpublishEwebinar: EWebinar,
  duplicateEwebinar: EWebinar,
  deleteSet: EWebinarSet,
  updateMe: Me,
  addPresenter: Presenter,
  updatePresenter: Presenter,
  removePresenter: Scalars['Boolean'],
  addUser: Team,
  removeUser: Team,
  updateUser?: Maybe<Team>,
  resendInvitationEmail: Scalars['String'],
  createReaction?: Maybe<Reaction>,
};


export type MutationArchiveConversationArgs = {
  id: Scalars['String']
};


export type MutationSeenConversationArgs = {
  id: Scalars['String']
};


export type MutationRegisterAttendeeArgs = {
  data: RegisterAttendeeInput
};


export type MutationUpdateStartTimeArgs = {
  id: Scalars['String'],
  startTime: Scalars['DateTime']
};


export type MutationCreateVisitorArgs = {
  data: CreateVisitorInput
};


export type MutationAttendeeOptOutArgs = {
  optOut: Scalars['Boolean'],
  id: Scalars['String']
};


export type MutationAttendeeJoinWebinarArgs = {
  joinTime: Scalars['DateTime'],
  id: Scalars['String']
};


export type MutationCreateInteractionArgs = {
  data: InteractionInput
};


export type MutationUpdateInteractionArgs = {
  data: InteractionInput
};


export type MutationDeleteInteractionArgs = {
  id: Scalars['String']
};


export type MutationCreateNotificationArgs = {
  data: NotificationInput
};


export type MutationUpdateLatestTimestampArgs = {
  timestamp: Scalars['DateTime']
};


export type MutationUpdateNotificationArgs = {
  data: NotificationInput
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['String']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRegisterUserAndTeamArgs = {
  data: NewUserAndTeamInput
};


export type MutationRegisterUserInTeamArgs = {
  data: RegisterUserAndTeamInput,
  team: Scalars['String']
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String']
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput
};


export type MutationAcceptInvitationArgs = {
  token: Scalars['String']
};


export type MutationRejectInvitationArgs = {
  token: Scalars['String']
};


export type MutationScrapeVideoMetaFromUrlArgs = {
  url: Scalars['String']
};


export type MutationUploadVideoArgs = {
  data: UploadVideoInput,
  id: Scalars['String']
};


export type MutationStartVideoUploadArgs = {
  fileName: Scalars['String'],
  fileSize: Scalars['Float']
};


export type MutationSetLocalVimeoUploadDoneArgs = {
  data: SetLocalVimeoUploadDoneInput,
  id: Scalars['String']
};


export type MutationCreateVimeoUploadUrlArgs = {
  data: CreateUploadUrlInput
};


export type MutationCreateUploadUrlArgs = {
  data: CreateUploadUrlInput
};


export type MutationCreateEwebinarArgs = {
  data: CreateEwebinarInput
};


export type MutationUpdateEwebinarArgs = {
  data: UpdateEwebinarInput
};


export type MutationDeleteEwebinarArgs = {
  id: Scalars['String']
};


export type MutationPublishEwebinarArgs = {
  setId: Scalars['String']
};


export type MutationUnpublishEwebinarArgs = {
  id: Scalars['String']
};


export type MutationDuplicateEwebinarArgs = {
  setId: Scalars['String']
};


export type MutationDeleteSetArgs = {
  id: Scalars['String']
};


export type MutationUpdateMeArgs = {
  data: UpdateUserAndTeamInput
};


export type MutationAddPresenterArgs = {
  data: EditPresenterInput
};


export type MutationUpdatePresenterArgs = {
  data: EditPresenterInput
};


export type MutationRemovePresenterArgs = {
  id: Scalars['String']
};


export type MutationAddUserArgs = {
  data: UserAndPresenterInput
};


export type MutationRemoveUserArgs = {
  replacementId: Scalars['String'],
  id: Scalars['String']
};


export type MutationUpdateUserArgs = {
  data: UserAndPresenterInput
};


export type MutationResendInvitationEmailArgs = {
  teamId: Scalars['String'],
  userId: Scalars['String']
};


export type MutationCreateReactionArgs = {
  data: ReactionInput
};

/** Create new user & new team */
export type NewUserAndTeamInput = {
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  role?: Maybe<UserRole>,
  password?: Maybe<Scalars['String']>,
  team: TeamInput,
};

export type NewUserInput = {
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  role?: Maybe<UserRole>,
  password?: Maybe<Scalars['String']>,
};

export type Notification = {
   __typename?: 'Notification',
  id: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  ewebinar: EWebinar,
  type: NotificationType,
  /** Network to send notification by */
  sendBy: SendBy,
  /** Number of Minutes to offset notification by */
  offsetSeconds: Scalars['Float'],
  whenNumber: Scalars['Float'],
  whenUnit: WhenUnit,
  subject: Scalars['String'],
  message: Scalars['String'],
  /** Which group of attendees to send the notification to.  (Only for follow ups) */
  followUpTo?: Maybe<SendTo>,
};

export type NotificationForAttendee = {
   __typename?: 'NotificationForAttendee',
  id: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  ewebinar: EWebinar,
  type: NotificationType,
  /** Network to send notification by */
  sendBy: SendBy,
  /** Number of Minutes to offset notification by */
  offsetSeconds: Scalars['Float'],
  whenNumber: Scalars['Float'],
  whenUnit: WhenUnit,
  subject: Scalars['String'],
  message: Scalars['String'],
  /** Which group of attendees to send the notification to.  (Only for follow ups) */
  followUpTo?: Maybe<SendTo>,
  attendee: Attendee,
};

/** Create new notification */
export type NotificationInput = {
  id?: Maybe<Scalars['String']>,
  ewebinarId: Scalars['String'],
  type: Scalars['String'],
  sendBy: Scalars['String'],
  whenNumber: Scalars['Float'],
  whenUnit: WhenUnit,
  followUpTo?: Maybe<SendTo>,
  subject: Scalars['String'],
  message: Scalars['String'],
};

export type NotificationsAndTime = {
   __typename?: 'NotificationsAndTime',
  notifications: Array<NotificationForAttendee>,
  currentTimestamp: Scalars['DateTime'],
};

export type NotificationSettings = {
   __typename?: 'NotificationSettings',
  /** Name to send notifications from */
  fromName: Scalars['String'],
  /** Email to send notifications from */
  fromEmail: Scalars['String'],
};

export type NotificationSettingsInput = {
  /** Name to send notifications from */
  fromName?: Maybe<Scalars['String']>,
  /** Email to send notifications from */
  fromEmail?: Maybe<Scalars['String']>,
};

/** Type of notification */
export enum NotificationType {
  Confirmation = 'Confirmation',
  Reminder = 'Reminder',
  FollowUp = 'FollowUp'
}

export type OpenRate = {
   __typename?: 'OpenRate',
  ratePercent?: Maybe<Scalars['Float']>,
  notificationSent?: Maybe<Scalars['Float']>,
  notificationOpened?: Maybe<Scalars['Float']>,
};

/** Query Order Direction */
export enum OrderDirection {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type PollDetailsFields = {
   __typename?: 'PollDetailsFields',
  answer?: Maybe<Scalars['String']>,
};

/** Create reaction details */
export type PollDetailsFieldsInput = {
  answer?: Maybe<Scalars['String']>,
};

export type Presenter = {
   __typename?: 'Presenter',
  id: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  user?: Maybe<User>,
  team: Team,
  isActive: Scalars['Boolean'],
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName?: Maybe<Scalars['String']>,
  /** First + Last name */
  name: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  company?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  socialLinks?: Maybe<SocialLink>,
};

export type PresenterFilters = {
  orderBy?: Maybe<PresenterOrderByFields>,
  orderDirection?: Maybe<OrderDirection>,
};

export type PresenterInput = {
   __typename?: 'PresenterInput',
  id: Scalars['String'],
  user: User,
  isActive: Scalars['Boolean'],
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  company?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  socialLinks?: Maybe<SocialLink>,
};

/** Allow orderBy fields */
export enum PresenterOrderByFields {
  CreatedAt = 'CreatedAt',
  FirstName = 'FirstName'
}

export type PublicInvitedUser = {
   __typename?: 'PublicInvitedUser',
  id: Scalars['String'],
  firstName: Scalars['String'],
  lastName?: Maybe<Scalars['String']>,
  role?: Maybe<UserRole>,
  teamId: Scalars['String'],
  invitedByUser?: Maybe<PublicInviter>,
};

export type PublicInviter = {
   __typename?: 'PublicInviter',
  id: Scalars['String'],
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName?: Maybe<Scalars['String']>,
};

export type QMessage = {
   __typename?: 'QMessage',
  q?: Maybe<Scalars['String']>,
  receiptHandle?: Maybe<Scalars['String']>,
  upload?: Maybe<UploadMessage>,
  transcode?: Maybe<TranscodeMessage>,
  sendSms?: Maybe<SendSmsMessage>,
  sendEmail?: Maybe<SendEmailMessage>,
  sendNotification?: Maybe<SendNotificationMessage>,
  processNotifications?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  conversationForAttendee: Conversation,
  conversation: Conversation,
  conversations: Conversations,
  attendee: Attendee,
  registrants: Registrants,
  interactions: Array<Interaction>,
  interaction: Interaction,
  notifications: Array<Notification>,
  overdueNotifications: NotificationsAndTime,
  user: User,
  users: Array<User>,
  isEmailAlreadyExist: Scalars['Boolean'],
  checkEmptyPassword: Scalars['Boolean'],
  ewebinar?: Maybe<EWebinar>,
  set?: Maybe<EWebinarSet>,
  sets: Array<EWebinarSet>,
  publicSet: EWebinarSet,
  publicSets: Array<EWebinarSet>,
  analytics?: Maybe<Analytics>,
  me?: Maybe<Me>,
  presenter: Presenter,
  presenters: Array<Presenter>,
  myTeam: Team,
  team: Team,
  teams: Array<Team>,
  teamForSubdomain: Team,
  teamUsers: Array<UserInTeam>,
  messages: Array<Message>,
  reactionResults: Array<ReactionResult>,
  ewebinarSession?: Maybe<EwebinarSessionsPayload>,
};


export type QueryConversationForAttendeeArgs = {
  attendeeId: AttendeeIdInput
};


export type QueryConversationArgs = {
  id: Scalars['String']
};


export type QueryConversationsArgs = {
  filters: ConversationFilters
};


export type QueryAttendeeArgs = {
  id: Scalars['String']
};


export type QueryRegistrantsArgs = {
  filter: GetRegistrantsInput
};


export type QueryInteractionsArgs = {
  ewebinarId: Scalars['String']
};


export type QueryInteractionArgs = {
  id: Scalars['String']
};


export type QueryNotificationsArgs = {
  ewebinarId: Scalars['String']
};


export type QueryUserArgs = {
  id: Scalars['String']
};


export type QueryUsersArgs = {
  filters: UserFilters
};


export type QueryIsEmailAlreadyExistArgs = {
  email: Scalars['String']
};


export type QueryEwebinarArgs = {
  id: Scalars['String']
};


export type QuerySetArgs = {
  id: Scalars['String']
};


export type QueryPublicSetArgs = {
  id: Scalars['String']
};


export type QueryPublicSetsArgs = {
  teamId: Scalars['String']
};


export type QueryAnalyticsArgs = {
  filter?: Maybe<DashboardFilterInput>
};


export type QueryPresenterArgs = {
  id: Scalars['String']
};


export type QueryTeamArgs = {
  id: Scalars['String']
};


export type QueryTeamForSubdomainArgs = {
  subdomain: Scalars['String']
};


export type QueryTeamUsersArgs = {
  filters: UserFilters
};


export type QueryMessagesArgs = {
  conversationId: Scalars['String']
};


export type QueryReactionResultsArgs = {
  to: Scalars['String'],
  from: Scalars['String'],
  ewebinarSetId: Scalars['String']
};


export type QueryEwebinarSessionArgs = {
  data: EwebinarSessionsInput
};

export type QuestionDetailsFields = {
   __typename?: 'QuestionDetailsFields',
  answer?: Maybe<Scalars['String']>,
};

/** Create reaction details */
export type QuestionDetailsFieldsInput = {
  answer?: Maybe<Scalars['String']>,
};

export type Reaction = {
   __typename?: 'Reaction',
  id: Scalars['String'],
  interaction?: Maybe<Interaction>,
  ewebinar: EWebinar,
  ewebinarSet: EWebinarSet,
  attendee: Attendee,
  eventName: ReactionEventName,
  detailsFields: ReactionDetailFields,
  reactionAppearAt: Scalars['Float'],
  interactionType?: Maybe<InteractionType>,
  reactionAppearRoom: RoomType,
  connectionId?: Maybe<Scalars['String']>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  pollAnswer?: Maybe<Scalars['String']>,
  feedbackRating?: Maybe<Scalars['Float']>,
};

export type ReactionDetailFields = {
   __typename?: 'ReactionDetailFields',
  feedback?: Maybe<FeedbackDetailsFields>,
  poll?: Maybe<PollDetailsFields>,
  question?: Maybe<QuestionDetailsFields>,
  requestToContact?: Maybe<RequestToContactDetailsFields>,
};

/** Create reaction details */
export type ReactionDetailFieldsInput = {
  feedback?: Maybe<FeedbackDetailsFieldsInput>,
  poll?: Maybe<PollDetailsFieldsInput>,
  question?: Maybe<QuestionDetailsFieldsInput>,
  requestToContact?: Maybe<RequestToContactDetailsFieldsInput>,
};

/** Reaction Event Name */
export enum ReactionEventName {
  ReplayJoined = 'ReplayJoined',
  ReplayLeft = 'ReplayLeft',
  Joined = 'Joined',
  Left = 'Left',
  Like = 'Like',
  Love = 'Love',
  RatingGiven = 'RatingGiven',
  Interacted = 'Interacted'
}

export type ReactionForAttendee = {
   __typename?: 'ReactionForAttendee',
  id: Scalars['String'],
  attendeeId?: Maybe<AttendeeId>,
  visitorId: Scalars['String'],
  /** Set the attendee registered for */
  set: EWebinarSet,
  /** Webinar the attendee joined and setarted watching */
  ewebinar?: Maybe<EWebinar>,
  startTime?: Maybe<Scalars['DateTime']>,
  timezone: Scalars['String'],
  /** DateTime when attendee joined any webinar room. */
  joinTime?: Maybe<Scalars['DateTime']>,
  optOut: Scalars['Boolean'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  attendeeFields?: Maybe<Scalars['JSON']>,
  registeredDate: Scalars['DateTime'],
  watchedPercent?: Maybe<Scalars['Float']>,
  watchedReplayPercent?: Maybe<Scalars['Float']>,
  reactions?: Maybe<Array<Reaction>>,
  conversation?: Maybe<Conversation>,
  reaction?: Maybe<Reaction>,
};

/** Update reaction */
export type ReactionInput = {
  id?: Maybe<Scalars['String']>,
  interactionId?: Maybe<Scalars['String']>,
  ewebinarId: Scalars['String'],
  eventName: ReactionEventName,
  detailsFields?: Maybe<ReactionDetailFieldsInput>,
  reactionAppearAt: Scalars['Float'],
  interactionType: InteractionType,
  reactionAppearRoom: RoomType,
  startTime?: Maybe<Scalars['DateTime']>,
  pollAnswer?: Maybe<Scalars['String']>,
  feedbackRating?: Maybe<Scalars['Float']>,
  attendeeId: Scalars['String'],
};

export type ReactionResult = {
   __typename?: 'ReactionResult',
  totalCount?: Maybe<Scalars['Float']>,
  interaction: Interaction,
  respondants?: Maybe<Scalars['Float']>,
  detailsFields?: Maybe<ReactionResultDetails>,
};

export type ReactionResultDetailField = {
   __typename?: 'ReactionResultDetailField',
  count?: Maybe<Scalars['Float']>,
  percent?: Maybe<Scalars['Float']>,
};

export type ReactionResultDetails = {
   __typename?: 'ReactionResultDetails',
  answer1?: Maybe<ReactionResultDetailField>,
  answer2?: Maybe<ReactionResultDetailField>,
  answer3?: Maybe<ReactionResultDetailField>,
  answer4?: Maybe<ReactionResultDetailField>,
  feedbackRating?: Maybe<Scalars['Float']>,
};

/** Create new attendee */
export type RegisterAttendeeInput = {
  setId: Scalars['String'],
  startTime: Scalars['DateTime'],
  startTimeTimeZone?: Maybe<Scalars['String']>,
  attendeeFields?: Maybe<Scalars['JSON']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  lastVisitedDate?: Maybe<Scalars['DateTime']>,
  timezone: Scalars['String'],
  optOut?: Maybe<Scalars['Boolean']>,
};

export type RegisterUserAndTeamInput = {
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  role?: Maybe<UserRole>,
  password?: Maybe<Scalars['String']>,
  team: TeamInput,
};

export type Registrants = {
   __typename?: 'Registrants',
  attendees: Array<ReactionForAttendee>,
  total: Scalars['Float'],
  nextCursor?: Maybe<Scalars['String']>,
};

export type RegistrationFooter = {
   __typename?: 'RegistrationFooter',
  tagline?: Maybe<Scalars['String']>,
  disclaimer?: Maybe<Scalars['String']>,
};

export type RegistrationFooterInput = {
  tagline?: Maybe<Scalars['String']>,
  disclaimer?: Maybe<Scalars['String']>,
};

export type RegistrationFormField = {
   __typename?: 'RegistrationFormField',
  fieldId: Scalars['Float'],
  fieldName: Scalars['String'],
  fieldType: Scalars['String'],
  isRequired: Scalars['Boolean'],
  order: Scalars['Float'],
  isRemovable?: Maybe<Scalars['Boolean']>,
};

export type RegistrationFormFieldInput = {
  fieldId: Scalars['Float'],
  fieldName: Scalars['String'],
  fieldType: Scalars['String'],
  isRequired: Scalars['Boolean'],
  order: Scalars['Float'],
  isRemovable: Scalars['Boolean'],
};

export type RegistrationFormSettings = {
   __typename?: 'RegistrationFormSettings',
  /** Title of form */
  title: Scalars['String'],
  fields: Array<RegistrationFormField>,
  /** Show consent checkbox text */
  showConsentCheckbox: Scalars['Boolean'],
  /** Consent checkbox text */
  consentCheckboxText: Scalars['String'],
  /** Register button text */
  registerButton: Scalars['String'],
};

export type RegistrationFormSettingsInput = {
  /** Title of form */
  title: Scalars['String'],
  fields: Array<RegistrationFormFieldInput>,
  /** Show consent checkbox text */
  showConsentCheckbox: Scalars['Boolean'],
  /** Consent checkbox text */
  consentCheckboxText: Scalars['String'],
  /** Register button text */
  registerButton: Scalars['String'],
};

export type RegistrationPageContacts = {
   __typename?: 'RegistrationPageContacts',
  active?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  subtitle?: Maybe<Scalars['String']>,
  ctaBtnText?: Maybe<Scalars['String']>,
};

export type RegistrationPageContactsInput = {
  active?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  subtitle?: Maybe<Scalars['String']>,
  ctaBtnText?: Maybe<Scalars['String']>,
};

export type RegistrationPageDescriptionBlock = {
   __typename?: 'RegistrationPageDescriptionBlock',
  active?: Maybe<Scalars['Boolean']>,
  mainMediaUrl?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type RegistrationPageDescriptionBlockInput = {
  active?: Maybe<Scalars['Boolean']>,
  mainMediaUrl?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type RegistrationPageHeader = {
   __typename?: 'RegistrationPageHeader',
  title?: Maybe<Scalars['String']>,
  subtitle?: Maybe<Scalars['String']>,
  teaserText?: Maybe<Scalars['String']>,
  ctaTopBtnText?: Maybe<Scalars['String']>,
  ctaBtnText?: Maybe<Scalars['String']>,
  mainMediaUrl?: Maybe<Scalars['String']>,
};

export type RegistrationPageHeaderInput = {
  title?: Maybe<Scalars['String']>,
  subtitle?: Maybe<Scalars['String']>,
  teaserText?: Maybe<Scalars['String']>,
  ctaBtnText?: Maybe<Scalars['String']>,
  ctaTopBtnText?: Maybe<Scalars['String']>,
  mainMediaUrl?: Maybe<Scalars['String']>,
};

export type RegistrationPageReason = {
   __typename?: 'RegistrationPageReason',
  content?: Maybe<Scalars['String']>,
};

export type RegistrationPageReasonInput = {
  content?: Maybe<Scalars['String']>,
};

export type RegistrationPageReasons = {
   __typename?: 'RegistrationPageReasons',
  active?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  reasons?: Maybe<Array<RegistrationPageReason>>,
  mainMediaUrl?: Maybe<Scalars['String']>,
};

export type RegistrationPageReasonsInput = {
  active?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  reasons?: Maybe<Array<RegistrationPageReasonInput>>,
  mainMediaUrl?: Maybe<Scalars['String']>,
};

export type RegistrationPageSettings = {
   __typename?: 'RegistrationPageSettings',
  headerSection?: Maybe<RegistrationPageHeader>,
  presentersSection?: Maybe<RegistrationPresenters>,
  descriptionBlockSection?: Maybe<RegistrationPageDescriptionBlock>,
  reasonsSection?: Maybe<RegistrationPageReasons>,
  testimonialsSection?: Maybe<RegistrationPageTestimonials>,
  contactSection?: Maybe<RegistrationPageContacts>,
  footerSection?: Maybe<RegistrationFooter>,
};

export type RegistrationPageSettingsInput = {
  headerSection?: Maybe<RegistrationPageHeaderInput>,
  presentersSection?: Maybe<RegistrationPresentersInput>,
  descriptionBlockSection?: Maybe<RegistrationPageDescriptionBlockInput>,
  reasonsSection?: Maybe<RegistrationPageReasonsInput>,
  testimonialsSection?: Maybe<RegistrationPageTestimonialsInput>,
  contactSection?: Maybe<RegistrationPageContactsInput>,
  footerSection?: Maybe<RegistrationFooterInput>,
};

export type RegistrationPageTestimonial = {
   __typename?: 'RegistrationPageTestimonial',
  avatarMediaUrl?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  position?: Maybe<Scalars['String']>,
};

export type RegistrationPageTestimonialInput = {
  avatarMediaUrl?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  position?: Maybe<Scalars['String']>,
};

export type RegistrationPageTestimonials = {
   __typename?: 'RegistrationPageTestimonials',
  active?: Maybe<Scalars['Boolean']>,
  headerOne?: Maybe<Scalars['String']>,
  testimonials?: Maybe<Array<RegistrationPageTestimonial>>,
  headerTwo?: Maybe<Scalars['String']>,
  logos?: Maybe<Array<RegistrationPageTestimonialsLogo>>,
};

export type RegistrationPageTestimonialsInput = {
  active?: Maybe<Scalars['Boolean']>,
  headerOne?: Maybe<Scalars['String']>,
  testimonials?: Maybe<Array<RegistrationPageTestimonialInput>>,
  headerTwo?: Maybe<Scalars['String']>,
  logos?: Maybe<Array<RegistrationPageTestimonialsLogoInput>>,
};

export type RegistrationPageTestimonialsLogo = {
   __typename?: 'RegistrationPageTestimonialsLogo',
  logoMediaUrl?: Maybe<Scalars['String']>,
};

export type RegistrationPageTestimonialsLogoInput = {
  logoMediaUrl?: Maybe<Scalars['String']>,
};

export type RegistrationPresenter = {
   __typename?: 'RegistrationPresenter',
  avatarMediaUrl?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type RegistrationPresenterInput = {
  avatarMediaUrl?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type RegistrationPresenters = {
   __typename?: 'RegistrationPresenters',
  active?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  presenters?: Maybe<Array<RegistrationPresenter>>,
};

export type RegistrationPresentersInput = {
  active?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  presenters?: Maybe<Array<RegistrationPresenterInput>>,
};

export type RegistrationRate = {
   __typename?: 'RegistrationRate',
  ratePercent?: Maybe<Scalars['Float']>,
  uniqueVisitors?: Maybe<Scalars['Float']>,
  registered?: Maybe<Scalars['Float']>,
};

export type RequestToContactDetailsFields = {
   __typename?: 'RequestToContactDetailsFields',
  phone?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  contactTime?: Maybe<Scalars['String']>,
};

/** Create reaction details */
export type RequestToContactDetailsFieldsInput = {
  phone?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  contactTime?: Maybe<Scalars['String']>,
};

/** Room type */
export enum RoomType {
  Waiting = 'Waiting',
  Presentation = 'Presentation',
  Exit = 'Exit'
}

export type ScheduleSettings = {
   __typename?: 'ScheduleSettings',
  /** Array of 7 booleans for [Mon,...,Sun] */
  onWeekDays?: Maybe<Array<Scalars['Boolean']>>,
  /** When throughout the day to have sessions in minutes from 0 (Midnight) */
  atMinutes?: Maybe<Array<Scalars['Float']>>,
  /** Number of sessions to show in the dropdown - replay session and just in time session */
  numberOfSessions?: Maybe<Scalars['Float']>,
  /** Shows Replay as one of sessions to user */
  showReplaySession?: Maybe<Scalars['Boolean']>,
  /** How often to have in Minutes: 15, 30, 60 */
  justInTimeIntervalMinutes?: Maybe<Scalars['Float']>,
  /** Array of [start time, end time] in minutes from midnight */
  justInTimeHoursOfOperations?: Maybe<Array<JustInTimeHoursOfOperation>>,
  /** Array of 7 booleans for [Mon,...,Sun] */
  justInTimeWeekDays?: Maybe<Array<Scalars['Boolean']>>,
  blackoutPeriods?: Maybe<Array<BlackoutPeriod>>,
};

export type ScheduleSettingsInput = {
  /** Array of 7 booleans for [Mon,...,Sun] */
  onWeekDays?: Maybe<Array<Scalars['Boolean']>>,
  /** When throughout the day to have sessions in minutes from 0 (Midnight) */
  atMinutes?: Maybe<Array<Scalars['Float']>>,
  /** Number of sessions to show in the dropdown - replay session and just in time session */
  numberOfSessions?: Maybe<Scalars['Float']>,
  /** Shows Replay as one of sessions to user */
  showReplaySession?: Maybe<Scalars['Boolean']>,
  /** How often to have in Minutes: 15, 30, 60 */
  justInTimeIntervalMinutes?: Maybe<Scalars['Float']>,
  /** Array of [start time, end time] in minutes from midnight */
  justInTimeHoursOfOperations?: Maybe<Array<JustInTimeHoursOfOperationInput>>,
  /** Array of 7 booleans for [Mon,...,Sun] */
  justInTimeWeekDays?: Maybe<Array<Scalars['Boolean']>>,
  blackoutPeriods?: Maybe<Array<BlackoutPeriodInput>>,
};

/** network of notification */
export enum SendBy {
  Email = 'Email',
  Sms = 'Sms'
}

export type SendEmailMessage = {
   __typename?: 'SendEmailMessage',
  template: Scalars['String'],
  fields: EmailFields,
  entities: EmailEntities,
  sendTime: Scalars['DateTime'],
};

export type SendNotificationMessage = {
   __typename?: 'SendNotificationMessage',
  notification: NotificationForAttendee,
  sendTime: Scalars['DateTime'],
};

export type SendSmsMessage = {
   __typename?: 'SendSmsMessage',
  phoneNumber: Scalars['String'],
  message: Scalars['String'],
  notificationId: Scalars['String'],
  attendeeId: Scalars['String'],
};

/** Send notification up to */
export enum SendTo {
  AllAttendees = 'AllAttendees',
  DidNotAttend = 'DidNotAttend',
  LeftEarly = 'LeftEarly',
  WatchedUntilEnd = 'WatchedUntilEnd'
}

export type Session = {
   __typename?: 'Session',
  value: Scalars['String'],
  text: Scalars['String'],
};

/** Vimeo Video Url & ID */
export type SetLocalVimeoUploadDoneInput = {
  vimeoVideoUri: Scalars['String'],
  vimeoVideoId: Scalars['Float'],
};

export type SocialLink = {
   __typename?: 'SocialLink',
  facebook?: Maybe<Scalars['String']>,
  twitter?: Maybe<Scalars['String']>,
  linkedin?: Maybe<Scalars['String']>,
};

export type SocialLinkInput = {
  facebook?: Maybe<Scalars['String']>,
  twitter?: Maybe<Scalars['String']>,
  linkedin?: Maybe<Scalars['String']>,
};

export type SocketAttendeeResponse = {
   __typename?: 'SocketAttendeeResponse',
  id: Scalars['String'],
  firstName: Scalars['String'],
  lastName?: Maybe<Scalars['String']>,
};

export type SocketChatResponse = {
   __typename?: 'SocketChatResponse',
  hasUnreadMessages: Scalars['Boolean'],
  message?: Maybe<SocketMessageResponse>,
  typing?: Maybe<SocketTypingResponse>,
  conversation: SocketConversationResponse,
  user: SocketUserResponse,
  attendee?: Maybe<SocketAttendeeResponse>,
};

export type SocketConversationResponse = {
   __typename?: 'SocketConversationResponse',
  id: Scalars['ID'],
  isArchived: Scalars['Boolean'],
  inEmail: Scalars['Boolean'],
  lastReadAt: Scalars['DateTime'],
  sortDate: Scalars['DateTime'],
  isAttendeeLive: Scalars['Boolean'],
};

export type SocketMessage = {
  connectionId?: Maybe<Scalars['String']>,
  post?: Maybe<MessagePost>,
};

export type SocketMessageResponse = {
   __typename?: 'SocketMessageResponse',
  id: Scalars['ID'],
  fromAttendee: Scalars['Boolean'],
  roomType: Scalars['String'],
  timeInRoomSecs: Scalars['Float'],
  timeSent: Scalars['DateTime'],
  content: Scalars['String'],
  type: Scalars['String'],
};

export type SocketTypingResponse = {
   __typename?: 'SocketTypingResponse',
  fromAttendee: Scalars['Boolean'],
  timeSent: Scalars['DateTime'],
};

export type SocketUserResponse = {
   __typename?: 'SocketUserResponse',
  id: Scalars['String'],
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName?: Maybe<Scalars['String']>,
};

export type StartVideoUploadInfo = {
   __typename?: 'StartVideoUploadInfo',
  uploadLink: Scalars['String'],
  videoUri: Scalars['String'],
};

export type Team = {
   __typename?: 'Team',
  id: Scalars['String'],
  ewebinars: Array<EWebinar>,
  /** Team or Company Name */
  name?: Maybe<Scalars['String']>,
  subdomain?: Maybe<Scalars['String']>,
  logoMediaUrl?: Maybe<Scalars['String']>,
  users: Array<TeamUserRelation>,
  sets: Array<EWebinarSet>,
  stripeCustomerId?: Maybe<Scalars['String']>,
  /** Subscription ID on Stripe.  Grab "plan" to show user from there. */
  stripeSubscriptionId: Scalars['String'],
  /** Minimum number of webinars to charge for - Enterprise plans for example */
  minimumPublicWebinars: Scalars['Float'],
  address: Address,
  billingCycle: BillingCycle,
  /** Last 4 digits of CC used to subscribe */
  last4?: Maybe<Scalars['String']>,
  /** CC type */
  ccType?: Maybe<Scalars['String']>,
  presenters: Array<Presenter>,
};

export type TeamEntity = {
   __typename?: 'TeamEntity',
  id: Scalars['String'],
  name: Scalars['String'],
  cc: Scalars['String'],
};

export type TeamInput = {
  id?: Maybe<Scalars['String']>,
  /** Team or Company Name */
  name?: Maybe<Scalars['String']>,
  subdomain?: Maybe<Scalars['String']>,
  logoMediaUrl?: Maybe<Scalars['String']>,
  address?: Maybe<AddressInput>,
  billingCycle?: Maybe<BillingCycle>,
  stripeCustomerId?: Maybe<Scalars['String']>,
  /** Last 4 digits of CC used to subscribe */
  last4?: Maybe<Scalars['String']>,
  /** CC Type */
  ccType?: Maybe<Scalars['String']>,
  /** Payment Method ID generated by Stipe JS Library */
  paymentMethodID?: Maybe<Scalars['String']>,
};

export type TeamUserRelation = {
   __typename?: 'TeamUserRelation',
  id: Scalars['ID'],
  team: Team,
  user: User,
  invitedByUser?: Maybe<User>,
  role: Scalars['String'],
  invitationStatus?: Maybe<InvitationStatus>,
};

export type ThankyouPageHeader = {
   __typename?: 'ThankyouPageHeader',
  title?: Maybe<Scalars['String']>,
  subtitle?: Maybe<Scalars['String']>,
  sessionId?: Maybe<Scalars['Float']>,
  mainMediaUrl?: Maybe<Scalars['String']>,
};

export type ThankyouPageHeaderInput = {
  logoUrl?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  subtitle?: Maybe<Scalars['String']>,
  sessionId?: Maybe<Scalars['Float']>,
  mainMediaUrl?: Maybe<Scalars['String']>,
  redirectionUrl?: Maybe<Scalars['String']>,
};

export type ThankyouPageSettings = {
   __typename?: 'ThankyouPageSettings',
  redirectionUrl?: Maybe<Scalars['String']>,
  headerSection?: Maybe<ThankyouPageHeader>,
  presentersSection?: Maybe<RegistrationPresenters>,
  shareSection?: Maybe<ThankyouPageShare>,
  footerSection?: Maybe<RegistrationFooter>,
};

export type ThankyouPageSettingsInput = {
  redirectionUrl?: Maybe<Scalars['String']>,
  headerSection?: Maybe<ThankyouPageHeaderInput>,
  presentersSection?: Maybe<RegistrationPresentersInput>,
  shareSection?: Maybe<ThankyouPageShareInput>,
  footerSection?: Maybe<RegistrationFooterInput>,
};

export type ThankyouPageShare = {
   __typename?: 'ThankyouPageShare',
  active?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  socialMedia?: Maybe<Array<ThankyouPageShareSocial>>,
};

export type ThankyouPageShareInput = {
  active?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  socialMedia?: Maybe<Array<ThankyouPageShareSocialInput>>,
};

export type ThankyouPageShareSocial = {
   __typename?: 'ThankyouPageShareSocial',
  name?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
};

export type ThankyouPageShareSocialInput = {
  name?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
};

export type ToEntities = {
   __typename?: 'ToEntities',
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type Token = {
   __typename?: 'Token',
  id: Scalars['String'],
};

export type TranscodeMessage = {
   __typename?: 'TranscodeMessage',
  webinarId: Scalars['String'],
  videoUrl: Scalars['String'],
  accessToken: Scalars['String'],
  progress: Scalars['Float'],
};

/** Update conversation */
export type UpdateConversationInput = {
  id: Scalars['String'],
  isArchived?: Maybe<Scalars['Boolean']>,
  lastReadAt?: Maybe<Scalars['DateTime']>,
};

/** Update ewebinar */
export type UpdateEwebinarInput = {
  id: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  vimeoVideoId?: Maybe<Scalars['Float']>,
  thumbnail?: Maybe<Scalars['String']>,
  primaryColor?: Maybe<Scalars['String']>,
  highlightColor?: Maybe<Scalars['String']>,
  font?: Maybe<Scalars['String']>,
  theme?: Maybe<Scalars['String']>,
  colorsMatchLogo?: Maybe<Scalars['Boolean']>,
  logoMediaUrl?: Maybe<Scalars['String']>,
  registrationPageSettings?: Maybe<RegistrationPageSettingsInput>,
  registrationFormSettings?: Maybe<RegistrationFormSettingsInput>,
  thankyouPageSettings?: Maybe<ThankyouPageSettingsInput>,
  viewerRoomSettings?: Maybe<ViewerRoomSettingsInput>,
  exitRoomSettings?: Maybe<ExitRoomSettingsInput>,
  /** Waiting room duration in seconds */
  waitingRoomDurationSecs?: Maybe<Scalars['Float']>,
  /** Exit room duration in seconds */
  exitRoomDurationSecs?: Maybe<Scalars['Float']>,
  oneTimeEvent?: Maybe<Scalars['Boolean']>,
  timeZone?: Maybe<Scalars['String']>,
  use24HourClock?: Maybe<Scalars['Boolean']>,
  startDate?: Maybe<Scalars['DateTime']>,
  endDateEnabled?: Maybe<Scalars['Boolean']>,
  endDate?: Maybe<Scalars['DateTime']>,
  justInTimeModeEnabled?: Maybe<Scalars['Boolean']>,
  scheduleSettings?: Maybe<ScheduleSettingsInput>,
  notificationSettings?: Maybe<NotificationSettingsInput>,
  enableChat?: Maybe<Scalars['Boolean']>,
  chatSettings?: Maybe<ChatSettingsInput>,
  duration?: Maybe<Scalars['Float']>,
  uploadStatus?: Maybe<UploadStatusInput>,
  set?: Maybe<UpdateEWebinarSetInput>,
  presenterIds?: Maybe<Array<Scalars['String']>>,
};

export type UpdateEWebinarSetInput = {
  id: Scalars['String'],
  moderator: UpdateModeratorInput,
};

export type UpdateModeratorInput = {
  id: Scalars['String'],
};

/** Update user or me */
export type UpdateUserAndTeamInput = {
  id?: Maybe<Scalars['String']>,
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  timezone?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>,
  team?: Maybe<TeamInput>,
  email: Scalars['String'],
  password?: Maybe<Scalars['String']>,
};

export type UploadMessage = {
   __typename?: 'UploadMessage',
  webinarId: Scalars['String'],
  url: Scalars['String'],
  accessToken: Scalars['String'],
};

export type UploadStatus = {
   __typename?: 'UploadStatus',
  stage?: Maybe<Scalars['String']>,
  localUpload?: Maybe<Scalars['Boolean']>,
  progress?: Maybe<Scalars['Float']>,
  done?: Maybe<Scalars['Boolean']>,
  error?: Maybe<Scalars['String']>,
};

export type UploadStatusInput = {
  stage?: Maybe<Scalars['String']>,
  localUpload?: Maybe<Scalars['Boolean']>,
  progress?: Maybe<Scalars['Float']>,
  done?: Maybe<Scalars['Boolean']>,
  error?: Maybe<Scalars['String']>,
};

/** VimeoUrl */
export type UploadVideoInput = {
  url: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['String'],
  teamRelations: Array<TeamUserRelation>,
  currentTeamRelation?: Maybe<TeamUserRelation>,
  team: Team,
  presenter: Presenter,
  /** Webinars I've been assigned to as moderator */
  assignedSets?: Maybe<Array<EWebinar>>,
  version: Scalars['Float'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  profileMediaUrl?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName?: Maybe<Scalars['String']>,
  /** First + Last name */
  name: Scalars['String'],
  timezone: Scalars['String'],
  password?: Maybe<Scalars['String']>,
  state: UserState,
  isVerified?: Maybe<Scalars['Boolean']>,
};

/** Update User input */
export type UserAndPresenterInput = {
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  role?: Maybe<UserRole>,
  id?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  company?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  socialLinks?: Maybe<SocialLinkInput>,
  presenterId?: Maybe<Scalars['String']>,
};

export type UserEntity = {
   __typename?: 'UserEntity',
  id: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  timezone: Scalars['String'],
  role: UserRole,
};

export type UserFilters = {
  orderBy?: Maybe<UserOrderByFields>,
  orderDirection?: Maybe<OrderDirection>,
};

export type UserInput = {
  profileMediaUrl?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  role?: Maybe<UserRole>,
};

export type UserInTeam = {
   __typename?: 'UserInTeam',
  id: Scalars['String'],
  teamRelations: Array<TeamUserRelation>,
  currentTeamRelation?: Maybe<TeamUserRelation>,
  team: Team,
  presenter: Presenter,
  /** Webinars I've been assigned to as moderator */
  assignedSets?: Maybe<Array<EWebinar>>,
  version: Scalars['Float'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  profileMediaUrl?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName?: Maybe<Scalars['String']>,
  /** First + Last name */
  name: Scalars['String'],
  timezone: Scalars['String'],
  password?: Maybe<Scalars['String']>,
  state: UserState,
  isVerified?: Maybe<Scalars['Boolean']>,
  role: UserRole,
  invitationStatus?: Maybe<InvitationStatus>,
};

/** Allow orderBy fields */
export enum UserOrderByFields {
  CreatedAt = 'CreatedAt',
  FirstName = 'FirstName'
}

/** User Authorization Roles */
export enum UserRole {
  Ops = 'Ops',
  Admin = 'Admin',
  Creator = 'Creator',
  Moderator = 'Moderator'
}

export enum UserState {
  New = 'New',
  HasCreated = 'HasCreated',
  HasPublished = 'HasPublished'
}

export type VideoMeta = {
   __typename?: 'VideoMeta',
  id: Scalars['String'],
  url: Scalars['String'],
  title: Scalars['String'],
  duration: Scalars['String'],
  thumbnail: Scalars['String'],
};

export type ViewerRoomSettings = {
   __typename?: 'ViewerRoomSettings',
  attendeeCounter?: Maybe<Scalars['Boolean']>,
  attendeeCounterOption?: Maybe<AttendeeCounterOption>,
  attendeeReactions?: Maybe<Scalars['Boolean']>,
  attendeeReactionsOption?: Maybe<AttendeeReactionsOption>,
};

export type ViewerRoomSettingsInput = {
  attendeeCounter?: Maybe<Scalars['Boolean']>,
  attendeeCounterOption?: Maybe<AttendeeCounterOption>,
  attendeeReactions?: Maybe<Scalars['Boolean']>,
  attendeeReactionsOption?: Maybe<AttendeeReactionsOption>,
};

/** days of week */
export enum WeekDays {
  Mon = 'mon',
  Tue = 'tue',
  Wed = 'wed',
  Thu = 'thu',
  Fri = 'fri',
  Sat = 'sat',
  Sun = 'sun'
}

export type WelcomeMessageAttendeeVariables = {
   __typename?: 'WelcomeMessageAttendeeVariables',
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  name: Scalars['String'],
};

export type WelcomeMessageVariables = {
   __typename?: 'WelcomeMessageVariables',
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  name: Scalars['String'],
  attendee: Scalars['JSON'],
};

/** When units */
export enum WhenUnit {
  Minutes = 'Minutes',
  Hours = 'Hours',
  Days = 'Days'
}

export const NotificationFragmentDoc = gql`
    fragment Notification on Notification {
  id
  type
  sendBy
  whenNumber
  whenUnit
  subject
  followUpTo
  message
}
    `;
export const UserFragmentDoc = gql`
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
export const PresenterFragmentDoc = gql`
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
    ${UserFragmentDoc}`;
export const EWebinarFragmentDoc = gql`
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
    ${PresenterFragmentDoc}`;
export const EWebinarSetFragmentDoc = gql`
    fragment EWebinarSet on EWebinarSet {
  id
  publicWebinar {
    ...EWebinar
  }
  draftWebinar {
    ...EWebinar
  }
}
    ${EWebinarFragmentDoc}`;
export const AnalyticsFragmentDoc = gql`
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
export const AttendeeFragmentDoc = gql`
    fragment Attendee on Attendee {
  id
  attendeeId {
    visitorId
    startTime
    setId
  }
  firstName
  lastName
  visitorId
  startTime
  optOut
  joinTime
  set {
    id
  }
  ewebinar {
    id
  }
}
    `;
export const ConversationFragmentDoc = gql`
    fragment Conversation on Conversation {
  id
  inEmail
  attendee {
    id
    attendeeFields
    startTime
    firstName
    lastName
    email
  }
  isArchived
  lastReadAt
  isAttendeeLive
  sortDate
  hasUnreadMessages
  lastMessage {
    id
    fromAttendee
    content
    timeSent
  }
  set {
    id
  }
  ewebinar {
    id
  }
  isAttendeeLive
}
    `;
export const ConversationsFragmentDoc = gql`
    fragment Conversations on Conversations {
  conversations {
    ...Conversation
  }
  total
  nextCursor
}
    ${ConversationFragmentDoc}`;
export const MessageFragmentDoc = gql`
    fragment Message on Message {
  id
  timeSent
  roomType
  timeInRoomSecs
  fromAttendee
  user {
    id
    firstName
    lastName
    profileMediaUrl
  }
  content
}
    `;
export const EWebinarDescriptionFragmentDoc = gql`
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
export const EWebinarPublicDescriptionFragmentDoc = gql`
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
export const EwebinarReactionFragmentDoc = gql`
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
    `;
export const ReactionForAttendeeFragmentDoc = gql`
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
    ${EwebinarReactionFragmentDoc}`;
export const InteractionFragmentDoc = gql`
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
export const InteractionViewModeFragmentDoc = gql`
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
    ${InteractionFragmentDoc}`;
export const TeamFragmentDoc = gql`
    fragment Team on Team {
  id
  name
  logoMediaUrl
  subdomain
}
    `;
export const MemberFragmentDoc = gql`
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
    ${PresenterFragmentDoc}`;
export const MeFragmentDoc = gql`
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
export const GetEwebinarNotificationsDocument = gql`
    query getEwebinarNotifications($ewebinarId: String!) {
  notifications(ewebinarId: $ewebinarId) {
    ...Notification
  }
}
    ${NotificationFragmentDoc}`;
export type GetEwebinarNotificationsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetEwebinarNotificationsQuery, GetEwebinarNotificationsQueryVariables>, 'query'> & ({ variables: GetEwebinarNotificationsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetEwebinarNotificationsComponent = (props: GetEwebinarNotificationsComponentProps) => (
      <ApolloReactComponents.Query<GetEwebinarNotificationsQuery, GetEwebinarNotificationsQueryVariables> query={GetEwebinarNotificationsDocument} {...props} />
    );
    

/**
 * __useGetEwebinarNotificationsQuery__
 *
 * To run a query within a React component, call `useGetEwebinarNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEwebinarNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEwebinarNotificationsQuery({
 *   variables: {
 *      ewebinarId: // value for 'ewebinarId'
 *   },
 * });
 */
export function useGetEwebinarNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEwebinarNotificationsQuery, GetEwebinarNotificationsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEwebinarNotificationsQuery, GetEwebinarNotificationsQueryVariables>(GetEwebinarNotificationsDocument, baseOptions);
      }
export function useGetEwebinarNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEwebinarNotificationsQuery, GetEwebinarNotificationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEwebinarNotificationsQuery, GetEwebinarNotificationsQueryVariables>(GetEwebinarNotificationsDocument, baseOptions);
        }
export type GetEwebinarNotificationsQueryHookResult = ReturnType<typeof useGetEwebinarNotificationsQuery>;
export type GetEwebinarNotificationsLazyQueryHookResult = ReturnType<typeof useGetEwebinarNotificationsLazyQuery>;
export type GetEwebinarNotificationsQueryResult = ApolloReactCommon.QueryResult<GetEwebinarNotificationsQuery, GetEwebinarNotificationsQueryVariables>;
export const CreateNotificationDocument = gql`
    mutation createNotification($data: NotificationInput!) {
  createNotification(data: $data) {
    ...Notification
  }
}
    ${NotificationFragmentDoc}`;
export type CreateNotificationMutationFn = ApolloReactCommon.MutationFunction<CreateNotificationMutation, CreateNotificationMutationVariables>;
export type CreateNotificationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateNotificationMutation, CreateNotificationMutationVariables>, 'mutation'>;

    export const CreateNotificationComponent = (props: CreateNotificationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateNotificationMutation, CreateNotificationMutationVariables> mutation={CreateNotificationDocument} {...props} />
    );
    

/**
 * __useCreateNotificationMutation__
 *
 * To run a mutation, you first call `useCreateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationMutation, { data, loading, error }] = useCreateNotificationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateNotificationMutation, CreateNotificationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateNotificationMutation, CreateNotificationMutationVariables>(CreateNotificationDocument, baseOptions);
      }
export type CreateNotificationMutationHookResult = ReturnType<typeof useCreateNotificationMutation>;
export type CreateNotificationMutationResult = ApolloReactCommon.MutationResult<CreateNotificationMutation>;
export type CreateNotificationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateNotificationMutation, CreateNotificationMutationVariables>;
export const UpdateNotificationDocument = gql`
    mutation updateNotification($data: NotificationInput!) {
  updateNotification(data: $data) {
    ...Notification
  }
}
    ${NotificationFragmentDoc}`;
export type UpdateNotificationMutationFn = ApolloReactCommon.MutationFunction<UpdateNotificationMutation, UpdateNotificationMutationVariables>;
export type UpdateNotificationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>, 'mutation'>;

    export const UpdateNotificationComponent = (props: UpdateNotificationComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateNotificationMutation, UpdateNotificationMutationVariables> mutation={UpdateNotificationDocument} {...props} />
    );
    

/**
 * __useUpdateNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationMutation, { data, loading, error }] = useUpdateNotificationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateNotificationMutation, UpdateNotificationMutationVariables>(UpdateNotificationDocument, baseOptions);
      }
export type UpdateNotificationMutationHookResult = ReturnType<typeof useUpdateNotificationMutation>;
export type UpdateNotificationMutationResult = ApolloReactCommon.MutationResult<UpdateNotificationMutation>;
export type UpdateNotificationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation deleteNotification($id: String!) {
  deleteNotification(id: $id)
}
    `;
export type DeleteNotificationMutationFn = ApolloReactCommon.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export type DeleteNotificationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>, 'mutation'>;

    export const DeleteNotificationComponent = (props: DeleteNotificationComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteNotificationMutation, DeleteNotificationMutationVariables> mutation={DeleteNotificationDocument} {...props} />
    );
    

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, baseOptions);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = ApolloReactCommon.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const PublicSetDocument = gql`
    query publicSet($id: String!) {
  publicSet(id: $id) {
    ...EWebinarSet
  }
}
    ${EWebinarSetFragmentDoc}`;
export type PublicSetComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PublicSetQuery, PublicSetQueryVariables>, 'query'> & ({ variables: PublicSetQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const PublicSetComponent = (props: PublicSetComponentProps) => (
      <ApolloReactComponents.Query<PublicSetQuery, PublicSetQueryVariables> query={PublicSetDocument} {...props} />
    );
    

/**
 * __usePublicSetQuery__
 *
 * To run a query within a React component, call `usePublicSetQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicSetQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicSetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublicSetQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicSetQuery, PublicSetQueryVariables>) {
        return ApolloReactHooks.useQuery<PublicSetQuery, PublicSetQueryVariables>(PublicSetDocument, baseOptions);
      }
export function usePublicSetLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicSetQuery, PublicSetQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PublicSetQuery, PublicSetQueryVariables>(PublicSetDocument, baseOptions);
        }
export type PublicSetQueryHookResult = ReturnType<typeof usePublicSetQuery>;
export type PublicSetLazyQueryHookResult = ReturnType<typeof usePublicSetLazyQuery>;
export type PublicSetQueryResult = ApolloReactCommon.QueryResult<PublicSetQuery, PublicSetQueryVariables>;
export const GetAnalyticsDocument = gql`
    query getAnalytics($filter: DashboardFilterInput) {
  analytics(filter: $filter) {
    ...Analytics
  }
}
    ${AnalyticsFragmentDoc}`;
export type GetAnalyticsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAnalyticsQuery, GetAnalyticsQueryVariables>, 'query'>;

    export const GetAnalyticsComponent = (props: GetAnalyticsComponentProps) => (
      <ApolloReactComponents.Query<GetAnalyticsQuery, GetAnalyticsQueryVariables> query={GetAnalyticsDocument} {...props} />
    );
    

/**
 * __useGetAnalyticsQuery__
 *
 * To run a query within a React component, call `useGetAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnalyticsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAnalyticsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAnalyticsQuery, GetAnalyticsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAnalyticsQuery, GetAnalyticsQueryVariables>(GetAnalyticsDocument, baseOptions);
      }
export function useGetAnalyticsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAnalyticsQuery, GetAnalyticsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAnalyticsQuery, GetAnalyticsQueryVariables>(GetAnalyticsDocument, baseOptions);
        }
export type GetAnalyticsQueryHookResult = ReturnType<typeof useGetAnalyticsQuery>;
export type GetAnalyticsLazyQueryHookResult = ReturnType<typeof useGetAnalyticsLazyQuery>;
export type GetAnalyticsQueryResult = ApolloReactCommon.QueryResult<GetAnalyticsQuery, GetAnalyticsQueryVariables>;
export const CreateUploadUrlDocument = gql`
    mutation createUploadUrl($data: CreateUploadUrlInput!) {
  createUploadUrl(data: $data) {
    url
    uploadUrl
  }
}
    `;
export type CreateUploadUrlMutationFn = ApolloReactCommon.MutationFunction<CreateUploadUrlMutation, CreateUploadUrlMutationVariables>;
export type CreateUploadUrlComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUploadUrlMutation, CreateUploadUrlMutationVariables>, 'mutation'>;

    export const CreateUploadUrlComponent = (props: CreateUploadUrlComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUploadUrlMutation, CreateUploadUrlMutationVariables> mutation={CreateUploadUrlDocument} {...props} />
    );
    

/**
 * __useCreateUploadUrlMutation__
 *
 * To run a mutation, you first call `useCreateUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUploadUrlMutation, { data, loading, error }] = useCreateUploadUrlMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUploadUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUploadUrlMutation, CreateUploadUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUploadUrlMutation, CreateUploadUrlMutationVariables>(CreateUploadUrlDocument, baseOptions);
      }
export type CreateUploadUrlMutationHookResult = ReturnType<typeof useCreateUploadUrlMutation>;
export type CreateUploadUrlMutationResult = ApolloReactCommon.MutationResult<CreateUploadUrlMutation>;
export type CreateUploadUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUploadUrlMutation, CreateUploadUrlMutationVariables>;
export const GetAttendeeDocument = gql`
    query getAttendee($id: String!) {
  attendee(id: $id) {
    ...Attendee
  }
}
    ${AttendeeFragmentDoc}`;
export type GetAttendeeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAttendeeQuery, GetAttendeeQueryVariables>, 'query'> & ({ variables: GetAttendeeQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetAttendeeComponent = (props: GetAttendeeComponentProps) => (
      <ApolloReactComponents.Query<GetAttendeeQuery, GetAttendeeQueryVariables> query={GetAttendeeDocument} {...props} />
    );
    

/**
 * __useGetAttendeeQuery__
 *
 * To run a query within a React component, call `useGetAttendeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendeeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendeeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAttendeeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAttendeeQuery, GetAttendeeQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAttendeeQuery, GetAttendeeQueryVariables>(GetAttendeeDocument, baseOptions);
      }
export function useGetAttendeeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAttendeeQuery, GetAttendeeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAttendeeQuery, GetAttendeeQueryVariables>(GetAttendeeDocument, baseOptions);
        }
export type GetAttendeeQueryHookResult = ReturnType<typeof useGetAttendeeQuery>;
export type GetAttendeeLazyQueryHookResult = ReturnType<typeof useGetAttendeeLazyQuery>;
export type GetAttendeeQueryResult = ApolloReactCommon.QueryResult<GetAttendeeQuery, GetAttendeeQueryVariables>;
export const RegisterAttendeeDocument = gql`
    mutation registerAttendee($data: RegisterAttendeeInput!) {
  registerAttendee(data: $data) {
    ...Attendee
  }
}
    ${AttendeeFragmentDoc}`;
export type RegisterAttendeeMutationFn = ApolloReactCommon.MutationFunction<RegisterAttendeeMutation, RegisterAttendeeMutationVariables>;
export type RegisterAttendeeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterAttendeeMutation, RegisterAttendeeMutationVariables>, 'mutation'>;

    export const RegisterAttendeeComponent = (props: RegisterAttendeeComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterAttendeeMutation, RegisterAttendeeMutationVariables> mutation={RegisterAttendeeDocument} {...props} />
    );
    

/**
 * __useRegisterAttendeeMutation__
 *
 * To run a mutation, you first call `useRegisterAttendeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAttendeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAttendeeMutation, { data, loading, error }] = useRegisterAttendeeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterAttendeeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterAttendeeMutation, RegisterAttendeeMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterAttendeeMutation, RegisterAttendeeMutationVariables>(RegisterAttendeeDocument, baseOptions);
      }
export type RegisterAttendeeMutationHookResult = ReturnType<typeof useRegisterAttendeeMutation>;
export type RegisterAttendeeMutationResult = ApolloReactCommon.MutationResult<RegisterAttendeeMutation>;
export type RegisterAttendeeMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterAttendeeMutation, RegisterAttendeeMutationVariables>;
export const UpdateStartTimeDocument = gql`
    mutation updateStartTime($startTime: DateTime!, $id: String!) {
  updateStartTime(startTime: $startTime, id: $id) {
    ...Attendee
  }
}
    ${AttendeeFragmentDoc}`;
export type UpdateStartTimeMutationFn = ApolloReactCommon.MutationFunction<UpdateStartTimeMutation, UpdateStartTimeMutationVariables>;
export type UpdateStartTimeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateStartTimeMutation, UpdateStartTimeMutationVariables>, 'mutation'>;

    export const UpdateStartTimeComponent = (props: UpdateStartTimeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateStartTimeMutation, UpdateStartTimeMutationVariables> mutation={UpdateStartTimeDocument} {...props} />
    );
    

/**
 * __useUpdateStartTimeMutation__
 *
 * To run a mutation, you first call `useUpdateStartTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStartTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStartTimeMutation, { data, loading, error }] = useUpdateStartTimeMutation({
 *   variables: {
 *      startTime: // value for 'startTime'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateStartTimeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateStartTimeMutation, UpdateStartTimeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateStartTimeMutation, UpdateStartTimeMutationVariables>(UpdateStartTimeDocument, baseOptions);
      }
export type UpdateStartTimeMutationHookResult = ReturnType<typeof useUpdateStartTimeMutation>;
export type UpdateStartTimeMutationResult = ApolloReactCommon.MutationResult<UpdateStartTimeMutation>;
export type UpdateStartTimeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateStartTimeMutation, UpdateStartTimeMutationVariables>;
export const CreateVisitorDocument = gql`
    mutation createVisitor($data: CreateVisitorInput!) {
  createVisitor(data: $data) {
    ...Attendee
  }
}
    ${AttendeeFragmentDoc}`;
export type CreateVisitorMutationFn = ApolloReactCommon.MutationFunction<CreateVisitorMutation, CreateVisitorMutationVariables>;
export type CreateVisitorComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateVisitorMutation, CreateVisitorMutationVariables>, 'mutation'>;

    export const CreateVisitorComponent = (props: CreateVisitorComponentProps) => (
      <ApolloReactComponents.Mutation<CreateVisitorMutation, CreateVisitorMutationVariables> mutation={CreateVisitorDocument} {...props} />
    );
    

/**
 * __useCreateVisitorMutation__
 *
 * To run a mutation, you first call `useCreateVisitorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitorMutation, { data, loading, error }] = useCreateVisitorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVisitorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateVisitorMutation, CreateVisitorMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateVisitorMutation, CreateVisitorMutationVariables>(CreateVisitorDocument, baseOptions);
      }
export type CreateVisitorMutationHookResult = ReturnType<typeof useCreateVisitorMutation>;
export type CreateVisitorMutationResult = ApolloReactCommon.MutationResult<CreateVisitorMutation>;
export type CreateVisitorMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateVisitorMutation, CreateVisitorMutationVariables>;
export const AttendeeJoinWebinarDocument = gql`
    mutation attendeeJoinWebinar($id: String!, $joinTime: DateTime!) {
  attendeeJoinWebinar(id: $id, joinTime: $joinTime) {
    ...Attendee
    ewebinar {
      ...EWebinar
      interactions {
        ...Interaction
      }
    }
  }
}
    ${AttendeeFragmentDoc}
${EWebinarFragmentDoc}
${InteractionFragmentDoc}`;
export type AttendeeJoinWebinarMutationFn = ApolloReactCommon.MutationFunction<AttendeeJoinWebinarMutation, AttendeeJoinWebinarMutationVariables>;
export type AttendeeJoinWebinarComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AttendeeJoinWebinarMutation, AttendeeJoinWebinarMutationVariables>, 'mutation'>;

    export const AttendeeJoinWebinarComponent = (props: AttendeeJoinWebinarComponentProps) => (
      <ApolloReactComponents.Mutation<AttendeeJoinWebinarMutation, AttendeeJoinWebinarMutationVariables> mutation={AttendeeJoinWebinarDocument} {...props} />
    );
    

/**
 * __useAttendeeJoinWebinarMutation__
 *
 * To run a mutation, you first call `useAttendeeJoinWebinarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttendeeJoinWebinarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attendeeJoinWebinarMutation, { data, loading, error }] = useAttendeeJoinWebinarMutation({
 *   variables: {
 *      id: // value for 'id'
 *      joinTime: // value for 'joinTime'
 *   },
 * });
 */
export function useAttendeeJoinWebinarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AttendeeJoinWebinarMutation, AttendeeJoinWebinarMutationVariables>) {
        return ApolloReactHooks.useMutation<AttendeeJoinWebinarMutation, AttendeeJoinWebinarMutationVariables>(AttendeeJoinWebinarDocument, baseOptions);
      }
export type AttendeeJoinWebinarMutationHookResult = ReturnType<typeof useAttendeeJoinWebinarMutation>;
export type AttendeeJoinWebinarMutationResult = ApolloReactCommon.MutationResult<AttendeeJoinWebinarMutation>;
export type AttendeeJoinWebinarMutationOptions = ApolloReactCommon.BaseMutationOptions<AttendeeJoinWebinarMutation, AttendeeJoinWebinarMutationVariables>;
export const AttendeeOptOutDocument = gql`
    mutation attendeeOptOut($id: String!, $optOut: Boolean!) {
  attendeeOptOut(id: $id, optOut: $optOut) {
    id
    ewebinar {
      title
      team {
        name
        logoMediaUrl
      }
    }
  }
}
    `;
export type AttendeeOptOutMutationFn = ApolloReactCommon.MutationFunction<AttendeeOptOutMutation, AttendeeOptOutMutationVariables>;
export type AttendeeOptOutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AttendeeOptOutMutation, AttendeeOptOutMutationVariables>, 'mutation'>;

    export const AttendeeOptOutComponent = (props: AttendeeOptOutComponentProps) => (
      <ApolloReactComponents.Mutation<AttendeeOptOutMutation, AttendeeOptOutMutationVariables> mutation={AttendeeOptOutDocument} {...props} />
    );
    

/**
 * __useAttendeeOptOutMutation__
 *
 * To run a mutation, you first call `useAttendeeOptOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttendeeOptOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attendeeOptOutMutation, { data, loading, error }] = useAttendeeOptOutMutation({
 *   variables: {
 *      id: // value for 'id'
 *      optOut: // value for 'optOut'
 *   },
 * });
 */
export function useAttendeeOptOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AttendeeOptOutMutation, AttendeeOptOutMutationVariables>) {
        return ApolloReactHooks.useMutation<AttendeeOptOutMutation, AttendeeOptOutMutationVariables>(AttendeeOptOutDocument, baseOptions);
      }
export type AttendeeOptOutMutationHookResult = ReturnType<typeof useAttendeeOptOutMutation>;
export type AttendeeOptOutMutationResult = ApolloReactCommon.MutationResult<AttendeeOptOutMutation>;
export type AttendeeOptOutMutationOptions = ApolloReactCommon.BaseMutationOptions<AttendeeOptOutMutation, AttendeeOptOutMutationVariables>;
export const ConversationDocument = gql`
    query conversation($id: String!) {
  conversation(id: $id) {
    ...Conversation
    messages {
      ...Message
    }
  }
}
    ${ConversationFragmentDoc}
${MessageFragmentDoc}`;
export type ConversationComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ConversationQuery, ConversationQueryVariables>, 'query'> & ({ variables: ConversationQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ConversationComponent = (props: ConversationComponentProps) => (
      <ApolloReactComponents.Query<ConversationQuery, ConversationQueryVariables> query={ConversationDocument} {...props} />
    );
    

/**
 * __useConversationQuery__
 *
 * To run a query within a React component, call `useConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useConversationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
        return ApolloReactHooks.useQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, baseOptions);
      }
export function useConversationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, baseOptions);
        }
export type ConversationQueryHookResult = ReturnType<typeof useConversationQuery>;
export type ConversationLazyQueryHookResult = ReturnType<typeof useConversationLazyQuery>;
export type ConversationQueryResult = ApolloReactCommon.QueryResult<ConversationQuery, ConversationQueryVariables>;
export const ConversationForAttendeeDocument = gql`
    query conversationForAttendee($attendeeId: AttendeeIDInput!) {
  conversationForAttendee(attendeeId: $attendeeId) {
    ...Conversation
    messages {
      ...Message
    }
  }
}
    ${ConversationFragmentDoc}
${MessageFragmentDoc}`;
export type ConversationForAttendeeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ConversationForAttendeeQuery, ConversationForAttendeeQueryVariables>, 'query'> & ({ variables: ConversationForAttendeeQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ConversationForAttendeeComponent = (props: ConversationForAttendeeComponentProps) => (
      <ApolloReactComponents.Query<ConversationForAttendeeQuery, ConversationForAttendeeQueryVariables> query={ConversationForAttendeeDocument} {...props} />
    );
    

/**
 * __useConversationForAttendeeQuery__
 *
 * To run a query within a React component, call `useConversationForAttendeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationForAttendeeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationForAttendeeQuery({
 *   variables: {
 *      attendeeId: // value for 'attendeeId'
 *   },
 * });
 */
export function useConversationForAttendeeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ConversationForAttendeeQuery, ConversationForAttendeeQueryVariables>) {
        return ApolloReactHooks.useQuery<ConversationForAttendeeQuery, ConversationForAttendeeQueryVariables>(ConversationForAttendeeDocument, baseOptions);
      }
export function useConversationForAttendeeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ConversationForAttendeeQuery, ConversationForAttendeeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ConversationForAttendeeQuery, ConversationForAttendeeQueryVariables>(ConversationForAttendeeDocument, baseOptions);
        }
export type ConversationForAttendeeQueryHookResult = ReturnType<typeof useConversationForAttendeeQuery>;
export type ConversationForAttendeeLazyQueryHookResult = ReturnType<typeof useConversationForAttendeeLazyQuery>;
export type ConversationForAttendeeQueryResult = ApolloReactCommon.QueryResult<ConversationForAttendeeQuery, ConversationForAttendeeQueryVariables>;
export const ConversationsDocument = gql`
    query conversations($filters: ConversationFilters!) {
  conversations(filters: $filters) {
    conversations {
      ...Conversation
    }
    total
    nextCursor
  }
}
    ${ConversationFragmentDoc}`;
export type ConversationsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ConversationsQuery, ConversationsQueryVariables>, 'query'> & ({ variables: ConversationsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ConversationsComponent = (props: ConversationsComponentProps) => (
      <ApolloReactComponents.Query<ConversationsQuery, ConversationsQueryVariables> query={ConversationsDocument} {...props} />
    );
    

/**
 * __useConversationsQuery__
 *
 * To run a query within a React component, call `useConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useConversationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ConversationsQuery, ConversationsQueryVariables>) {
        return ApolloReactHooks.useQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, baseOptions);
      }
export function useConversationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ConversationsQuery, ConversationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, baseOptions);
        }
export type ConversationsQueryHookResult = ReturnType<typeof useConversationsQuery>;
export type ConversationsLazyQueryHookResult = ReturnType<typeof useConversationsLazyQuery>;
export type ConversationsQueryResult = ApolloReactCommon.QueryResult<ConversationsQuery, ConversationsQueryVariables>;
export const ArchiveConversationDocument = gql`
    mutation ArchiveConversation($id: String!) {
  archiveConversation(id: $id)
}
    `;
export type ArchiveConversationMutationFn = ApolloReactCommon.MutationFunction<ArchiveConversationMutation, ArchiveConversationMutationVariables>;
export type ArchiveConversationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ArchiveConversationMutation, ArchiveConversationMutationVariables>, 'mutation'>;

    export const ArchiveConversationComponent = (props: ArchiveConversationComponentProps) => (
      <ApolloReactComponents.Mutation<ArchiveConversationMutation, ArchiveConversationMutationVariables> mutation={ArchiveConversationDocument} {...props} />
    );
    

/**
 * __useArchiveConversationMutation__
 *
 * To run a mutation, you first call `useArchiveConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveConversationMutation, { data, loading, error }] = useArchiveConversationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveConversationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ArchiveConversationMutation, ArchiveConversationMutationVariables>) {
        return ApolloReactHooks.useMutation<ArchiveConversationMutation, ArchiveConversationMutationVariables>(ArchiveConversationDocument, baseOptions);
      }
export type ArchiveConversationMutationHookResult = ReturnType<typeof useArchiveConversationMutation>;
export type ArchiveConversationMutationResult = ApolloReactCommon.MutationResult<ArchiveConversationMutation>;
export type ArchiveConversationMutationOptions = ApolloReactCommon.BaseMutationOptions<ArchiveConversationMutation, ArchiveConversationMutationVariables>;
export const SeenConversationDocument = gql`
    mutation seenConversation($id: String!) {
  seenConversation(id: $id) {
    ...Conversation
  }
}
    ${ConversationFragmentDoc}`;
export type SeenConversationMutationFn = ApolloReactCommon.MutationFunction<SeenConversationMutation, SeenConversationMutationVariables>;
export type SeenConversationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SeenConversationMutation, SeenConversationMutationVariables>, 'mutation'>;

    export const SeenConversationComponent = (props: SeenConversationComponentProps) => (
      <ApolloReactComponents.Mutation<SeenConversationMutation, SeenConversationMutationVariables> mutation={SeenConversationDocument} {...props} />
    );
    

/**
 * __useSeenConversationMutation__
 *
 * To run a mutation, you first call `useSeenConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeenConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seenConversationMutation, { data, loading, error }] = useSeenConversationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSeenConversationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SeenConversationMutation, SeenConversationMutationVariables>) {
        return ApolloReactHooks.useMutation<SeenConversationMutation, SeenConversationMutationVariables>(SeenConversationDocument, baseOptions);
      }
export type SeenConversationMutationHookResult = ReturnType<typeof useSeenConversationMutation>;
export type SeenConversationMutationResult = ApolloReactCommon.MutationResult<SeenConversationMutation>;
export type SeenConversationMutationOptions = ApolloReactCommon.BaseMutationOptions<SeenConversationMutation, SeenConversationMutationVariables>;
export const CreateEwebinarDocument = gql`
    mutation createEwebinar($data: CreateEwebinarInput!) {
  createEwebinar(data: $data) {
    id
    title
    vimeoVideoId
    thumbnail
  }
}
    `;
export type CreateEwebinarMutationFn = ApolloReactCommon.MutationFunction<CreateEwebinarMutation, CreateEwebinarMutationVariables>;
export type CreateEwebinarComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateEwebinarMutation, CreateEwebinarMutationVariables>, 'mutation'>;

    export const CreateEwebinarComponent = (props: CreateEwebinarComponentProps) => (
      <ApolloReactComponents.Mutation<CreateEwebinarMutation, CreateEwebinarMutationVariables> mutation={CreateEwebinarDocument} {...props} />
    );
    

/**
 * __useCreateEwebinarMutation__
 *
 * To run a mutation, you first call `useCreateEwebinarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEwebinarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEwebinarMutation, { data, loading, error }] = useCreateEwebinarMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEwebinarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEwebinarMutation, CreateEwebinarMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateEwebinarMutation, CreateEwebinarMutationVariables>(CreateEwebinarDocument, baseOptions);
      }
export type CreateEwebinarMutationHookResult = ReturnType<typeof useCreateEwebinarMutation>;
export type CreateEwebinarMutationResult = ApolloReactCommon.MutationResult<CreateEwebinarMutation>;
export type CreateEwebinarMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEwebinarMutation, CreateEwebinarMutationVariables>;
export const EwebinarDocument = gql`
    query ewebinar($id: String!) {
  ewebinar(id: $id) {
    ...EWebinar
  }
}
    ${EWebinarFragmentDoc}`;
export type EwebinarComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<EwebinarQuery, EwebinarQueryVariables>, 'query'> & ({ variables: EwebinarQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const EwebinarComponent = (props: EwebinarComponentProps) => (
      <ApolloReactComponents.Query<EwebinarQuery, EwebinarQueryVariables> query={EwebinarDocument} {...props} />
    );
    

/**
 * __useEwebinarQuery__
 *
 * To run a query within a React component, call `useEwebinarQuery` and pass it any options that fit your needs.
 * When your component renders, `useEwebinarQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEwebinarQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEwebinarQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EwebinarQuery, EwebinarQueryVariables>) {
        return ApolloReactHooks.useQuery<EwebinarQuery, EwebinarQueryVariables>(EwebinarDocument, baseOptions);
      }
export function useEwebinarLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EwebinarQuery, EwebinarQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EwebinarQuery, EwebinarQueryVariables>(EwebinarDocument, baseOptions);
        }
export type EwebinarQueryHookResult = ReturnType<typeof useEwebinarQuery>;
export type EwebinarLazyQueryHookResult = ReturnType<typeof useEwebinarLazyQuery>;
export type EwebinarQueryResult = ApolloReactCommon.QueryResult<EwebinarQuery, EwebinarQueryVariables>;
export const UpdateEwebinarDocument = gql`
    mutation updateEwebinar($data: UpdateEwebinarInput!) {
  updateEwebinar(data: $data) {
    ...EWebinar
  }
}
    ${EWebinarFragmentDoc}`;
export type UpdateEwebinarMutationFn = ApolloReactCommon.MutationFunction<UpdateEwebinarMutation, UpdateEwebinarMutationVariables>;
export type UpdateEwebinarComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateEwebinarMutation, UpdateEwebinarMutationVariables>, 'mutation'>;

    export const UpdateEwebinarComponent = (props: UpdateEwebinarComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateEwebinarMutation, UpdateEwebinarMutationVariables> mutation={UpdateEwebinarDocument} {...props} />
    );
    

/**
 * __useUpdateEwebinarMutation__
 *
 * To run a mutation, you first call `useUpdateEwebinarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEwebinarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEwebinarMutation, { data, loading, error }] = useUpdateEwebinarMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateEwebinarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEwebinarMutation, UpdateEwebinarMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateEwebinarMutation, UpdateEwebinarMutationVariables>(UpdateEwebinarDocument, baseOptions);
      }
export type UpdateEwebinarMutationHookResult = ReturnType<typeof useUpdateEwebinarMutation>;
export type UpdateEwebinarMutationResult = ApolloReactCommon.MutationResult<UpdateEwebinarMutation>;
export type UpdateEwebinarMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateEwebinarMutation, UpdateEwebinarMutationVariables>;
export const DeleteEwebinarDocument = gql`
    mutation deleteEwebinar($id: String!) {
  deleteEwebinar(id: $id)
}
    `;
export type DeleteEwebinarMutationFn = ApolloReactCommon.MutationFunction<DeleteEwebinarMutation, DeleteEwebinarMutationVariables>;
export type DeleteEwebinarComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteEwebinarMutation, DeleteEwebinarMutationVariables>, 'mutation'>;

    export const DeleteEwebinarComponent = (props: DeleteEwebinarComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteEwebinarMutation, DeleteEwebinarMutationVariables> mutation={DeleteEwebinarDocument} {...props} />
    );
    

/**
 * __useDeleteEwebinarMutation__
 *
 * To run a mutation, you first call `useDeleteEwebinarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEwebinarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEwebinarMutation, { data, loading, error }] = useDeleteEwebinarMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEwebinarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteEwebinarMutation, DeleteEwebinarMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteEwebinarMutation, DeleteEwebinarMutationVariables>(DeleteEwebinarDocument, baseOptions);
      }
export type DeleteEwebinarMutationHookResult = ReturnType<typeof useDeleteEwebinarMutation>;
export type DeleteEwebinarMutationResult = ApolloReactCommon.MutationResult<DeleteEwebinarMutation>;
export type DeleteEwebinarMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteEwebinarMutation, DeleteEwebinarMutationVariables>;
export const PublishEwebinarDocument = gql`
    mutation publishEwebinar($setId: String!) {
  publishEwebinar(setId: $setId)
}
    `;
export type PublishEwebinarMutationFn = ApolloReactCommon.MutationFunction<PublishEwebinarMutation, PublishEwebinarMutationVariables>;
export type PublishEwebinarComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<PublishEwebinarMutation, PublishEwebinarMutationVariables>, 'mutation'>;

    export const PublishEwebinarComponent = (props: PublishEwebinarComponentProps) => (
      <ApolloReactComponents.Mutation<PublishEwebinarMutation, PublishEwebinarMutationVariables> mutation={PublishEwebinarDocument} {...props} />
    );
    

/**
 * __usePublishEwebinarMutation__
 *
 * To run a mutation, you first call `usePublishEwebinarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishEwebinarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishEwebinarMutation, { data, loading, error }] = usePublishEwebinarMutation({
 *   variables: {
 *      setId: // value for 'setId'
 *   },
 * });
 */
export function usePublishEwebinarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PublishEwebinarMutation, PublishEwebinarMutationVariables>) {
        return ApolloReactHooks.useMutation<PublishEwebinarMutation, PublishEwebinarMutationVariables>(PublishEwebinarDocument, baseOptions);
      }
export type PublishEwebinarMutationHookResult = ReturnType<typeof usePublishEwebinarMutation>;
export type PublishEwebinarMutationResult = ApolloReactCommon.MutationResult<PublishEwebinarMutation>;
export type PublishEwebinarMutationOptions = ApolloReactCommon.BaseMutationOptions<PublishEwebinarMutation, PublishEwebinarMutationVariables>;
export const UnpublishEwebinarDocument = gql`
    mutation unpublishEwebinar($id: String!) {
  unpublishEwebinar(id: $id) {
    id
    isPublished
  }
}
    `;
export type UnpublishEwebinarMutationFn = ApolloReactCommon.MutationFunction<UnpublishEwebinarMutation, UnpublishEwebinarMutationVariables>;
export type UnpublishEwebinarComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UnpublishEwebinarMutation, UnpublishEwebinarMutationVariables>, 'mutation'>;

    export const UnpublishEwebinarComponent = (props: UnpublishEwebinarComponentProps) => (
      <ApolloReactComponents.Mutation<UnpublishEwebinarMutation, UnpublishEwebinarMutationVariables> mutation={UnpublishEwebinarDocument} {...props} />
    );
    

/**
 * __useUnpublishEwebinarMutation__
 *
 * To run a mutation, you first call `useUnpublishEwebinarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpublishEwebinarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpublishEwebinarMutation, { data, loading, error }] = useUnpublishEwebinarMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnpublishEwebinarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnpublishEwebinarMutation, UnpublishEwebinarMutationVariables>) {
        return ApolloReactHooks.useMutation<UnpublishEwebinarMutation, UnpublishEwebinarMutationVariables>(UnpublishEwebinarDocument, baseOptions);
      }
export type UnpublishEwebinarMutationHookResult = ReturnType<typeof useUnpublishEwebinarMutation>;
export type UnpublishEwebinarMutationResult = ApolloReactCommon.MutationResult<UnpublishEwebinarMutation>;
export type UnpublishEwebinarMutationOptions = ApolloReactCommon.BaseMutationOptions<UnpublishEwebinarMutation, UnpublishEwebinarMutationVariables>;
export const DuplicateDocument = gql`
    mutation duplicate($setId: String!) {
  duplicateEwebinar(setId: $setId) {
    id
    isPublished
  }
}
    `;
export type DuplicateMutationFn = ApolloReactCommon.MutationFunction<DuplicateMutation, DuplicateMutationVariables>;
export type DuplicateComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DuplicateMutation, DuplicateMutationVariables>, 'mutation'>;

    export const DuplicateComponent = (props: DuplicateComponentProps) => (
      <ApolloReactComponents.Mutation<DuplicateMutation, DuplicateMutationVariables> mutation={DuplicateDocument} {...props} />
    );
    

/**
 * __useDuplicateMutation__
 *
 * To run a mutation, you first call `useDuplicateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateMutation, { data, loading, error }] = useDuplicateMutation({
 *   variables: {
 *      setId: // value for 'setId'
 *   },
 * });
 */
export function useDuplicateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DuplicateMutation, DuplicateMutationVariables>) {
        return ApolloReactHooks.useMutation<DuplicateMutation, DuplicateMutationVariables>(DuplicateDocument, baseOptions);
      }
export type DuplicateMutationHookResult = ReturnType<typeof useDuplicateMutation>;
export type DuplicateMutationResult = ApolloReactCommon.MutationResult<DuplicateMutation>;
export type DuplicateMutationOptions = ApolloReactCommon.BaseMutationOptions<DuplicateMutation, DuplicateMutationVariables>;
export const SetsDocument = gql`
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
    ${EWebinarDescriptionFragmentDoc}`;
export type SetsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SetsQuery, SetsQueryVariables>, 'query'>;

    export const SetsComponent = (props: SetsComponentProps) => (
      <ApolloReactComponents.Query<SetsQuery, SetsQueryVariables> query={SetsDocument} {...props} />
    );
    

/**
 * __useSetsQuery__
 *
 * To run a query within a React component, call `useSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSetsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SetsQuery, SetsQueryVariables>) {
        return ApolloReactHooks.useQuery<SetsQuery, SetsQueryVariables>(SetsDocument, baseOptions);
      }
export function useSetsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SetsQuery, SetsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SetsQuery, SetsQueryVariables>(SetsDocument, baseOptions);
        }
export type SetsQueryHookResult = ReturnType<typeof useSetsQuery>;
export type SetsLazyQueryHookResult = ReturnType<typeof useSetsLazyQuery>;
export type SetsQueryResult = ApolloReactCommon.QueryResult<SetsQuery, SetsQueryVariables>;
export const PublicSetsDocument = gql`
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
    ${EWebinarPublicDescriptionFragmentDoc}`;
export type PublicSetsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PublicSetsQuery, PublicSetsQueryVariables>, 'query'> & ({ variables: PublicSetsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const PublicSetsComponent = (props: PublicSetsComponentProps) => (
      <ApolloReactComponents.Query<PublicSetsQuery, PublicSetsQueryVariables> query={PublicSetsDocument} {...props} />
    );
    

/**
 * __usePublicSetsQuery__
 *
 * To run a query within a React component, call `usePublicSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicSetsQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function usePublicSetsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicSetsQuery, PublicSetsQueryVariables>) {
        return ApolloReactHooks.useQuery<PublicSetsQuery, PublicSetsQueryVariables>(PublicSetsDocument, baseOptions);
      }
export function usePublicSetsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicSetsQuery, PublicSetsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PublicSetsQuery, PublicSetsQueryVariables>(PublicSetsDocument, baseOptions);
        }
export type PublicSetsQueryHookResult = ReturnType<typeof usePublicSetsQuery>;
export type PublicSetsLazyQueryHookResult = ReturnType<typeof usePublicSetsLazyQuery>;
export type PublicSetsQueryResult = ApolloReactCommon.QueryResult<PublicSetsQuery, PublicSetsQueryVariables>;
export const RegistrantsDocument = gql`
    query registrants($filter: GetRegistrantsInput!) {
  registrants(filter: $filter) {
    attendees {
      ...ReactionForAttendee
    }
    total
    nextCursor
  }
}
    ${ReactionForAttendeeFragmentDoc}`;
export type RegistrantsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<RegistrantsQuery, RegistrantsQueryVariables>, 'query'> & ({ variables: RegistrantsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const RegistrantsComponent = (props: RegistrantsComponentProps) => (
      <ApolloReactComponents.Query<RegistrantsQuery, RegistrantsQueryVariables> query={RegistrantsDocument} {...props} />
    );
    

/**
 * __useRegistrantsQuery__
 *
 * To run a query within a React component, call `useRegistrantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegistrantsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegistrantsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useRegistrantsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RegistrantsQuery, RegistrantsQueryVariables>) {
        return ApolloReactHooks.useQuery<RegistrantsQuery, RegistrantsQueryVariables>(RegistrantsDocument, baseOptions);
      }
export function useRegistrantsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RegistrantsQuery, RegistrantsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RegistrantsQuery, RegistrantsQueryVariables>(RegistrantsDocument, baseOptions);
        }
export type RegistrantsQueryHookResult = ReturnType<typeof useRegistrantsQuery>;
export type RegistrantsLazyQueryHookResult = ReturnType<typeof useRegistrantsLazyQuery>;
export type RegistrantsQueryResult = ApolloReactCommon.QueryResult<RegistrantsQuery, RegistrantsQueryVariables>;
export const GetEwebinarInteractionsDocument = gql`
    query getEwebinarInteractions($ewebinarId: String!) {
  interactions(ewebinarId: $ewebinarId) {
    ...Interaction
  }
}
    ${InteractionFragmentDoc}`;
export type GetEwebinarInteractionsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetEwebinarInteractionsQuery, GetEwebinarInteractionsQueryVariables>, 'query'> & ({ variables: GetEwebinarInteractionsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetEwebinarInteractionsComponent = (props: GetEwebinarInteractionsComponentProps) => (
      <ApolloReactComponents.Query<GetEwebinarInteractionsQuery, GetEwebinarInteractionsQueryVariables> query={GetEwebinarInteractionsDocument} {...props} />
    );
    

/**
 * __useGetEwebinarInteractionsQuery__
 *
 * To run a query within a React component, call `useGetEwebinarInteractionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEwebinarInteractionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEwebinarInteractionsQuery({
 *   variables: {
 *      ewebinarId: // value for 'ewebinarId'
 *   },
 * });
 */
export function useGetEwebinarInteractionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEwebinarInteractionsQuery, GetEwebinarInteractionsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEwebinarInteractionsQuery, GetEwebinarInteractionsQueryVariables>(GetEwebinarInteractionsDocument, baseOptions);
      }
export function useGetEwebinarInteractionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEwebinarInteractionsQuery, GetEwebinarInteractionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEwebinarInteractionsQuery, GetEwebinarInteractionsQueryVariables>(GetEwebinarInteractionsDocument, baseOptions);
        }
export type GetEwebinarInteractionsQueryHookResult = ReturnType<typeof useGetEwebinarInteractionsQuery>;
export type GetEwebinarInteractionsLazyQueryHookResult = ReturnType<typeof useGetEwebinarInteractionsLazyQuery>;
export type GetEwebinarInteractionsQueryResult = ApolloReactCommon.QueryResult<GetEwebinarInteractionsQuery, GetEwebinarInteractionsQueryVariables>;
export const GetEwebinarInteractionsViewModeDocument = gql`
    query getEwebinarInteractionsViewMode($ewebinarId: String!, $attendeeId: String!) {
  interactions(ewebinarId: $ewebinarId) {
    ...InteractionViewMode
  }
}
    ${InteractionViewModeFragmentDoc}`;
export type GetEwebinarInteractionsViewModeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetEwebinarInteractionsViewModeQuery, GetEwebinarInteractionsViewModeQueryVariables>, 'query'> & ({ variables: GetEwebinarInteractionsViewModeQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetEwebinarInteractionsViewModeComponent = (props: GetEwebinarInteractionsViewModeComponentProps) => (
      <ApolloReactComponents.Query<GetEwebinarInteractionsViewModeQuery, GetEwebinarInteractionsViewModeQueryVariables> query={GetEwebinarInteractionsViewModeDocument} {...props} />
    );
    

/**
 * __useGetEwebinarInteractionsViewModeQuery__
 *
 * To run a query within a React component, call `useGetEwebinarInteractionsViewModeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEwebinarInteractionsViewModeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEwebinarInteractionsViewModeQuery({
 *   variables: {
 *      ewebinarId: // value for 'ewebinarId'
 *      attendeeId: // value for 'attendeeId'
 *   },
 * });
 */
export function useGetEwebinarInteractionsViewModeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEwebinarInteractionsViewModeQuery, GetEwebinarInteractionsViewModeQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEwebinarInteractionsViewModeQuery, GetEwebinarInteractionsViewModeQueryVariables>(GetEwebinarInteractionsViewModeDocument, baseOptions);
      }
export function useGetEwebinarInteractionsViewModeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEwebinarInteractionsViewModeQuery, GetEwebinarInteractionsViewModeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEwebinarInteractionsViewModeQuery, GetEwebinarInteractionsViewModeQueryVariables>(GetEwebinarInteractionsViewModeDocument, baseOptions);
        }
export type GetEwebinarInteractionsViewModeQueryHookResult = ReturnType<typeof useGetEwebinarInteractionsViewModeQuery>;
export type GetEwebinarInteractionsViewModeLazyQueryHookResult = ReturnType<typeof useGetEwebinarInteractionsViewModeLazyQuery>;
export type GetEwebinarInteractionsViewModeQueryResult = ApolloReactCommon.QueryResult<GetEwebinarInteractionsViewModeQuery, GetEwebinarInteractionsViewModeQueryVariables>;
export const GetEwebinarInteractionDocument = gql`
    query getEwebinarInteraction($id: String!) {
  interaction(id: $id) {
    ...Interaction
  }
}
    ${InteractionFragmentDoc}`;
export type GetEwebinarInteractionComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetEwebinarInteractionQuery, GetEwebinarInteractionQueryVariables>, 'query'> & ({ variables: GetEwebinarInteractionQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetEwebinarInteractionComponent = (props: GetEwebinarInteractionComponentProps) => (
      <ApolloReactComponents.Query<GetEwebinarInteractionQuery, GetEwebinarInteractionQueryVariables> query={GetEwebinarInteractionDocument} {...props} />
    );
    

/**
 * __useGetEwebinarInteractionQuery__
 *
 * To run a query within a React component, call `useGetEwebinarInteractionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEwebinarInteractionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEwebinarInteractionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEwebinarInteractionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEwebinarInteractionQuery, GetEwebinarInteractionQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEwebinarInteractionQuery, GetEwebinarInteractionQueryVariables>(GetEwebinarInteractionDocument, baseOptions);
      }
export function useGetEwebinarInteractionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEwebinarInteractionQuery, GetEwebinarInteractionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEwebinarInteractionQuery, GetEwebinarInteractionQueryVariables>(GetEwebinarInteractionDocument, baseOptions);
        }
export type GetEwebinarInteractionQueryHookResult = ReturnType<typeof useGetEwebinarInteractionQuery>;
export type GetEwebinarInteractionLazyQueryHookResult = ReturnType<typeof useGetEwebinarInteractionLazyQuery>;
export type GetEwebinarInteractionQueryResult = ApolloReactCommon.QueryResult<GetEwebinarInteractionQuery, GetEwebinarInteractionQueryVariables>;
export const CreateInteractionDocument = gql`
    mutation createInteraction($data: InteractionInput!) {
  createInteraction(data: $data) {
    ...Interaction
  }
}
    ${InteractionFragmentDoc}`;
export type CreateInteractionMutationFn = ApolloReactCommon.MutationFunction<CreateInteractionMutation, CreateInteractionMutationVariables>;
export type CreateInteractionComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateInteractionMutation, CreateInteractionMutationVariables>, 'mutation'>;

    export const CreateInteractionComponent = (props: CreateInteractionComponentProps) => (
      <ApolloReactComponents.Mutation<CreateInteractionMutation, CreateInteractionMutationVariables> mutation={CreateInteractionDocument} {...props} />
    );
    

/**
 * __useCreateInteractionMutation__
 *
 * To run a mutation, you first call `useCreateInteractionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInteractionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInteractionMutation, { data, loading, error }] = useCreateInteractionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateInteractionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateInteractionMutation, CreateInteractionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateInteractionMutation, CreateInteractionMutationVariables>(CreateInteractionDocument, baseOptions);
      }
export type CreateInteractionMutationHookResult = ReturnType<typeof useCreateInteractionMutation>;
export type CreateInteractionMutationResult = ApolloReactCommon.MutationResult<CreateInteractionMutation>;
export type CreateInteractionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateInteractionMutation, CreateInteractionMutationVariables>;
export const UpdateInteractionDocument = gql`
    mutation updateInteraction($data: InteractionInput!) {
  updateInteraction(data: $data) {
    ...Interaction
  }
}
    ${InteractionFragmentDoc}`;
export type UpdateInteractionMutationFn = ApolloReactCommon.MutationFunction<UpdateInteractionMutation, UpdateInteractionMutationVariables>;
export type UpdateInteractionComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateInteractionMutation, UpdateInteractionMutationVariables>, 'mutation'>;

    export const UpdateInteractionComponent = (props: UpdateInteractionComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateInteractionMutation, UpdateInteractionMutationVariables> mutation={UpdateInteractionDocument} {...props} />
    );
    

/**
 * __useUpdateInteractionMutation__
 *
 * To run a mutation, you first call `useUpdateInteractionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInteractionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInteractionMutation, { data, loading, error }] = useUpdateInteractionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateInteractionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateInteractionMutation, UpdateInteractionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateInteractionMutation, UpdateInteractionMutationVariables>(UpdateInteractionDocument, baseOptions);
      }
export type UpdateInteractionMutationHookResult = ReturnType<typeof useUpdateInteractionMutation>;
export type UpdateInteractionMutationResult = ApolloReactCommon.MutationResult<UpdateInteractionMutation>;
export type UpdateInteractionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateInteractionMutation, UpdateInteractionMutationVariables>;
export const DeleteInteractionDocument = gql`
    mutation deleteInteraction($id: String!) {
  deleteInteraction(id: $id)
}
    `;
export type DeleteInteractionMutationFn = ApolloReactCommon.MutationFunction<DeleteInteractionMutation, DeleteInteractionMutationVariables>;
export type DeleteInteractionComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteInteractionMutation, DeleteInteractionMutationVariables>, 'mutation'>;

    export const DeleteInteractionComponent = (props: DeleteInteractionComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteInteractionMutation, DeleteInteractionMutationVariables> mutation={DeleteInteractionDocument} {...props} />
    );
    

/**
 * __useDeleteInteractionMutation__
 *
 * To run a mutation, you first call `useDeleteInteractionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInteractionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInteractionMutation, { data, loading, error }] = useDeleteInteractionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteInteractionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteInteractionMutation, DeleteInteractionMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteInteractionMutation, DeleteInteractionMutationVariables>(DeleteInteractionDocument, baseOptions);
      }
export type DeleteInteractionMutationHookResult = ReturnType<typeof useDeleteInteractionMutation>;
export type DeleteInteractionMutationResult = ApolloReactCommon.MutationResult<DeleteInteractionMutation>;
export type DeleteInteractionMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteInteractionMutation, DeleteInteractionMutationVariables>;
export const ReactionResultsDocument = gql`
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
export type ReactionResultsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ReactionResultsQuery, ReactionResultsQueryVariables>, 'query'> & ({ variables: ReactionResultsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ReactionResultsComponent = (props: ReactionResultsComponentProps) => (
      <ApolloReactComponents.Query<ReactionResultsQuery, ReactionResultsQueryVariables> query={ReactionResultsDocument} {...props} />
    );
    

/**
 * __useReactionResultsQuery__
 *
 * To run a query within a React component, call `useReactionResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReactionResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReactionResultsQuery({
 *   variables: {
 *      ewebinarSetId: // value for 'ewebinarSetId'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useReactionResultsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReactionResultsQuery, ReactionResultsQueryVariables>) {
        return ApolloReactHooks.useQuery<ReactionResultsQuery, ReactionResultsQueryVariables>(ReactionResultsDocument, baseOptions);
      }
export function useReactionResultsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReactionResultsQuery, ReactionResultsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReactionResultsQuery, ReactionResultsQueryVariables>(ReactionResultsDocument, baseOptions);
        }
export type ReactionResultsQueryHookResult = ReturnType<typeof useReactionResultsQuery>;
export type ReactionResultsLazyQueryHookResult = ReturnType<typeof useReactionResultsLazyQuery>;
export type ReactionResultsQueryResult = ApolloReactCommon.QueryResult<ReactionResultsQuery, ReactionResultsQueryVariables>;
export const CreateReactionDocument = gql`
    mutation createReaction($data: ReactionInput!) {
  createReaction(data: $data) {
    ...EwebinarReaction
  }
}
    ${EwebinarReactionFragmentDoc}`;
export type CreateReactionMutationFn = ApolloReactCommon.MutationFunction<CreateReactionMutation, CreateReactionMutationVariables>;
export type CreateReactionComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateReactionMutation, CreateReactionMutationVariables>, 'mutation'>;

    export const CreateReactionComponent = (props: CreateReactionComponentProps) => (
      <ApolloReactComponents.Mutation<CreateReactionMutation, CreateReactionMutationVariables> mutation={CreateReactionDocument} {...props} />
    );
    

/**
 * __useCreateReactionMutation__
 *
 * To run a mutation, you first call `useCreateReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReactionMutation, { data, loading, error }] = useCreateReactionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateReactionMutation, CreateReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateReactionMutation, CreateReactionMutationVariables>(CreateReactionDocument, baseOptions);
      }
export type CreateReactionMutationHookResult = ReturnType<typeof useCreateReactionMutation>;
export type CreateReactionMutationResult = ApolloReactCommon.MutationResult<CreateReactionMutation>;
export type CreateReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateReactionMutation, CreateReactionMutationVariables>;
export const EwebinarSessionDocument = gql`
    query EwebinarSession($data: EwebinarSessionsInput!) {
  ewebinarSession(data: $data) {
    sessions {
      value
      text
    }
    timeZone
  }
}
    `;
export type EwebinarSessionComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<EwebinarSessionQuery, EwebinarSessionQueryVariables>, 'query'> & ({ variables: EwebinarSessionQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const EwebinarSessionComponent = (props: EwebinarSessionComponentProps) => (
      <ApolloReactComponents.Query<EwebinarSessionQuery, EwebinarSessionQueryVariables> query={EwebinarSessionDocument} {...props} />
    );
    

/**
 * __useEwebinarSessionQuery__
 *
 * To run a query within a React component, call `useEwebinarSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useEwebinarSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEwebinarSessionQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEwebinarSessionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EwebinarSessionQuery, EwebinarSessionQueryVariables>) {
        return ApolloReactHooks.useQuery<EwebinarSessionQuery, EwebinarSessionQueryVariables>(EwebinarSessionDocument, baseOptions);
      }
export function useEwebinarSessionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EwebinarSessionQuery, EwebinarSessionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EwebinarSessionQuery, EwebinarSessionQueryVariables>(EwebinarSessionDocument, baseOptions);
        }
export type EwebinarSessionQueryHookResult = ReturnType<typeof useEwebinarSessionQuery>;
export type EwebinarSessionLazyQueryHookResult = ReturnType<typeof useEwebinarSessionLazyQuery>;
export type EwebinarSessionQueryResult = ApolloReactCommon.QueryResult<EwebinarSessionQuery, EwebinarSessionQueryVariables>;
export const PresentersDocument = gql`
    query presenters {
  presenters {
    ...Presenter
  }
}
    ${PresenterFragmentDoc}`;
export type PresentersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PresentersQuery, PresentersQueryVariables>, 'query'>;

    export const PresentersComponent = (props: PresentersComponentProps) => (
      <ApolloReactComponents.Query<PresentersQuery, PresentersQueryVariables> query={PresentersDocument} {...props} />
    );
    

/**
 * __usePresentersQuery__
 *
 * To run a query within a React component, call `usePresentersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresentersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresentersQuery({
 *   variables: {
 *   },
 * });
 */
export function usePresentersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PresentersQuery, PresentersQueryVariables>) {
        return ApolloReactHooks.useQuery<PresentersQuery, PresentersQueryVariables>(PresentersDocument, baseOptions);
      }
export function usePresentersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PresentersQuery, PresentersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PresentersQuery, PresentersQueryVariables>(PresentersDocument, baseOptions);
        }
export type PresentersQueryHookResult = ReturnType<typeof usePresentersQuery>;
export type PresentersLazyQueryHookResult = ReturnType<typeof usePresentersLazyQuery>;
export type PresentersQueryResult = ApolloReactCommon.QueryResult<PresentersQuery, PresentersQueryVariables>;
export const AddPresenterDocument = gql`
    mutation addPresenter($data: EditPresenterInput!) {
  addPresenter(data: $data) {
    ...Presenter
  }
}
    ${PresenterFragmentDoc}`;
export type AddPresenterMutationFn = ApolloReactCommon.MutationFunction<AddPresenterMutation, AddPresenterMutationVariables>;
export type AddPresenterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddPresenterMutation, AddPresenterMutationVariables>, 'mutation'>;

    export const AddPresenterComponent = (props: AddPresenterComponentProps) => (
      <ApolloReactComponents.Mutation<AddPresenterMutation, AddPresenterMutationVariables> mutation={AddPresenterDocument} {...props} />
    );
    

/**
 * __useAddPresenterMutation__
 *
 * To run a mutation, you first call `useAddPresenterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPresenterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPresenterMutation, { data, loading, error }] = useAddPresenterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddPresenterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPresenterMutation, AddPresenterMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPresenterMutation, AddPresenterMutationVariables>(AddPresenterDocument, baseOptions);
      }
export type AddPresenterMutationHookResult = ReturnType<typeof useAddPresenterMutation>;
export type AddPresenterMutationResult = ApolloReactCommon.MutationResult<AddPresenterMutation>;
export type AddPresenterMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPresenterMutation, AddPresenterMutationVariables>;
export const UpdatePresenterDocument = gql`
    mutation updatePresenter($data: EditPresenterInput!) {
  updatePresenter(data: $data) {
    ...Presenter
  }
}
    ${PresenterFragmentDoc}`;
export type UpdatePresenterMutationFn = ApolloReactCommon.MutationFunction<UpdatePresenterMutation, UpdatePresenterMutationVariables>;
export type UpdatePresenterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePresenterMutation, UpdatePresenterMutationVariables>, 'mutation'>;

    export const UpdatePresenterComponent = (props: UpdatePresenterComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePresenterMutation, UpdatePresenterMutationVariables> mutation={UpdatePresenterDocument} {...props} />
    );
    

/**
 * __useUpdatePresenterMutation__
 *
 * To run a mutation, you first call `useUpdatePresenterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePresenterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePresenterMutation, { data, loading, error }] = useUpdatePresenterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePresenterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePresenterMutation, UpdatePresenterMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePresenterMutation, UpdatePresenterMutationVariables>(UpdatePresenterDocument, baseOptions);
      }
export type UpdatePresenterMutationHookResult = ReturnType<typeof useUpdatePresenterMutation>;
export type UpdatePresenterMutationResult = ApolloReactCommon.MutationResult<UpdatePresenterMutation>;
export type UpdatePresenterMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePresenterMutation, UpdatePresenterMutationVariables>;
export const RemovePresenterDocument = gql`
    mutation removePresenter($id: String!) {
  removePresenter(id: $id)
}
    `;
export type RemovePresenterMutationFn = ApolloReactCommon.MutationFunction<RemovePresenterMutation, RemovePresenterMutationVariables>;
export type RemovePresenterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RemovePresenterMutation, RemovePresenterMutationVariables>, 'mutation'>;

    export const RemovePresenterComponent = (props: RemovePresenterComponentProps) => (
      <ApolloReactComponents.Mutation<RemovePresenterMutation, RemovePresenterMutationVariables> mutation={RemovePresenterDocument} {...props} />
    );
    

/**
 * __useRemovePresenterMutation__
 *
 * To run a mutation, you first call `useRemovePresenterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePresenterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePresenterMutation, { data, loading, error }] = useRemovePresenterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemovePresenterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemovePresenterMutation, RemovePresenterMutationVariables>) {
        return ApolloReactHooks.useMutation<RemovePresenterMutation, RemovePresenterMutationVariables>(RemovePresenterDocument, baseOptions);
      }
export type RemovePresenterMutationHookResult = ReturnType<typeof useRemovePresenterMutation>;
export type RemovePresenterMutationResult = ApolloReactCommon.MutationResult<RemovePresenterMutation>;
export type RemovePresenterMutationOptions = ApolloReactCommon.BaseMutationOptions<RemovePresenterMutation, RemovePresenterMutationVariables>;
export const MyTeamDocument = gql`
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
export type MyTeamComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MyTeamQuery, MyTeamQueryVariables>, 'query'>;

    export const MyTeamComponent = (props: MyTeamComponentProps) => (
      <ApolloReactComponents.Query<MyTeamQuery, MyTeamQueryVariables> query={MyTeamDocument} {...props} />
    );
    

/**
 * __useMyTeamQuery__
 *
 * To run a query within a React component, call `useMyTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTeamQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTeamQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyTeamQuery, MyTeamQueryVariables>) {
        return ApolloReactHooks.useQuery<MyTeamQuery, MyTeamQueryVariables>(MyTeamDocument, baseOptions);
      }
export function useMyTeamLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyTeamQuery, MyTeamQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyTeamQuery, MyTeamQueryVariables>(MyTeamDocument, baseOptions);
        }
export type MyTeamQueryHookResult = ReturnType<typeof useMyTeamQuery>;
export type MyTeamLazyQueryHookResult = ReturnType<typeof useMyTeamLazyQuery>;
export type MyTeamQueryResult = ApolloReactCommon.QueryResult<MyTeamQuery, MyTeamQueryVariables>;
export const RemoveUserDocument = gql`
    mutation removeUser($id: String!, $replacementId: String!) {
  removeUser(id: $id, replacementId: $replacementId) {
    ...Team
  }
}
    ${TeamFragmentDoc}`;
export type RemoveUserMutationFn = ApolloReactCommon.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;
export type RemoveUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RemoveUserMutation, RemoveUserMutationVariables>, 'mutation'>;

    export const RemoveUserComponent = (props: RemoveUserComponentProps) => (
      <ApolloReactComponents.Mutation<RemoveUserMutation, RemoveUserMutationVariables> mutation={RemoveUserDocument} {...props} />
    );
    

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      replacementId: // value for 'replacementId'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, baseOptions);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = ApolloReactCommon.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const AddUserDocument = gql`
    mutation addUser($data: UserAndPresenterInput!) {
  addUser(data: $data) {
    ...Team
  }
}
    ${TeamFragmentDoc}`;
export type AddUserMutationFn = ApolloReactCommon.MutationFunction<AddUserMutation, AddUserMutationVariables>;
export type AddUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddUserMutation, AddUserMutationVariables>, 'mutation'>;

    export const AddUserComponent = (props: AddUserComponentProps) => (
      <ApolloReactComponents.Mutation<AddUserMutation, AddUserMutationVariables> mutation={AddUserDocument} {...props} />
    );
    

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        return ApolloReactHooks.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, baseOptions);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = ApolloReactCommon.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = ApolloReactCommon.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($data: UserAndPresenterInput!) {
  updateUser(data: $data) {
    ...Team
  }
}
    ${TeamFragmentDoc}`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export type UpdateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserMutation, UpdateUserMutationVariables>, 'mutation'>;

    export const UpdateUserComponent = (props: UpdateUserComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserMutation, UpdateUserMutationVariables> mutation={UpdateUserDocument} {...props} />
    );
    

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const TeamForSubdomainDocument = gql`
    query teamForSubdomain($subdomain: String!) {
  teamForSubdomain(subdomain: $subdomain) {
    ...Team
  }
}
    ${TeamFragmentDoc}`;
export type TeamForSubdomainComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<TeamForSubdomainQuery, TeamForSubdomainQueryVariables>, 'query'> & ({ variables: TeamForSubdomainQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const TeamForSubdomainComponent = (props: TeamForSubdomainComponentProps) => (
      <ApolloReactComponents.Query<TeamForSubdomainQuery, TeamForSubdomainQueryVariables> query={TeamForSubdomainDocument} {...props} />
    );
    

/**
 * __useTeamForSubdomainQuery__
 *
 * To run a query within a React component, call `useTeamForSubdomainQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamForSubdomainQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamForSubdomainQuery({
 *   variables: {
 *      subdomain: // value for 'subdomain'
 *   },
 * });
 */
export function useTeamForSubdomainQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TeamForSubdomainQuery, TeamForSubdomainQueryVariables>) {
        return ApolloReactHooks.useQuery<TeamForSubdomainQuery, TeamForSubdomainQueryVariables>(TeamForSubdomainDocument, baseOptions);
      }
export function useTeamForSubdomainLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TeamForSubdomainQuery, TeamForSubdomainQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TeamForSubdomainQuery, TeamForSubdomainQueryVariables>(TeamForSubdomainDocument, baseOptions);
        }
export type TeamForSubdomainQueryHookResult = ReturnType<typeof useTeamForSubdomainQuery>;
export type TeamForSubdomainLazyQueryHookResult = ReturnType<typeof useTeamForSubdomainLazyQuery>;
export type TeamForSubdomainQueryResult = ApolloReactCommon.QueryResult<TeamForSubdomainQuery, TeamForSubdomainQueryVariables>;
export const TeamUsersDocument = gql`
    query teamUsers($filters: UserFilters!) {
  teamUsers(filters: $filters) {
    ...Member
  }
}
    ${MemberFragmentDoc}`;
export type TeamUsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<TeamUsersQuery, TeamUsersQueryVariables>, 'query'> & ({ variables: TeamUsersQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const TeamUsersComponent = (props: TeamUsersComponentProps) => (
      <ApolloReactComponents.Query<TeamUsersQuery, TeamUsersQueryVariables> query={TeamUsersDocument} {...props} />
    );
    

/**
 * __useTeamUsersQuery__
 *
 * To run a query within a React component, call `useTeamUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamUsersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useTeamUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TeamUsersQuery, TeamUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<TeamUsersQuery, TeamUsersQueryVariables>(TeamUsersDocument, baseOptions);
      }
export function useTeamUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TeamUsersQuery, TeamUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TeamUsersQuery, TeamUsersQueryVariables>(TeamUsersDocument, baseOptions);
        }
export type TeamUsersQueryHookResult = ReturnType<typeof useTeamUsersQuery>;
export type TeamUsersLazyQueryHookResult = ReturnType<typeof useTeamUsersLazyQuery>;
export type TeamUsersQueryResult = ApolloReactCommon.QueryResult<TeamUsersQuery, TeamUsersQueryVariables>;
export const ResendInvitationEmailDocument = gql`
    mutation resendInvitationEmail($userId: String!, $teamId: String!) {
  resendInvitationEmail(userId: $userId, teamId: $teamId)
}
    `;
export type ResendInvitationEmailMutationFn = ApolloReactCommon.MutationFunction<ResendInvitationEmailMutation, ResendInvitationEmailMutationVariables>;
export type ResendInvitationEmailComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ResendInvitationEmailMutation, ResendInvitationEmailMutationVariables>, 'mutation'>;

    export const ResendInvitationEmailComponent = (props: ResendInvitationEmailComponentProps) => (
      <ApolloReactComponents.Mutation<ResendInvitationEmailMutation, ResendInvitationEmailMutationVariables> mutation={ResendInvitationEmailDocument} {...props} />
    );
    

/**
 * __useResendInvitationEmailMutation__
 *
 * To run a mutation, you first call `useResendInvitationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendInvitationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendInvitationEmailMutation, { data, loading, error }] = useResendInvitationEmailMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useResendInvitationEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResendInvitationEmailMutation, ResendInvitationEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<ResendInvitationEmailMutation, ResendInvitationEmailMutationVariables>(ResendInvitationEmailDocument, baseOptions);
      }
export type ResendInvitationEmailMutationHookResult = ReturnType<typeof useResendInvitationEmailMutation>;
export type ResendInvitationEmailMutationResult = ApolloReactCommon.MutationResult<ResendInvitationEmailMutation>;
export type ResendInvitationEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<ResendInvitationEmailMutation, ResendInvitationEmailMutationVariables>;
export const SkipVerifyEmailDocument = gql`
    mutation skipVerifyEmail {
  skipVerifyEmail {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type SkipVerifyEmailMutationFn = ApolloReactCommon.MutationFunction<SkipVerifyEmailMutation, SkipVerifyEmailMutationVariables>;
export type SkipVerifyEmailComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SkipVerifyEmailMutation, SkipVerifyEmailMutationVariables>, 'mutation'>;

    export const SkipVerifyEmailComponent = (props: SkipVerifyEmailComponentProps) => (
      <ApolloReactComponents.Mutation<SkipVerifyEmailMutation, SkipVerifyEmailMutationVariables> mutation={SkipVerifyEmailDocument} {...props} />
    );
    

/**
 * __useSkipVerifyEmailMutation__
 *
 * To run a mutation, you first call `useSkipVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSkipVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [skipVerifyEmailMutation, { data, loading, error }] = useSkipVerifyEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useSkipVerifyEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SkipVerifyEmailMutation, SkipVerifyEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<SkipVerifyEmailMutation, SkipVerifyEmailMutationVariables>(SkipVerifyEmailDocument, baseOptions);
      }
export type SkipVerifyEmailMutationHookResult = ReturnType<typeof useSkipVerifyEmailMutation>;
export type SkipVerifyEmailMutationResult = ApolloReactCommon.MutationResult<SkipVerifyEmailMutation>;
export type SkipVerifyEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<SkipVerifyEmailMutation, SkipVerifyEmailMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const CheckEmptyPasswordDocument = gql`
    query checkEmptyPassword {
  checkEmptyPassword
}
    `;
export type CheckEmptyPasswordComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CheckEmptyPasswordQuery, CheckEmptyPasswordQueryVariables>, 'query'>;

    export const CheckEmptyPasswordComponent = (props: CheckEmptyPasswordComponentProps) => (
      <ApolloReactComponents.Query<CheckEmptyPasswordQuery, CheckEmptyPasswordQueryVariables> query={CheckEmptyPasswordDocument} {...props} />
    );
    

/**
 * __useCheckEmptyPasswordQuery__
 *
 * To run a query within a React component, call `useCheckEmptyPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckEmptyPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckEmptyPasswordQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckEmptyPasswordQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CheckEmptyPasswordQuery, CheckEmptyPasswordQueryVariables>) {
        return ApolloReactHooks.useQuery<CheckEmptyPasswordQuery, CheckEmptyPasswordQueryVariables>(CheckEmptyPasswordDocument, baseOptions);
      }
export function useCheckEmptyPasswordLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CheckEmptyPasswordQuery, CheckEmptyPasswordQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CheckEmptyPasswordQuery, CheckEmptyPasswordQueryVariables>(CheckEmptyPasswordDocument, baseOptions);
        }
export type CheckEmptyPasswordQueryHookResult = ReturnType<typeof useCheckEmptyPasswordQuery>;
export type CheckEmptyPasswordLazyQueryHookResult = ReturnType<typeof useCheckEmptyPasswordLazyQuery>;
export type CheckEmptyPasswordQueryResult = ApolloReactCommon.QueryResult<CheckEmptyPasswordQuery, CheckEmptyPasswordQueryVariables>;
export const UpdateMeDocument = gql`
    mutation updateMe($data: UpdateUserAndTeamInput!) {
  updateMe(data: $data) {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export type UpdateMeMutationFn = ApolloReactCommon.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;
export type UpdateMeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateMeMutation, UpdateMeMutationVariables>, 'mutation'>;

    export const UpdateMeComponent = (props: UpdateMeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateMeMutation, UpdateMeMutationVariables> mutation={UpdateMeDocument} {...props} />
    );
    

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, baseOptions);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = ApolloReactCommon.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const RegisterDocument = gql`
    mutation register($data: NewUserAndTeamInput!) {
  registerUserAndTeam(data: $data) {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($data: ChangePasswordInput!) {
  changePassword(data: $data) {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;
export type ChangePasswordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ChangePasswordMutation, ChangePasswordMutationVariables>, 'mutation'>;

    export const ChangePasswordComponent = (props: ChangePasswordComponentProps) => (
      <ApolloReactComponents.Mutation<ChangePasswordMutation, ChangePasswordMutationVariables> mutation={ChangePasswordDocument} {...props} />
    );
    

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($email: String!) {
  resetPassword(email: $email)
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;
export type ResetPasswordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ResetPasswordMutation, ResetPasswordMutationVariables>, 'mutation'>;

    export const ResetPasswordComponent = (props: ResetPasswordComponentProps) => (
      <ApolloReactComponents.Mutation<ResetPasswordMutation, ResetPasswordMutationVariables> mutation={ResetPasswordDocument} {...props} />
    );
    

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResendConfirmationEmailDocument = gql`
    mutation resendConfirmationEmail {
  resendConfirmationEmail
}
    `;
export type ResendConfirmationEmailMutationFn = ApolloReactCommon.MutationFunction<ResendConfirmationEmailMutation, ResendConfirmationEmailMutationVariables>;
export type ResendConfirmationEmailComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ResendConfirmationEmailMutation, ResendConfirmationEmailMutationVariables>, 'mutation'>;

    export const ResendConfirmationEmailComponent = (props: ResendConfirmationEmailComponentProps) => (
      <ApolloReactComponents.Mutation<ResendConfirmationEmailMutation, ResendConfirmationEmailMutationVariables> mutation={ResendConfirmationEmailDocument} {...props} />
    );
    

/**
 * __useResendConfirmationEmailMutation__
 *
 * To run a mutation, you first call `useResendConfirmationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendConfirmationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendConfirmationEmailMutation, { data, loading, error }] = useResendConfirmationEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useResendConfirmationEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResendConfirmationEmailMutation, ResendConfirmationEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<ResendConfirmationEmailMutation, ResendConfirmationEmailMutationVariables>(ResendConfirmationEmailDocument, baseOptions);
      }
export type ResendConfirmationEmailMutationHookResult = ReturnType<typeof useResendConfirmationEmailMutation>;
export type ResendConfirmationEmailMutationResult = ApolloReactCommon.MutationResult<ResendConfirmationEmailMutation>;
export type ResendConfirmationEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<ResendConfirmationEmailMutation, ResendConfirmationEmailMutationVariables>;
export const VerifyTokenDocument = gql`
    mutation verifyToken($token: String!) {
  verifyToken(token: $token) {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export type VerifyTokenMutationFn = ApolloReactCommon.MutationFunction<VerifyTokenMutation, VerifyTokenMutationVariables>;
export type VerifyTokenComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<VerifyTokenMutation, VerifyTokenMutationVariables>, 'mutation'>;

    export const VerifyTokenComponent = (props: VerifyTokenComponentProps) => (
      <ApolloReactComponents.Mutation<VerifyTokenMutation, VerifyTokenMutationVariables> mutation={VerifyTokenDocument} {...props} />
    );
    

/**
 * __useVerifyTokenMutation__
 *
 * To run a mutation, you first call `useVerifyTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTokenMutation, { data, loading, error }] = useVerifyTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyTokenMutation, VerifyTokenMutationVariables>) {
        return ApolloReactHooks.useMutation<VerifyTokenMutation, VerifyTokenMutationVariables>(VerifyTokenDocument, baseOptions);
      }
export type VerifyTokenMutationHookResult = ReturnType<typeof useVerifyTokenMutation>;
export type VerifyTokenMutationResult = ApolloReactCommon.MutationResult<VerifyTokenMutation>;
export type VerifyTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyTokenMutation, VerifyTokenMutationVariables>;
export const AcceptInvitationDocument = gql`
    mutation acceptInvitation($token: String!) {
  acceptInvitation(token: $token) {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export type AcceptInvitationMutationFn = ApolloReactCommon.MutationFunction<AcceptInvitationMutation, AcceptInvitationMutationVariables>;
export type AcceptInvitationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AcceptInvitationMutation, AcceptInvitationMutationVariables>, 'mutation'>;

    export const AcceptInvitationComponent = (props: AcceptInvitationComponentProps) => (
      <ApolloReactComponents.Mutation<AcceptInvitationMutation, AcceptInvitationMutationVariables> mutation={AcceptInvitationDocument} {...props} />
    );
    

/**
 * __useAcceptInvitationMutation__
 *
 * To run a mutation, you first call `useAcceptInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInvitationMutation, { data, loading, error }] = useAcceptInvitationMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAcceptInvitationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptInvitationMutation, AcceptInvitationMutationVariables>) {
        return ApolloReactHooks.useMutation<AcceptInvitationMutation, AcceptInvitationMutationVariables>(AcceptInvitationDocument, baseOptions);
      }
export type AcceptInvitationMutationHookResult = ReturnType<typeof useAcceptInvitationMutation>;
export type AcceptInvitationMutationResult = ApolloReactCommon.MutationResult<AcceptInvitationMutation>;
export type AcceptInvitationMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptInvitationMutation, AcceptInvitationMutationVariables>;
export const RejectInvitationDocument = gql`
    mutation rejectInvitation($token: String!) {
  rejectInvitation(token: $token)
}
    `;
export type RejectInvitationMutationFn = ApolloReactCommon.MutationFunction<RejectInvitationMutation, RejectInvitationMutationVariables>;
export type RejectInvitationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RejectInvitationMutation, RejectInvitationMutationVariables>, 'mutation'>;

    export const RejectInvitationComponent = (props: RejectInvitationComponentProps) => (
      <ApolloReactComponents.Mutation<RejectInvitationMutation, RejectInvitationMutationVariables> mutation={RejectInvitationDocument} {...props} />
    );
    

/**
 * __useRejectInvitationMutation__
 *
 * To run a mutation, you first call `useRejectInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectInvitationMutation, { data, loading, error }] = useRejectInvitationMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRejectInvitationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RejectInvitationMutation, RejectInvitationMutationVariables>) {
        return ApolloReactHooks.useMutation<RejectInvitationMutation, RejectInvitationMutationVariables>(RejectInvitationDocument, baseOptions);
      }
export type RejectInvitationMutationHookResult = ReturnType<typeof useRejectInvitationMutation>;
export type RejectInvitationMutationResult = ApolloReactCommon.MutationResult<RejectInvitationMutation>;
export type RejectInvitationMutationOptions = ApolloReactCommon.BaseMutationOptions<RejectInvitationMutation, RejectInvitationMutationVariables>;
export const SetLocalVimeoUploadDoneDocument = gql`
    mutation setLocalVimeoUploadDone($id: String!, $data: SetLocalVimeoUploadDoneInput!) {
  setLocalVimeoUploadDone(id: $id, data: $data) {
    id
    uploadStatus {
      done
      progress
      localUpload
      stage
      error
    }
  }
}
    `;
export type SetLocalVimeoUploadDoneMutationFn = ApolloReactCommon.MutationFunction<SetLocalVimeoUploadDoneMutation, SetLocalVimeoUploadDoneMutationVariables>;
export type SetLocalVimeoUploadDoneComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetLocalVimeoUploadDoneMutation, SetLocalVimeoUploadDoneMutationVariables>, 'mutation'>;

    export const SetLocalVimeoUploadDoneComponent = (props: SetLocalVimeoUploadDoneComponentProps) => (
      <ApolloReactComponents.Mutation<SetLocalVimeoUploadDoneMutation, SetLocalVimeoUploadDoneMutationVariables> mutation={SetLocalVimeoUploadDoneDocument} {...props} />
    );
    

/**
 * __useSetLocalVimeoUploadDoneMutation__
 *
 * To run a mutation, you first call `useSetLocalVimeoUploadDoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLocalVimeoUploadDoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLocalVimeoUploadDoneMutation, { data, loading, error }] = useSetLocalVimeoUploadDoneMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSetLocalVimeoUploadDoneMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetLocalVimeoUploadDoneMutation, SetLocalVimeoUploadDoneMutationVariables>) {
        return ApolloReactHooks.useMutation<SetLocalVimeoUploadDoneMutation, SetLocalVimeoUploadDoneMutationVariables>(SetLocalVimeoUploadDoneDocument, baseOptions);
      }
export type SetLocalVimeoUploadDoneMutationHookResult = ReturnType<typeof useSetLocalVimeoUploadDoneMutation>;
export type SetLocalVimeoUploadDoneMutationResult = ApolloReactCommon.MutationResult<SetLocalVimeoUploadDoneMutation>;
export type SetLocalVimeoUploadDoneMutationOptions = ApolloReactCommon.BaseMutationOptions<SetLocalVimeoUploadDoneMutation, SetLocalVimeoUploadDoneMutationVariables>;
export const TransferVideoDocument = gql`
    mutation transferVideo($id: String!, $data: UploadVideoInput!) {
  uploadVideo(id: $id, data: $data)
}
    `;
export type TransferVideoMutationFn = ApolloReactCommon.MutationFunction<TransferVideoMutation, TransferVideoMutationVariables>;
export type TransferVideoComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<TransferVideoMutation, TransferVideoMutationVariables>, 'mutation'>;

    export const TransferVideoComponent = (props: TransferVideoComponentProps) => (
      <ApolloReactComponents.Mutation<TransferVideoMutation, TransferVideoMutationVariables> mutation={TransferVideoDocument} {...props} />
    );
    

/**
 * __useTransferVideoMutation__
 *
 * To run a mutation, you first call `useTransferVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferVideoMutation, { data, loading, error }] = useTransferVideoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTransferVideoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TransferVideoMutation, TransferVideoMutationVariables>) {
        return ApolloReactHooks.useMutation<TransferVideoMutation, TransferVideoMutationVariables>(TransferVideoDocument, baseOptions);
      }
export type TransferVideoMutationHookResult = ReturnType<typeof useTransferVideoMutation>;
export type TransferVideoMutationResult = ApolloReactCommon.MutationResult<TransferVideoMutation>;
export type TransferVideoMutationOptions = ApolloReactCommon.BaseMutationOptions<TransferVideoMutation, TransferVideoMutationVariables>;
export const ScrapeVideoMetaFromUrlDocument = gql`
    mutation scrapeVideoMetaFromURL($url: String!) {
  scrapeVideoMetaFromURL(url: $url) {
    url
    title
  }
}
    `;
export type ScrapeVideoMetaFromUrlMutationFn = ApolloReactCommon.MutationFunction<ScrapeVideoMetaFromUrlMutation, ScrapeVideoMetaFromUrlMutationVariables>;
export type ScrapeVideoMetaFromUrlComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ScrapeVideoMetaFromUrlMutation, ScrapeVideoMetaFromUrlMutationVariables>, 'mutation'>;

    export const ScrapeVideoMetaFromUrlComponent = (props: ScrapeVideoMetaFromUrlComponentProps) => (
      <ApolloReactComponents.Mutation<ScrapeVideoMetaFromUrlMutation, ScrapeVideoMetaFromUrlMutationVariables> mutation={ScrapeVideoMetaFromUrlDocument} {...props} />
    );
    

/**
 * __useScrapeVideoMetaFromUrlMutation__
 *
 * To run a mutation, you first call `useScrapeVideoMetaFromUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useScrapeVideoMetaFromUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [scrapeVideoMetaFromUrlMutation, { data, loading, error }] = useScrapeVideoMetaFromUrlMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useScrapeVideoMetaFromUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ScrapeVideoMetaFromUrlMutation, ScrapeVideoMetaFromUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<ScrapeVideoMetaFromUrlMutation, ScrapeVideoMetaFromUrlMutationVariables>(ScrapeVideoMetaFromUrlDocument, baseOptions);
      }
export type ScrapeVideoMetaFromUrlMutationHookResult = ReturnType<typeof useScrapeVideoMetaFromUrlMutation>;
export type ScrapeVideoMetaFromUrlMutationResult = ApolloReactCommon.MutationResult<ScrapeVideoMetaFromUrlMutation>;
export type ScrapeVideoMetaFromUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<ScrapeVideoMetaFromUrlMutation, ScrapeVideoMetaFromUrlMutationVariables>;
export const StartVideoUploadDocument = gql`
    mutation startVideoUpload($fileSize: Float!, $fileName: String!) {
  startVideoUpload(fileSize: $fileSize, fileName: $fileName) {
    uploadLink
    videoUri
  }
}
    `;
export type StartVideoUploadMutationFn = ApolloReactCommon.MutationFunction<StartVideoUploadMutation, StartVideoUploadMutationVariables>;
export type StartVideoUploadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<StartVideoUploadMutation, StartVideoUploadMutationVariables>, 'mutation'>;

    export const StartVideoUploadComponent = (props: StartVideoUploadComponentProps) => (
      <ApolloReactComponents.Mutation<StartVideoUploadMutation, StartVideoUploadMutationVariables> mutation={StartVideoUploadDocument} {...props} />
    );
    

/**
 * __useStartVideoUploadMutation__
 *
 * To run a mutation, you first call `useStartVideoUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartVideoUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startVideoUploadMutation, { data, loading, error }] = useStartVideoUploadMutation({
 *   variables: {
 *      fileSize: // value for 'fileSize'
 *      fileName: // value for 'fileName'
 *   },
 * });
 */
export function useStartVideoUploadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartVideoUploadMutation, StartVideoUploadMutationVariables>) {
        return ApolloReactHooks.useMutation<StartVideoUploadMutation, StartVideoUploadMutationVariables>(StartVideoUploadDocument, baseOptions);
      }
export type StartVideoUploadMutationHookResult = ReturnType<typeof useStartVideoUploadMutation>;
export type StartVideoUploadMutationResult = ApolloReactCommon.MutationResult<StartVideoUploadMutation>;
export type StartVideoUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<StartVideoUploadMutation, StartVideoUploadMutationVariables>;
export type NotificationFragment = { __typename?: 'Notification', id: string, type: NotificationType, sendBy: SendBy, whenNumber: number, whenUnit: WhenUnit, subject: string, followUpTo?: Maybe<SendTo>, message: string };

export type GetEwebinarNotificationsQueryVariables = {
  ewebinarId: Scalars['String'];
};


export type GetEwebinarNotificationsQuery = { __typename?: 'Query', notifications: Array<(
    { __typename?: 'Notification' }
    & NotificationFragment
  )> };

export type CreateNotificationMutationVariables = {
  data: NotificationInput;
};


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification?: Maybe<(
    { __typename?: 'Notification' }
    & NotificationFragment
  )> };

export type UpdateNotificationMutationVariables = {
  data: NotificationInput;
};


export type UpdateNotificationMutation = { __typename?: 'Mutation', updateNotification: (
    { __typename?: 'Notification' }
    & NotificationFragment
  ) };

export type DeleteNotificationMutationVariables = {
  id: Scalars['String'];
};


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification: boolean };

export type EWebinarSetFragment = { __typename?: 'EWebinarSet', id: string, publicWebinar?: Maybe<(
    { __typename?: 'EWebinar' }
    & EWebinarFragment
  )>, draftWebinar: (
    { __typename?: 'EWebinar' }
    & EWebinarFragment
  ) };

export type PublicSetQueryVariables = {
  id: Scalars['String'];
};


export type PublicSetQuery = { __typename?: 'Query', publicSet: (
    { __typename?: 'EWebinarSet' }
    & EWebinarSetFragment
  ) };

export type AnalyticsFragment = { __typename?: 'Analytics', registrationRate?: Maybe<{ __typename?: 'RegistrationRate', ratePercent?: Maybe<number>, uniqueVisitors?: Maybe<number>, registered?: Maybe<number> }>, openRate?: Maybe<{ __typename?: 'OpenRate', ratePercent?: Maybe<number>, notificationSent?: Maybe<number>, notificationOpened?: Maybe<number> }>, attendance?: Maybe<{ __typename?: 'Attendance', ratePercent?: Maybe<number>, live?: Maybe<{ __typename?: 'AttendanceItem', stayedToEnd: number, leftEarly: number, averagePercentWatched: number }>, replay?: Maybe<{ __typename?: 'AttendanceItem', stayedToEnd: number, leftEarly: number, averagePercentWatched: number }> }>, engagement?: Maybe<{ __typename?: 'Engagement', totalInteractions?: Maybe<number>, totalReactions?: Maybe<number>, engagementPercent?: Maybe<number>, chatMessages?: Maybe<number>, question?: Maybe<number>, poll?: Maybe<number>, specialOffer?: Maybe<number>, handout?: Maybe<number>, requestToContact?: Maybe<number>, feedback?: Maybe<number>, tip?: Maybe<number>, privateMessage?: Maybe<number>, endStream?: Maybe<number>, welcome?: Maybe<number>, publicPost?: Maybe<number>, overallRating?: Maybe<number> }>, chartData?: Maybe<Array<{ __typename?: 'ChartPoint', timeFrame: number, liveAttendance?: Maybe<number>, replayWatched?: Maybe<number>, interactions?: Maybe<number>, reactions?: Maybe<number> }>> };

export type GetAnalyticsQueryVariables = {
  filter?: Maybe<DashboardFilterInput>;
};


export type GetAnalyticsQuery = { __typename?: 'Query', analytics?: Maybe<(
    { __typename?: 'Analytics' }
    & AnalyticsFragment
  )> };

export type CreateUploadUrlMutationVariables = {
  data: CreateUploadUrlInput;
};


export type CreateUploadUrlMutation = { __typename?: 'Mutation', createUploadUrl: { __typename?: 'Asset', url: string, uploadUrl?: Maybe<string> } };

export type AttendeeFragment = { __typename?: 'Attendee', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, visitorId: string, startTime?: Maybe<any>, optOut: boolean, joinTime?: Maybe<any>, attendeeId?: Maybe<{ __typename?: 'AttendeeID', visitorId: string, startTime: any, setId: string }>, set: { __typename?: 'EWebinarSet', id: string }, ewebinar?: Maybe<{ __typename?: 'EWebinar', id: string }> };

export type GetAttendeeQueryVariables = {
  id: Scalars['String'];
};


export type GetAttendeeQuery = { __typename?: 'Query', attendee: (
    { __typename?: 'Attendee' }
    & AttendeeFragment
  ) };

export type RegisterAttendeeMutationVariables = {
  data: RegisterAttendeeInput;
};


export type RegisterAttendeeMutation = { __typename?: 'Mutation', registerAttendee?: Maybe<(
    { __typename?: 'Attendee' }
    & AttendeeFragment
  )> };

export type UpdateStartTimeMutationVariables = {
  startTime: Scalars['DateTime'];
  id: Scalars['String'];
};


export type UpdateStartTimeMutation = { __typename?: 'Mutation', updateStartTime?: Maybe<(
    { __typename?: 'Attendee' }
    & AttendeeFragment
  )> };

export type CreateVisitorMutationVariables = {
  data: CreateVisitorInput;
};


export type CreateVisitorMutation = { __typename?: 'Mutation', createVisitor?: Maybe<(
    { __typename?: 'Attendee' }
    & AttendeeFragment
  )> };

export type AttendeeJoinWebinarMutationVariables = {
  id: Scalars['String'];
  joinTime: Scalars['DateTime'];
};


export type AttendeeJoinWebinarMutation = { __typename?: 'Mutation', attendeeJoinWebinar: (
    { __typename?: 'Attendee', ewebinar?: Maybe<(
      { __typename?: 'EWebinar', interactions: Array<(
        { __typename?: 'Interaction' }
        & InteractionFragment
      )> }
      & EWebinarFragment
    )> }
    & AttendeeFragment
  ) };

export type AttendeeOptOutMutationVariables = {
  id: Scalars['String'];
  optOut: Scalars['Boolean'];
};


export type AttendeeOptOutMutation = { __typename?: 'Mutation', attendeeOptOut: { __typename?: 'Attendee', id: string, ewebinar?: Maybe<{ __typename?: 'EWebinar', title: string, team: { __typename?: 'Team', name?: Maybe<string>, logoMediaUrl?: Maybe<string> } }> } };

export type ConversationFragment = { __typename?: 'Conversation', id: string, inEmail: boolean, isArchived: boolean, lastReadAt?: Maybe<any>, isAttendeeLive: boolean, sortDate: any, hasUnreadMessages: boolean, attendee: { __typename?: 'Attendee', id: string, attendeeFields?: Maybe<any>, startTime?: Maybe<any>, firstName?: Maybe<string>, lastName?: Maybe<string>, email?: Maybe<string> }, lastMessage?: Maybe<{ __typename?: 'Message', id: string, fromAttendee: boolean, content: string, timeSent: any }>, set: { __typename?: 'EWebinarSet', id: string }, ewebinar: { __typename?: 'EWebinar', id: string } };

export type ConversationsFragment = { __typename?: 'Conversations', total: number, nextCursor?: Maybe<string>, conversations: Array<(
    { __typename?: 'Conversation' }
    & ConversationFragment
  )> };

export type MessageFragment = { __typename?: 'Message', id: string, timeSent: any, roomType: string, timeInRoomSecs: number, fromAttendee: boolean, content: string, user?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName?: Maybe<string>, profileMediaUrl?: Maybe<string> }> };

export type ConversationQueryVariables = {
  id: Scalars['String'];
};


export type ConversationQuery = { __typename?: 'Query', conversation: (
    { __typename?: 'Conversation', messages: Array<(
      { __typename?: 'Message' }
      & MessageFragment
    )> }
    & ConversationFragment
  ) };

export type ConversationForAttendeeQueryVariables = {
  attendeeId: AttendeeIdInput;
};


export type ConversationForAttendeeQuery = { __typename?: 'Query', conversationForAttendee: (
    { __typename?: 'Conversation', messages: Array<(
      { __typename?: 'Message' }
      & MessageFragment
    )> }
    & ConversationFragment
  ) };

export type ConversationsQueryVariables = {
  filters: ConversationFilters;
};


export type ConversationsQuery = { __typename?: 'Query', conversations: { __typename?: 'Conversations', total: number, nextCursor?: Maybe<string>, conversations: Array<(
      { __typename?: 'Conversation' }
      & ConversationFragment
    )> } };

export type ArchiveConversationMutationVariables = {
  id: Scalars['String'];
};


export type ArchiveConversationMutation = { __typename?: 'Mutation', archiveConversation: string };

export type SeenConversationMutationVariables = {
  id: Scalars['String'];
};


export type SeenConversationMutation = { __typename?: 'Mutation', seenConversation: (
    { __typename?: 'Conversation' }
    & ConversationFragment
  ) };

export type PresenterFragment = { __typename?: 'Presenter', id: string, createdAt: any, updatedAt: any, isActive: boolean, profileMediaUrl?: Maybe<string>, name: string, email?: Maybe<string>, phone?: Maybe<string>, company?: Maybe<string>, title?: Maybe<string>, bio?: Maybe<string>, socialLinks?: Maybe<{ __typename?: 'SocialLink', facebook?: Maybe<string>, twitter?: Maybe<string>, linkedin?: Maybe<string> }>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> };

export type EWebinarFragment = { __typename?: 'EWebinar', id: string, title: string, duration?: Maybe<number>, vimeoVideoId?: Maybe<number>, thumbnail?: Maybe<string>, waitingRoomDurationSecs: number, exitRoomDurationSecs: number, isPublished: boolean, logoMediaUrl?: Maybe<string>, theme: string, colorsMatchLogo: boolean, primaryColor: string, highlightColor: string, font: string, oneTimeEvent: boolean, timeZone: string, use24HourClock: boolean, startDate?: Maybe<any>, endDateEnabled?: Maybe<boolean>, endDate?: Maybe<any>, justInTimeModeEnabled: boolean, unreadConversationsCount: number, enableChat: boolean, presenters?: Maybe<Array<(
    { __typename?: 'Presenter' }
    & PresenterFragment
  )>>, registrationPageSettings?: Maybe<{ __typename?: 'RegistrationPageSettings', headerSection?: Maybe<{ __typename?: 'RegistrationPageHeader', title?: Maybe<string>, subtitle?: Maybe<string>, teaserText?: Maybe<string>, ctaTopBtnText?: Maybe<string>, ctaBtnText?: Maybe<string>, mainMediaUrl?: Maybe<string> }>, descriptionBlockSection?: Maybe<{ __typename?: 'RegistrationPageDescriptionBlock', active?: Maybe<boolean>, description?: Maybe<string>, title?: Maybe<string>, mainMediaUrl?: Maybe<string> }>, presentersSection?: Maybe<{ __typename?: 'RegistrationPresenters', active?: Maybe<boolean>, title?: Maybe<string>, presenters?: Maybe<Array<{ __typename?: 'RegistrationPresenter', name?: Maybe<string>, avatarMediaUrl?: Maybe<string>, description?: Maybe<string> }>> }>, reasonsSection?: Maybe<{ __typename?: 'RegistrationPageReasons', active?: Maybe<boolean>, title?: Maybe<string>, reasons?: Maybe<Array<{ __typename?: 'RegistrationPageReason', content?: Maybe<string> }>> }>, testimonialsSection?: Maybe<{ __typename?: 'RegistrationPageTestimonials', active?: Maybe<boolean>, headerOne?: Maybe<string>, headerTwo?: Maybe<string>, logos?: Maybe<Array<{ __typename?: 'RegistrationPageTestimonialsLogo', logoMediaUrl?: Maybe<string> }>>, testimonials?: Maybe<Array<{ __typename?: 'RegistrationPageTestimonial', name?: Maybe<string>, avatarMediaUrl?: Maybe<string>, position?: Maybe<string>, description?: Maybe<string> }>> }>, contactSection?: Maybe<{ __typename?: 'RegistrationPageContacts', title?: Maybe<string>, subtitle?: Maybe<string>, ctaBtnText?: Maybe<string> }>, footerSection?: Maybe<{ __typename?: 'RegistrationFooter', tagline?: Maybe<string>, disclaimer?: Maybe<string> }> }>, registrationFormSettings: { __typename?: 'RegistrationFormSettings', title: string, showConsentCheckbox: boolean, consentCheckboxText: string, registerButton: string, fields: Array<{ __typename?: 'RegistrationFormField', fieldId: number, fieldName: string, fieldType: string, isRequired: boolean, isRemovable?: Maybe<boolean>, order: number }> }, thankyouPageSettings?: Maybe<{ __typename?: 'ThankyouPageSettings', headerSection?: Maybe<{ __typename?: 'ThankyouPageHeader', title?: Maybe<string>, subtitle?: Maybe<string>, sessionId?: Maybe<number>, mainMediaUrl?: Maybe<string> }>, presentersSection?: Maybe<{ __typename?: 'RegistrationPresenters', active?: Maybe<boolean>, title?: Maybe<string>, presenters?: Maybe<Array<{ __typename?: 'RegistrationPresenter', name?: Maybe<string>, avatarMediaUrl?: Maybe<string>, description?: Maybe<string> }>> }>, shareSection?: Maybe<{ __typename?: 'ThankyouPageShare', active?: Maybe<boolean>, title?: Maybe<string>, socialMedia?: Maybe<Array<{ __typename?: 'ThankyouPageShareSocial', name?: Maybe<string>, url?: Maybe<string> }>> }>, footerSection?: Maybe<{ __typename?: 'RegistrationFooter', tagline?: Maybe<string>, disclaimer?: Maybe<string> }> }>, scheduleSettings?: Maybe<{ __typename?: 'ScheduleSettings', onWeekDays?: Maybe<Array<boolean>>, atMinutes?: Maybe<Array<number>>, numberOfSessions?: Maybe<number>, showReplaySession?: Maybe<boolean>, justInTimeIntervalMinutes?: Maybe<number>, justInTimeWeekDays?: Maybe<Array<boolean>>, justInTimeHoursOfOperations?: Maybe<Array<{ __typename?: 'JustInTimeHoursOfOperation', day: WeekDays, times: Array<number> }>>, blackoutPeriods?: Maybe<Array<{ __typename?: 'BlackoutPeriod', name?: Maybe<string>, startDay?: Maybe<number>, endDay?: Maybe<number> }>> }>, notificationSettings?: Maybe<{ __typename?: 'NotificationSettings', fromName: string, fromEmail: string }>, chatSettings?: Maybe<{ __typename?: 'ChatSettings', emailBeforeSession: boolean, emailOnChatReceive: boolean, privateWelcomeMessage: string }>, viewerRoomSettings: { __typename?: 'ViewerRoomSettings', attendeeCounter?: Maybe<boolean>, attendeeCounterOption?: Maybe<AttendeeCounterOption>, attendeeReactions?: Maybe<boolean>, attendeeReactionsOption?: Maybe<AttendeeReactionsOption> }, exitRoomSettings: { __typename?: 'ExitRoomSettings', showReplayLink?: Maybe<boolean>, redirectAfterExit?: Maybe<boolean>, redirectLink?: Maybe<string> }, uploadStatus?: Maybe<{ __typename?: 'UploadStatus', stage?: Maybe<string>, localUpload?: Maybe<boolean>, progress?: Maybe<number>, done?: Maybe<boolean>, error?: Maybe<string> }>, set: { __typename?: 'EWebinarSet', id: string, isPublishable: boolean, moderator?: Maybe<{ __typename?: 'User', id: string, name: string, profileMediaUrl?: Maybe<string>, email: string }> } };

export type CreateEwebinarMutationVariables = {
  data: CreateEwebinarInput;
};


export type CreateEwebinarMutation = { __typename?: 'Mutation', createEwebinar?: Maybe<{ __typename?: 'EWebinar', id: string, title: string, vimeoVideoId?: Maybe<number>, thumbnail?: Maybe<string> }> };

export type EwebinarQueryVariables = {
  id: Scalars['String'];
};


export type EwebinarQuery = { __typename?: 'Query', ewebinar?: Maybe<(
    { __typename?: 'EWebinar' }
    & EWebinarFragment
  )> };

export type UpdateEwebinarMutationVariables = {
  data: UpdateEwebinarInput;
};


export type UpdateEwebinarMutation = { __typename?: 'Mutation', updateEwebinar: (
    { __typename?: 'EWebinar' }
    & EWebinarFragment
  ) };

export type DeleteEwebinarMutationVariables = {
  id: Scalars['String'];
};


export type DeleteEwebinarMutation = { __typename?: 'Mutation', deleteEwebinar: string };

export type PublishEwebinarMutationVariables = {
  setId: Scalars['String'];
};


export type PublishEwebinarMutation = { __typename?: 'Mutation', publishEwebinar: boolean };

export type UnpublishEwebinarMutationVariables = {
  id: Scalars['String'];
};


export type UnpublishEwebinarMutation = { __typename?: 'Mutation', unpublishEwebinar: { __typename?: 'EWebinar', id: string, isPublished: boolean } };

export type DuplicateMutationVariables = {
  setId: Scalars['String'];
};


export type DuplicateMutation = { __typename?: 'Mutation', duplicateEwebinar: { __typename?: 'EWebinar', id: string, isPublished: boolean } };

export type EWebinarDescriptionFragment = { __typename?: 'EWebinar', id: string, title: string, isPublished: boolean, primaryColor: string, highlightColor: string, font: string, logoMediaUrl?: Maybe<string>, vimeoVideoId?: Maybe<number>, thumbnail?: Maybe<string>, oneTimeEvent: boolean, startDate?: Maybe<any>, endDate?: Maybe<any>, justInTimeModeEnabled: boolean, unreadConversationsCount: number, registrationPageSettings?: Maybe<{ __typename?: 'RegistrationPageSettings', headerSection?: Maybe<{ __typename?: 'RegistrationPageHeader', subtitle?: Maybe<string>, mainMediaUrl?: Maybe<string>, ctaTopBtnText?: Maybe<string> }> }>, presenters?: Maybe<Array<{ __typename?: 'Presenter', id: string, name: string, profileMediaUrl?: Maybe<string> }>>, uploadStatus?: Maybe<{ __typename?: 'UploadStatus', stage?: Maybe<string>, progress?: Maybe<number>, localUpload?: Maybe<boolean>, done?: Maybe<boolean>, error?: Maybe<string> }>, set: { __typename?: 'EWebinarSet', id: string, publicWebinar?: Maybe<{ __typename?: 'EWebinar', id: string }>, draftWebinar: { __typename?: 'EWebinar', id: string } }, scheduleSettings?: Maybe<{ __typename?: 'ScheduleSettings', showReplaySession?: Maybe<boolean> }> };

export type EWebinarPublicDescriptionFragment = { __typename?: 'EWebinar', id: string, title: string, isPublished: boolean, primaryColor: string, highlightColor: string, font: string, logoMediaUrl?: Maybe<string>, vimeoVideoId?: Maybe<number>, thumbnail?: Maybe<string>, oneTimeEvent: boolean, startDate?: Maybe<any>, endDate?: Maybe<any>, justInTimeModeEnabled: boolean, unreadConversationsCount: number, registrationPageSettings?: Maybe<{ __typename?: 'RegistrationPageSettings', headerSection?: Maybe<{ __typename?: 'RegistrationPageHeader', subtitle?: Maybe<string>, mainMediaUrl?: Maybe<string>, ctaTopBtnText?: Maybe<string> }> }>, presenters?: Maybe<Array<{ __typename?: 'Presenter', id: string, name: string, profileMediaUrl?: Maybe<string> }>>, set: { __typename?: 'EWebinarSet', id: string } };

export type SetsQueryVariables = {};


export type SetsQuery = { __typename?: 'Query', sets: Array<{ __typename?: 'EWebinarSet', id: string, isPublishable: boolean, moderator?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName?: Maybe<string> }>, publicWebinar?: Maybe<(
      { __typename?: 'EWebinar' }
      & EWebinarDescriptionFragment
    )>, draftWebinar: (
      { __typename?: 'EWebinar' }
      & EWebinarDescriptionFragment
    ) }> };

export type PublicSetsQueryVariables = {
  teamId: Scalars['String'];
};


export type PublicSetsQuery = { __typename?: 'Query', publicSets: Array<{ __typename?: 'EWebinarSet', moderator?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName?: Maybe<string> }>, publicWebinar?: Maybe<(
      { __typename?: 'EWebinar' }
      & EWebinarPublicDescriptionFragment
    )> }> };

export type ReactionForAttendeeFragment = { __typename?: 'ReactionForAttendee', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, email?: Maybe<string>, visitorId: string, registeredDate: any, watchedPercent?: Maybe<number>, watchedReplayPercent?: Maybe<number>, startTime?: Maybe<any>, attendeeId?: Maybe<{ __typename?: 'AttendeeID', visitorId: string, startTime: any, setId: string }>, set: { __typename?: 'EWebinarSet', id: string }, ewebinar?: Maybe<{ __typename?: 'EWebinar', id: string }>, reaction?: Maybe<(
    { __typename?: 'Reaction' }
    & EwebinarReactionFragment
  )> };

export type RegistrantsQueryVariables = {
  filter: GetRegistrantsInput;
};


export type RegistrantsQuery = { __typename?: 'Query', registrants: { __typename?: 'Registrants', total: number, nextCursor?: Maybe<string>, attendees: Array<(
      { __typename?: 'ReactionForAttendee' }
      & ReactionForAttendeeFragment
    )> } };

export type InteractionFragment = { __typename?: 'Interaction', id: string, type: InteractionType, room: RoomType, appearAt: number, createdAt: any, updatedAt: any, details?: Maybe<{ __typename?: 'InteractionDetailFields', imageMediaUrl?: Maybe<string>, title: string, description?: Maybe<string>, buttonText?: Maybe<string>, resultsAppearAt?: Maybe<number>, answer1?: Maybe<string>, answer2?: Maybe<string>, answer3?: Maybe<string>, answer4?: Maybe<string>, downloadLink?: Maybe<string>, offerLink?: Maybe<string>, offerEndsIn?: Maybe<number> }> };

export type InteractionViewModeFragment = (
  { __typename?: 'Interaction', reaction?: Maybe<{ __typename?: 'Reaction', detailsFields: { __typename?: 'ReactionDetailFields', poll?: Maybe<{ __typename?: 'PollDetailsFields', answer?: Maybe<string> }>, feedback?: Maybe<{ __typename?: 'FeedbackDetailsFields', answer?: Maybe<string> }>, question?: Maybe<{ __typename?: 'QuestionDetailsFields', answer?: Maybe<string> }>, requestToContact?: Maybe<{ __typename?: 'RequestToContactDetailsFields', phone?: Maybe<string>, email?: Maybe<string>, contactTime?: Maybe<string> }> } }>, pollResult?: Maybe<{ __typename?: 'ReactionResult', totalCount?: Maybe<number>, respondants?: Maybe<number>, detailsFields?: Maybe<{ __typename?: 'ReactionResultDetails', answer1?: Maybe<{ __typename?: 'ReactionResultDetailField', count?: Maybe<number>, percent?: Maybe<number> }>, answer2?: Maybe<{ __typename?: 'ReactionResultDetailField', count?: Maybe<number>, percent?: Maybe<number> }>, answer3?: Maybe<{ __typename?: 'ReactionResultDetailField', count?: Maybe<number>, percent?: Maybe<number> }>, answer4?: Maybe<{ __typename?: 'ReactionResultDetailField', count?: Maybe<number>, percent?: Maybe<number> }> }> }>, feedbackResult?: Maybe<{ __typename?: 'ReactionResult', totalCount?: Maybe<number>, respondants?: Maybe<number>, detailsFields?: Maybe<{ __typename?: 'ReactionResultDetails', feedbackRating?: Maybe<number> }> }> }
  & InteractionFragment
);

export type GetEwebinarInteractionsQueryVariables = {
  ewebinarId: Scalars['String'];
};


export type GetEwebinarInteractionsQuery = { __typename?: 'Query', interactions: Array<(
    { __typename?: 'Interaction' }
    & InteractionFragment
  )> };

export type GetEwebinarInteractionsViewModeQueryVariables = {
  ewebinarId: Scalars['String'];
  attendeeId: Scalars['String'];
};


export type GetEwebinarInteractionsViewModeQuery = { __typename?: 'Query', interactions: Array<(
    { __typename?: 'Interaction' }
    & InteractionViewModeFragment
  )> };

export type GetEwebinarInteractionQueryVariables = {
  id: Scalars['String'];
};


export type GetEwebinarInteractionQuery = { __typename?: 'Query', interaction: (
    { __typename?: 'Interaction' }
    & InteractionFragment
  ) };

export type CreateInteractionMutationVariables = {
  data: InteractionInput;
};


export type CreateInteractionMutation = { __typename?: 'Mutation', createInteraction?: Maybe<(
    { __typename?: 'Interaction' }
    & InteractionFragment
  )> };

export type UpdateInteractionMutationVariables = {
  data: InteractionInput;
};


export type UpdateInteractionMutation = { __typename?: 'Mutation', updateInteraction: (
    { __typename?: 'Interaction' }
    & InteractionFragment
  ) };

export type DeleteInteractionMutationVariables = {
  id: Scalars['String'];
};


export type DeleteInteractionMutation = { __typename?: 'Mutation', deleteInteraction: boolean };

export type ReactionResultsQueryVariables = {
  ewebinarSetId: Scalars['String'];
  from: Scalars['String'];
  to: Scalars['String'];
};


export type ReactionResultsQuery = { __typename?: 'Query', reactionResults: Array<{ __typename?: 'ReactionResult', totalCount?: Maybe<number>, respondants?: Maybe<number>, detailsFields?: Maybe<{ __typename?: 'ReactionResultDetails', feedbackRating?: Maybe<number>, answer1?: Maybe<{ __typename?: 'ReactionResultDetailField', count?: Maybe<number>, percent?: Maybe<number> }>, answer2?: Maybe<{ __typename?: 'ReactionResultDetailField', count?: Maybe<number>, percent?: Maybe<number> }>, answer3?: Maybe<{ __typename?: 'ReactionResultDetailField', count?: Maybe<number>, percent?: Maybe<number> }>, answer4?: Maybe<{ __typename?: 'ReactionResultDetailField', count?: Maybe<number>, percent?: Maybe<number> }> }>, interaction: { __typename?: 'Interaction', id: string, appearAt: number, type: InteractionType, details?: Maybe<{ __typename?: 'InteractionDetailFields', title: string, description?: Maybe<string>, imageMediaUrl?: Maybe<string>, answer1?: Maybe<string>, answer2?: Maybe<string>, answer3?: Maybe<string>, answer4?: Maybe<string> }> } }> };

export type EwebinarReactionFragment = { __typename?: 'Reaction', id: string, reactionAppearAt: number, reactionAppearRoom: RoomType, eventName: ReactionEventName, pollAnswer?: Maybe<string>, feedbackRating?: Maybe<number>, detailsFields: { __typename?: 'ReactionDetailFields', feedback?: Maybe<{ __typename?: 'FeedbackDetailsFields', answer?: Maybe<string> }>, poll?: Maybe<{ __typename?: 'PollDetailsFields', answer?: Maybe<string> }>, question?: Maybe<{ __typename?: 'QuestionDetailsFields', answer?: Maybe<string> }>, requestToContact?: Maybe<{ __typename?: 'RequestToContactDetailsFields', phone?: Maybe<string>, email?: Maybe<string>, contactTime?: Maybe<string> }> } };

export type CreateReactionMutationVariables = {
  data: ReactionInput;
};


export type CreateReactionMutation = { __typename?: 'Mutation', createReaction?: Maybe<(
    { __typename?: 'Reaction' }
    & EwebinarReactionFragment
  )> };

export type EwebinarSessionQueryVariables = {
  data: EwebinarSessionsInput;
};


export type EwebinarSessionQuery = { __typename?: 'Query', ewebinarSession?: Maybe<{ __typename?: 'EwebinarSessionsPayload', timeZone: string, sessions: Array<{ __typename?: 'Session', value: string, text: string }> }> };

export type PresentersQueryVariables = {};


export type PresentersQuery = { __typename?: 'Query', presenters: Array<(
    { __typename?: 'Presenter' }
    & PresenterFragment
  )> };

export type AddPresenterMutationVariables = {
  data: EditPresenterInput;
};


export type AddPresenterMutation = { __typename?: 'Mutation', addPresenter: (
    { __typename?: 'Presenter' }
    & PresenterFragment
  ) };

export type UpdatePresenterMutationVariables = {
  data: EditPresenterInput;
};


export type UpdatePresenterMutation = { __typename?: 'Mutation', updatePresenter: (
    { __typename?: 'Presenter' }
    & PresenterFragment
  ) };

export type RemovePresenterMutationVariables = {
  id: Scalars['String'];
};


export type RemovePresenterMutation = { __typename?: 'Mutation', removePresenter: boolean };

export type TeamFragment = { __typename?: 'Team', id: string, name?: Maybe<string>, logoMediaUrl?: Maybe<string>, subdomain?: Maybe<string> };

export type MyTeamQueryVariables = {};


export type MyTeamQuery = { __typename?: 'Query', myTeam: { __typename?: 'Team', id: string, name?: Maybe<string>, logoMediaUrl?: Maybe<string>, subdomain?: Maybe<string>, stripeCustomerId?: Maybe<string>, minimumPublicWebinars: number, billingCycle: BillingCycle, users: Array<{ __typename?: 'TeamUserRelation', role: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: Maybe<string>, email: string, profileMediaUrl?: Maybe<string> } }> } };

export type RemoveUserMutationVariables = {
  id: Scalars['String'];
  replacementId: Scalars['String'];
};


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: (
    { __typename?: 'Team' }
    & TeamFragment
  ) };

export type AddUserMutationVariables = {
  data: UserAndPresenterInput;
};


export type AddUserMutation = { __typename?: 'Mutation', addUser: (
    { __typename?: 'Team' }
    & TeamFragment
  ) };

export type UpdateUserMutationVariables = {
  data: UserAndPresenterInput;
};


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: Maybe<(
    { __typename?: 'Team' }
    & TeamFragment
  )> };

export type TeamForSubdomainQueryVariables = {
  subdomain: Scalars['String'];
};


export type TeamForSubdomainQuery = { __typename?: 'Query', teamForSubdomain: (
    { __typename?: 'Team' }
    & TeamFragment
  ) };

export type MemberFragment = { __typename?: 'UserInTeam', id: string, firstName: string, lastName?: Maybe<string>, email: string, state: UserState, profileMediaUrl?: Maybe<string>, version: number, isVerified?: Maybe<boolean>, role: UserRole, invitationStatus?: Maybe<InvitationStatus>, team: { __typename?: 'Team', id: string, name?: Maybe<string>, subdomain?: Maybe<string>, logoMediaUrl?: Maybe<string>, address: { __typename?: 'Address', country: string } }, assignedSets?: Maybe<Array<{ __typename?: 'EWebinar', id: string }>>, presenter: (
    { __typename?: 'Presenter' }
    & PresenterFragment
  ) };

export type TeamUsersQueryVariables = {
  filters: UserFilters;
};


export type TeamUsersQuery = { __typename?: 'Query', teamUsers: Array<(
    { __typename?: 'UserInTeam' }
    & MemberFragment
  )> };

export type ResendInvitationEmailMutationVariables = {
  userId: Scalars['String'];
  teamId: Scalars['String'];
};


export type ResendInvitationEmailMutation = { __typename?: 'Mutation', resendInvitationEmail: string };

export type UserFragment = { __typename?: 'User', id: string, firstName: string, lastName?: Maybe<string>, email: string, state: UserState, profileMediaUrl?: Maybe<string>, version: number, isVerified?: Maybe<boolean>, team: { __typename?: 'Team', id: string, name?: Maybe<string>, subdomain?: Maybe<string>, logoMediaUrl?: Maybe<string>, address: { __typename?: 'Address', country: string } }, currentTeamRelation?: Maybe<{ __typename?: 'TeamUserRelation', id: string, role: string, invitationStatus?: Maybe<InvitationStatus> }> };

export type MeFragment = { __typename?: 'Me', id: string, firstName: string, lastName?: Maybe<string>, email: string, state: UserState, profileMediaUrl?: Maybe<string>, version: number, isVerified?: Maybe<boolean>, team: { __typename?: 'Team', id: string, name?: Maybe<string>, subdomain?: Maybe<string>, logoMediaUrl?: Maybe<string>, address: { __typename?: 'Address', country: string } }, currentTeamRelation?: Maybe<{ __typename?: 'TeamUserRelation', id: string, role: string, invitationStatus?: Maybe<InvitationStatus>, invitedByUser?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName?: Maybe<string> }> }>, tokens: { __typename?: 'AccessTokens', accessToken: string } };

export type SkipVerifyEmailMutationVariables = {};


export type SkipVerifyEmailMutation = { __typename?: 'Mutation', skipVerifyEmail: (
    { __typename?: 'User' }
    & UserFragment
  ) };

export type MeQueryVariables = {};


export type MeQuery = { __typename?: 'Query', me?: Maybe<(
    { __typename?: 'Me' }
    & MeFragment
  )> };

export type CheckEmptyPasswordQueryVariables = {};


export type CheckEmptyPasswordQuery = { __typename?: 'Query', checkEmptyPassword: boolean };

export type UpdateMeMutationVariables = {
  data: UpdateUserAndTeamInput;
};


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: (
    { __typename?: 'Me' }
    & MeFragment
  ) };

export type RegisterMutationVariables = {
  data: NewUserAndTeamInput;
};


export type RegisterMutation = { __typename?: 'Mutation', registerUserAndTeam: (
    { __typename?: 'Me' }
    & MeFragment
  ) };

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = { __typename?: 'Mutation', login: (
    { __typename?: 'Me' }
    & MeFragment
  ) };

export type LogoutMutationVariables = {};


export type LogoutMutation = { __typename?: 'Mutation', logout?: Maybe<boolean> };

export type ChangePasswordMutationVariables = {
  data: ChangePasswordInput;
};


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: (
    { __typename?: 'Me' }
    & MeFragment
  ) };

export type ResetPasswordMutationVariables = {
  email: Scalars['String'];
};


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: string };

export type ResendConfirmationEmailMutationVariables = {};


export type ResendConfirmationEmailMutation = { __typename?: 'Mutation', resendConfirmationEmail: string };

export type VerifyTokenMutationVariables = {
  token: Scalars['String'];
};


export type VerifyTokenMutation = { __typename?: 'Mutation', verifyToken: (
    { __typename?: 'Me' }
    & MeFragment
  ) };

export type AcceptInvitationMutationVariables = {
  token: Scalars['String'];
};


export type AcceptInvitationMutation = { __typename?: 'Mutation', acceptInvitation: (
    { __typename?: 'Me' }
    & MeFragment
  ) };

export type RejectInvitationMutationVariables = {
  token: Scalars['String'];
};


export type RejectInvitationMutation = { __typename?: 'Mutation', rejectInvitation: boolean };

export type SetLocalVimeoUploadDoneMutationVariables = {
  id: Scalars['String'];
  data: SetLocalVimeoUploadDoneInput;
};


export type SetLocalVimeoUploadDoneMutation = { __typename?: 'Mutation', setLocalVimeoUploadDone: { __typename?: 'EWebinar', id: string, uploadStatus?: Maybe<{ __typename?: 'UploadStatus', done?: Maybe<boolean>, progress?: Maybe<number>, localUpload?: Maybe<boolean>, stage?: Maybe<string>, error?: Maybe<string> }> } };

export type TransferVideoMutationVariables = {
  id: Scalars['String'];
  data: UploadVideoInput;
};


export type TransferVideoMutation = { __typename?: 'Mutation', uploadVideo: string };

export type ScrapeVideoMetaFromUrlMutationVariables = {
  url: Scalars['String'];
};


export type ScrapeVideoMetaFromUrlMutation = { __typename?: 'Mutation', scrapeVideoMetaFromURL?: Maybe<{ __typename?: 'VideoMeta', url: string, title: string }> };

export type StartVideoUploadMutationVariables = {
  fileSize: Scalars['Float'];
  fileName: Scalars['String'];
};


export type StartVideoUploadMutation = { __typename?: 'Mutation', startVideoUpload: { __typename?: 'StartVideoUploadInfo', uploadLink: string, videoUri: string } };
