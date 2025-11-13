import FlameLogo from '../../../assets/logo/FlameLogo.svg';

interface RunDateCardProps {
  flameRunDateCount: number;
}

export default function RunDateCard({ flameRunDateCount }: RunDateCardProps) {
  return (
    <div className="relative min-h-[230px] overflow-hidden rounded-[20px] bg-gradient-to-br from-amber-600 to-amber-700 p-6">
      <div className="relative z-10 flex flex-col items-start gap-2">
        <span className="text-6xl font-bold text-white" aria-live="polite">
          {flameRunDateCount}일
        </span>
        <span className="text-xl font-medium text-white">연속 계획 달성!</span>
      </div>
      <img
        src={FlameLogo}
        alt="FlameLogo"
        width={140}
        height={110}
        className="absolute right-4 bottom-0 object-contain"
      />
    </div>
  );
}
