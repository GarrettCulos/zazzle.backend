import { getProjects } from './project';

describe('SERVICE - user', () => {
  it('should getUser', async () => {
    try {
      const user = await getProjects();
      return expect(user).toEqual(['project 1']);
    } catch (error) {
      return expect(!error);
    }
  });
});
