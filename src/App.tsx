import { useState } from 'react';
import SideBar from './components/SideBar';
import RankingCard from './pages/home/components/RankingCard';

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-dvh w-full bg-primary-bg p-5">
      <div className="flex h-full w-full gap-6">
        <SideBar isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />

        <main className="flex h-full flex-1 flex-col rounded-[20px] bg-white p-9 shadow-base">
          <RankingCard soup="CORN" flameRunDateCount={5} />
        </main>
      </div>
    </div>
  );
}
