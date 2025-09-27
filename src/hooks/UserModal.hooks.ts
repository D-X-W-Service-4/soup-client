import { create } from 'zustand/react';
import type ModalState from '../types/UserModal.types.ts';

export const useModalStore = create<ModalState>((set) => ({
  isUserModalOpen: false,
  toggleUserModal: () =>
    set((state) => ({ isUserModalOpen: !state.isUserModalOpen })),
}));
