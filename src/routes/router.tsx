import { createBrowserRouter, useRoutes } from 'react-router-dom';

import MainLayout from '@layout/MainLayout';
import AuthLayout from '@layout/AuthLayout';
import PersonalLayout from '@layout/PersonalLayout';
import HomePage from '@pages/home/HomePage';
import SignupTypePage from '@pages/auth/SignupTypePage';
import SigninPage from '@pages/auth/SigninPage';
import SignupPersonalPage from '@pages/auth/SignupPersonalPage';
import SignupUniversityPage from '@pages/auth/SignupUniversityPage';
import SignupCompanyPage from '@pages/auth/SignupCompanyPage';
import EditMySpecPage from '@pages/personal/EditMySpecPage';
import AllEmploymentPage from '@pages/personal/AllEmploymentPage';
import { CalendarPage } from '@pages/personal/CalendarPage';

const router = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        // { path: "dashboard", element: <DashboardPage /> }, 이런 식으로 여기 라우트 걸기
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'signin', element: <SigninPage /> },
        { path: 'signup/type', element: <SignupTypePage /> },
        { path: 'signup/personal', element: <SignupPersonalPage /> },
        { path: 'signup/company', element: <SignupCompanyPage /> },
        { path: 'signup/university', element: <SignupUniversityPage /> },
      ],
    },
    {
      path: '/my',
      element: <PersonalLayout />,
      children: [
        { path: 'resume', element: <HomePage /> },
        { path: 'resume/edit', element: <EditMySpecPage /> },
        { path: 'status', element: <AllEmploymentPage /> },
        { path: 'touch', element: <HomePage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'review', element: <HomePage /> },
      ],
    },
  ]);

export default router;
