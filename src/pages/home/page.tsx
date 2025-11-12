import { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar.tsx';
import UserInfoCard from './components/UserInfoCard.tsx';
import RankingCard from './components/RankingCard.tsx';
import RunDateCard from './components/RunDateCard.tsx';
import Planner from './components/Planner.tsx';
import PlannerFlameCard from './components/PlannerFlameCard.tsx';
import type { plannerFlameItem, PlannerData } from '../../types/planner.ts';
import type { UserData } from '../../types/user.ts';
import { getUser } from '../../apis/userAPI.ts';
import { getPlannerFlames, getPlanner } from '../../apis/plannerAPI.ts';
import dayjs from 'dayjs';

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<UserData | null>(null);
  const [flames, setFlames] = useState<plannerFlameItem[]>([]);
  const [planner, setPlanner] = useState<PlannerData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format('YYYY-MM-DD')
  );
  const [err, setErr] = useState<string | null>(null);

  const fetchData = async (newPlanner?: PlannerData) => {
    try {
      if (newPlanner) {
        setPlanner(newPlanner);
        return;
      }

      const today = dayjs();
      const startOfWeek = today.day(0); // 일요일
      const endOfWeek = today.day(6); // 토요일

      const startDate = startOfWeek.format('YYYY-MM-DD');
      const endDate = endOfWeek.format('YYYY-MM-DD');
      const todayDate = today.format('YYYY-MM-DD');

      const [userResponse, flamesResponse, plannerResponse] = await Promise.all(
        [
          getUser(),
          getPlannerFlames(startDate, endDate),
          getPlanner(todayDate).catch(() => null),
        ]
      );

      setData(userResponse.data);
      setFlames(flamesResponse.data.flames);
      setPlanner(plannerResponse?.data || null);
    } catch (err) {
      setErr(err instanceof Error ? err.message : String(err));
    }
  };

  const handleFlameUpdate = async () => {
    try {
      const today = dayjs();
      const startOfWeek = today.day(0);
      const endOfWeek = today.day(6);

      const startDate = startOfWeek.format('YYYY-MM-DD');
      const endDate = endOfWeek.format('YYYY-MM-DD');

      const flamesResponse = await getPlannerFlames(startDate, endDate);
      setFlames(flamesResponse.data.flames);
    } catch (err) {
      console.error('flame 데이터 갱신 실패:', err);
    }
  };

  const handleDateClick = async (date: string) => {
    try {
      console.log('날짜 클릭:', date);
      setSelectedDate(date);

      const plannerResponse = await getPlanner(date).catch(() => null);

      if (plannerResponse) {
        setPlanner(plannerResponse.data);
        console.log('플래너 조회 완료:', plannerResponse.data);
      } else {
        setPlanner(null);
        console.log('해당 날짜의 플래너가 없습니다.');
      }
    } catch (err) {
      console.error('플래너 조회 실패:', err);
      setPlanner(null);
    }
  };

  useEffect(() => {
    fetchData();
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
            <PlannerFlameCard
              flames={flames}
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
            <Planner
              planner={planner}
              onPlannerCreated={fetchData}
              onFlameUpdate={handleFlameUpdate}
              selectedDate={selectedDate}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
