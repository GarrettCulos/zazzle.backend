import { IResolvers } from 'graphql-tools';
import { getProjects } from '@services/project';
import * as metro from '@util/metrica';
export const resolvers: IResolvers = {
  Query: {
    projects: async (root, args, context) => {
      const mid = metro.metricStart('projects query');
      const projectQueryParams: { [s: string]: any } = { limit: args.limit || 25 };
      if (args.exclusiveStartKey) {
        projectQueryParams.exclusiveStartKey = args.exclusiveStartKey;
      }
      const projects = await getProjects(projectQueryParams);
      metro.metricStop(mid);
      return projects;
    }
  }
};
