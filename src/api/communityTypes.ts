export interface PostListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export interface Post {
  id: number;
  author: Author;
  title: string;
  thumbnail_img_url: string;
  content_preview: string;
  comment_count: number;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  category: CategoryName;
  category_id: CategoryId;
}

export interface Author {
  id: number;
  nickname: string;
  profile_img_url: string;
}

export type PostQueryParams =
  | {
      page?: number;
      // page_size?: number;
      search?: string;
      search_filter?: SearchFilterEnum;
      category_id?: CategoryId;
      sort?: SortOption;
    }
  | undefined;

export enum SearchFilterEnum {
  AUTHOR = 'author',
  TITLE = 'title',
  CONTENT = 'content',
  TITLE_OR_CONTENT = 'title_or_content',
}

export enum CategoryId {
  ALL_BOARD = 0,
  NOTICE_BOARD = 1,
  FREE_BOARD = 2,
  DAILY_SHARE = 3,
  DEVELOPMENT_KNOWLEDGE_SHARE = 4,
  JOB_INFO_SHARE = 5,
  PROJECT_HIRING_SHARE = 6,
}

export enum SortOption {
  MOST_VIEWS = 'most_views',
  MOST_LIKES = 'most_likes',
  MOST_COMMENTS = 'most_comments',
  LATEST = 'latest',
  OLDEST = 'oldest',
}

export enum CategoryName {
  ALL_BOARD = '전체게시판',
  NOTICE_BOARD = '공지사항',
  FREE_BOARD = '자유게시판',
  DAILY_SHARE = '일상공유',
  DEVELOPMENT_KNOWLEDGE_SHARE = '개발지식공유',
  JOB_INFO_SHARE = '취업정보공유',
  PROJECT_HIRING_SHARE = '프로젝트구인',
}
