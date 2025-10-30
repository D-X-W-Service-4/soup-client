import { createBrowserRouter, Navigate } from 'react-router-dom';
import QuestionPage from '../pages/Question/QuestionPage.tsx';
import LoginPage from '../pages/Login/LoginPage.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/question" replace /> },
  { path: '/question', element: <QuestionPage /> },
  { path: '/Login', element: <LoginPage /> },
]);

export default router;
