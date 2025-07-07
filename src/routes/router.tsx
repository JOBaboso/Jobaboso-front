import { createBrowserRouter, useRoutes } from 'react-router-dom';

import MainLayout from "@layout/MainLayout";
import AuthLayout from "@layout/AuthLayout";
import HomePage from '@pages/home/HomePage'; 
import SignupTypePage from '@pages/signup/SignUpTypePage';
import SignInPage from '@pages/signin/SignInPage';

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
      { path: "signIn", element: <SignInPage /> },
      { path: "signUpType", element: <SignupTypePage /> },
    ],
  },
]);

export default router;