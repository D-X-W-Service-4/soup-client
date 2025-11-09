import { Icon } from '@iconify/react';
import { useState, useRef, useEffect } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectToggleProps {
  placeholder: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectToggle({
  placeholder = '',
  options,
  value,
  onChange,
}: SelectToggleProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div className="relative w-full justify-between" ref={dropdownRef}>
        <div
          className="flex h-9 w-26 cursor-pointer items-center justify-between rounded-md px-4 py-2.5 outline outline-[0.80px] outline-neutral-200"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="justify-start text-center text-sm font-normal text-secondary">
            {displayText}
          </span>
          <Icon
            icon="iconamoon:arrow-down-2-duotone"
            className={`h-5 w-5 text-secondary transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg outline outline-[0.80px] outline-neutral-200">
            {options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer px-5 py-2 text-sm hover:bg-neutral-50 ${
                  option.value === value
                    ? 'bg-primary-bg text-primary'
                    : 'text-secondary'
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
