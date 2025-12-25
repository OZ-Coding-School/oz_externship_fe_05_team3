import { apiClient } from './apiclient';
import type { PostListResponseDTO, CommunitySearch } from './model/postDTO';
import { ROUTES } from '@/routes';

export const communityApi = {
  // 게시글 목록 조회
  getPosts: async (
    params: CommunitySearch = {}
  ): Promise<PostListResponseDTO> => {
    const response = await apiClient.get<PostListResponseDTO>(
      ROUTES.COMMUNITY_POSTS,
      {
        params: {
          page: params?.page,
          search: params?.search,
          search_filter: params?.search_filter,
          category_id: params?.category_id,
          sort: params?.sort,
        },
      }
    );
    return response.data;
  },
};
