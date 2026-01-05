import type { LoginRequestDTO } from '@/api/auth/dto';
import { authMutations, authQueries } from '@/api/auth/queries';
import { useAuthStore } from '@/store/authStore';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useLogin = () => {
  const { setToken, setUser } = useAuthStore();

  const loginMutation = useMutation(authMutations.login);
  const userQuery = useQuery(authQueries.getUser());

  const login = (data: LoginRequestDTO) => {
    loginMutation.mutate(data, {
      onSuccess: async (res) => {
        setToken(res.access_token);

        const result = await userQuery.refetch();

        if (result.data) {
          setUser(result.data);
        }
      },
    });
  };

  return {
    login,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
  };
};
