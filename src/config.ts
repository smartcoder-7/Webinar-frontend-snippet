// import dotenv from 'dotenv'
// dotenv.config()

export const apiUrl = process.env.GATSBY_API_SERVER_URL || 'http://portal.local:3000';

const config = {
  GRAPHQL_SERVER_URL: process.env.GATSBY_GRAPHQL_SERVER_URL || `${apiUrl}/graphql`,
  CHAT_SERVER_URL:
    process.env.GATSBY_CHAT_SERVER_URL ||
    `wss://ey3fagru4c.execute-api.us-east-1.amazonaws.com/dev`,
  STRIPE_PK: process.env.GATSBY_STRIPE_PK || 'pk_test_aUd095syA4U993QU9fb0vpnN00iAH21586',

  VIMEO_BASE_URL: process.env.GATSBY_VIMEO_BASE_URL || 'https://api.vimeo.com',

  DEFAULT_PRIMARY_COLOR: '#39A1B2',
  DEFAULT_HIGHLIGHT_COLOR: '#FF7470',

  DOMAIN:
    process.env.NODE_ENV === 'production'
      ? 'ewebinar.com'
      : process.env.NODE_ENV === 'staging'
      ? 'staging.ewebinar.com'
      : process.env.DOMAIN_LOCAL
      ? process.env.DOMAIN_LOCAL
      : 'dev.ewebinar.com',
  ENABLE_PAGE_SECTIONS: false,
  SEEN_CONVERSATION_TIMEOUT: 10000, //miliseconds
  TIME_TO_SEEK: 30, //seconds
  WELCOME_MESSAGE_TO_SHOW_AFTER_SECS: 30, // seconds - keep this in sync with backend

  UPLOAD_PROGRESS_MAX: process.env.GATSBY_UPLOAD_PROGRESS_MAX
    ? parseInt(process.env.GATSBY_UPLOAD_PROGRESS_MAX, 10)
    : 50, // Keep these synced between worker, frontend and backend
};

export default config;
