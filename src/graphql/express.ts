import { ApolloServer } from 'apollo-server';

import { schema } from './schemas';
import { decodeJwtToken } from '@services/jwt';
const ADMIN_ROLES = { SUPER_ADMIN: 'super-admin' };

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    let token = req.headers['x-access-token'] || '';
    token = Array.isArray(token) ? token[0] : token;
    const user = await decodeJwtToken(token);
    const isAdmin = user && user.roles && user.roles.some((role: any) => role.name === ADMIN_ROLES.SUPER_ADMIN);
    return { user, isAdmin };
  },
  formatError: err => {
    console.log(err);
    return err;
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
