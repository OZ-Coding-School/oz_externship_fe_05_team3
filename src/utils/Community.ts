import {
  SearchFilter,
  type Post,
  CategoryName,
  CategoryId,
  SortOption,
} from '@/types-interface/CommunityTypes';

// 카테고리 이름 -> ID 매핑
export function getCategoryIdByName(categoryName: CategoryName): CategoryId {
  const categoryIdMap: Record<CategoryName, CategoryId> = {
    [CategoryName.ALL_BOARD]: CategoryId.ALL_BOARD,
    [CategoryName.NOTICE_BOARD]: CategoryId.NOTICE_BOARD,
    [CategoryName.FREE_BOARD]: CategoryId.FREE_BOARD,
    [CategoryName.DAILY_SHARE]: CategoryId.DAILY_SHARE,
    [CategoryName.DEVELOPMENT_KNOWLEDGE_SHARE]:
      CategoryId.DEVELOPMENT_KNOWLEDGE_SHARE,
    [CategoryName.JOB_INFO_SHARE]: CategoryId.JOB_INFO_SHARE,
    [CategoryName.PROJECT_HIRING_SHARE]: CategoryId.PROJECT_HIRING_SHARE,
  };
  return categoryIdMap[categoryName];
}

// 카테고리별 필터링 (순수 함수)
export function filterByCategory(posts: Post[], categoryId?: number): Post[] {
  if (!categoryId || categoryId === 0) {
    return posts;
  }
  return posts.filter((post) => post.category_id === categoryId);
}

// 검색 필터링 (순수 함수)
export function filterBySearch(
  posts: Post[],
  search: string,
  searchFilter?: SearchFilter
): Post[] {
  if (!search || !searchFilter) {
    return posts;
  }

  const searchLower = search.trim().toLowerCase();
  if (!searchLower) {
    return posts;
  }

  return posts.filter((post) => {
    switch (searchFilter) {
      case SearchFilter.AUTHOR:
        return post.author.nickname.toLowerCase().includes(searchLower);
      case SearchFilter.TITLE:
        return post.title.toLowerCase().includes(searchLower);
      case SearchFilter.CONTENT:
        return post.content_preview.toLowerCase().includes(searchLower);
      case SearchFilter.TITLE_OR_CONTENT:
        return (
          post.title.toLowerCase().includes(searchLower) ||
          post.content_preview.toLowerCase().includes(searchLower)
        );
      default:
        return true;
    }
  });
}

// 정렬 (순수 함수)
export function sortPosts(posts: Post[], sort?: SortOption): Post[] {
  if (!sort) {
    return posts;
  }

  const sorted = [...posts]; // 원본 배열 보존

  switch (sort) {
    case SortOption.MOST_VIEWS:
      return sorted.sort((a, b) => b.view_count - a.view_count);
    case SortOption.MOST_LIKES:
      return sorted.sort((a, b) => b.like_count - a.like_count);
    case SortOption.MOST_COMMENTS:
      return sorted.sort((a, b) => b.comment_count - a.comment_count);
    case SortOption.LATEST:
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case SortOption.OLDEST:
      return sorted.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    default:
      return sorted;
  }
}

// 페이지네이션 (순수 함수)
export function paginatePosts(
  posts: Post[],
  page: number,
  pageSize: number = 10
) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    results: posts.slice(startIndex, endIndex),
    count: posts.length,
    next: endIndex < posts.length ? `?page=${page + 1}` : null,
    previous: page > 1 ? `?page=${page - 1}` : null,
  };
}

// 통합 함수 - 모든 필터/정렬/페이지네이션 적용
export function processPosts(
  posts: Post[],
  params: {
    categoryId?: number;
    search?: string;
    searchFilter?: SearchFilter;
    sort?: SortOption;
    page?: number;
    pageSize?: number;
  }
) {
  let processed = posts;

  // 1. 카테고리 필터링
  processed = filterByCategory(processed, params.categoryId);

  // 2. 검색 필터링
  processed = filterBySearch(
    processed,
    params.search || '',
    params.searchFilter
  );

  // 3. 정렬
  processed = sortPosts(processed, params.sort);

  // 4. 페이지네이션
  return paginatePosts(processed, params.page || 1, params.pageSize);
}
