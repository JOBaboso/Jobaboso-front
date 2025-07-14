import { createBrowserRouter, useRoutes } from 'react-router-dom';

import MainLayout from "@layout/MainLayout";
import AuthLayout from "@layout/AuthLayout";
import HomePage from '@pages/home/HomePage'; 
import SignupTypePage from '@pages/auth/SignupTypePage';
import SigninPage from '@pages/auth/SigninPage';
import SignupPersonalPage from '@pages/auth/SignupPersonalPage';
import SignupUniversityPage from '@pages/auth/SignupUniversityPage';
import SignupCompanyPage from '@pages/auth/SignupCompanyPage';


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
      { path: "signin", element: <SigninPage /> },
      { path: "signup/type", element: <SignupTypePage /> },
      { path: "signup/personal", element: <SignupPersonalPage /> },
      { path: "signup/company", element: <SignupCompanyPage /> },
      { path: "signup/university", element: <SignupUniversityPage /> },
    ],
  },
]);

export default router;