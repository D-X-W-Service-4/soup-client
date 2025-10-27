import { useState, useEffect, useRef } from 'react';

const EssayAnswerBox = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(7); // 초기 줄 개수
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const resizeHandler = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const lineHeight = 36; // 한 줄 높이
        const numRows = Math.floor(containerHeight / lineHeight);
        setRows(numRows > 3 ? numRows : 3); // 최소 3줄
      }
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  // 줄 배경용 div 생성
  const lineArray = Array.from({ length: rows });

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full max-w-3xl rounded-xl bg-white p-4 shadow-md"
    >
      {/* 줄 표시 */}
      {lineArray.map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute left-0 w-full border-b-[0.5px] border-gray-300"
          style={{ top: `${i * 36}px`, height: '36px' }}
        />
      ))}

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="여기에 답안을 작성해 주세요."
        rows={rows}
        className="h-full w-full resize-none bg-transparent p-2 font-['Pretendard_Variable'] text-base leading-normal outline-none"
        style={{ lineHeight: '36px' }}
      />
    </div>
  );
};

export default EssayAnswerBox;
