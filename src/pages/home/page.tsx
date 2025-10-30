import { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar.tsx';
import UserInfoCard from './components/UserInfoCard.tsx';
import RankingCard from './components/RankingCard.tsx';
import RunDateCard from './components/RunDateCard.tsx';
import Planner from './components/Planner.tsx';
import PlannerFlameCard, {
  mockFlameData,
} from './components/PlannerFlameCard.tsx';
import type { SoupLevel } from '../../types/soup.ts';
import type { plannerFlameItem } from '../../types/planner.ts';

interface UserInfoResponse {
  email: string;
  nickname: string;
  grade: string;
  term: number;
  solvedQuestionCount: number;
  starredQuestionCount: number;
  plannerAchievementRate: number;
  flameRunDateCount: number;
  soup: SoupLevel;
}

async function mockUserData(): Promise<UserInfoResponse> {
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
  const [flames, setFlames] = useState<plannerFlameItem[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [user, flame] = await Promise.all([
          mockUserData(),
          mockFlameData(),
        ]);
        setData(user);
        setFlames(flame);
      } catch (err) {
        setErr(err instanceof Error ? err.message : String(err));
      }
    })();
  }, []);

  if (err) {
    return <div className="p-6 text-warning">오류가 발생했습니다: {err}</div>;
  }

  return (
    <div className="flex h-dvh w-full bg-primary-bg p-5">
      <div className="flex h-full w-full gap-5">
        <SideBar isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />

        <main className="flex h-full flex-1 gap-5">
          {data && (
            <div className="flex h-full min-w-[304px] flex-col justify-between">
              <UserInfoCard
                email={data.email}
                nickname={data.nickname}
                grade={data.grade}
                term={data.term}
                solvedQuestionCount={data.solvedQuestionCount}
                starredQuestionCount={data.starredQuestionCount}
                plannerAchievementRate={data.plannerAchievementRate}
              />
              <RankingCard
                soup={data.soup}
                solvedQuestionCount={data.solvedQuestionCount}
              />
              <RunDateCard flameRunDateCount={data.flameRunDateCount} />
            </div>
          )}

          <div className="flex h-full min-w-[602px] flex-col gap-5">
            <PlannerFlameCard flames={flames} />
            <Planner />
          </div>
        </main>
      </div>
    </div>
  );
}
