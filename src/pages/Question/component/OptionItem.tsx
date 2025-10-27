// OptionItem.tsx
type OptionItemProps = {
  id: number;
  text: string;
  isSelected: boolean;
  onSelect: (id: number) => void;
  isHintOpen?: boolean; // 힌트 열림 여부
};

const OptionItem = ({
  id,
  text,
  isSelected,
  onSelect,
  isHintOpen = false,
}: OptionItemProps) => {
  const containerClasses = `
  w-72 rounded-xl flex items-center gap-7 cursor-pointer transition-all
  ${isSelected ? 'bg-primary' : 'bg-white'}
  ${isHintOpen ? 'p-2' : 'p-5'}
`;

  const circleClasses = `
  p-2 rounded-[20px] flex justify-center items-center
  ${isHintOpen ? 'w-7 h-3' : 'w-7 h-7'}
  ${isSelected ? 'bg-primary-bg' : 'bg-neutral-50'}
`;

  const numberClasses = `text-center text-base font-medium font-['Pretendard_Variable'] leading-normal text-primary`;

  const textClasses = `text-xl font-medium font-['Pretendard_Variable'] leading-7
        ${isSelected ? 'text-white' : 'text-black'}`;

  return (
    <div
      className={containerClasses}
      onClick={() => onSelect(id)}
      data-select={isSelected}
    >
      <div className={circleClasses}>
        <div className={numberClasses}>{id}</div>
      </div>
      <div className={textClasses}>{text}</div>
    </div>
  );
};

export default OptionItem;
