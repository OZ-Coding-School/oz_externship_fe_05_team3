import {
  CategoryMenuSection,
  CommunityPagination,
  PostCardSection,
  SearchSection,
} from '@/components/index';

function CommunityPage() {
  return (
    <div className="mx-auto mt-20 mb-50 flex w-full max-w-[960px] flex-col items-center px-4">
      <header className="mx-auto flex w-full flex-col gap-4">
        <h1 className="text-[32px] font-bold">커뮤니티</h1>
        <SearchSection />
        <CategoryMenuSection />
      </header>
      <PostCardSection />
      <CommunityPagination />
    </div>
  );
}

export default CommunityPage;
