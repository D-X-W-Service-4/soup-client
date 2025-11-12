import React from 'react';

type AnswerInputProps = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onAnswerChange: (answer: string) => void;
};

function AnswerInput({
  value,
  placeholder = '정답을 입력하세요.',
  disabled = false,
  onAnswerChange,
}: AnswerInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(event.target.value);
  };

  return (
    <div className="inline-flex h-14 items-center justify-start gap-2.5 self-stretch overflow-hidden rounded-lg bg-white p-4">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className="h-full w-full border-none bg-transparent font-['Pretendard_Variable'] text-sm leading-tight font-medium text-neutral-600 focus:outline-none"
      />
    </div>
  );
}

export default AnswerInput;
