import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { useLogin } from '@/hooks/useLogin';

const UserProfile = () => {
  const { login } = useLogin();

  const handleLogin = () => {
    login({
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
