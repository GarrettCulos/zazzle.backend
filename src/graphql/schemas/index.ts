import { mergeSchemas } from 'graphql-tools';
import { heaterSchema } from '../heater/heater.schema';
import { userSchema } from '../user/user.schema';
import { projectSchema } from '../projects/projects.schema';
import { dateResolvers } from '../directives/date';

export const schema = mergeSchemas({
  schemas: [userSchema, projectSchema, heaterSchema],
  resolvers: [dateResolvers]
  // schemaDirectives: {
  //   getTime: GetTime
  // }
});
