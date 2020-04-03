import Constants from 'expo-constants';
import {
  CLARIFAI_KEY,
  DEVELOPMENT_URL,
  PRODUCTION_URL,
} from 'react-native-dotenv';

export const apiKey = CLARIFAI_KEY;

const ENV = {
  dev: {
    apiUrl: DEVELOPMENT_URL,
    apiKey: apiKey,
  },

  prod: {
    apiUrl: PRODUCTION_URL,
    apiKey: apiKey,
  },
};

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return ENV.dev;
  if (env.indexOf('dev') !== -1) return ENV.dev;
  if (env.indexOf('prod') !== -1) return ENV.prod;
}

const env = getEnvVars(Constants.manifest.releaseChannel);
export default env;
