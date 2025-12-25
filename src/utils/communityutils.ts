import {
  CommunitySearchFilter,
  CommunitySearchSort,
  type PostDTO,
} from '@/api/model/postDTO';

// 클라이언트 사이드 "필터링" (Mock 데이터 사용 시 필요)
// 실제 API는 서버에서 "필터링된 데이터"를 반환

export function filterPostsClient(
  posts: PostDTO[],
  search: string,
  search_filter?: CommunitySearchFilter,
  category_id?: number,
  sort?: CommunitySearchSort
): PostDTO[] {
  let filtered = posts;

  // 카테고리만 필터링
  if (category_id !== undefined) {
    filtered = posts.filter((post) => post.category_id === category_id); // 카테고리 ID가 일치하는 게시물만 필터링
  }

  // 검색필터링 ( + 검색어 있을 때만 )
  if (search && search_filter) {
    const searchLower = search.trim().toLowerCase(); // 검색어를 소문자로 변환

    if (!searchLower) {
      return filtered; // 검색어가 없으면 필터링 안함
    }

    //
    filtered = posts.filter((post) => {
      switch (search_filter) {
        case CommunitySearchFilter.AUTHOR:
          return post.author.nickname.toLowerCase().includes(searchLower);
        case CommunitySearchFilter.TITLE:
          return post.title.toLowerCase().includes(searchLower);
        case CommunitySearchFilter.CONTENT:
          return post.content_preview.toLowerCase().includes(searchLower);
        case CommunitySearchFilter.TITLE_OR_CONTENT:
          return (
            post.title.toLowerCase().includes(searchLower) ||
            post.content_preview.toLowerCase().includes(searchLower)
          );
        default:
          return true; // 기본적으로 모든 게시물을 포함
      }
    });

    // 카테고리 + 검색필터링 ( + 검색어 있을 때만 ) 인 경우
    if (category_id !== undefined && search && search_filter) {
      const filteredByCategory = posts.filter(
        (post) => post.category_id === category_id
      ); // 카테고리 ID가 일치하는 게시물만 필터링
      const filteredBySearch = filteredByCategory.filter((post) => {
        switch (search_filter) {
          case CommunitySearchFilter.AUTHOR:
            return post.author.nickname.toLowerCase().includes(searchLower);
          case CommunitySearchFilter.TITLE:
            return post.title.toLowerCase().includes(searchLower);
          case CommunitySearchFilter.CONTENT:
            return post.content_preview.toLowerCase().includes(searchLower);
          case CommunitySearchFilter.TITLE_OR_CONTENT:
            return (
              post.title.toLowerCase().includes(searchLower) ||
              post.content_preview.toLowerCase().includes(searchLower)
            );
        }
      });
      filtered = filteredBySearch;
    }
  }

  return filtered;
}

// 클라이언트 사이드 "정렬" ( Mock 데이터 사용 시 필요 )
// 실제 API는 서버에서 "정렬된 데이터"를 반환

export function sortPostsClient(
  posts: PostDTO[],
  sort: CommunitySearchSort
): PostDTO[] {
  const sorted = [...posts]; // 앞에 검색필터링 작업을 했기 때문에 "원본 배열을 보존"하고 새로운 배열로 반환 (배열 복사)

  switch (sort) {
    // 조회수 많은순 정렬
    case CommunitySearchSort.MOST_VIEWS:
      return sorted.sort((a, b) => b.view_count - a.view_count);
    // 좋아요 많은순 정렬
    case CommunitySearchSort.MOST_LIKES:
      return sorted.sort((a, b) => b.like_count - a.like_count);
    // 댓글 많은순 정렬
    case CommunitySearchSort.MOST_COMMENTS:
      return sorted.sort((a, b) => b.comment_count - a.comment_count);
    // 최신순 정렬
    case CommunitySearchSort.LATEST:
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    // 오래된순 정렬
    case CommunitySearchSort.OLDEST:
      return sorted.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    // 기본적으로 모든 게시물을 포함
    default:
      return sorted;
  }
}

// 페이지네이션 적용 ( Mock 데이터 사용 시 필요 )
// 실제 API는 서버에서 "페이지네이션된 데이터"를 반환

export function paginatePostsClient(
  posts: PostDTO[],
  page: number,
  pageSize: number = 10
) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    results: posts.slice(startIndex, endIndex),
    count: posts.length,
    totalPages: Math.ceil(posts.length / pageSize),
    page: page,
  };
}
