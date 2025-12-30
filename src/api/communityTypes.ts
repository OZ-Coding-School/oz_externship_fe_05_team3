// 게시글 목록 응답
export interface PostListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}
// 게시글 정보
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
// 작성자 정보
export interface Author {
  id: number;
  nickname: string;
  profile_image_url: string;
}
// 게시글 조회 조건
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
// 검색 필터 조건
export enum SearchFilterEnum {
  AUTHOR = 'author',
  TITLE = 'title',
  CONTENT = 'content',
  TITLE_OR_CONTENT = 'title_or_content',
}
// 카테고리 ID
export enum CategoryId {
  ALL_BOARD = 0,
  NOTICE_BOARD = 1,
  FREE_BOARD = 2,
  DAILY_SHARE = 3,
  DEVELOPMENT_KNOWLEDGE_SHARE = 4,
  JOB_INFO_SHARE = 5,
  PROJECT_HIRING_SHARE = 6,
}
// 정렬 조건
export enum SortOption {
  MOST_VIEWS = 'most_views',
  MOST_LIKES = 'most_likes',
  MOST_COMMENTS = 'most_comments',
  LATEST = 'latest',
  OLDEST = 'oldest',
}
// 카테고리 이름
export enum CategoryName {
  ALL_BOARD = '전체게시판',
  NOTICE_BOARD = '공지사항',
  FREE_BOARD = '자유게시판',
  DAILY_SHARE = '일상공유',
  DEVELOPMENT_KNOWLEDGE_SHARE = '개발지식공유',
  JOB_INFO_SHARE = '취업정보공유',
  PROJECT_HIRING_SHARE = '프로젝트구인',
}
// 카테고리 정보
export interface Category {
  id: CategoryId;
  name: CategoryName;
}
