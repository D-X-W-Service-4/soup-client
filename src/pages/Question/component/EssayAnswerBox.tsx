import { useRef } from 'react';

interface EssayAnswerBoxProps {
  value: string;
  onChange: (val: string) => void;
}

const EssayAnswerBox = ({ value, onChange }: EssayAnswerBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const lineHeight = 36;
  const totalRows = 100; //일단 넉넉하게 잡아서 하는 방법으로 했습니다..
  const lineArray = Array.from({ length: totalRows });

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full flex-col overflow-auto rounded-xl bg-white p-8 shadow-md"
    >
      {lineArray.map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute left-0 w-full border-b-[0.5px] border-gray-300"
          style={{ top: `${i * lineHeight}px`, height: `${lineHeight}px` }}
        />
      ))}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="여기에 자유롭게 풀이를 작성해 주세요."
        rows={totalRows}
        className="absolute top-0 left-0 w-full resize-none bg-transparent p-2 font-['Pretendard_Variable'] text-base leading-normal outline-none"
        style={{
          lineHeight: `${lineHeight}px`,
          minHeight: `${lineHeight * totalRows}px`,
        }}
      />
    </div>
  );
};

export default EssayAnswerBox;
