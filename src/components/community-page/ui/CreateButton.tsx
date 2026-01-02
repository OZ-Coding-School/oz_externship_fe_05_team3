import { Button } from '@/lib/index';

import { Pencil } from 'lucide-react';
import { Link } from 'react-router';
import { ROUTES } from '@/routes';

const CreateButton = () => {
  return (
    <Link to={ROUTES.COMMUNITY_CREATE} className="w-full min-[800px]:w-auto">
      <Button
        variant="default"
        className="h-[48px] w-full text-[16px] min-[800px]:w-[120px]"
      >
        <Pencil className="size-5" />
        글쓰기
      </Button>
    </Link>
  );
};

export default CreateButton;
