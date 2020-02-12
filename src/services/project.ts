import { scan, query } from '@services/dynamo-connect';

interface GetProjectsInterface {
  limit: number;
  exclusiveStartKey?: any;
  title: string;
  type: string;
  sortOrder: 'asc' | 'desc';
  sortKey: 'updatedAt' | 'startDate';
}
export const getProjects = async (d: GetProjectsInterface): Promise<{ items: any[]; queryInfo: any }> => {
  try {
    const params: any = {
      TableName: 'Projects',
      Limit: d.limit,
      ReturnConsumedCapacity: 'TOTAL'
    };

    // Handle pagination start key
    if (d.exclusiveStartKey) {
      params.ExclusiveStartKey = d.exclusiveStartKey;
    }

    // if sortKey is startDate use the startDate index
    if (d.sortKey === 'startDate') {
      params.IndexName = 'StartDateIndex';
    }

    // if sort order is 'desc' reverse ScanIndexForward
    if (d.sortOrder === 'desc') {
      params.ScanIndexForward = false;
    }

    // title query overrides startDate sort
    if (d.title) {
      params.IndexName = 'TitleIndex';
      params.FilterExpression = 'begins_with(title, :titleFragment)';
      params.ExpressionAttributeValues = { ':titleFragment': d.title };
    }

    // If search for title, use query
    if (d.type) {
      params.IndexName = 'ProjectTypeIndex';
      params.KeyConditionExpression = 'projectType = :projectType';
      params.ExpressionAttributeValues = { ':projectType': d.type };
      const { Items, ...rest } = await query(params);
      return { items: Items, queryInfo: rest };
    } else {
      // If no search params/projectFilters use scan
      const { Items, ...rest } = await scan(params);
      return { items: Items, queryInfo: rest };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
