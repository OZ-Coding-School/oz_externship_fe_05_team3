import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const searchFilter = [
  { value: 'author', label: '작성자' },
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
  { value: 'title_or_content', label: '제목 또는 내용' },
];

export function SearchOption() {
  return (
    <Select>
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
  );
}
