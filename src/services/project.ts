import { remove, query, put } from '@services/dynamo-connect';
import { environment } from '@config/environment';
import uuid from 'uuid';
import UserType, { User } from '../models/user.type';
import { Favorite } from '../models/favorites';
import { Project } from '../models/project';
import { CreateProjectInput, UpdateProjectInput } from '../models/project.type';
import { addToUserProjects } from './user';
import Metric from '../models/metric.type';

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

    const { Items, ...rest } = await query(params);
    return { items: Items, queryInfo: rest };
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

export const addMetrics = async (projectId: string, metrics: Metric[], user: UserType): Promise<Project> => {
  try {
    const {
      Items: [currentProject],
      ...rest
    } = await query({
      TableName: environment.TABLE_NAMES.Projects,
      ReturnConsumedCapacity: 'TOTAL',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': projectId
      },
      Limit: 1
    });
    if (currentProject.userId !== user.id) {
      throw 'You cannot update this project';
    }
    const currentMetrics = currentProject.metrics ? currentProject.metrics : [];
    const project = new Project({
      ...currentProject,
      metrics: [...currentMetrics, ...metrics]
    });
    await put({
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

export const updateProject = async (d: UpdateProjectInput, user: UserType): Promise<Project> => {
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

export const changeFavorites = async (mode: 'add' | 'remove', projectId: string, user: UserType): Promise<string[]> => {
  try {
    if (mode === 'add') {
      const { Items } = await query({
        TableName: environment.TABLE_NAMES.Favorites,
        ReturnConsumedCapacity: 'TOTAL',
        KeyConditionExpression: 'userId = :id AND projectId = :projectId',
        ExpressionAttributeValues: {
          ':id': user.id,
          ':projectId': projectId
        }
      });
      if (Items.length > 0) {
        return;
      }
      const now = new Date();
      const fav = new Favorite({ userId: user.id, projectId, updatedAt: now, createdAt: now });
      await put({
        TableName: environment.TABLE_NAMES.Favorites,
        ReturnConsumedCapacity: 'TOTAL',
        Item: fav.serialize()
      });
      return;
    } else {
      await remove({
        TableName: environment.TABLE_NAMES.Favorites,
        ReturnConsumedCapacity: 'TOTAL',
        Key: {
          userId: user.id,
          projectId: projectId
        },
        ReturnValues: 'NONE'
      });
      return;
    }
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};

export const getUserFavorites = async (userId: string): Promise<string[]> => {
  try {
    const { Items } = await query({
      TableName: environment.TABLE_NAMES.Favorites,
      ReturnConsumedCapacity: 'TOTAL',
      KeyConditionExpression: 'userId = :id',
      ExpressionAttributeValues: {
        ':id': userId
      }
    });
    return Items || [];
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};
// TODO: transaction this sequence of calls.
export const removeProject = async (projectId: string, user: UserType): Promise<undefined> => {
  try {
    // try to remove public projects, then try private projects if that fails (save write/read);
    const {
      Items: [currentProject]
    } = await query({
      TableName: environment.TABLE_NAMES.Projects,
      ReturnConsumedCapacity: 'TOTAL',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': projectId
      },
      Limit: 1
    });

    if (currentProject && currentProject.userId !== user.id) {
      throw 'You cannot remove this project';
    } else if (currentProject) {
      await remove({
        TableName: environment.TABLE_NAMES.Projects,
        ReturnConsumedCapacity: 'TOTAL',
        Key: { id: projectId, updatedAt: currentProject.updatedAt },
        ReturnValues: 'NONE'
      });
      return;
    }

    const {
      Items: [privateProject]
    } = await query({
      TableName: environment.TABLE_NAMES.ProjectsPrivate,
      ReturnConsumedCapacity: 'TOTAL',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': projectId
      },
      Limit: 1
    });
    if (privateProject && privateProject.userId !== user.id) {
      throw 'You cannot remove this project';
    } else if (privateProject) {
      await remove({
        TableName: environment.TABLE_NAMES.ProjectsPrivate,
        ReturnConsumedCapacity: 'TOTAL',
        Key: { id: projectId, updatedAt: privateProject.updatedAt },
        ReturnValues: 'NONE'
      });
      return;
    }

    await remove({
      TableName: environment.TABLE_NAMES.Favorites,
      ReturnConsumedCapacity: 'TOTAL',
      Key: {
        projectId: projectId
      },
      ReturnValues: 'NONE'
    });
    return;
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};
