import {
  CategoryMenu,
  CreateButton,
  CommunityPagination,
  Sort,
  PostCard,
  SearchFilter,
  SearchInput,
} from '@/components/index';

import { useCommunityPageData } from '@/hooks/index';
import { Link } from 'react-router';
import { type Post } from '@/types/index';
import { ROUTES } from '@/routes';
// import PostList from '@/components/community-page/PostList';

function CommunityPage() {
  const { posts } = useCommunityPageData();

  return (
    <div className="mx-auto mt-25 mb-50 flex w-[960px] flex-col items-center px-4">
      <header className="mx-auto flex w-full flex-col gap-4">
        <p className="text-[32px] font-bold">커뮤니티</p>
        <section className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SearchFilter />
            <SearchInput />
          </div>
          <CreateButton />
        </section>
        <section className="flex items-center justify-between gap-4">
          <CategoryMenu />
          <Sort />
        </section>
        <hr className="mb-5 w-full" />
      </header>
      {posts?.map((post: Post) => (
        <Link to={`${ROUTES.COMMUNITY}/${post.id}`} key={post.id}>
          <PostCard postcard={post} />
        </Link>
      ))}
      <hr className="mt-5 mb-10 w-full" />
      <CommunityPagination />
    </div>
  );
}

export default CommunityPage;
