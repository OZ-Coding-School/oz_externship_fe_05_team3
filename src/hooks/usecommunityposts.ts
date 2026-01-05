import { useQuery } from '@tanstack/react-query';
import { communityPostsApi } from '@api/post/services.ts';
import { type PostQueryParams } from '@api/post/types.ts';

export const useCommunityPosts = (params: PostQueryParams) => {
  return useQuery({
    queryKey: ['community', 'posts', params],
    queryFn: async () => {
      // MSW가 이 요청을 가로채서 mock 데이터를 반환합니다
      return communityPostsApi.getCommunityPosts(params);
    },
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 10,
  });
};
