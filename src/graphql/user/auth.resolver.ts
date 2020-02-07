import { IResolvers } from 'graphql-tools';

import * as metro from '@util/metrica';
import { verifyGoogleToken } from '@services/google.service';
import { verifyFacebookToken } from '@services/facebook.service';
import { jwtSign } from '@services/jwt';
import { EXPIRES_IN } from '@global/constants';
export const resolvers: IResolvers = {
  Mutation: {
    exchangeGoogle: async (root, args, context) => {
      const mid = metro.metricStart('exchange-google');
      try {
        const { idToken, email } = args.auth;
        const response: any = {
          token: undefined,
          expiresIn: EXPIRES_IN
        };
        await verifyGoogleToken(idToken);
        response.user = { emailAddress: email };
        response.token = jwtSign({ data: response.user, expiresIn: EXPIRES_IN });
        metro.metricStop(mid);
        return response;
      } catch (err) {
        metro.metricStop(mid);
        console.log(err);
        throw new Error(err);
      }
    },
    exchangeFacebook: async (root, args, context) => {
      const mid = metro.metricStart('exchange-facebook');
      try {
        const { idToken, email } = args.auth;
        const response: any = {
          token: undefined,
          expiresIn: EXPIRES_IN
        };
        await verifyFacebookToken(idToken);
        response.user = { emailAddress: email };
        response.token = jwtSign({ data: response.user, expiresIn: EXPIRES_IN });
        metro.metricStop(mid);
        return response;
      } catch (err) {
        metro.metricStop(mid);
        throw new Error(err);
      }
    }
  }
};
