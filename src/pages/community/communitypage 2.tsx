import { ListCard } from '@/components/CommunityPage/ListCard';
import { NavigationMenu } from '@/components/CommunityPage/NavigationMenu';
import { CreateButton } from '@/components/CommunityPage/CreateButton';
import { CommunityPagination } from '@/components/CommunityPage/Pagination';
import { ArrayOption } from '@/components/CommunityPage/ArrayOption';
import { postList } from '@/mocks/postList';
import { Link, useSearchParams } from 'react-router-dom';
import { useMemo, useState, type KeyboardEvent } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';
import { ComunitySearchFilter, type SearchComunity } from '@/api/model/postDTO';

function CommunityPage() {
  const posts = postList.results;

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '전체';

  const searchFilter = [
    { value: ComunitySearchFilter.AUTHOR, label: '작성자' },
    { value: ComunitySearchFilter.TITLE, label: '제목' },
    { value: ComunitySearchFilter.CONTENT, label: '내용' },
    { value: ComunitySearchFilter.TITLE_OR_CONTENT, label: '제목 또는 내용' },
  ];

  const filteredPosts = useMemo(() => {
    if (selectedCategory === '전체') {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, posts]);

  const [queryParams, setQueryParams] = useState<SearchComunity>({
    page: 3,
    search: 'a',
  });
  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearchFilter = (val: string) => {
    setQueryParams((prev) => ({
      ...prev,
      search_filter: val as ComunitySearchFilter,
    }));
  };
  const handleSearchOnEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setQueryParams((prev) => ({ ...prev, page: 1, search: searchValue }));
      console.log('prev query params :', queryParams);
    }
  };

  return (
    <div className="mx-auto mt-25 mb-50 flex w-[960px] flex-col items-center gap-4 px-4">
      <header className="mx-auto flex w-full flex-col gap-4">
        <p className="text-[32px] font-bold">커뮤니티</p>

        <section className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Select onValueChange={handleChangeSearchFilter}>
              <SelectTrigger className="w-[120px] text-[16px]">
                <SelectValue placeholder="검색 유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="">
                  <SelectLabel>검색 유형</SelectLabel>
                  {searchFilter.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <InputGroup className="h-[48px] w-[472px] rounded-full">
              <InputGroupInput
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={handleSearchOnEnter}
                className="text-[14px]"
                placeholder="질문검색"
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div>
            <CreateButton />
          </div>
        </section>

        <section className="flex items-center justify-between gap-4">
          <div>
            <NavigationMenu />
          </div>
          <div>
            <ArrayOption />
          </div>
        </section>
        <hr />
      </header>

      <main className="mb-10 flex flex-col gap-4">
        {filteredPosts.map((post) => (
          <Link to={`/community/${post.id}`} key={post.id}>
            <ListCard post={post} category={post.category} />
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
