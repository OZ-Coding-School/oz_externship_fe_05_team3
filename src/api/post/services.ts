import { ROUTES } from '@/routes';
import type { PostListResponse, PostQueryParams } from './types';
import { apiClient } from '../apiclient';

// 빈 값 제거 헬퍼 함수
export const cleanParams = (params: PostQueryParams) => {
  const cleaned: Record<string, string | number> = {};

  Object.entries(params || {}).forEach(([key, value]) => {
    // undefined, null, 빈 문자열 제외
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = value;
    }
  });

  return cleaned;
};

export const communityPostsApi = {
  getCommunityPosts: async (
    params: PostQueryParams = {}
  ): Promise<PostListResponse> => {
    const response = await apiClient.get<PostListResponse>(ROUTES.POSTS, {
      params: cleanParams(params),
    });
    return response;
  },
};
