import { useState, useEffect } from 'react';
import {
  createPlanner,
  updatePlannerItemCheck,
  updatePlannerFeedback,
} from '../../../apis/plannerAPI';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import type { PlannerData } from '../../../types/planner';
import { Icon } from '@iconify/react';

dayjs.locale('ko');

interface PlannerProps {
  planner: PlannerData | null;
  onPlannerCreated: (newPlanner?: PlannerData) => void;
  onFlameUpdate?: () => void;
  onUserInfoUpdate?: () => void;
  selectedDate?: string;
}

export default function Planner({
  planner,
  onPlannerCreated,
  onFlameUpdate,
  onUserInfoUpdate,
  selectedDate,
}: PlannerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);
  const [localPlanner, setLocalPlanner] = useState<PlannerData | null>(planner);

  useEffect(() => {
    setLocalPlanner(planner);
  }, [planner]);

  const handleCreatePlanner = async () => {
    try {
      setIsCreating(true);
      const today = dayjs().format('YYYY-MM-DD');

      console.log('플래너 생성 요청:', { date: today });

      const response = await createPlanner({ date: today });

      console.log('플래너 생성 완료:', response.data);

      onPlannerCreated(response.data);
    } catch (error: any) {
      console.error('플래너 생성 중 오류 발생:', error);
      alert(
        error.response?.data?.message ||
          '플래너 생성 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleCheck = async (itemId: number, currentChecked: boolean) => {
    try {
      setUpdatingItemId(itemId);
      let updatedPlanner: PlannerData | null = null;
      if (localPlanner) {
        updatedPlanner = {
          ...localPlanner,
          items: localPlanner.items.map((item) =>
            item.plannerItemId === itemId
              ? { ...item, checked: !currentChecked }
              : item
          ),
        };
        setLocalPlanner(updatedPlanner);
      }

      await updatePlannerItemCheck(itemId, { checked: !currentChecked });

      console.log('플래너 항목 체크 업데이트 완료:', itemId, !currentChecked);

      if (updatedPlanner) {
        const allChecked = updatedPlanner.items.every((item) => item.checked);

        if (allChecked && !updatedPlanner.flame) {
          try {
            await updatePlannerFeedback(updatedPlanner.plannerId, {
              feedback: 'GOOD',
            });
            setLocalPlanner({
              ...updatedPlanner,
              flame: true,
            });
            if (onFlameUpdate) {
              onFlameUpdate();
            }
            // flame 업데이트 후 사용자 정보 갱신
            if (onUserInfoUpdate) {
              onUserInfoUpdate();
            }
          } catch (error) {
            console.error('flame 업데이트 실패:', error);
          }
        } else {
          // flame 업데이트가 아닌 경우에도 사용자 정보 갱신
          if (onUserInfoUpdate) {
            onUserInfoUpdate();
          }
        }
      }
    } catch (error: any) {
      console.error('플래너 항목 체크 중 오류 발생:', error);

      if (localPlanner) {
        setLocalPlanner({
          ...localPlanner,
          items: localPlanner.items.map((item) =>
            item.plannerItemId === itemId
              ? { ...item, checked: currentChecked }
              : item
          ),
        });
      }

      alert('플래너 항목 체크 중 오류가 발생했습니다.');
    } finally {
      setUpdatingItemId(null);
    }
  };

  if (!localPlanner) {
    const today = dayjs().format('YYYY-MM-DD');
    const isToday = selectedDate === today || !selectedDate;
    const isPast = selectedDate && dayjs(selectedDate).isBefore(today, 'day');

    return (
      <div className="flex h-full flex-col items-center justify-center gap-2.5 rounded-[20px] bg-white">
        <img
          src="/src/assets/logo/Logo.png"
          alt="로고"
          width={157}
          height={157}
          className="h-[157px] w-[157px]"
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            {isPast ? (
              <>
                <span className="text-xl font-normal">
                  해당 날짜의 플래너가 없습니다.
                </span>
                <span className="text-sm font-normal text-secondary">
                  {dayjs(selectedDate).format('MM월 DD일')}에는 플래너를
                  생성하지 않았어요.
                </span>
              </>
            ) : (
              <>
                <span className="text-xl font-normal">
                  아직 오늘의 플래너를 생성하지 않았어요!
                </span>
                <span className="text-sm font-normal text-secondary">
                  지금까지의 피드백을 바탕으로 한 오늘의 플래너를 만들어 보세요.
                </span>
              </>
            )}
          </div>

          {isToday && (
            <div className="flex justify-center">
              <button
                type="button"
                className="rounded-[20px] bg-primary px-20 py-2.5 text-base text-white disabled:opacity-50"
                onClick={handleCreatePlanner}
                disabled={isCreating}
              >
                {isCreating ? '생성 중...' : '플래너 생성하기'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto rounded-[20px] bg-white px-6 py-7">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold text-neutral-600">
          {dayjs(localPlanner.date).format('MM월 DD일 (ddd)')}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {localPlanner.items.map((item) => (
          <div
            key={item.plannerItemId}
            className="flex items-center justify-start gap-6 rounded-2xl bg-white px-5 py-3 outline outline-offset-[-1px] outline-neutral-100"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() =>
                handleToggleCheck(item.plannerItemId, item.checked)
              }
              disabled={updatingItemId === item.plannerItemId}
              className="mt-1 h-5 w-5 cursor-pointer appearance-none rounded-[5px] border-2 border-gray-300 bg-gray-300 checked:border-primary checked:bg-primary"
              style={{
                backgroundImage: item.checked
                  ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`
                  : 'none',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="flex-1">
              <p className="text-base font-normal text-neutral-600">
                {item.content}
              </p>
              <div className="flex items-center gap-1">
                <Icon icon="basil:clock-outline" className="text-primary" />
                <p className="mt-1 text-xs font-normal text-neutral-500">
                  예상 소요 시간: {item.duration}분
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {localPlanner.items.length === 0 && (
        <div className="flex h-full items-center justify-center text-secondary">
          플래너 항목이 없습니다.
        </div>
      )}
    </div>
  );
}
