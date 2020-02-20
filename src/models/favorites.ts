import uuid from 'uuid';
import FavoriteType from './favorites.type';
export class Favorite extends FavoriteType {
  constructor(favorite: FavoriteType) {
    super();
    Object.assign(this, favorite);
    this.updatedAt = new Date(this.updatedAt);
    this.createdAt = new Date(this.createdAt);
  }

  serialize(): FavoriteType {
    return {
      ...this,
      updatedAt: this.updatedAt.getTime(),
      createdAt: this.createdAt.getTime()
    };
  }
}
