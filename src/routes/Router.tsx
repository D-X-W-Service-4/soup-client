import { createBrowserRouter, Navigate } from 'react-router-dom';
import NicknamePage from '../pages/onboarding/NicknamePage.tsx';
import StudyInfoPage from '../pages/onboarding/StudyInfoPage.tsx';
import WorkBookPage from '../pages/onboarding/WorkBookPage.tsx';
import LoginSuccessPage from '../pages/onboarding/LoginSuccessPage.tsx';
import Layout from '../components/Layout.tsx';
import LevelTestStartPage from '../pages/levelTest/LevelTestStartPage.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      { path: '/', element: <Navigate to="/onboarding/nickname" replace /> },
      { path: '/onboarding/nickname', element: <NicknamePage /> },
      { path: '/onboarding/studyInfo', element: <StudyInfoPage /> },
      { path: '/onboarding/workBook', element: <WorkBookPage /> },
      { path: '/onboarding/loginSuccess', element: <LoginSuccessPage /> },
      { path: '/levelTest/levelTestStart', element: <LevelTestStartPage /> },
    ],
  },
]);

export default router;
