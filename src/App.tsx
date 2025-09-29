import UserInfoModal from './components/UserInfoModal.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router.tsx';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />(
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-primary-bg text-secondary">
        <UserInfoModal />
      </div>
      )
    </>
  );
}
