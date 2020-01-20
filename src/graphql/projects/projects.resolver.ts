import { IResolvers } from 'graphql-tools';
import { getProjects } from '@services/project';
import * as metro from '@util/metrica';
export const resolvers: IResolvers = {
  Query: {
    projects: async (root, args, context) => {
      const mid = metro.metricStart('cardNames');
      const cards = await getProjects();
      metro.metricStop(mid);
      return cards;
    }
  }
};
