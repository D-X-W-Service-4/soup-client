type RunDateCardProps = {
  flameRunDateCount: number;
};

export default function RunDateCard({ flameRunDateCount }: RunDateCardProps) {
  return (
    <div className="relative flex min-h-[230px] w-76 flex-col rounded-[20px] bg-gradient-to-br from-amber-500 to-amber-700 p-6 shadow-base">
      <div className="flex flex-col items-start justify-start gap-2">
        <span className="text-6xl font-bold text-white" aria-live="polite">
          {flameRunDateCount}일
        </span>
        <span className="text-xl font-medium text-white">연속 계획 달성!</span>
      </div>
      <div className="items-end">
        <img
          src="src/assets/logo/FlameLogo.png"
          alt="FlameLogo"
          className="absolute right-4 h-[110px] w-[140px] object-contain"
        />
      </div>
    </div>
  );
}
