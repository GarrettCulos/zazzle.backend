/**
 * Typescript Type and this type are intentionally different
 * This file has differences
 *  - userId
 */
const alwaysOptionalProjectProperties = `
    coverImages: [String]
    tags: [String]
    collaborators: [User]
    location: String
    posts: [Post]
    event: String
    metricTemplates: [MetricTemplate]
`;

export default `
    input CreateProjectInput {
        user: User!
        projectType: String!
        title: String!
        description: String!
        startDate: Date!
        endDate: Date!
        ${alwaysOptionalProjectProperties}
    }
    
    input UpdateProjectInput {
        id: String
        followCount: Int
        projectType: String
        title: String
        description: String
        metrics: [Metric]
        startDate: Date
        endDate: Date
        ${alwaysOptionalProjectProperties}
    }

    type Project {
        id: String
        user: User!
        likedBy: [User]
        followCount: Int        
        projectType: String!
        title: String!
        description: String!
        startDate: Date
        endDate: Date
        createdAt: Date
        updatedAt: Date

        metrics: [Metric]
        ${alwaysOptionalProjectProperties}
    }
`;
