import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './projects.resolver';
import generics from '../generics.types';
export const projectSchema = makeExecutableSchema({
  typeDefs: [
    generics,
    `    
      type Query {
        projects: [String]
      }
    `
  ],
  resolvers
});
