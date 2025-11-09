import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import NicknamePage from '../pages/onboarding/NicknamePage.tsx';
import StudyInfoPage from '../pages/onboarding/StudyInfoPage.tsx';
import WorkBookPage from '../pages/onboarding/WorkBookPage.tsx';
import LoginSuccessPage from '../pages/onboarding/LoginSuccessPage.tsx';
import Layout from '../components/Layout.tsx';
import HomePage from '../pages/home/page.tsx';
import QuestionPage from '../pages/question/QuestionPage.tsx';
import LoginPage from '../pages/login/LoginPage.tsx';
import TestResultPage from '../pages/test/result/page.tsx';
import TestHistoryPage from '../pages/test/hist/page.tsx';
import ReviewPage from '../pages/review/page.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      // { path: '/', element: <Navigate to="/onboarding/nickname" replace /> },
      { path: '/onboarding/nickname', element: <NicknamePage /> },
      { path: '/onboarding/studyInfo', element: <StudyInfoPage /> },
      { path: '/onboarding/workBook', element: <WorkBookPage /> },
      { path: '/onboarding/loginSuccess', element: <LoginSuccessPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/', element: <HomePage /> },
      { path: '/review', element: <ReviewPage /> },
      {
        path: '/test',
        element: <Outlet />,
        children: [
          { path: 'go', element: <QuestionPage /> },
          { path: 'result', element: <TestHistoryPage /> },
          { path: 'result/:testId', element: <TestResultPage /> },
        ],
      },
      {
        path: '/my',
        element: <Outlet />,
        children: [
          { path: 'learning', element: <div>학습 정보 변경</div> },
          { path: 'info', element: <div>내 정보 수정</div> },
          { path: 'logout', element: <div>로그아웃</div> },
        ],
      },
    ],
  },
]);

export default router;
