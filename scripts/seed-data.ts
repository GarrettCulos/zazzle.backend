import uuid from 'uuid';
import { SeedProject } from '../src/models/project';

const seedCount = 100;

export const seedFunction = (docClient: AWS.DynamoDB.DocumentClient, tableName: string) => {
  for (let i = 0; i <= seedCount; i++) {
    let params;
    switch (tableName) {
      case 'PrivateProjects':
      case 'Projects': {
        const proj = SeedProject();
        params = {
          Item: proj.serialize(),
          ReturnConsumedCapacity: 'TOTAL',
          TableName: tableName
        };
        break;
      }
      case 'Users': {
        params = {
          Item: {
            id: uuid(),
            userName: uuid(),
            userIcon: uuid(),
            updatedAt: new Date().getTime(),
            createdAt: new Date().getTime()
          },
          ReturnConsumedCapacity: 'TOTAL',
          TableName: 'Users'
        };
        break;
      }
      default:
        return;
    }
    docClient.put(params, (err, data) => {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data); // successful response
      }
    });
  }
};
