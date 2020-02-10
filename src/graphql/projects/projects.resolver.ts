import { IResolvers } from 'graphql-tools';
import { getProjects } from '@services/project';
import * as metro from '@util/metrica';
export const resolvers: IResolvers = {
  Query: {
    projects: async (root, args, context) => {
      const mid = metro.metricStart('cardNames');
      const projects = await getProjects({ limit: 10 });
      metro.metricStop(mid);
      return projects;
    }
  }
};
