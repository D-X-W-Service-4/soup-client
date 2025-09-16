import SideBar from './components/SideBar';

export default function App() {
  return (
    <div className="flex h-dvh w-full bg-primary-bg p-5">
      <div className="flex h-full w-full gap-6">
        <SideBar />

        <main className="flex h-full flex-1 flex-col rounded-[20px] bg-white p-10 shadow-base">
          <span className="text-xl font-semibold">메인</span>
        </main>
      </div>
    </div>
  );
}
