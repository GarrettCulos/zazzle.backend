export default class UserType {
  id: string;
  userName: string;
  userIcon: string;
  email?: string;
  favorites?: string[];
  myProjects?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends UserType {
  constructor(user: UserType) {
    super();
    Object.assign(this, user);
    this.favorites = this.favorites || [];
    this.myProjects = this.myProjects || [];
    this.updatedAt = new Date(this.updatedAt);
    this.createdAt = new Date(this.createdAt);
  }

  serialize(): UserType {
    const { favorites, ...savedData } = this;
    return {
      ...savedData,
      updatedAt: this.updatedAt.getTime(),
      createdAt: this.createdAt.getTime()
    };
  }

  addToProject(projectId: string) {
    if (!this.myProjects.includes(projectId)) {
      this.myProjects.push(projectId);
    }
  }
}

export interface AddUserInterface {
  userName: string;
  email: string;
  userIcon: string;

  [s: string]: any;
}
