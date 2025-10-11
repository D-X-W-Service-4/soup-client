import { useState } from 'react';
import IconChevronDown from '../../public/assets/svgs/IconChevronDown.tsx';

interface DropdownSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
const DropdownSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}: DropdownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOption = (item: string) => {
    onChange(item);
    setIsOpen(false);
  };
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col items-start justify-center gap-2 self-stretch">
      <div className="text-base leading-normal font-medium text-black">
        {label}
      </div>

      {isOpen ? (
        <div className="mt-1 flex w-full flex-col overflow-hidden rounded-lg bg-secondary-bg">
          {options.map((item) => (
            <div
              key={item}
              className="cursor-pointer px-3 py-3.5 text-sm hover:bg-neutral-200"
              onClick={() => handleClickOption(item)}
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg bg-secondary-bg px-3 py-3.5"
          onClick={toggleOpen}
        >
          <div className="text-xs leading-none font-normal text-zinc-500">
            {value === '' ? placeholder || '선택해주세요!' : value}
          </div>
          <IconChevronDown />
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
