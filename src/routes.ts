export const ROUTES = {
  HOME: '/',
  COMMUNITY: '/community',
  COMMUNITY_DETAIL: '/community/:id',
  COMMUNITY_CREATE: '/community/create',
  COMMUNITY_EDIT: '/community/edit/:id',
  QUESTION: '/question',
  LOGIN: '/login',
  SIGNUP: '/signup',
  BUILD_SH: '/build.sh',
} as const;

// 동적 경로 생성 헬퍼 함수
export const getRoutes = {
  communityDetail: (id: string | number) => `/community/${id}`,
  communityEdit: (id: string | number) => `/community/edit/${id}`,
};
