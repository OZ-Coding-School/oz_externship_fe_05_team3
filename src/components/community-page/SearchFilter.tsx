import { useCommunityQuery } from '@/hooks/index';
import { SearchFilterEnum } from '@/types/index';
import { useEffect, useState } from 'react';
import { NativeSelect, NativeSelectOption } from '@/lib/ui/native-select';

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

  // URL 변경 시 로컬 상태 동기화
  useEffect(() => {
    setFilterState(queryState.search_filter);
  }, [queryState.search_filter]);

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
    <div className="flex w-[120px] items-center justify-center">
      <NativeSelect
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

export default SearchFilter;
