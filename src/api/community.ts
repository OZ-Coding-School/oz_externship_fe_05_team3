import apiClient from './apiclient';
import { ROUTES } from '@/routes';
import type { PostListResponse, PostQueryParams } from './communityTypes';

export const communityApi = {
  getPosts: async (params: PostQueryParams = {}): Promise<PostListResponse> => {
    const response = await apiClient.get<PostListResponse>(
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
