import { IResolvers } from 'graphql-tools';
import * as metro from '@util/metrica';
import { getUserById, getUserFavorites } from '@services/user';
export const resolvers: IResolvers = {
  Query: {
    currentUser: async (root, args, context) => {
      const mid = metro.metricStart('user');
      try {
        if (!context.user) {
          throw 'You must login first';
        }
        const userQ = getUserById(context.user.id);
        const favoritesQ = getUserFavorites(context.user.id);
        const [user, favorites] = await Promise.all([userQ, favoritesQ]);
        user.project = favorites;
        metro.metricStop(mid);
        return user;
      } catch (err) {
        metro.metricStop(mid);
        throw err.message;
      }
    }
  }
};
