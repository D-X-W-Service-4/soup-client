import { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar.tsx';
import RankingCard from './components/RankingCard.tsx';
import type { SoupLevel } from '../../types/soupType.ts';

type UserInfoResponse = {
  email: string;
  nickname: string;
  grade: string;
  term: number;
  solvedQuestionCount: number;
  starredQuestionCount: number;
  plannerAchievementRate: number;
  flameRunDateCount: number;
  soup: SoupLevel;
};

async function mockUser(): Promise<UserInfoResponse> {
  return {
    email: 'test@example.com',
    nickname: '황수민',
    grade: 'M1',
    term: 2,
    solvedQuestionCount: 50,
    starredQuestionCount: 10,
    plannerAchievementRate: 0.5,
    flameRunDateCount: 10,
    soup: 'TOMATO',
  };
}

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<UserInfoResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await mockUser();
        setData(json);
      } catch (e: any) {
        setErr(e?.message ?? 'Error');
      }
    })();
  }, []);

  return (
    <div className="flex h-dvh w-full bg-primary-bg p-5">
      <div className="flex h-full w-full gap-6">
        <SideBar isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />

        <main className="flex h-full flex-1 flex-col rounded-[20px] bg-white p-9 shadow-base">
          {data && (
            <RankingCard
              soup={data.soup}
              solvedQuestionCount={data.solvedQuestionCount}
            />
          )}
        </main>
      </div>
    </div>
  );
}
