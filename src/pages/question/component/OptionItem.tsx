import { useState, useEffect } from 'react';

type OptionItemProps = {
  id: number;
  text: string;
  isSelected: boolean;
  onSelect: (id: number | null) => void;
  isHintOpen?: boolean;
};

const OptionItem = ({
  id,
  text,
  isSelected,
  onSelect,
  isHintOpen = false,
}: OptionItemProps) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const baseWidth = 1180; // 기준 화면 너비
      const screenWidth = window.innerWidth;
      const newScale = screenWidth / baseWidth;
      setScale(newScale > 1 ? 1 : newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    onSelect(isSelected ? null : id);
  };

  return (
    <div
      className={`flex cursor-pointer items-center gap-4 rounded-xl transition-all
        ${isSelected ? 'bg-primary' : 'bg-white'}
        ${isHintOpen ? 'p-4' : 'p-4'}`}
      onClick={handleClick}
      data-select={isSelected}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${scale * 288}px`,
        height: `${scale * 56}px`,
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full
          ${isSelected ? 'bg-primary-bg' : 'bg-neutral-50'}`}
        style={{
          width: `${scale * 28}px`,
          height: `${scale * 28}px`,
        }}
      >
        <div className="text-center text-base font-medium text-primary">
          {id}
        </div>
      </div>
      <div
        className={`font-medium ${isSelected ? 'text-white' : 'text-black'}`}
        style={{ fontSize: `${scale * 18}px`, lineHeight: `${scale * 28}px` }}
      >
        {text}
      </div>
    </div>
  );
};

export default OptionItem;
