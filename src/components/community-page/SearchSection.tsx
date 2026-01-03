import { useCommunityQuery } from '@/hooks/index';
import { SearchFilterEnum } from '@/types/index';
import { useEffect, useState } from 'react';
import { NativeSelect, NativeSelectOption } from '@/lib/ui/native-select';
import { InputGroup, InputGroupAddon, InputGroupInput, cn } from '@/lib/index';
import { SearchIcon } from 'lucide-react';
import CreateButton from './ui/CreateButton';

const SEARCH_FILTER_OPTIONS = [
  { value: SearchFilterEnum.AUTHOR, label: '작성자' },
  { value: SearchFilterEnum.TITLE, label: '제목' },
  { value: SearchFilterEnum.CONTENT, label: '내용' },
  { value: SearchFilterEnum.TITLE_OR_CONTENT, label: '제목 또는 내용' },
];

const SearchFilter = () => {
  const { queryState, updateSearchFilter } = useCommunityQuery();
  const [filterState, setFilterState] = useState<SearchFilterEnum | undefined>(
    queryState.search_filter
  );

  // 검색 필터 변경 시 즉시 URL 업데이트
  const handleChangeSearchFilter = (filter: string) => {
    if (filter === '') {
      setFilterState(undefined);
      updateSearchFilter(undefined as unknown as SearchFilterEnum);
      return;
    }

    const filterValue = filter as SearchFilterEnum;
    setFilterState(filterValue);
    updateSearchFilter(filterValue);
  };

  return (
    <div className="text-oz-gray-dark flex w-[140px] items-center justify-center">
      <NativeSelect
        aria-label="검색 유형 선택"
        value={filterState || ''}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleChangeSearchFilter(event.target.value)
        }
      >
        <NativeSelectOption value="">검색 유형</NativeSelectOption>
        {SEARCH_FILTER_OPTIONS.map((filter) => (
          <NativeSelectOption key={filter.value} value={filter.value}>
            {filter.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
};

const SearchInput = ({ className }: { className?: string }) => {
  const { queryState, updateSearch } = useCommunityQuery();
  const [searchState, setSearchState] = useState(queryState.search);

  // URL 변경 시 로컬 상태 동기화
  useEffect(() => {
    setSearchState(queryState.search);
  }, [queryState.search]);

  // 검색어 입력 시 로컬 상태만 업데이트
  const handleChangeSearch = (search: string) => {
    setSearchState(search);
  };

  // Enter 키를 누르면 실제 검색 실행
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateSearch(searchState, queryState.search_filter as SearchFilterEnum);
    }
  };
  return (
    <InputGroup className={cn('h-[48px] flex-1 rounded-full', className)}>
      <InputGroupInput
        value={searchState}
        className="text-[14px]"
        placeholder="질문검색"
        onChange={(event) => handleChangeSearch(event.target.value)}
        onKeyUp={handleKeyUp}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

const SearchSection = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'mb-0 flex w-full flex-col items-center justify-between gap-4',
        'min-[800px]:mb-16 min-[800px]:flex-row',
        className
      )}
    >
      <div
        className={cn(
          'flex w-full flex-row items-center gap-4',
          'min-[800px]:flex-1'
        )}
      >
        <SearchFilter />
        <SearchInput className="min-[800px]:flex-1" />
      </div>
      <CreateButton />
    </div>
  );
};

export default SearchSection;
