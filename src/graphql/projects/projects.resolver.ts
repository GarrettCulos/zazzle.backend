import { IResolvers } from 'graphql-tools';
import { getProjects, addProject, updateProject } from '@services/project';
import * as metro from '@util/metrica';

const VALID_SORT_KEY = ['updatedAt', 'startDate'];
const VALID_SORT_ORDER = ['asc', 'desc'];
export const resolvers: IResolvers = {
  Query: {
    projects: async (root, args, context) => {
      const mid = metro.metricStart('projects query');
      const { limit = 25, exclusiveStartKey, title, type, sortKey = 'updatedAt', sortOrder = 'asc' } = args;
      const projectQueryParams: { [s: string]: any } = { limit, title, type, sortKey, sortOrder };
      if (exclusiveStartKey) {
        projectQueryParams.exclusiveStartKey = exclusiveStartKey;
      }
      if (!VALID_SORT_KEY.includes(sortKey)) {
        throw `Invalid Sort Key. Expected one of ${VALID_SORT_KEY.join(' | ')} `;
      }
      if (!VALID_SORT_ORDER.includes(sortOrder)) {
        throw `Invalid Sort Order. Expected one of ${VALID_SORT_ORDER.join(' | ')} `;
      }
      const projects = await getProjects(projectQueryParams);
      metro.metricStop(mid);
      return projects;
    }
  },
  Mutation: {
    addProject: async (root, args, context) => {
      const mid = metro.metricStart('add project');
      const { project } = args;
      const { user } = context;
      if (!user) {
        throw 'Unauthorized Action';
      }
      const projects = await addProject({ ...project, user: { id: 'asd', userName: 'garrett', userIcon: 'na' } });
      metro.metricStop(mid);
      return projects;
    },
    updateProject: async (root, args, context) => {
      const mid = metro.metricStart('update project');
      const { project } = args;
      const { user } = context;
      if (!user) {
        throw 'Unauthorized Action';
      }
      const projects = await updateProject(project, user);
      metro.metricStop(mid);
      return projects;
    }
  }
};
