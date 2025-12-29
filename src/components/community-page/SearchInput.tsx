import { InputGroup, InputGroupAddon, InputGroupInput } from '@/lib/index';
import { SearchIcon } from 'lucide-react';

const SearchInput = () => {
  return (
    <InputGroup className="h-[48px] w-[472px] rounded-full">
      <InputGroupInput className="text-[14px]" placeholder="질문검색" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;
