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
        const proj2 = JSON.parse(JSON.stringify(proj));
        proj2.startDate = proj.startDate.getTime();
        proj2.endDate = proj.endDate.getTime();
        proj2.createdAt = proj.createdAt.getTime();
        proj2.updatedAt = proj.updatedAt.getTime();
        params = {
          Item: proj2,
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
