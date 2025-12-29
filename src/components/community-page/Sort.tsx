import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/lib/index';
import { useCommunityQuery } from '@/hooks/index';
import { SortOption } from '@/types-interface/index';

const SORT_OPTIONS = [
  { value: SortOption.MOST_VIEWS, label: '조회순' },
  { value: SortOption.MOST_LIKES, label: '좋아요 순' },
  { value: SortOption.MOST_COMMENTS, label: '댓글 순' },
  { value: SortOption.LATEST, label: '최신순' },
  { value: SortOption.OLDEST, label: '오래된순' },
];

const Sort = () => {
  const { queryState, updateSort } = useCommunityQuery();

  const handleChangeSort = (sortType: SortOption) => {
    updateSort(sortType as SortOption);
  };

  return (
    <Select value={queryState.sort} onValueChange={handleChangeSort}>
      <SelectTrigger className="w-[120px] text-[16px]">
        <SelectValue placeholder="정렬 기준" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>정렬 기준</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Sort;
