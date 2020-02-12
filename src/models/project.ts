import uuid from 'uuid';
import ProjectType from './project.type';
export class Project extends ProjectType {
  constructor(project: ProjectType) {
    super();
    Object.assign(this, project);
  }
}

export const SeedProject = (): Project => {
  return new Project({
    id: uuid(),
    userId: uuid(),
    likedBy: [],
    followCount: 0,
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
