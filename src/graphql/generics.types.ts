export default `
    scalar Date

    scalar JSON

    type User {
      id: Int!
      firstName: String
      lastName: String
      userName: String
      password: String
      isActive: Int
      emailAddress: String
      provider: String
      createdAt: Date
      updatedAt: Date
    }
`;
