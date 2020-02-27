import { IResolvers } from 'graphql-tools';
import * as metro from '@util/metrica';
import { getUserById } from '@services/user';
import { getUserFavorites, getUserProjects, getPrivateProjects } from '@services/project';
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
        const getUserProjectsQ = getUserProjects(context.user.id);
        const getPrivateProjectsQ = getPrivateProjects(context.user.id);
        const [user, favorites, proj, privateProj] = await Promise.all([
          userQ,
          favoritesQ,
          getUserProjectsQ,
          getPrivateProjectsQ
        ]);
        user.favorites = favorites;
        user.myProjects = [...proj, ...privateProj];
        metro.metricStop(mid);
        return user;
      } catch (err) {
        metro.metricStop(mid);
        throw err.message;
      }
    }
  }
};
