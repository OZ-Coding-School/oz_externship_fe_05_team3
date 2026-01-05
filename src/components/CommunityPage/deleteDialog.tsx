import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DeleteDialog() {
  return (
    <DialogContent className="w-[428px]">
      <DialogHeader>
        <DialogDescription className="text-oz-gray-black text-[16px]">
          삭제된 내용은 복구할 수 없습니다.
          <br />
          게시글을 정말로 삭제하시겠습니까?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button
            type="button"
            variant="default"
            className="bg-oz-purple-light hover:bg-oz-purple-light text-oz-purple h-[42px] w-[76px] rounded-full"
          >
            취소
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            type="button"
            variant="default"
            className="hover:bg-oz-purple h-[42px] w-[76px] rounded-full"
          >
            삭제
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
