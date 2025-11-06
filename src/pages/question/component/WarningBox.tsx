import React from 'react';
import { Icon } from '@iconify/react';

type WarningBoxProps = {
  children: React.ReactNode;
};

function WarningBox({ children }: WarningBoxProps) {
  return (
    <div className="inline-flex h-auto w-72 items-center justify-start gap-4 rounded-[20px] bg-amber-50 px-7 py-5">
      <Icon
        icon="mdi:information-outline"
        className="h-7.5 w-7.5 text-amber-500"
      />
      <div className="inline-flex flex-col items-start justify-center gap-2">
        <div className="font-['Pretendard_Variable'] text-sm leading-tight font-medium text-amber-500">
          {children}
        </div>
      </div>
    </div>
  );
}

export default WarningBox;
