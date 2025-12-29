import {
  CategoryNavigationMenu,
  CreateButton,
  CommunityPagination,
  Sort,
  PostCard,
} from '@/components/index';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/lib/index';
import { useCommunityPosts, useCommunityQuery } from '@/hooks/index';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { SearchFilter, SortOption, type Post } from '@/types-interface/index';
import { ROUTES } from '@/routes';

function CommunityPage() {
  const { queryState, updateSearch, updateSearchFilter } = useCommunityQuery();

  // 로컬 상태로 검색어와 필터를 관리 (Enter 키를 눌렀을 때만 실제 검색 실행)
  const [searchState, setSearchState] = useState(queryState.search);
  const [filterState, setFilterState] = useState<SearchFilter | undefined>(
    queryState.search_filter
  );
  const [sortState, setSortState] = useState<SortOption | undefined>(
    queryState.sort
  );

  const postsQuery = useCommunityPosts({
    page: queryState.page,
    search: queryState.search,
    search_filter: queryState.search_filter,
    sort: queryState.sort,
    category_id: queryState.category_id,
  });

  const posts = (postsQuery.data?.results as Post[]) ?? [];

  const FILTER_OPTIONS = [
    { value: SearchFilter.AUTHOR, label: '작성자' },
    { value: SearchFilter.TITLE, label: '제목' },
    { value: SearchFilter.CONTENT, label: '내용' },
    {
      value: SearchFilter.TITLE_OR_CONTENT,
      label: '제목 또는 내용',
    },
  ];

  // 검색 필터 변경 시 즉시 URL 업데이트
  const handleChangeSearchFilter = (filter: string) => {
    const filterValue = filter as SearchFilter;
    setFilterState(filterValue);
    updateSearchFilter(filterValue);
  };

  // 검색어 입력 시 로컬 상태만 업데이트
  const handleChangeSearch = (search: string) => {
    setSearchState(search);
  };

  // Enter 키를 누르면 실제 검색 실행
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateSearch(searchState, filterState);
    }
  };

  return (
    <div className="mx-auto mt-25 mb-50 flex w-[960px] flex-col items-center gap-4 px-4">
      <header className="mx-auto flex w-full flex-col gap-4">
        <p className="text-[32px] font-bold">커뮤니티</p>
        <section className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Select
              value={filterState}
              onValueChange={handleChangeSearchFilter}
            >
              <SelectTrigger className="w-[120px] text-[16px]">
                <SelectValue placeholder="검색 유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>검색 유형</SelectLabel>
                  {FILTER_OPTIONS.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <InputGroup className="h-[48px] w-[472px] rounded-full">
              <InputGroupInput
                className="text-[14px]"
                placeholder="질문검색"
                onChange={(event) => handleChangeSearch(event.target.value)}
                onKeyUp={handleKeyUp}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <CreateButton />
        </section>
        <section className="flex items-center justify-between gap-4">
          <CategoryNavigationMenu />
          <Sort />
        </section>
        <hr />
      </header>

      <main className="mb-10 flex flex-col gap-4">
        {posts?.map((post: Post) => (
          <Link to={`${ROUTES.COMMUNITY}/${post.id}`} key={post.id}>
            <PostCard postcard={post} />
          </Link>
        ))}
        <hr />
      </main>

      <footer className="flex justify-center">
        <CommunityPagination />
      </footer>
    </div>
  );
}

export default CommunityPage;
