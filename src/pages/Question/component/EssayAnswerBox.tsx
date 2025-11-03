import { useRef } from 'react';

interface EssayAnswerBoxProps {
  value: string;
  onChange: (val: string) => void;
}

const EssayAnswerBox = ({ value, onChange }: EssayAnswerBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const lineHeight = 60;
  const totalRows = 100;
  const lineArray = Array.from({ length: totalRows });

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full flex-col overflow-auto rounded-xl bg-white px-10 py-12 shadow-md"
    >
      {lineArray.map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute inset-x-10 border-b-[0.5px] border-gray-300"
          style={{
            top: `${i * lineHeight + 8}px`,
            height: `${lineHeight}px`,
            left: '80px',
            right: '80px',
          }}
        />
      ))}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="여기에 자유롭게 풀이를 작성해 주세요."
        rows={totalRows}
        className="absolute top-0 left-0 w-full resize-none bg-transparent px-20 py-4 font-['Pretendard_Variable'] text-base leading-relaxed outline-none"
        style={{
          lineHeight: `${lineHeight}px`,
          minHeight: `${lineHeight * totalRows}px`,
        }}
      />
    </div>
  );
};

export default EssayAnswerBox;
