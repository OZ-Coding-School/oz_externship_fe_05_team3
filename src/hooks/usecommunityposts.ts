import { useQuery } from '@tanstack/react-query';
import { type PostQueryParams } from '@/types/index';
import { communityApi } from '@/api/index';

const useCommunityPosts = (params: PostQueryParams) => {
  return useQuery({
    queryKey: ['community', 'posts', params],
    queryFn: async () => {
      // MSW가 이 요청을 가로채서 mock 데이터를 반환합니다
      return communityApi.getPosts(params);
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export default useCommunityPosts;
