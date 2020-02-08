import { Environment } from './environment';
export const environment: Environment = {
  env: 'PROD',
  SESSION_SECRET: process.env.SESSION_SECRET,
  GOOGLE_CLIENT_ID: '961748212630-3ej9mg3fonisp675fn1ehlkr24o1je2c.apps.googleusercontent.com',
  FACEBOOK_CLIENT_ID: '533032377556576',
  dynamoDb: {
    region: process.env.AWS_DEFAULT_REGION,
    endpoint: 'https://zazzle-api.yetilabs.ca/gql'
  }
};
