import { apiClient } from '@/api/apiclient';
import type {
  CategoryResponseDTO,
  CommunityDetailResponseDTO,
  CreateCommunityRequestDTO,
  CreateCommunityResponseDTO,
} from './dto';

export const communityService = {
  getCategories: async (): Promise<CategoryResponseDTO> => {
    const response =
      await apiClient.get<CategoryResponseDTO>('/posts/categories');
    return response;
  },
  getPostDetailById: async (
    id: number
  ): Promise<CommunityDetailResponseDTO> => {
    const response = await apiClient.get<CommunityDetailResponseDTO>(
      `/posts/${id}`
    );
    return response;
  },
  postCommunityPost: async (
    data: CreateCommunityRequestDTO
  ): Promise<CreateCommunityResponseDTO> => {
    const response = await apiClient.post<CreateCommunityResponseDTO>(
      '/posts',
      data
    );
    return response;
  },
  patchCommunityPost: async (
    id: number,
    data: CreateCommunityRequestDTO
  ): Promise<CreateCommunityResponseDTO> => {
    const response = await apiClient.put<CreateCommunityResponseDTO>(
      `/posts/${id}`,
      data
    );
    return response;
  },
};
