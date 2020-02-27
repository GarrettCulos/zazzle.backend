/**
 * Typescript Type and this type are intentionally different
 * This file has differences
 *  - userId
 */
const alwaysOptionalProjectProperties = (isInput = false) => `
    coverImages: [String]
    tags: [String]
    collaborators: [User${isInput ? 'Input' : ''}]
    location: String
    posts: [Post${isInput ? 'Input' : ''}]
    event: String
    metricTemplates: [MetricTemplate${isInput ? 'Input' : ''}]
    private: Boolean
`;

export default `
    input CreateProjectInput {
        projectType: String!
        title: String!
        description: String!
        startDate: Date!
        endDate: Date!
        ${alwaysOptionalProjectProperties(true)}
    }
    
    input UpdateProjectInput {
        id: String
        followCount: Int
        projectType: String
        title: String
        description: String
        metrics: [MetricInput!]
        startDate: Date
        endDate: Date
        ${alwaysOptionalProjectProperties(true)}
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
        metrics: [Metric!]
        ${alwaysOptionalProjectProperties()}
    }
`;
