export default `
  type Metric {
    value: String!
    type: String!
    date: Date!
    key: String!
  }
  input MetricInput {
    value: String!
    type: String!
    date: Date!
    key: String!
  }
`;
