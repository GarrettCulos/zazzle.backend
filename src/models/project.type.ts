import Metric from './metric.type';
import MetricTemplate from './metricTemplate.type';
import User from './user.type';
import Post from './post.type';
export default class ProjectType {
  readonly id: string;
  userId: string;
  readonly user: User;
  readonly projectType: string;
  readonly title: string;
  readonly description: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  likedBy?: User[];
  followCount?: number;
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

export interface CreateProjectInput {
  user: User;
  projectType: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  coverImages?: string[];
  tags?: string[];
  collaborators?: User[];
  location?: string;
  posts?: Post[];
  event?: string;
  metrics?: Metric[];
  metricTemplates?: MetricTemplate[];
}

export interface UpdateProjectInput {
  id: string;
  followCount?: number;
  projectType?: string;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  coverImages?: string[];
  tags?: string[];
  collaborators?: User[];
  location?: string;
  posts?: Post[];
  event?: string;
  metrics?: Metric[];
  metricTemplates?: MetricTemplate[];
}
