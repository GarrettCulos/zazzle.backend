import Metric from './metric.type';
import MetricTemplate from './metricTemplate.type';
import User from './user.type';
import Post from './post.type';

export interface ProjectConstructor {
  id: string;
  user: User;
  projectType: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  followCount?: number;
  likedBy?: User[];
  coverImages?: string[];
  tags?: string[];
  collaborators?: User[];
  location?: string;
  posts?: Post[];
  event?: string;
  metrics?: Metric[];
  metricTemplates?: MetricTemplate[];
}

export default class ProjectType {
  id: string;
  userId: string;
  user: User;
  projectType: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
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
