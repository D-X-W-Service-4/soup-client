import type { ReactNode } from 'react';

interface SocialLoginButtonProps {
  bgColor: string;
  textColor: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

export default function SocialLoginButton({
  bgColor,
  textColor,
  label,
  icon,
  onClick,
}: SocialLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} flex h-16 w-full items-center justify-center gap-7 rounded-[20px] px-9 py-6 shadow-sm transition hover:opacity-90`}
    >
      <div className="flex items-center justify-center gap-7">
        {icon}
        <span
          className={`${textColor} font-['Pretendard_Variable'] text-xl leading-7 font-medium`}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
