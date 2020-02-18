const user = `
    type User {
        id: String!
        userName: String
        userIcon: String
        email: String
        favorites: [String]
        myProjects: [String]
        createdAt: Date
        updatedAt: Date
    }
    input UserInput {
        id: String!
        userName: String
        userIcon: String
    }
`;
export default user;
