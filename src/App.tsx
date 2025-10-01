import UserInfoModal from './components/UserInfoModal.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router.tsx';
import Button from './components/Button.tsx';
import { useModalStore } from './stores/modalStore.ts';

export default function App() {
  const { toggleUserModal } = useModalStore();
  return (
    <>
      {/*<RouterProvider router={router} />(*/}
      {/*<div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-primary-bg text-secondary">*/}
      {/*  <UserInfoModal />*/}
      {/*</div>*/}
      {/*)*/}
      <Button size="large" variant="primary" onClick={toggleUserModal}>
        테스트
      </Button>
      <UserInfoModal />
    </>
  );
}
