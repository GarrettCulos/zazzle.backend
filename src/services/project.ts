import { scan, query, put } from '@services/dynamo-connect';
import { environment } from '@config/environment';
import uuid from 'uuid';
import User from '../models/user.type';
import { Project } from '../models/project';
import { CreateProjectInput, UpdateProjectInput } from '../models/project.type';

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
      TableName: environment.TABLE_NAMES.Projects,
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
