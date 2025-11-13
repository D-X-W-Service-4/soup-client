import { useState, useEffect } from 'react';

type OptionItemProps = {
  id: number;
  isSelected: boolean;
  onSelect: (id: number | null) => void;
  isHintOpen?: boolean;
};

const OptionItem = ({
  id,
  isSelected,
  onSelect,
  isHintOpen = false,
}: OptionItemProps) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const baseWidth = 1180;
      const screenWidth = window.innerWidth;
      const newScale = screenWidth / baseWidth;
      setScale(newScale > 1 ? 1 : newScale);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => onSelect(isSelected ? null : id);

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
      {/* 번호 원형 (가운데 정렬 고정) */}
      <div
        className={`flex items-center justify-center rounded-full
          ${isSelected ? 'bg-primary-bg' : 'bg-neutral-50'}`}
        style={{
          width: `${scale * 28}px`,
          height: `${scale * 28}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <span
          className="font-medium text-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${scale * 16}px`,
            lineHeight: '1',
          }}
        >
          {id}
        </span>
      </div>
    </div>
  );
};

export default OptionItem;
