import { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar.tsx';
import UserInfoCard from './components/UserInfoCard.tsx';
import RankingCard from './components/RankingCard.tsx';
import RunDateCard from './components/RunDateCard.tsx';
import Planner from './components/Planner.tsx';
import PlannerFlameCard, {
  mockFlameData,
} from './components/PlannerFlameCard.tsx';
import type { plannerFlameItem } from '../../types/planner.ts';
import type { UserData } from '../../types/user.ts';
import { getUser } from '../../apis/userAPI.ts';

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<UserData | null>(null);
  const [flames, setFlames] = useState<plannerFlameItem[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [userResponse, flame] = await Promise.all([
          getUser(),
          mockFlameData(),
        ]);
        setData(userResponse.data);
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
                consecutiveFlames={data.flameRunDateCount}
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
