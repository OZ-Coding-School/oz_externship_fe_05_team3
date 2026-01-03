import { authService } from './services';

export const authQueries = {};

export const authMutations = {
  login: {
    mutationFn: authService.login,
  },
};
