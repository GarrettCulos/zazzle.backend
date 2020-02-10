import { scan, query } from '@services/dynamo-connect';

interface GetProjectsInterface {
  limit: number;
  exclusiveStartKey?: any;
}
export const getProjects = async (d: GetProjectsInterface): Promise<{ items: any[]; queryInfo: any }> => {
  try {
    const params: any = {
      TableName: 'Projects',
      Limit: d.limit
    };
    if (d.exclusiveStartKey) {
      params.ExclusiveStartKey = d.exclusiveStartKey;
    }
    const { Items, ...rest } = await scan(params);
    return { items: Items, queryInfo: rest };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
