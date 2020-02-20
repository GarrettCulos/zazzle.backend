import { scan, query, put } from '@services/dynamo-connect';
import { environment } from '@config/environment';
import uuid from 'uuid';
import User from '../models/user.type';
import { Project } from '../models/project';
import { CreateProjectInput, UpdateProjectInput } from '../models/project.type';
import { addToUserProjects } from './user';

interface GetProjectsInterface {
  limit: number;
  exclusiveStartKey?: any;
  title: string;
  type: string;
  sortOrder: 'asc' | 'desc';
  sortKey: 'updatedAt' | 'startDate' | 'endDate';
}
export const getProjects = async (d: GetProjectsInterface): Promise<{ items: any[]; queryInfo: any }> => {
  try {
    const baseParams: any = {
      TableName: environment.TABLE_NAMES.Projects,
      Limit: d.limit,
      ReturnConsumedCapacity: 'TOTAL'
    };
    const params = { ...baseParams };
    // indexes for updatedAt, projectType, startDate, endDate => projectIds.
    params.IndexName = 'UpdatedAtIndex';

    // Handle pagination start key
    if (d.exclusiveStartKey) {
      params.ExclusiveStartKey = d.exclusiveStartKey;
    }

    // if sortKey is startDate use the startDate index
    if (d.sortKey === 'startDate') {
      params.IndexName = 'StartDateIndex';
    }
    if (d.sortKey === 'endDate') {
      params.IndexName = 'EndDateIndex';
    }
    if (d.sortKey === 'updatedAt') {
      params.IndexName = 'UpdatedAtIndex';
    }

    // if sort order is 'desc' reverse ScanIndexForward
    if (d.sortOrder === 'desc') {
      params.ScanIndexForward = false;
    }

    // title query overrides startDate sort
    // if (d.title) {
    //   params.IndexName = 'TitleIndex';
    //   params.FilterExpression = 'begins_with(title, :titleFragment)';
    //   params.ExpressionAttributeValues = { ':titleFragment': d.title };
    // }
    params.KeyConditionExpression = 'emptyString = :empty';
    params.ExpressionAttributeValues = { ':empty': '__' };

    console.log(params);
    const { Items, ...rest } = await query(params);
    return { items: Items, queryInfo: rest };
  } catch (err) {
    throw err.message;
  }
};

export const addProject = async (d: CreateProjectInput): Promise<Project> => {
  try {
    const projectId = uuid();
    const now = new Date();
    const project = new Project({
      ...d,
      id: projectId,
      createdAt: now,
      updatedAt: now
    });
    const data = await put({
      TableName: d.private ? environment.TABLE_NAMES.ProjectsPrivate : environment.TABLE_NAMES.Projects,
      ReturnConsumedCapacity: 'TOTAL',
      Item: project.serialize()
    });
    await addToUserProjects(project.userId, projectId);
    return project;
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};

export const updateProject = async (d: UpdateProjectInput, user: User): Promise<Project> => {
  try {
    const {
      Items: [currentProject],
      ...rest
    } = await query({
      TableName: environment.TABLE_NAMES.Projects,
      ReturnConsumedCapacity: 'TOTAL',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': d.id
      },
      Limit: 1
    });
    if (currentProject.userId !== user.id) {
      throw 'You cannot update this project';
    }
    const project = new Project({
      id: d.id,
      ...currentProject,
      ...d
    });
    const data = await put({
      TableName: environment.TABLE_NAMES.Projects,
      ReturnConsumedCapacity: 'TOTAL',
      Item: project.serialize()
    });
    return project;
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};
