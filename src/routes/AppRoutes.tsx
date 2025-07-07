import { createBrowserRouter, useRoutes } from 'react-router-dom';

import MainLayout from "@layout/MainLayout";
// import SignTabs from '@routes/SignTabs';
import HomePage from '@pages/Home/HomePage'; 
// import SignInPage from '@pages/SignIn/SignInPage'; 

const AppRoutes = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        // { path: 'contest/:contestId', element: <ContestPage /> },
        // {
        //   path: 'signin',
        //   element: <SignInPage />,
        //   children: SignTabs,
        // },
        // {
        //   path: 'signUp',
        //   element: <SignUpPage />,
        //   children: SignTabs,
        // },
      ],
    },
  ]);

export default AppRoutes;