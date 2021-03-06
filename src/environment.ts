// ****************** Define Environment here ******************//
const CURRENT_ENVIRONMENT = 'develop';
// const CURRENT_ENVIRONMENT = "staging"
// const CURRENT_ENVIRONMENT = "production"

const defaultEnv = {
  isDevelopment: true,
  API_PATH: 'https://0n189cw3a8.execute-api.us-east-1.amazonaws.com/dev',
};

const ENV = {
  dev: {
    ...defaultEnv,
    API_PATH: 'https://0n189cw3a8.execute-api.us-east-1.amazonaws.com/dev',
  },
  staging: {
    ...defaultEnv,
    API_PATH: 'https://wskqtfi23h.execute-api.us-east-1.amazonaws.com/local',
  },
  prod: {
    ...defaultEnv,
    isDevelopment: false,
    API_PATH: 'https://wskqtfi23h.execute-api.us-east-1.amazonaws.com/local',
  },
};

const getEnvVars = (env = CURRENT_ENVIRONMENT) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__ || env === 'develop') {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'production') {
    return ENV.prod;
  } else {
    throw Error('Environment not specified');
  }
};

export default getEnvVars;
