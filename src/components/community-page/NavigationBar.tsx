import { Link } from 'react-router';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/routes';

const NavigationBar = () => {
  const { user } = useAuthStore();
  const isAuthenticated = true;

  return (
    <nav className="sticky top-0 z-50">
      <section className="bg-oz-gray-black-dark flex h-[48px] w-full items-center justify-center">
        <p className="text-[16px] font-light text-white">
          🚨 선착순 모집! 국비지원 받고 4주 완성
        </p>
      </section>
      <section className="flex h-[64px] w-full items-center justify-center bg-white">
        <div className="flex w-[1200px] min-w-[960px] items-center justify-between px-4">
          <div className="flex items-center justify-start gap-20">
            <Link
              to={ROUTES.COMMUNITY}
              className="flex items-center justify-center font-black"
            >
              <p className="text-oz-blue-normal text-[22px]">
                OZ<span className="text-oz-purple-normal">.</span>
                &nbsp;오즈코딩스쿨
              </p>
            </Link>
            <Link to={ROUTES.COMMUNITY} className="text-[18px]">
              커뮤니티
            </Link>
            <Link to={ROUTES.QUESTION} className="text-[18px]">
              질의응답
            </Link>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div className="text-oz-gray-dark flex items-center justify-center gap-2">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user?.profile_image_url ?? '/src/assets/user.png'}
                    alt="user-icon"
                    className="size-[40px] rounded-full"
                  />
                </Link>
              ) : (
                <span className="text-oz-gray-dark flex items-center justify-center gap-2 text-[16px]">
                  <Link
                    to={ROUTES.LOGIN}
                    className="content-center text-[16px]"
                  >
                    로그인
                  </Link>
                  <p className="text-[16px]">|</p>
                  <Link
                    to={ROUTES.SIGNUP}
                    className="content-center text-[16px]"
                  >
                    회원가입
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
      <hr className="border-oz-gray-light w-full" />
    </nav>
  );
};

export default NavigationBar;
