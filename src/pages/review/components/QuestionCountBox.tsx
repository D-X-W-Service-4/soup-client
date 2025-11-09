interface QuestionCountBoxProps {
  all: number;
  correct: number;
  incorrect: number;
  starred: number;
}

export default function QuestionCountBox({
  all,
  correct,
  incorrect,
  starred,
}: QuestionCountBoxProps) {
  return (
    <div className="flex grid w-full grid-cols-4 gap-4">
      <div className="flex flex-col items-start justify-between gap-4 rounded-lg p-5 outline outline-[0.80px] outline-neutral-200">
        <span className="text-base font-medium">전체 문제</span>
        <span className="text-xl font-semibold">{all}</span>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 rounded-lg p-5 outline outline-[0.80px] outline-neutral-200">
        <span className="text-base font-medium">맞힌 문제</span>
        <span className="text-xl font-semibold">{correct}</span>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 rounded-lg p-5 outline outline-[0.80px] outline-neutral-200">
        <span className="text-base font-medium">틀린 문제</span>
        <span className="text-xl font-semibold">{incorrect}</span>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 rounded-lg p-5 outline outline-[0.80px] outline-neutral-200">
        <span className="text-base font-medium">별표 친 문제</span>
        <span className="text-xl font-semibold">{starred}</span>
      </div>
    </div>
  );
}
