import { mergeSchemas } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';

import { heaterSchema } from '../heater/heater.schema';
import { userSchema } from '../user/user.schema';
import { projectSchema } from '../projects/projects.schema';
import { dateResolvers } from '../directives/date';

const JSONResolver = {
  JSON: GraphQLJSON
};
export const schema = mergeSchemas({
  schemas: [userSchema, projectSchema, heaterSchema],
  resolvers: [dateResolvers, JSONResolver]
});
