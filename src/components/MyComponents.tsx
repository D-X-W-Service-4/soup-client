import { useModalStore } from '../hooks/UserModal.hooks.ts';
import Button from './Button.tsx';

const MyComponents = () => {
  const { toggleUserModal } = useModalStore();

  const handleToggleUserModal = () => {
    toggleUserModal();
  };
  return (
    <div>
      <Button
        size="large"
        variant="primary"
        onClick={() => handleToggleUserModal()}
      >
        테스트
      </Button>
    </div>
  );
};

export default MyComponents;
