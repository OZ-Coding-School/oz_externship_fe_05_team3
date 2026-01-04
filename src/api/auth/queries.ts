import { queryOptions } from '@tanstack/react-query';
import { authService } from './services';

export const authQueries = {
  getUser: () =>
    queryOptions({
      queryKey: ['auth-user'],
      queryFn: authService.getUserInfo,
      enabled: false,
    }),
};

export const authMutations = {
  login: {
    mutationFn: authService.login,
  },
};
