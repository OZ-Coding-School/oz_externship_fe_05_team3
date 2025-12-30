import { useCommunityQuery, useCommunityPosts } from '@/hooks/index';
import { type Post } from '@/types/index';

const useCommunityPageData = () => {
  const { queryState } = useCommunityQuery();

  const postsQuery = useCommunityPosts({
    page: queryState.page,
    search: queryState.search,
    search_filter: queryState.search_filter,
    sort: queryState.sort,
    category_id: queryState.category_id,
  });

  const posts = (postsQuery.data?.results as Post[]) ?? [];

  return { queryState, postsQuery, posts };
};

export default useCommunityPageData;
