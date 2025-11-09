import OptionItem from './OptionItem';

export type Option = {
  id: number;
  text: string;
};

type OptionListProps = {
  options: Option[];
  selectedOption: Option | null;
  onSelect: (option: Option | null) => void;
  isHintOpen?: boolean;
};

const cleanOptionText = (text: string): string => {
  return text.replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/, '').trim();
};

const OptionList = ({
  options,
  selectedOption,
  onSelect,
  isHintOpen = false,
}: OptionListProps) => {
  return (
    <div className="flex flex-col gap-7">
      {options.map((option) => {
        const displayText = cleanOptionText(option.text);
        return (
          <OptionItem
            key={option.id}
            id={option.id}
            text={displayText}
            isSelected={selectedOption?.id === option.id}
            onSelect={(id) => {
              const selected = options.find((o) => o.id === id) || null;
              onSelect(selected);
            }}
            isHintOpen={isHintOpen}
          />
        );
      })}
    </div>
  );
};

export default OptionList;
