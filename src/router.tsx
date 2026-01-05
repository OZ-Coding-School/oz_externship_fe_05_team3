// src/router.tsx
import { ROUTES } from '@/routes';
import { createBrowserRouter, Outlet } from 'react-router';
import { NavigationBar } from '@/components/index';
import {
  CommunityPage,
  CommunityDetailPage,
  CommunityCreatePage,
} from '@/pages/index';

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
    path: ROUTES.HOME,
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
