import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';

export function SearchInput() {
  return (
    <InputGroup className="h-[48px] w-[472px] rounded-full">
      <InputGroupInput className="text-[14px]" placeholder="질문검색" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
