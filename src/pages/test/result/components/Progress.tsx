interface ProgressProps {
  label: string;
  value: string;
  sub: string;
  progress: number;
}

export default function Progress({
  label,
  value,
  sub,
  progress,
}: ProgressProps) {
  const p = Number.isNaN(progress) ? 0 : Math.max(0, Math.min(1, progress));
  const angle = p * 360;
  return (
    <div className="flex items-center justify-center gap-10 text-primary">
      <div className="text-base font-semibold text-neutral-500">{label}</div>

      <div
        className="relative h-32 w-32"
        role="progressbar"
        aria-valuenow={Math.round(p * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="h-full w-full rounded-full outline outline-[12px] outline-offset-[-6px] outline-primary-bg" />

        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, currentColor 0deg ${angle}deg, transparent ${angle}deg 360deg)`,
            WebkitMask:
              'radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)',
          }}
        />

        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold text-neutral-600">
              {value}
            </div>
            <div className="text-xs font-normal text-neutral-400">{sub}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
