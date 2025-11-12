import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import NicknamePage from '../pages/onboarding/NicknamePage.tsx';
import StudyInfoPage from '../pages/onboarding/StudyInfoPage.tsx';
import WorkBookPage from '../pages/onboarding/WorkBookPage.tsx';
import LoginSuccessPage from '../pages/onboarding/LoginSuccessPage.tsx';
import Layout from '../components/Layout.tsx';
import LevelTestStartPage from '../pages/levelTest/LevelTestStartPage.tsx';
import QuestionPage from '../pages/question/QuestionPage.tsx';
import LoginPage from '../pages/login/LoginPage.tsx';
import StudyPage from '../pages/question/StudyPage.tsx';
import HomePage from '../pages/home/page.tsx';
import TestResultPage from '../pages/test/result/page.tsx';
import TestHistoryPage from '../pages/test/hist/page.tsx';
import ReviewPage from '../pages/review/page.tsx';
import { useAuthStore } from '../stores/authStore.ts';

const RootRedirect = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? (
    <HomePage />
  ) : (
    <Navigate to="/onboarding/nickname" replace />
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      { path: '/', element: <RootRedirect /> },
      { path: '/home', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/review', element: <ReviewPage /> },
      {
        path: '/onboarding',
        element: <Outlet />,
        children: [
          { path: 'nickname', element: <NicknamePage /> },
          { path: 'study-info', element: <StudyInfoPage /> },
          { path: 'workbook', element: <WorkBookPage /> },
          { path: 'success', element: <LoginSuccessPage /> },
        ],
      },
      {
        path: '/level-test',
        element: <Outlet />,
        children: [{ path: 'start', element: <LevelTestStartPage /> }],
      },
      {
        path: '/question',
        element: <Outlet />,
        children: [
          { path: 'test', element: <QuestionPage /> },
          { path: 'study', element: <StudyPage /> },
        ],
      },
      {
        path: '/test',
        element: <Outlet />,
        children: [
          { path: 'go', element: <LevelTestStartPage /> },
          { path: 'result', element: <TestHistoryPage /> },
          { path: 'result/:testId', element: <TestResultPage /> },
        ],
      },
    ],
  },
]);

export default router;
