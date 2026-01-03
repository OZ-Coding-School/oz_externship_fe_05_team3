import { queryOptions } from '@tanstack/react-query';
import { communityService } from './services';
import type { CreateCommunityRequestDTO } from './dto';

export const communityQueries = {
  getCategories: () =>
    queryOptions({
      queryKey: ['community-categories'],
      queryFn: communityService.getCategories,
    }),
  getCommunityDetail: (params: { id?: number; enabled?: boolean }) =>
    queryOptions({
      queryKey: ['community-detail', params.id],
      queryFn: () => {
        if (!params.id) {
          // 타입 안정성을 위한 가드
          return Promise.reject(new Error('id is required'));
        }
        return communityService.getPostDetailById(params.id);
      },
      enabled: Boolean(params.id) && params.enabled !== false,
    }),
};

export const communityMutations = {
  postCommunityCreate: {
    mutationFn: communityService.postCommunityPost,
  },
  updateCommunityPost: {
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateCommunityRequestDTO;
    }) => communityService.patchCommunityPost(id, data),
  },
};
