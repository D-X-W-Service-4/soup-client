import { create } from 'zustand/react';

export default interface ModalState {
  isUserModalOpen: boolean;
  toggleUserModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isUserModalOpen: false,
  toggleUserModal: () =>
    set((state) => ({ isUserModalOpen: !state.isUserModalOpen })),
}));
