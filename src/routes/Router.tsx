import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { useAuthStore } from '../stores/UseAuthorStore.ts';
import CallbackPage from '../pages/login/CallbackPage.tsx';
import axiosInstance from '../apis/axiosInstance';

const RootRedirect = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearToken = useAuthStore((state) => state.clearToken);
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!accessToken) {
        setIsValidating(false);
        setIsValid(false);
        return;
      }

      try {
        // 토큰 유효성 검증을 위해 간단한 API 호출
        await axiosInstance.get('/v1/users/me');
        setIsValid(true);
      } catch (error: any) {
        // 토큰이 유효하지 않으면 제거
        console.warn(
          '저장된 토큰이 유효하지 않습니다. 로그인 페이지로 이동합니다.'
        );
        clearToken();
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [accessToken, clearToken]);

  if (isValidating) {
    return (
      <div className="flex h-screen items-center justify-center">
        로딩 중...
      </div>
    );
  }

  return isValid ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
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
      { path: '/callback', element: <CallbackPage /> },
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
