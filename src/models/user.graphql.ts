const user = `
    type User {
        id: String!
        userName: String
        userIcon: String
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
