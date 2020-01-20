import { makeExecutableSchema } from 'graphql-tools';
import { resolvers as userResolvers } from './user.resolver';
import { resolvers as authResolvers } from './auth.resolver';

const old = `
type Query {
  // user(id: ID!): User
  currentUser: User
}

type Mutation {
  // exchangeGoogle(googleAuth: GoogleAuth): AuthToken
  // createUser(user: CreateUserInput): AuthToken
  // updateUser(userId: String, userData: UpdateUserInput): User
  // login(user: UserLoginInput): AuthToken
}
`;

export const userSchema = makeExecutableSchema({
  typeDefs: `
  scalar Date
    
  type Query {
    currentUser: User
  }

  type AuthToken {
    token: String
    expiresIn: Int
    user: User
  }

  input UserLoginInput {
    userName: String!
    password: String!
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    userName: String!
    password: String!
    passwordConfirm: String!
    emailAddress: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    userName: String
    emailAddress: String
  }

  input GoogleAuth {
    email: String
    idToken: String
  }

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

  `,
  resolvers: [userResolvers, authResolvers]
});
