import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import type { flameDateCardProps } from '../../../types/planner.ts';

const DAY = ['일', '월', '화', '수', '목', '금', '토'] as const;

export function getThisWeek(): string[] {
  const sunday = dayjs().day(0);
  return Array.from({ length: 7 }, (_, i) =>
    sunday.add(i, 'day').format('YYYY-MM-DD')
  );
}

interface PlannerFlameCardExtendedProps extends flameDateCardProps {
  onDateClick?: (date: string) => void;
  selectedDate?: string;
}

export default function PlannerFlameCard({
  flames,
  onDateClick,
  selectedDate,
}: PlannerFlameCardExtendedProps) {
  const week = getThisWeek();
  const map = new Map(flames.map((f) => [f.date, f.flame]));
  const today = dayjs().format('YYYY-MM-DD');
  const items = week.map((d, i) => ({
    date: d,
    day: DAY[i],
    flame: map.get(d) ?? false,
    isPast: dayjs(d).isBefore(today, 'day'),
    isToday: d === today,
    isFuture: dayjs(d).isAfter(today, 'day'),
    isSelected: d === selectedDate,
  }));

  const handleDateClick = (date: string, isPast: boolean, isToday: boolean) => {
    if ((isPast || isToday) && onDateClick) {
      onDateClick(date);
    }
  };

  return (
    <div className="flex flex-col items-center rounded-[20px] bg-white px-9 py-3">
      <div className="flex w-full justify-between">
        {items.map(
          ({ date, day, flame, isPast, isToday, isFuture, isSelected }) => {
            const isClickable = isPast || isToday;
            return (
              <div
                key={date}
                className={`flex flex-col items-center gap-1 ${
                  isClickable
                    ? 'cursor-pointer hover:opacity-80'
                    : 'cursor-not-allowed opacity-60'
                }`}
                onClick={() => handleDateClick(date, isPast, isToday)}
              >
                {isToday || flame ? (
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      isFuture ? 'bg-primary/50' : 'bg-primary'
                    } text-xl font-normal text-white ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  >
                    {date.slice(8)}
                  </span>
                ) : (
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      isFuture ? 'bg-gray-300' : 'bg-gray-400'
                    } text-xl font-normal ${isFuture ? 'text-gray-500' : 'text-white'} ${isSelected ? 'ring-2 ring-gray-400 ring-offset-2' : ''}`}
                  >
                    {date.slice(8)}
                  </span>
                )}
                <span
                  className={`text-xs font-normal ${isFuture ? 'text-gray-400' : 'text-secondary'}`}
                >
                  {day}
                </span>
                {flame ? (
                  <Icon icon="fluent-emoji-flat:fire" className="h-5 w-5" />
                ) : (
                  <Icon
                    icon="fluent-emoji-high-contrast:fire"
                    className={`h-5 w-5 ${isFuture ? 'text-gray-300' : 'text-gray-400'}`}
                  />
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
