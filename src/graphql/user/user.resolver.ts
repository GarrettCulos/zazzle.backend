import { IResolvers } from 'graphql-tools';
import * as metro from '../../util/metrica';

export const resolvers: IResolvers = {
  Query: {
    currentUser: async (root, args, context) => {
      const mid = metro.metricStart('user');
      metro.metricStop(mid);
      return {
        id: 1,
        firstName: 'g',
        lastName: 'string',
        userName: 'string',
        password: 'string',
        isActive: 1,
        emailAddress: 'string',
        provider: 'string',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  }
};
