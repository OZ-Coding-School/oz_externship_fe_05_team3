import { InputGroup, InputGroupAddon, InputGroupInput } from '@/lib/index';
import { SearchIcon } from 'lucide-react';
import { useCommunityQuery } from '@/hooks/index';
import { useEffect, useState } from 'react';
import { type SearchFilterEnum } from '@/types/index';

const SearchInput = () => {
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
    <InputGroup className="h-[48px] w-[472px] rounded-full">
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

export default SearchInput;
