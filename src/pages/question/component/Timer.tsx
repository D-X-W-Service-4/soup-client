import { useState, useEffect } from 'react';
import IconTimer from '../../../assets/svgs/IconTimer.tsx';

interface TimerProps {
  initialMinutes: number;
  onTimeUp?: () => void;
}

function Timer({ initialMinutes, onTimeUp }: TimerProps) {
  const initialSeconds = initialMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time: number) => String(time).padStart(2, '0');

  return (
    <div className="inline-flex h-7 w-25 items-center justify-center gap-2 rounded-[32px] bg-white">
      <div className="relative h-6 w-6 overflow-hidden">
        <IconTimer />
      </div>
      <div className="font-['Pretendard_Variable'] text-xl font-bold text-red-500">
        {formatTime(minutes)} : {formatTime(seconds)}
      </div>
    </div>
  );
}

export default Timer;
