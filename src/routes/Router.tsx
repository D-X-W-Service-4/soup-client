import { createBrowserRouter, Navigate } from 'react-router-dom';
import NicknamePage from '../pages/onboarding/NicknamePage.tsx';
import StudyInfoPage from '../pages/onboarding/StudyInfoPage.tsx';
import StudyGuidePage from '../pages/onboarding/StudyGuidePage.tsx';
import LoginSuccessPage from '../pages/onboarding/LoginSuccessPage.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/onboarding/nickname" replace /> },
  { path: '/onboarding/nickname', element: <NicknamePage /> },
  { path: '/onboarding/studyInfo', element: <StudyInfoPage /> },
  { path: '/onboarding/studyGuide', element: <StudyGuidePage /> },
  { path: '/onboarding/loginSuccess', element: <LoginSuccessPage /> },
]);

export default router;
