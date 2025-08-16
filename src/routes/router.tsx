import { createBrowserRouter, useRoutes } from 'react-router-dom';

import MainLayout from '@layout/MainLayout';
import AuthLayout from '@layout/AuthLayout';
import MyLayout from '@layout/MyLayout';
import EmploymentLayout from '@layout/EmploymentLayout';
import BenchmarkLayout from '@layout/BenchmarkLayout';
import MissionLayout from '@layout/MissionLayout';
import SignupUniversityPage from '@pages/auth/SignupUniversityPage';
import SignupCompanyPage from '@pages/auth/SignupCompanyPage';
import SpecEditPage from '@pages/my/SpecEditPage';
import SpecPage from '@pages/my/SpecPage';
import StatusPage from '@pages/employment/StatusPage';
import CalendarPage from '@pages/employment/CalendarPage';
import TouchPage from '@pages/employment/TouchPage';
import ReviewPage from '@pages/employment/ReviewPage';
import LoungeLayout from '@layout/LoungeLayout';
import HomePage from '@pages/home/HomePage';
import SigninPage from '@pages/auth/SigninPage';
import SignupTypePage from '@pages/auth/SignupTypePage';
import SignupPersonalPage from '@pages/auth/SignupPersonalPage';
import ListPage from '@pages/benchmark/ListPage';
import HistoryPage from '@pages/mission/HistoryPage';
import CommunityPage from '@pages/lounge/CommunityPage';
import CorporatePage from '@pages/lounge/CorporatePage';
import ReviewWritePage from '@pages/employment/ReviewWritePage';

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
        { path: 'review', element: <ReviewPage /> },
        { path: 'review/write', element: <ReviewWritePage /> },
      ],
    },
    {
      path: '/benchmark',
      element: <BenchmarkLayout />,
      children: [{ path: 'list', element: <ListPage /> }], //변경해도 됨
    },
    {
      path: '/mission',
      element: <MissionLayout />,
      children: [{ path: 'history', element: <HistoryPage /> }], //변경해도 됨
    },
    {
      path: '/lounge',
      element: <LoungeLayout />,
      children: [
        { path: 'community', element: <CommunityPage /> },
        { path: 'corporate', element: <CorporatePage /> },
      ],
    },
  ]);

export default router;
