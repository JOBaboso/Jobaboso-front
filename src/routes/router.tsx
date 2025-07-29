import { createBrowserRouter, useRoutes } from 'react-router-dom';

import MainLayout from '@layout/MainLayout';
import AuthLayout from '@layout/AuthLayout';
import PersonalLayout from '@layout/PersonalLayout';
import HomePage from '@pages/Home/HomePage';
import SignupTypePage from '@pages/auth/SignUpTypePage';
import SigninPage from '@pages/auth/SignInPage';
import SignupPersonalPage from '@pages/auth/SignUpPersonalPage';
import SignupUniversityPage from '@pages/auth/SignupUniversityPage';
import SignupCompanyPage from '@pages/auth/SignupCompanyPage';
import ResumeEditPage from '@pages/my/ResumeEditPage';
import ResumePage from '@pages/my/ResumePage' ;
import StatusPage from '@pages/my/StatusPage';
import CalendarPage from '@pages/my/CalendarPage';
import TouchPage from '@pages/my/TouchPage';

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
        { path: 'resume', element: <ResumePage /> },
        { path: 'resume/edit', element: <ResumeEditPage /> },
        { path: 'status', element: <StatusPage /> },
        { path: 'touch', element: <TouchPage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'review', element: <HomePage /> },
      ],
    },
  ]);

export default router;
