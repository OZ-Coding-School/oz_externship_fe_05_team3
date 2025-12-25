import { useQuery } from '@tanstack/react-query';
import { communityApi } from '@/api/community';
import type { CommunitySearch } from '@/api/model/postDTO';
import { postList } from '@/mocks/postList';

const USE_MOCK = true; // 실제 API 사용 시 false로 변경

export const useCommunityPosts = (params: CommunitySearch) => {
  return useQuery({
    queryKey: ['community', 'posts', params],
    queryFn: async () => {
      if (USE_MOCK) {
        // Mock 데이터 반환, '클라이언트' 사이드 검색어 필터링/정렬 순서 변경 적용
        return Promise.resolve(postList);
      } // 실제 API 호출 ( '서버' 사이드 검색어 필터링/정렬 순서 변경 적용 )
      return communityApi.getPosts(params);
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
