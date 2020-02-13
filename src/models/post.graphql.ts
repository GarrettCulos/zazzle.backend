export default `
  type Post {
    createdAt: Date
    updatedAt: Date
    description: String
  }
  input PostInput {
    createdAt: Date
    updatedAt: Date
    description: String
  }
`;
