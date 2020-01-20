export const getProjects = async (): Promise<string[]> => {
  return new Promise((resolve: Function) => {
    resolve(['project 1']);
  });
};
