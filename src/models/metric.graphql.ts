export default `
  type Metric {
    value: String!
    date: Date!
    key: String!
  }
  input MetricInput {
    value: String!
    date: Date!
    key: String!
  }
`;
