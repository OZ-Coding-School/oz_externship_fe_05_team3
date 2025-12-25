import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router';
import { ROUTES } from '@/routes';

export function CreateButton() {
  return (
    <Link to={ROUTES.COMMUNITY_CREATE} className="">
      <Button variant="default" className="h-[48px] w-[120px] text-[16px]">
        <Pencil className="size-5" />
        글쓰기
      </Button>
    </Link>
  );
}
