// Category DTO
export interface CategoryResponseDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: CategoryDTO[];
}

export interface CategoryDTO {
  id: number;
  name: string;
}

// Community Detail DTO
export interface CommunityDetailResponseDTO {
  id: number;
  title: string;
  author: authorDTO;
  category_id: number;
  content: string;
  like_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  category: CategoryDTO;
}

export interface authorDTO {
  id: number;
  nickname: string;
  profile_image_url: string;
}

export interface CreateCommunityRequestDTO {
  title: string;
  content: string;
  category: number;
}

export interface CreateCommunityResponseDTO {
  id: number;
  title: string;
  content: string;
  category: number;
}
