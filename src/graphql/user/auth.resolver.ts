import { IResolvers } from 'graphql-tools';
import uuid from 'uuid';

import * as metro from '../../util/metrica';
// import { verifyGoogleToken } from '../../src/services/google.service';
// import { getUserByEmail, createUser } from '../../src/services/user.gql.service';
// import { jwtSign } from '../../src/services/auth.gql.service';
import { EXPIRES_IN } from '../../../global/constants';
export const resolvers: IResolvers = {
  // Mutation: {
  //   exchangeGoogle: async (root, args, context) => {
  //     const mid = metro.metricStart('exchange-google');
  //     try {
  //       const { idToken, email } = args.googleAuth;
  //       const response: any = {
  //         token: undefined,
  //         expiresIn: EXPIRES_IN
  //       };
  //       // const tokenCheckQ = verifyGoogleToken(idToken);
  //       // const userDataQ = getUserByEmail({ emailAddress: email });
  //       // const [tokenCheck, userData] = await Promise.all([tokenCheckQ, userDataQ]);
  //       // if (userData.error) {
  //       //   const newUser = await createUser({
  //       //     password: uuid.v4(),
  //       //     email_address: email,
  //       //     user_name: `human-${uuid.v4()}`,
  //       //     first_name: tokenCheck.payload.family_name,
  //       //     last_name: tokenCheck.payload.givenName,
  //       //     is_active: true,
  //       //     provider: 'GOOGLE'
  //       //   });
  //       //   delete newUser.password;
  //       //   response.token = jwtSign({ data: newUser, expiresIn: EXPIRES_IN });
  //       //   response.user = newUser;
  //       // } else {
  //       //   delete userData.password;
  //       //   response.token = jwtSign({ data: userData, expiresIn: EXPIRES_IN });
  //       //   response.user = userData;
  //       // }
  //       metro.metricStop(mid);
  //       return {};
  //     } catch (err) {
  //       metro.metricStop(mid);
  //       throw new Error(err);
  //     }
  //   }
  // }
};
