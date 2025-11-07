import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function SelectButton() {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'isStarred'>(
    'all'
  );

  return (
    <div className="flex h-10 items-center justify-between self-stretch rounded-md bg-neutral-50 px-[3px]">
      <button
        type="button"
        onClick={() => setFilter('all')}
        className={`flex h-9 flex-1 items-center justify-center gap-2.5 rounded-md ${
          filter === 'all'
            ? 'bg-primary text-white'
            : 'bg-primary-bg text-secondary'
        }`}
      >
        <Icon icon="akar-icons:book" className="h-4 w-4" />
        <span className="justify-start text-center text-sm font-normal">
          풀었던 문제 전체
        </span>
      </button>
      <button
        type="button"
        onClick={() => setFilter('incorrect')}
        className={`flex h-9 flex-1 items-center justify-center gap-2 rounded-lg ${
          filter === 'incorrect'
            ? 'bg-primary text-white'
            : 'bg-primary-bg text-secondary'
        }`}
      >
        <Icon icon="lets-icons:close-ring" className="h-4 w-4" />
        <div className="justify-start text-center text-sm font-semibold">
          틀린 문제
        </div>
      </button>
      <button
        type="button"
        onClick={() => setFilter('isStarred')}
        className={`flex h-9 flex-1 items-center justify-center gap-2 rounded-lg ${
          filter === 'isStarred'
            ? 'bg-primary text-white'
            : 'bg-primary-bg text-secondary'
        }`}
      >
        <Icon icon="mingcute:star-line" className="h-4 w-4" />
        <div className="justify-start text-center text-sm font-semibold">
          별표 친 문제
        </div>
      </button>
    </div>
  );
}
