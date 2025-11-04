import React, { useState } from 'react';
import IconEssay from '../../../assets/svgs/IconEssay.tsx';
import IconStar from '../../../assets/svgs/IconStar.tsx';
import IconHint from '../../../assets/svgs/IconHint.tsx';
import IconX from '../../../assets/svgs/IconX.tsx';
import IconHamburger from '../../../assets/svgs/IconHamburger.tsx';

type HintBarProps = {
  hints: string[];
  isHintModalOpen: boolean;
  isEssaySelected?: boolean;
  isStarred?: boolean;
  onOpenHintModal?: () => void;
  onSwitchEssay?: () => void;
  onToggleStar?: () => void;
};

type MenuItem = {
  id: string;
  icon: React.ElementType;
  text: string;
};

const menuItems: MenuItem[] = [
  { id: 'essay', icon: IconEssay, text: '서술형 대비하기' },
  { id: 'star', icon: IconStar, text: '별표 표시하기' },
  { id: 'hint', icon: IconHint, text: '힌트 보기' },
  { id: 'close', icon: IconX, text: '' },
];

const animationDelays = ['delay-75', 'delay-150', 'delay-200', 'delay-300'];

const HintBar = ({
  onOpenHintModal,
  isHintModalOpen,
  isEssaySelected = false,
  isStarred = false,
  onSwitchEssay,
  onToggleStar,
}: HintBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    if (id === 'close') {
      setIsOpen(false);
      return;
    }

    if (id === 'hint' && onOpenHintModal) onOpenHintModal();
    if (id === 'essay' && onSwitchEssay) onSwitchEssay();
    if (id === 'star' && onToggleStar) onToggleStar();
    if (id !== 'hint') {
      setSelectedItemId((prev) => (prev === id ? null : id));
    }

    console.log(`Menu item '${id}' clicked`);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      {isOpen ? (
        menuItems.map((item, index) => {
          let isSelected = item.id === selectedItemId;
          if (item.id === 'hint') isSelected = isHintModalOpen;
          if (item.id === 'essay') isSelected = isEssaySelected;
          if (item.id === 'star') isSelected = isStarred; // ⭐ 추가

          const iconBgColor = isSelected
            ? 'bg-white'
            : item.id === 'close'
              ? 'bg-gray-400'
              : 'bg-rose-400';
          const iconColor = isSelected ? 'text-rose-400' : 'text-white';

          const IconComponent = item.icon;

          return (
            <div
              key={item.id}
              className={`flex items-center gap-4 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'} ${animationDelays[index]}`}
            >
              <button
                onClick={() => handleItemClick(item.id)}
                className={`flex h-12.5 w-12.5 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 ${iconBgColor}`}
              >
                <IconComponent className={`h-5.5 w-5.5 ${iconColor}`} />
              </button>
              <span className="w-32 text-left font-semibold text-slate-700">
                {item.text}
              </span>
            </div>
          );
        })
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-rose-400 shadow-lg transition-transform hover:scale-110"
          aria-label="힌트 바 열기"
        >
          <IconHamburger className="h-5.5 w-5.5 text-white" />
        </button>
      )}
    </div>
  );
};

export default HintBar;
