import { apiClient } from '@/api/apiclient';
import type { CategoryResponseDTO, CommunityDetailResponseDTO } from './dto';

export const communityService = {
  getCategories: async (): Promise<CategoryResponseDTO> => {
    const response = await apiClient.get<CategoryResponseDTO>('categories');
    return response;
  },
  getPostDetailById: async (
    id: number
  ): Promise<CommunityDetailResponseDTO> => {
    const response = await apiClient.get<CommunityDetailResponseDTO>(`/${id}`);
    return response;
  },
};
