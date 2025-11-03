type BadgeVariant = 'easy' | 'medium' | 'hard';

const COLOR_MAP: Record<BadgeVariant, string> = {
  easy: 'bg-green-50 text-lime-500',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-800',
};

const LABEL_MAP: Record<BadgeVariant, string> = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
};

export default function DifficultyBadge({
  variant,
}: {
  variant: BadgeVariant;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[10px] px-2.5 py-1 text-xs font-semibold ${COLOR_MAP[variant]}`}
      aria-label={`난이도: ${LABEL_MAP[variant]}`}
    >
      {LABEL_MAP[variant]}
    </span>
  );
}
