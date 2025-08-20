import { createBrowserRouter } from 'react-router-dom';

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
import ApplyListPage from '@pages/employment/ApplyListPage';
import ApplicationDetailPage from '@pages/employment/ApplicationDetailPage';
import CalendarPage from '@pages/employment/CalendarPage';
import TouchPage from '@pages/employment/TouchPage';
import ReviewPage from '@pages/employment/ReviewPage';
import LoungeLayout from '@layout/LoungeLayout';
import HomePage from '@pages/home/HomePage';
import SigninPage from '@pages/auth/SigninPage';
import SignupTypePage from '@pages/auth/SignupTypePage';
import SignupPersonalPage from '@pages/auth/SignupPersonalPage';
import BenchmarkPage from '@pages/benchmark/BenchmarkPage';
import MissionPage from '@pages/mission/MissionPage';
import CommunityPage from '@pages/lounge/CommunityPage';
import CorporatePage from '@pages/lounge/CorporatePage';
import ReviewWritePage from '@pages/employment/ReviewWritePage';
import DocumentViewerPage from '@pages/employment/DocumentViewerPage';

const router = createBrowserRouter([
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
      { path: 'apply', element: <ApplyListPage /> },
      { path: 'applications/:id', element: <ApplicationDetailPage /> },
      { path: 'touch', element: <TouchPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'review', element: <ReviewPage /> },
      { path: 'review/write', element: <ReviewWritePage /> },
    ],
  },
  {
    path: '/benchmark',
    element: <BenchmarkLayout />,
    children: [
      { index: true, element: <BenchmarkPage /> },
    ],
  },
  {
    path: '/mission',
    element: <MissionLayout />,
    children: [
      { index: true, element: <MissionPage /> },
    ],
  },
  {
    path: '/lounge',
    element: <LoungeLayout />,
    children: [
      { path: 'community', element: <CommunityPage /> },
      { path: 'corporate', element: <CorporatePage /> },
    ],
  },
  {
    path: '/document-viewer',
    element: <DocumentViewerPage />,
  },
]);

export default router;
