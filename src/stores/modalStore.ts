import { create } from 'zustand/react';

export default interface ModalState {
  isUserModalOpen: boolean;
  isInfoModalOpen: boolean;
  toggleUserModal: () => void;
  openInfoModal: () => void;
  closeInfoModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isUserModalOpen: false,
  isInfoModalOpen: false,
  toggleUserModal: () =>
    set((state) => ({ isUserModalOpen: !state.isUserModalOpen })),
  openInfoModal: () => set({ isInfoModalOpen: true }),
  closeInfoModal: () => set({ isInfoModalOpen: false }),
}));
