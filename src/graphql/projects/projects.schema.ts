import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './projects.resolver';
import generics from '../generics.types';
export const projectSchema = makeExecutableSchema({
  typeDefs: [
    generics,
    `    
      type Query {
        projects(limit: Int, exclusiveStartKey: JSON ): ProjectResponse
      }

      type ProjectResponse {
        items: [Project]
        queryInfo: JSON
      }

      type Project {
        search: String
        metadata: ProjectMetadata
        id: String
        updatedAt: String
      }

      type ProjectMetadata {
        peoples: [String]
        data: JSON
        testing: String
      }
    `
  ],
  resolvers: [resolvers]
});
