// src/components/MultipleChoiceBox.tsx
import { useState } from 'react';

const MultipleChoiceBox = () => {
  const [answer, setAnswer] = useState('');

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-white p-8 shadow-md">
      <textarea
        className="h-full w-full resize-none bg-white p-2 text-base outline-none"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="여기에 자유롭게 풀이를 작성해 주세요."
      />
    </div>
  );
};

export default MultipleChoiceBox;
