import type { PostDTO } from '@/api/model/postDTO';

export type SortOption =
  | 'latest'
  | 'like_count'
  | 'view_count'
  | 'comment_count';

export function sortPosts(posts: PostDTO[], sortBy: SortOption): PostDTO[] {
  const sortedPosts = [...posts];

  switch (sortBy) {
    case 'latest':
      return sortedPosts.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case 'like_count':
      return sortedPosts.sort((a, b) => b.like_count - a.like_count);
    case 'view_count':
      return sortedPosts.sort((a, b) => b.view_count - a.view_count);
    case 'comment_count':
      return sortedPosts.sort((a, b) => b.comment_count - a.comment_count);
    default:
      return sortedPosts;
  }
}

export type SearchField = 'title' | 'content' | 'author' | 'all';

export function filterPosts(
  posts: PostDTO[],
  searchTerm: string,
  searchField: SearchField = 'all'
): PostDTO[] {
  if (!searchTerm.trim()) {
    return posts;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();

  return posts.filter((post) => {
    switch (searchField) {
      case 'title':
        return post.title.toLowerCase().includes(lowerSearchTerm);

      case 'content':
        return post.content_preview.toLowerCase().includes(lowerSearchTerm);

      case 'author':
        return post.author.nickname.toLowerCase().includes(lowerSearchTerm);

      case 'all':
        return (
          post.title.toLowerCase().includes(lowerSearchTerm) ||
          post.content_preview.toLowerCase().includes(lowerSearchTerm) ||
          post.author.nickname.toLowerCase().includes(lowerSearchTerm)
        );

      default:
        return true;
    }
  });
}

const POSTS_PER_PAGE = 10;

export function paginatePosts(
  posts: PostDTO[],
  currentPage: number
): PostDTO[] {
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  return posts.slice(startIndex, endIndex);
}

export function getTotalPages(totalCount: number): number {
  return Math.ceil(totalCount / POSTS_PER_PAGE);
}

export function formatCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  }
  if (count < 10000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return `${Math.floor(count / 1000)}K`;
}
