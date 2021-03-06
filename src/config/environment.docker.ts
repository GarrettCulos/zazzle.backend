import AWS from 'aws-sdk';
import { Environment } from './environment';
export const environment: Environment = {
  env: 'development',
  SESSION_SECRET: 'again_super_secret',
  FACEBOOK_CLIENT_ID: '1048745462190816',
  GOOGLE_CLIENT_ID: '961748212630-1ejc8smms57kn77f8helruvkds9k1s8e.apps.googleusercontent.com',
  dynamoDb: {
    region: 'us-west-2',
    endpoint: `http://dynamodb:8000`,
    credentials: new AWS.Credentials('key', 'secret')
  },
  TABLE_NAMES: {
    ProjectsPrivate: 'ProjectsPrivate_0_0_2',
    Projects: 'Projects_0_0_2',
    Users: 'Users_0_0_3',
    Favorites: 'Favorites_0_0_1'
  }
};
