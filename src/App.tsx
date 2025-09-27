import MyComponents from './components/MyComponents.tsx';
import UserModal from './components/modals/UserModal.tsx';

export default function App() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-primary-bg text-secondary">
      <MyComponents />
      <UserModal />
    </div>
  );
}
