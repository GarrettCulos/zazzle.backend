import { IResolvers } from 'graphql-tools';
// import {
//   getUserById,
//   getUserByEmail,
//   updateUser,
//   updateUserLimit,
//   getUsers,
//   createUser,
//   getUserByUserName
// } from '../../src/services/user.gql.service';
import * as metro from '../../util/metrica';
import { DISALLOWED_PASSWORDS, EXPIRES_IN } from '../../../global/constants';
// import { hashPassword, jwtSign, authCheckPasswords } from '../../src/services/auth.gql.service';
import { awaitError } from '../../util';

export const resolvers: IResolvers = {
  Query: {
    // user: async (root, args, context) => {
    //   const mid = metro.metricStart('user');
    //   // const user = await getUserById({ userId: args.id });
    //   metro.metricStop(mid);
    //   return {};
    // },
    currentUser: async (root, args, context) => {
      const mid = metro.metricStart('user');
      // const userId = context.user && context.user.id;
      // if (!userId) {
      //   'userId not defined';
      // }

      // const user = await getUserById({ userId });
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
  // Mutation: {
  //   login: async (root, args, context) => {
  //     const mid = metro.metricStart('user-login');
  //     // try {
  //     //   const {
  //     //     user: { userName, password }
  //     //   } = args;
  //     //   const userData = await awaitError(getUserByUserName({ userName }));
  //     //   if (userData.error) {
  //     //     throw new Error('User does not exist');
  //     //   }

  //     //   const comparePassword = authCheckPasswords(password, userData.password);
  //     //   if (!comparePassword) {
  //     //     throw new Error('Password Invalid');
  //     //   }
  //     //   delete userData.password;
  //     //   const token = jwtSign({ data: userData, expiresIn: EXPIRES_IN });
  //     //   metro.metricStop(mid);
  //     //   return {
  //     //     token,
  //     //     expiresIn: EXPIRES_IN,
  //     //     user: userData
  //     //   };
  //     // } catch (err) {
  //     //   throw err;
  //     // }
  //     return {
  //       token: 'token',
  //       expiresIn: EXPIRES_IN,
  //       user: {}
  //     };
  //   },
  //   updateUser: async (root, args, context) => {
  //     const mid = metro.metricStart('user-update');
  //     // try {
  //     //   const { userId, user } = args;
  //     //   const errors = [];

  //     //   // check email is unique
  //     //   if (user.email_address) {
  //     //     const userExists1 = await awaitError(getUserByEmail({ emailAddress: user.email_address }));
  //     //     if (userExists1 && !userExists1.error) {
  //     //       errors.push({ message: 'This email address is already registered to a user.', type: 'email' });
  //     //       throw errors;
  //     //     }
  //     //   }

  //     //   if (user.user_name) {
  //     //     // check username is unique
  //     //     const userExists2 = await awaitError(getUserByUserName({ userName: user.user_name }));
  //     //     if (userExists2 && !userExists2.error) {
  //     //       errors.push({ message: 'This username already exists.', type: 'user_name' });
  //     //       throw errors;
  //     //     }
  //     //   }

  //     //   const updatedUserData = 'asd'; //await updateUser(user);
  //     //   // delete updatedUserData.password;
  //     //   metro.metricStop(mid);
  //     //   return updatedUserData;
  //     // } catch (err) {
  //     //   metro.metricStop(mid);
  //     //   throw err;
  //     // }
  //     return {};
  //   },
  //   createUser: async (root, args, context) => {
  //     //   const mid = metro.metricStart('user-create');
  //     //   try {
  //     //     const { user } = args;
  //     //     const errors = [];
  //     //     if (DISALLOWED_PASSWORDS.indexOf(user.password) != -1 || user.password.length <= 5) {
  //     //       errors.push({ message: "The password you've selected is to simple.", type: 'password' });
  //     //       throw errors;
  //     //     }

  //     //     if (user.password !== user.passwordConfirm) {
  //     //       errors.push({ message: 'Password and confirmation password are not the same.', type: 'password' });
  //     //       throw errors;
  //     //     }

  //     //     if (!user.password) {
  //     //       errors.push({ message: 'Password field must be set.', type: 'password' });
  //     //       throw errors;
  //     //     }

  //     //     if (!user.user_name) {
  //     //       errors.push({ message: 'User name must be provided.', type: 'user_name' });
  //     //       throw errors;
  //     //     }

  //     //     // Hash user's password and replace with given one
  //     //     user.password = hashPassword(user.password);
  //     //     user.provider = 'MTGNORTH';
  //     //     user.is_active = 1;
  //     //     const date = new Date();
  //     //     user.created_at = date;
  //     //     user.updated_at = date;

  //     //     // check email is unique
  //     //     const userExists1 = await awaitError(getUserByEmail({ emailAddress: user.email_address }));
  //     //     if (userExists1 && !userExists1.error) {
  //     //       errors.push({ message: 'This email address is already registered to a user.', type: 'email' });
  //     //       throw errors;
  //     //     }

  //     //     // check username is unique
  //     //     const userExists2 = await awaitError(getUserByUserName({ userName: user.user_name }));
  //     //     if (userExists2 && !userExists2.error) {
  //     //       errors.push({ message: 'This username already exists.', type: 'user_name' });
  //     //       throw errors;
  //     //     }
  //     //     // Add user to database
  //     //     delete user.passwordConfirm;
  //     //     const newUserData = await createUser(user);
  //     //     delete newUserData.password;
  //     //     const token = jwtSign({ data: newUserData, expiresIn: EXPIRES_IN });
  //     //     metro.metricStop(mid);
  //     //     return {
  //     //       token,
  //     //       expiresIn: EXPIRES_IN,
  //     //       user: newUserData
  //     //     };
  //     //   } catch (err) {
  //     //     console.log(err);
  //     //     metro.metricStop(mid);
  //     //     throw err;
  //     //   }
  //     return {};
  //   }
  // }
};
