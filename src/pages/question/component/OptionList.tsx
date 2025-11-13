import OptionItem from './OptionItem';

export type Option = {
  id: number;
  text: string;
};

type OptionListProps = {
  options: Option[];
  selectedOptionIds: number[];
  onSelect: (value: string[]) => void;
  isHintOpen?: boolean;
};

const OptionList = ({
  options,
  selectedOptionIds,
  onSelect,
  isHintOpen = false,
}: OptionListProps) => {
  const handleToggle = (id: number) => {
    const currentIds = selectedOptionIds || [];
    const newIds = currentIds.includes(id)
      ? currentIds.filter((selectedId) => selectedId !== id)
      : [...currentIds, id];
    onSelect(newIds.map(String));
  };

  return (
    <div className="flex flex-col gap-7">
      {options.map((option) => (
        <OptionItem
          key={option.id}
          id={option.id}
          isSelected={selectedOptionIds?.includes(option.id) ?? false}
          onSelect={handleToggle}
          isHintOpen={isHintOpen}
        />
      ))}
    </div>
  );
};

export default OptionList;
