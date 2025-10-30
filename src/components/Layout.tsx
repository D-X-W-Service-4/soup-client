import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-gray-100">
      <main className="h-[834px] w-[1194px] overflow-y-auto rounded-lg bg-white shadow-xl">
        <Outlet />
      </main>
    </div>
  );
}
