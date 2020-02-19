import { IResolvers } from 'graphql-tools';
import * as metro from '@util/metrica';
import { getUserById } from '@services/user';
export const resolvers: IResolvers = {
  Query: {
    currentUser: async (root, args, context) => {
      const mid = metro.metricStart('user');
      try {
        const user = await getUserById(context.user.id);
        metro.metricStop(mid);
        return user;
      } catch (err) {
        metro.metricStop(mid);
        throw err.message;
      }
    }
  }
};
