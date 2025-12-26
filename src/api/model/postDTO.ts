export interface PostListResponseDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: PostDTO[];
}

export interface PostDTO {
  id: number;
  author: UserDTO;
  title: string;
  category_id: number;
  category: string;
  thumbnail_img_url: string;
  content_preview: string;
  comment_count: number;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export interface UserDTO {
  id: number;
  nickname: string;
  profile_img_url: string;
}

export interface AuthDTO {
  user: UserDTO | null;
  isAuthenticated: boolean;
  login: (user: UserDTO) => void;
  logout: () => void;
}

export type CommunitySearch =
  | {
      page?: number;
      search?: string;
      search_filter?: CommunitySearchFilter;
      category_id?: number;
      sort?: CommunitySearchSort;
    }
  | undefined;

export enum CommunitySearchFilter {
  AUTHOR = 'author',
  TITLE = 'title',
  CONTENT = 'content',
  TITLE_OR_CONTENT = 'title_or_content',
}

export enum CommunitySearchSort {
  LATEST = 'latest',
  OLDEST = 'oldest',
  MOST_VIEWS = 'most_views',
  MOST_LIKES = 'most_likes',
  MOST_COMMENTS = 'most_comments',
}
