import { Environment } from './environment';
export const environment: Environment = {
  env: 'production',
  SESSION_SECRET: process.env.SESSION_SECRET,
  GOOGLE_CLIENT_ID: '961748212630-3ej9mg3fonisp675fn1ehlkr24o1je2c.apps.googleusercontent.com',
  FACEBOOK_CLIENT_ID: '533032377556576',
  dynamoDb: {
    region: process.env.AWS_DEFAULT_REGION,
    endpoint: `https://DYNAMODB.${process.env.AWS_DEFAULT_REGION}.amazonaws.com`
  },
  TABLE_NAMES: {
    ProjectsPrivate: 'ProjectsPrivate_0_0_2', //process.env.PRIVATE_PROJECT_TABLE,
    Projects: 'Projects_0_0_2', //process.env.PROJECT_TABLE,
    Users: 'Users_0_0_3' //process.env.USER_TABLE
  }
};
