import AWS, { DynamoDB } from 'aws-sdk';
import { environment } from '@config/environment';

AWS.config.update({ ...environment.dynamoDb });

export const docClient = new AWS.DynamoDB.DocumentClient();
export const dynamoDb = new AWS.DynamoDB();

export const query = (params: DynamoDB.QueryInput): Promise<DynamoDB.QueryOutput> => {
  return new Promise((resolve: Function, reject: Function) => {
    docClient.query(params, (err: AWS.AWSError, data: DynamoDB.QueryOutput) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

export const scan = (params: DynamoDB.ScanInput): Promise<DynamoDB.ScanOutput> => {
  return new Promise((resolve: Function, reject: Function) => {
    docClient.scan(params, (err: AWS.AWSError, data: DynamoDB.ScanOutput) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

export const put = (params: DynamoDB.PutItemInput): Promise<DynamoDB.PutItemOutput> => {
  return new Promise((resolve: Function, reject: Function) => {
    docClient.put(params, (err: AWS.AWSError, data: DynamoDB.PutItemOutput) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

export const get = (params: DynamoDB.GetItemInput): Promise<DynamoDB.GetItemOutput> => {
  return new Promise((resolve: Function, reject: Function) => {
    docClient.get(params, (err: AWS.AWSError, data: DynamoDB.GetItemOutput) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

export const getAll = (params: DynamoDB.BatchGetItemInput): Promise<DynamoDB.BatchGetItemOutput> => {
  return new Promise((resolve: Function, reject: Function) => {
    docClient.batchGet(params, (err: AWS.AWSError, data: DynamoDB.BatchGetItemOutput) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};
