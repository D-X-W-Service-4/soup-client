import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import type {
  plannerFlameItem,
  flameDateCardProps,
} from '../../../types/planner.ts';

const DAY = ['일', '월', '화', '수', '목', '금', '토'] as const;

export function getThisWeek(): string[] {
  const sunday = dayjs().day(0);
  return Array.from({ length: 7 }, (_, i) =>
    sunday.add(i, 'day').format('YYYY-MM-DD')
  );
}

export async function mockFlameData(): Promise<plannerFlameItem[]> {
  const week = getThisWeek();
  const demo: Record<string, boolean> = {
    [week[0]]: true,
    [week[1]]: true,
    [week[2]]: true,
    [week[3]]: true,
    [week[4]]: false,
    [week[5]]: false,
    [week[6]]: false,
  };
  return week.map((d) => ({ date: d, flame: demo[d] }));
}

export default function PlannerFlameCard({ flames }: flameDateCardProps) {
  const week = getThisWeek();
  const map = new Map(flames.map((f) => [f.date, f.flame]));
  const items = week.map((d, i) => ({
    date: d,
    day: DAY[i],
    flame: map.get(d) ?? false,
  }));

  return (
    <div className="flex flex-col items-center rounded-[20px] bg-white px-9 py-3 shadow-base">
      <div className="flex w-full justify-between">
        {items.map(({ date, day, flame }) => (
          <div key={date} className="flex flex-col items-center gap-1">
            {flame ? (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xl font-normal text-white">
                {date.slice(8)}
              </span>
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-400 text-xl font-normal text-white">
                {date.slice(8)}
              </span>
            )}
            <span className="text-xs font-normal text-secondary">{day}</span>
            {flame ? (
              <Icon icon="fluent-emoji-flat:fire" className="h-5 w-5" />
            ) : (
              <Icon
                icon="fluent-emoji-high-contrast:fire"
                className="h-5 w-5 text-gray-400"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
