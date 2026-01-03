import { Link } from 'react-router';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/routes';

const NavigationBar = () => {
  const { user } = useAuthStore();
  // const isAuthenticated = true;
  const isAuthenticated = false;

  return (
    <nav className="sticky top-0 z-50">
      <section className="bg-oz-gray-black-dark flex h-[48px] w-full items-center justify-center">
        <p className="text-[16px] font-light text-white">
          🚨 선착순 모집! 국비지원 받고 4주 완성
        </p>
      </section>
      <section className="mx-auto flex h-[64px] w-full max-w-[1200px] items-center justify-center bg-white">
        <div className="flex w-full items-center justify-between px-4">
          <div className="flex flex-row items-center justify-between gap-10">
            <a
              href={import.meta.env.VITE_API_MY_URL}
              className="flex items-center justify-center font-black"
            >
              <div className="flex items-center justify-center">
                <p className="text-oz-blue-normal text-[22px]">OZ</p>
                <p className="text-oz-purple-normal text-[22px]">.</p>
                <p className="text-oz-blue-normal hidden text-[22px] min-[600px]:flex">
                  오즈코딩스쿨
                </p>
              </div>
            </a>
            <a
              href={import.meta.env.VITE_API_COMMUNITY_URL}
              className="text-[18px]"
            >
              커뮤니티
            </a>
            <a href={import.meta.env.VITE_API_QNA_URL} className="text-[18px]">
              질의응답
            </a>
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
                  <a
                    href={`${import.meta.env.VITE_API_MY_URL}${ROUTES.LOGIN}`}
                    className="content-center text-[16px]"
                  >
                    로그인
                  </a>
                  <p className="text-[16px]">|</p>
                  <a
                    href={`${import.meta.env.VITE_API_MY_URL}${ROUTES.SIGNUP}`}
                    className="content-center text-[16px]"
                  >
                    회원가입
                  </a>
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
