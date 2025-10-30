interface WorkBookSearchProps {
  title: string;
  isSelected: boolean;
  onToggle: () => void;
}
const WorkBookSearch = ({
  title,
  isSelected,
  onToggle,
}: WorkBookSearchProps) => {
  return (
    <div
      onClick={onToggle}
      className={`flex cursor-pointer flex-col items-start justify-start self-stretch border-b border-gray-300 px-3 py-2.5 transition-colors ${
        isSelected ? 'rounded-xl bg-gray-200' : 'hover:bg-gray-100'
      }`}
    >
      <div className="justify-start self-stretch text-lg leading-7 font-medium text-black">
        {title}
      </div>
    </div>
  );
};
export default WorkBookSearch;
