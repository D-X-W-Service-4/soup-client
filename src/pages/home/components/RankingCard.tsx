import { SOUP } from '../../../types/soup.ts';
import type { SoupLevel } from '../../../types/soup.ts';

const BADGE: Record<SoupLevel, string> = {
  TOMATO: '/assets/badge/tomato.png',
  CORN: '/assets/badge/corn.png',
  MUSHROOM: '/assets/badge/mushroom.png',
  PUMPKIN: '/assets/badge/pumpkin.png',
  SWEETPOTATO: '/assets/badge/sweetpotato.png',
};

const SOUP_LABEL_KO: Record<SoupLevel, string> = {
  TOMATO: '토마토',
  CORN: '옥수수',
  MUSHROOM: '양송이',
  PUMPKIN: '단호박',
  SWEETPOTATO: '고구마',
};

const SOUP_TEXT_COLOR: Record<SoupLevel, string> = {
  TOMATO: 'text-red-600',
  CORN: 'text-yellow-400',
  MUSHROOM: 'text-orange-300',
  PUMPKIN: 'text-amber-700',
  SWEETPOTATO: 'text-purple-700',
};

type RankingCardProps = {
  soup: SoupLevel;
  solvedQuestionCount: number;
  perLevel?: number;
};

function nextSoup(current: SoupLevel, steps: number): SoupLevel {
  const idx = SOUP.indexOf(current);
  const nextIdx = Math.min(idx + Math.max(0, steps), SOUP.length - 1);
  return SOUP[nextIdx];
}

export default function RankingCard({
  soup,
  solvedQuestionCount,
  perLevel = 10,
}: RankingCardProps) {
  const safePer = Math.max(1, perLevel);
  const total = Math.max(0, Math.floor(Number(solvedQuestionCount) || 0));
  const levelUps = Math.floor(total / safePer);
  const displaySoup = nextSoup(soup, levelUps);
  let within = total % safePer;
  const remain = safePer - within;
  const progressPct = Math.round((within / safePer) * 100);

  const BadgeSrc = BADGE[displaySoup];
  const LabelKo = SOUP_LABEL_KO[displaySoup];
  const soupTextColor = SOUP_TEXT_COLOR[displaySoup];

  return (
    <div className="flex flex-col items-center justify-start gap-3 rounded-[20px] bg-white px-5 py-1 shadow-base">
      <div className="flex flex-col items-center justify-center">
        <img src={BadgeSrc} alt={`${LabelKo} 수프`} className="h-48 w-48" />
        <div className="flex text-3xl font-semibold">
          <span className={soupTextColor}>{LabelKo}</span>
          <span className="ml-2 text-secondary">수프</span>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-1 self-stretch pb-5">
        <span className="text-xs font-normal text-neutral-600">
          다음 수프까지 {remain}문제
        </span>
        <div className="w-full" aria-label="레벨 진행도">
          <div
            className="h-1.5 w-full rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-1.5 rounded-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
