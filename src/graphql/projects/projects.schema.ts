import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './projects.resolver';
import generics from '../generics.types';
export const projectSchema = makeExecutableSchema({
  typeDefs: [
    generics,
    `    
      type Query {
        projects(
          limit: Int, 
          exclusiveStartKey: JSON, 
          sortKey: String, 
          sortOrder: String,
          title: String,
          type: String
        ): ProjectResponse
      }

      type Mutation {
        addProject(project: CreateProjectInput): Project
        updateProject(project: UpdateProjectInput): Project
        changeFavorites(mode: String, projectId: String): Boolean
        removeProject(projectId: String): Boolean
        addMetrics(projectId: String, metrics: [MetricInput]): Project
      }
      
      type ProjectResponse {
        items: [Project]
        queryInfo: JSON
      }
    `
  ],
  resolvers: [resolvers]
});
