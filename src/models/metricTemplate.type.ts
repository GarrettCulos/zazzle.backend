type MetricTypes = 'string' | 'number' | 'date';
export default interface MetricTemplate {
  type: MetricTypes;
  key: string;
  name: string;
  description: string;
}
