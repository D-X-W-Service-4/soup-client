// src/components/Layout.tsx

import { Outlet } from 'react-router-dom';
import UserInfoModal from './UserInfoModal'; // 모달만 임포트

export default function Layout() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-gray-100">
      <main className="h-[834px] w-[1194px] overflow-y-auto rounded-lg bg-white shadow-xl">
        <Outlet />
      </main>

      <UserInfoModal />
    </div>
  );
}
