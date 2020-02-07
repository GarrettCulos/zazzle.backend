import AWS from 'aws-sdk';
import { environment } from '@config/environment';

const awsConfig: any = {
  region: environment.dynamoDb.region,
  endpoint: environment.dynamoDb.endpoint
};

AWS.config.update(awsConfig);

export const getProjects = async (): Promise<string[]> => {
  return new Promise((resolve: Function) => {
    resolve(['project 1']);
  });
};
