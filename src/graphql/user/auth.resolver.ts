import { IResolvers } from 'graphql-tools';

import * as metro from '@util/metrica';
import { verifyGoogleToken } from '@services/google.service';
import { verifyFacebookToken } from '@services/facebook.service';
import { jwtSign } from '@services/jwt';
import { getUserByEmail, addUser } from '@services/user';
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
        const googleData = await verifyGoogleToken(idToken);

        if (!googleData.payload.email_verified) {
          throw 'email not verified';
        }
        // get user data for email.
        let user = await getUserByEmail(email);
        // if its not in the db, add data to user table
        if (!user) {
          user = await addUser({
            email,
            userName: googleData.payload.name,
            userIcon: googleData.payload.picture
          });
        }
        response.user = user;
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
        const fbData = await verifyFacebookToken(idToken);
        // get user data for email.
        let user = await getUserByEmail(email);
        // if its not in the db, add data to user table
        if (!user) {
          user = await addUser({
            email,
            userName: fbData.name,
            userIcon: fbData.picture.data.url
          });
        }
        response.user = user;
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
