type MetricTypes = 'string' | 'number' | 'Date';
export default interface MetricTemplate {
  type: MetricTypes;
  key: string;
  name: string;
  description: string;
}
