// src/router.tsx
import { ROUTES } from '@/routes';
import { createBrowserRouter, Outlet } from 'react-router';
import CommunityPage from '@/pages/community/communitypage';
import CommunityDetailPage from '@/pages/communitydetail/communitydetailpage';
import CommunityCreatePage from '@/pages/communitycreate/communitycreatepage';
import { NavigationBar } from '@/components/communitypage/navigationbar';

const CommunityLayout = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME, // '/' → 상수 사용
    element: (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-bold">커뮤니티 프로젝트 베이스</h1>
        <p className="text-gray-600">
          여기서부터 비회원 / 회원 / 작성자 플로우
        </p>
      </div>
    ),
  },
  {
    path: ROUTES.COMMUNITY, // '/community' → 상수 사용
    element: <CommunityLayout />,
    children: [
      {
        index: true,
        element: <CommunityPage />,
      },
      {
        path: ':id',
        element: <CommunityDetailPage />,
      },
      {
        path: 'create',
        element: <CommunityCreatePage mode="create" />,
      },
      {
        path: 'edit/:id',
        element: <CommunityCreatePage mode="edit" />,
      },
    ],
  },
]);
