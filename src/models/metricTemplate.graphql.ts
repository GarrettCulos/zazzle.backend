export default `
  type MetricTemplate {
    type: String!
    key: String!
    name: String!
    description: String
  }
  input MetricTemplateInput {
    type: String!
    key: String!
    name: String!
    description: String
  }
`;
