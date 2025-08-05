import { createBrowserRouter, useRoutes } from 'react-router-dom';

import MainLayout from '@layout/MainLayout';
import AuthLayout from '@layout/AuthLayout';
import MyLayout from '@layout/MyLayout';
import EmploymentLayout from '@layout/EmploymentLayout';
import SignupUniversityPage from '@pages/auth/SignupUniversityPage';
import SignupCompanyPage from '@pages/auth/SignupCompanyPage';
import SpecEditPage from '@pages/my/SpecEditPage';
import SpecPage from '@pages/my/SpecPage';
import StatusPage from '@pages/employment/StatusPage';
import CalendarPage from '@pages/employment/CalendarPage';
import TouchPage from '@pages/employment/TouchPage';
import LoungeLayout from '@layout/LoungeLayout';
import HomePage from '@pages/home/HomePage';
import SigninPage from '@pages/auth/SigninPage';
import SignupTypePage from '@pages/auth/SignupTypePage';
import SignupPersonalPage from '@pages/auth/SignupPersonalPage';

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
      element: <MyLayout />,
      children: [
        { path: 'spec', element: <SpecPage /> },
        { path: 'spec/edit', element: <SpecEditPage /> },
      ],
    },
    {
      path: '/employment',
      element: <EmploymentLayout />,
      children: [
        { path: 'status', element: <StatusPage /> },
        { path: 'touch', element: <TouchPage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'review', element: <HomePage /> },
      ],
    },
    {
      path: '/benchmark',
      element: <MyLayout />,
      children: [],
    },
    {
      path: '/mission',
      element: <MyLayout />,
      children: [],
    },
    {
      path: '/lounge',
      element: <LoungeLayout />,
      children: [
        { path: 'community', element: <StatusPage /> }, // 취업 이야기 페이지로 변경
        { path: 'corporate', element: <StatusPage /> }, // 기업 컨텐츠로 변경
      ],
    },
  ]);

export default router;
