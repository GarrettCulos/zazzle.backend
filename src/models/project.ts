import uuid from 'uuid';
import ProjectType from './project.type';
export class Project extends ProjectType {
  constructor(project: ProjectType) {
    super();
    Object.assign(this, project);
    // set defaults if unset;
    this.userId = this.user.id;
    this.followCount = Boolean(this.followCount) ? this.followCount || 0;
    this.likedBy = this.likedBy || [];
    this.coverImages = this.coverImages || [];
    this.tags = this.tags || [];
    this.posts = this.posts || [];
    this.collaborators = this.collaborators || [];
    this.metrics = this.metrics || [];
    this.metricTemplates = this.metricTemplates || []
  }
}

export const SeedProject = (): Project => {
  return new Project({
    id: uuid(),
    userId: uuid(),
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
    // event: 'event',
    title: uuid()
  });
};
