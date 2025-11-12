import { createBrowserRouter, Navigate } from 'react-router-dom';
import NicknamePage from '../pages/onboarding/NicknamePage.tsx';
import StudyInfoPage from '../pages/onboarding/StudyInfoPage.tsx';
import WorkBookPage from '../pages/onboarding/WorkBookPage.tsx';
import LoginSuccessPage from '../pages/onboarding/LoginSuccessPage.tsx';
import Layout from '../components/Layout.tsx';
import LevelTestStartPage from '../pages/levelTest/LevelTestStartPage.tsx';
import QuestionPage from '../pages/question/QuestionPage.tsx';
import StudyPage from '../pages/question/StudyPage.tsx';
import HomePage from '../pages/home/page.tsx';
import LoginPage from '../pages/login/LoginPage.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      { path: '/', element: <Navigate to="/login" replace /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/onboarding/nickname', element: <NicknamePage /> },
      { path: '/onboarding/studyInfo', element: <StudyInfoPage /> },
      { path: '/onboarding/workBook', element: <WorkBookPage /> },
      { path: '/onboarding/loginSuccess', element: <LoginSuccessPage /> },
      { path: '/levelTest/levelTestStart', element: <LevelTestStartPage /> },
      { path: '/levelTest/levelTest', element: <LevelTestStartPage /> },
      { path: '/question/test', element: <QuestionPage /> },
      { path: '/question/study', element: <StudyPage /> },
      { path: '/home', element: <HomePage /> },
    ],
  },
]);

export default router;
