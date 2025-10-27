import { useState } from 'react';
import OptionItem from './OptionItem';

type OptionListProps = {
  options: string[];
};

const OptionList = ({
  options,
  isHintOpen = false,
}: OptionListProps & { isHintOpen?: boolean }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`flex flex-col gap-${isHintOpen ? '3' : '7'}`}>
      {options.map((text, index) => (
        <OptionItem
          key={index}
          id={index + 1}
          text={text}
          isSelected={selectedId === index + 1}
          onSelect={handleSelect}
          isHintOpen={isHintOpen}
        />
      ))}
    </div>
  );
};

export default OptionList;
