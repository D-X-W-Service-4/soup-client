import React, { useState } from 'react';
import IconStar from '../../../assets/svgs/IconStar.tsx';
import IconHint from '../../../assets/svgs/IconHint.tsx';
import IconX from '../../../assets/svgs/IconX.tsx';
import IconHamburger from '../../../assets/svgs/IconHamburger.tsx';

type HintBarProps = {
  hints: string[];
  isHintModalOpen: boolean;
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
  { id: 'star', icon: IconStar, text: '별표 표시하기' },
  { id: 'hint', icon: IconHint, text: '힌트 보기' },
  { id: 'close', icon: IconX, text: '' },
];

export default function HintBar({
  onOpenHintModal,
  isHintModalOpen,
  isStarred = false,
  onToggleStar,
}: HintBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    if (id === 'close') {
      setIsOpen(false);
      return;
    }

    if (id === 'hint' && onOpenHintModal) onOpenHintModal();
    if (id === 'star' && onToggleStar) onToggleStar();
    if (id !== 'hint') {
      setSelectedItemId((prev) => (prev === id ? null : id));
    }

    console.log(`Menu item '${id}' clicked`);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      {isOpen ? (
        <div className="animate-fadeIn flex flex-col gap-4">
          {menuItems.map((item, index) => {
            let isSelected = item.id === selectedItemId;
            if (item.id === 'hint') isSelected = isHintModalOpen;
            if (item.id === 'star') isSelected = isStarred;

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
                style={{
                  animationDelay: `${index * 0.08}s`, // 버튼별 딜레이
                }}
                className="animate-slideIn flex items-center gap-4"
              >
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`flex h-12.5 w-12.5 items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-110 ${iconBgColor}`}
                >
                  <IconComponent className={`h-5.5 w-5.5 ${iconColor}`} />
                </button>
                <span className="w-32 text-left font-semibold text-slate-700">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="animate-bounceOnce flex h-12.5 w-12.5 items-center justify-center rounded-full bg-rose-400 shadow-lg transition-transform hover:scale-110"
          aria-label="힌트 바 열기"
        >
          <IconHamburger className="h-5.5 w-5.5 text-white" />
        </button>
      )}
    </div>
  );
}
