import { useState } from 'react';
import IconChevronDown from '../assets/svgs/IconChevronDown.tsx';

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
  placeholder = '선택해주세요!',
}: DropdownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex flex-col items-start justify-center gap-2 self-stretch">
      <div className="text-base leading-normal font-medium text-black">
        {label}
      </div>
      <div
        className="relative z-10 inline-flex w-full cursor-pointer items-center justify-between rounded-lg bg-secondary-bg px-3 py-3.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-xs leading-none font-normal text-zinc-500">
          {value === '' ? placeholder : value}{' '}
        </div>
        <IconChevronDown />
      </div>

      {isOpen && (
        <div className="absolute top-8 left-0 z-20 w-full rounded-lg bg-secondary-bg shadow-sm">
          {options.map((item) => (
            <div
              key={item}
              className="cursor-pointer px-3 py-3.5 text-xs text-secondary hover:bg-neutral-100"
              onClick={() => {
                onChange(item);
                setIsOpen(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
