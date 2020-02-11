export type MetricTypes = 'string' | 'number' | 'Date';
export default interface Metric {
  value: string;
  type: MetricTypes;
  date: Date;
  key: string;
}
