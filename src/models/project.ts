import uuid from 'uuid';
import ProjectType, { ProjectConstructor } from './project.type';
export class Project extends ProjectType {
  constructor(project: ProjectConstructor) {
    super();
    Object.assign(this, project);
    // set defaults if unset;
    this.startDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate);
    this.updatedAt = new Date(this.updatedAt);
    this.createdAt = new Date(this.createdAt);
    this.userId = this.user.id;
    this.followCount = Boolean(this.followCount) ? this.followCount : 0;
    this.likedBy = this.likedBy || [];
    this.coverImages = this.coverImages || [];
    this.tags = this.tags || [];
    this.posts = this.posts || [];
    this.collaborators = this.collaborators || [];
    this.metrics = this.metrics || [];
    this.metricTemplates = this.metricTemplates || [];
  }

  serialize(): ProjectType {
    return {
      ...this,
      emptyString: '__', //Stupid DynamoDB sorting :(
      startDate: this.startDate.getTime(),
      endDate: this.endDate.getTime(),
      updatedAt: this.updatedAt.getTime(),
      createdAt: this.createdAt.getTime(),
      metrics: this.metrics.map(metric => ({ ...metric, date: new Date(metric.date).getTime() }))
    };
  }
}

export const SeedProject = (): Project => {
  return new Project({
    id: uuid(),
    description: uuid(),
    coverImages: [uuid(), uuid()],
    collaborators: [
      {
        userName: uuid(),
        userIcon: uuid(),
        id: uuid()
      }
    ],
    location: 'here',
    user: {
      userName: uuid(),
      userIcon: uuid(),
      id: uuid()
    },
    projectType: 'testing',
    startDate: new Date(),
    endDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [uuid(), uuid()],
    title: uuid()
  });
};
