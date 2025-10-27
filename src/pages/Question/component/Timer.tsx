import { useEffect, useState } from 'react';
import IconTimer from '../../../assets/IconTimer.tsx';

interface TimerProps {
  initialMinutes: number;
}

function Timer({ initialMinutes }: TimerProps) {
  const initialSeconds = initialMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time: number) => String(time).padStart(2, '0');

  return (
    <div className="inline-flex h-7 w-25 items-center justify-center gap-2 rounded-[32px] bg-white">
      <div className="relative h-6 w-6 overflow-hidden">
        <IconTimer />
      </div>
      <div className="justify-start text-center font-['Pretendard_Variable'] text-xl leading-7 font-bold text-red-500">
        {formatTime(minutes)} : {formatTime(seconds)}
      </div>
    </div>
  );
}

export default Timer;
