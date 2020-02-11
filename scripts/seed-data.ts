import uuid from 'uuid';
import { SeedProject } from '../src/models/project';

const seedCount = 100;

export const seedFunction = (docClient: AWS.DynamoDB.DocumentClient, tableName: string) => {
  for (let i = 0; i <= seedCount; i++) {
    let params;
    switch (tableName) {
      case 'Projects': {
        const proj = SeedProject();
        params = {
          Item: JSON.parse(JSON.stringify(proj)),
          ReturnConsumedCapacity: 'TOTAL',
          TableName: 'Projects'
        };
        break;
      }
      case 'Users': {
        params = {
          Item: {
            id: uuid(),
            userName: uuid(),
            updatedAt: new Date().toISOString(),
            metadata: {
              email: uuid(),
              name: uuid(),
              firstName: uuid(),
              lastName: uuid(),
              avatar: uuid(),
              likedListIds: [uuid(), uuid()]
            }
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
