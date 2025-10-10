const SOUP = ['TOMATO', 'CORN', 'MUSHROOM', 'PUMPKIN', 'SWEETPOTATO'] as const;
export type SoupLevel = (typeof SOUP)[number];

const BADGE: Record<SoupLevel, string> = {
  TOMATO: 'src/assets/badge/tomato.png',
  CORN: 'src/assets/badge/corn.png',
  MUSHROOM: 'src/assets/badge/mushroom.png',
  PUMPKIN: 'src/assets/badge/pumpkin.png',
  SWEETPOTATO: 'src/assets/badge/sweetpotato.png',
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

function soupLevelIndex(soup: SoupLevel) {
  const i = SOUP.indexOf(soup);
  return i >= 0 ? i + 1 : 1;
}

type RankingCardProps = {
  soup: SoupLevel;
  flameRunDateCount: number;
  perLevel?: number;
};

export default function RankingCard({
  soup,
  flameRunDateCount,
  perLevel = 10,
}: RankingCardProps) {
  const level = soupLevelIndex(soup);
  const BadgeSrc = BADGE[soup];
  const LabelKo = SOUP_LABEL_KO[soup];

  const within = Math.max(
    0,
    Math.min(perLevel, Math.floor(Number(flameRunDateCount) || 0))
  );
  const progressPct = Math.round((within / perLevel) * 100);
  const remain = Math.max(0, perLevel - within);

  const soupTextColor = SOUP_TEXT_COLOR[soup];

  return (
    <div className="flex h-80 w-72 flex-col items-center justify-start gap-3 rounded-[20px] px-5 py-3 shadow-base">
      <div className="flex flex-col items-center justify-center">
        <span className="font-semibold">현재 레벨</span>
        <img src={BadgeSrc} className="h-48 w-48" />
        <div className="flex text-3xl font-semibold">
          <span className={soupTextColor}>{LabelKo}</span>
          <span className="ml-2 text-secondary">수프</span>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-1 self-stretch">
        <span className="text-xs font-normal text-neutral-600">
          다음 수프까지 {remain}일
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
