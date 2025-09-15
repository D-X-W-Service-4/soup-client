import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const SIZE_MAP: Record<ButtonSize, String> = {
  small: 'rounded-lg py-2 px-3 font-medium text-xs',
  medium: 'rounded-lg py-2.5 px-4 font-medium text-sm',
  large: 'rounded-lg py-3 px-5 font-medium text-lg',
};
const VARIANT_MAP: Record<ButtonVariant, String> = {
  primary: 'bg-primary disabled:bg-rose-300 hover:bg-rose-500',
  secondary: 'bg-secondary disabled:bg-neutral-300 hover:bg-neutral-700',
  success: 'bg-success disabled:bg-lime-200 hover:bg-lime-600',
  warning: 'bg-warning disabled:bg-orange-300 hover:bg-orange-400',
  danger: 'bg-danger disabled:bg-red-300 hover:bg-red-700',
};

export default function Button({
  onClick,
  size,
  variant,
  children,
  ...rest
}: DefaultButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex h-fit w-fit items-center justify-center gap-2 text-white ${SIZE_MAP[size]} ${VARIANT_MAP[variant]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
