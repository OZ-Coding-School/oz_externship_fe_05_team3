export const ROUTES = {
  HOME: '/',
  COMMUNITY: '/',
  COMMUNITY_DETAIL: '/:id',
  COMMUNITY_CREATE: '/create',
  COMMUNITY_EDIT: '/edit/:id',
  POSTS: '/posts',
  CATEGORIES: '/categories',
  QUESTION: '/question',
  LOGIN: '/login',
  SIGNUP: '/signup',
  BUILD_SH: '/build.sh',
} as const;

// 동적 경로 생성 헬퍼 함수
export const getRoutes = {
  communityDetail: (id: string | number) => `/${id}`,
  communityEdit: (id: string | number) => `/edit/${id}`,
};
