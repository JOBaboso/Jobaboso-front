import { createBrowserRouter, useRoutes } from 'react-router-dom';

import MainLayout from "@layout/MainLayout";
import AuthLayout from "@layout/AuthLayout";
import HomePage from '@pages/home/HomePage'; 
import SignupTypePage from '@pages/auth/SignUpTypePage';
import SignInPage from '@pages/auth/SignInPage';

const router = () =>
  createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // { path: "dashboard", element: <DashboardPage /> }, 이런 식으로 여기 라우트 걸기
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup/type", element: <SignupTypePage /> },
    ],
  },
]);

export default router;