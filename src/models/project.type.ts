import Metric from './metric.type';
import MetricTemplate from './metricTemplate.type';
import User from './user.type';
import Post from './post.type';
export default class ProjectType {
  readonly id: string;
  readonly userId: string;
  readonly user: User;
  public likedBy: User[];
  public followCount: number;
  readonly projectType: string;
  readonly title: string;
  readonly description: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  coverImages?: string[];
  tags?: string[];
  collaborators?: User[];
  location?: string;
  posts?: Post[];
  event?: string;
  // tasks: Task[];
  metrics?: Metric[];
  metricTemplates?: MetricTemplate[];
}
