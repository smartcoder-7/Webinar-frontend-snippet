export enum SessionOrDateOption {
    BY_SESSION_DATE = 'By session date',
    BY_REGISTERED_DATE = 'By registered date',
}

export enum DateRangeOption {
    ALL_SESSION = 'All sessions',
    LAST_7_DAYS = 'Last 7 days',
    LAST_30_DAYS = 'Last 30 days',
    LAST_60_DAYS = 'Last 60 days',
    LAST_90_DAYS = 'Last 90 days',
    LAST_6_MONTHS = 'Last 6 months',
    LAST_YEAR = 'Last year',
    YEAR_TO_DATE = 'Year to date',
    CUSTOM = 'Custom',
}

export enum AttendanceOption {
    DidNotAttend = 'Didn\'t attend',
    Attended = 'Attended',
    WatchedReplay = 'Watched replay',
}

export enum EngagementsOption {
    DID_NOT_ENGAGED = 'Didn\'t engage',
    ENGAGED = 'Engaged',
}

export enum FollowUpOption {
    NO_CONDITION = 'No condition',
    STAYED_UNTIL = 'Stayed until'
}

export enum EngagementItemsOption {
    NO_CONDITION = 'No condition',
    POSTED = 'Posted reaction',
    CHATTED = 'Chatted',
    ANSWERED = 'Answered question',
    TOOK_POLL = 'Took poll',
}

export enum filterType {
    SESSION_OR_DATE = 'sessionOrDate',
    SESSION = 'session',
    DATE_RANGE = 'dateRange',
    ATTENDANCE = 'attendance',
    ENGAGEMENT_TYPE = 'engagementsType',
    ENGAGEMENT = 'engagements',
    FOLLOW_UP = 'followUp',
    STAYED_UNTIL = 'stayedUntil',
    START_DATE = 'startDate',
    END_DATE = 'endDate'
}

export enum analyticsSectionType {
    REGISTRATION_RATE = 'registrationRate',
    OPEN_RATE = 'openRate',
    ATTENDANCE = 'attendance',
    ENGAGEMENT = 'engagements',
}
