import { useCommunityQuery } from '@/hooks/index';
import { SortOption } from '@/types/index';
import { NativeSelect, NativeSelectOption } from '@/lib/ui/native-select';
import { useEffect, useState } from 'react';

const SORT_OPTIONS = [
  { value: SortOption.MOST_VIEWS, label: '조회순' },
  { value: SortOption.MOST_LIKES, label: '좋아요순' },
  { value: SortOption.MOST_COMMENTS, label: '댓글순' },
  { value: SortOption.LATEST, label: '최신순' },
  { value: SortOption.OLDEST, label: '오래된순' },
];

const Sort = () => {
  const { queryState, updateSort } = useCommunityQuery();
  const [sortState, setSortState] = useState<SortOption>(queryState.sort);

  // URL 변경 시 로컬 상태 동기화
  useEffect(() => {
    setSortState(queryState.sort);
  }, [queryState.sort]);

  const handleChangeSort = (sortType: string) => {
    if (sortType === '') {
      return;
    }

    const sortValue = sortType as SortOption;
    setSortState(sortValue);
    updateSort(sortValue);
  };

  return (
    <div className="text-oz-gray-dark flex w-[120px] items-center justify-center text-[16px]">
      <NativeSelect
        aria-label="게시글 정렬 기준 선택"
        value={sortState}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleChangeSort(event.target.value)
        }
      >
        <NativeSelectOption value="">정렬 기준</NativeSelectOption>
        {SORT_OPTIONS.map((option) => (
          <NativeSelectOption
            key={option.value}
            value={option.value}
            className="flex items-center gap-2"
          >
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
};

export default Sort;
