// src/components/ui/input-group-custom.tsx
import { InputGroup, InputGroupAddon, InputGroupButton } from '@/lib/index';
import TextareaAutosize from 'react-textarea-autosize';

export interface InputGroupCustomProps {
  value: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const InputGroupCustom = ({
  value,
  disabled,
  placeholder = '개인정보를 공유 및 요청하거나, 명예 회손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있습니다.',
  onChange,
  onSubmit,
}: InputGroupCustomProps) => {
  return (
    <div className="grid h-[120px] w-full max-w-[944px] gap-6">
      <InputGroup>
        <TextareaAutosize
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-[16px]"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            className="group-focus-within/input-group:text-oz-purple group-focus-within/input-group:bg-oz-purple-light group-focus-within/input-group:border-oz-purple bg-oz-gray-white text-oz-gray-dark hover:bg-oz-purple-light ml-auto h-[40px] w-[80px] rounded-full border border-transparent text-[16px] group-focus-within/input-group:border"
            size="sm"
            variant="outline"
            disabled={disabled}
            onClick={onSubmit}
          >
            등록
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default InputGroupCustom;
