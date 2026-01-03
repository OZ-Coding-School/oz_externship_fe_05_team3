import { useAuthStore } from '@/store/authStore';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { authMutations } from '@/api/auth/queries';

const UserProfile = () => {
  const { user } = useAuthStore();
  const { mutate } = useMutation(authMutations.login);

  const handleLogin = () => {
    mutate({
      email: 'testuser8@ozcodingschool.site',
      password: 'Ozcoding1234@',
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <img
          src={'/src/assets/user.png'}
          alt="user-icon"
          className="size-[40px] rounded-full"
        />
      </PopoverTrigger>
      <PopoverContent>
        <Button variant="link" onClick={handleLogin}>
          로그인
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
