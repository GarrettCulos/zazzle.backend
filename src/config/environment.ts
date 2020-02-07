interface DynamoDb {
  region: string;
  endpoint: string;
}

export interface Environment {
  env: string;
  SESSION_SECRET: string;
  FACEBOOK_CLIENT_ID: string;
  GOOGLE_CLIENT_ID: string;

  dynamoDb: DynamoDb;
}
export const environment: Environment = {
  env: 'DEV',
  SESSION_SECRET: 'SUPER SECRET',
  FACEBOOK_CLIENT_ID: '1048745462190816',
  GOOGLE_CLIENT_ID: '961748212630-1ejc8smms57kn77f8helruvkds9k1s8e.apps.googleusercontent.com',
  dynamoDb: {
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
  }
};
