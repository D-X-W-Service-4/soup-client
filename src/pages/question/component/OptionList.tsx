import OptionItem from './OptionItem';

type OptionListProps = {
  options: string[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  isHintOpen?: boolean;
};

const OptionList = ({
  options,
  selectedId,
  onSelect,
  isHintOpen = false,
}: OptionListProps) => {
  return (
    <div className="flex flex-col gap-7">
      {options.map((text, index) => (
        <OptionItem
          key={index}
          id={index + 1}
          text={text}
          isSelected={selectedId === index + 1}
          onSelect={onSelect}
          isHintOpen={isHintOpen}
        />
      ))}
    </div>
  );
};

export default OptionList;
