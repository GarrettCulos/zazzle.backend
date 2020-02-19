import uuid from 'uuid';
import { SeedProject } from '../src/models/project';
import { User } from '../src/models/user.type';

import { environment } from '../src/config/environment';

export const seedFunction = (docClient: AWS.DynamoDB.DocumentClient, tableName: string) => {
  let seedCount;
  switch (tableName) {
    case environment.TABLE_NAMES.Projects: {
      seedCount = 10;
      break;
    }
    default:
      seedCount = 4;
  }
  for (let i = 0; i <= seedCount; i++) {
    let params;
    switch (tableName) {
      case environment.TABLE_NAMES.ProjectsPrivate:
      case environment.TABLE_NAMES.Projects: {
        const proj = SeedProject();
        params = {
          Item: proj.serialize(),
          ReturnConsumedCapacity: 'TOTAL',
          TableName: tableName
        };
        break;
      }
      case environment.TABLE_NAMES.Users: {
        params = {
          Item: new User({
            id: uuid(),
            userName: uuid(),
            userIcon: uuid(),
            updatedAt: new Date(),
            createdAt: new Date()
          }).serialize(),
          ReturnConsumedCapacity: 'TOTAL',
          TableName: tableName
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
