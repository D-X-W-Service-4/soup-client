import OptionItem from './OptionItem';

export type Option = {
  id: number;
  text: string;
};

type OptionListProps = {
  options: Option[];
  selectedOptionId: number | null;
  onSelect: (value: string | null) => void;
  isHintOpen?: boolean;
};

const OptionList = ({
  options,
  selectedOptionId,
  onSelect,
  isHintOpen = false,
}: OptionListProps) => {
  return (
    <div className="flex flex-col gap-7">
      {options.map((option) => (
        <OptionItem
          key={option.id}
          id={option.id}
          isSelected={selectedOptionId === option.id}
          onSelect={(id) => {
            if (id === null) {
              onSelect(null);
            } else {
              onSelect(String(id));
            }
          }}
          isHintOpen={isHintOpen}
        />
      ))}
    </div>
  );
};

export default OptionList;
