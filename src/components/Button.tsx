import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant =
  | 'primary'
  | 'primary_bg'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'white';

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'small' | 'medium' | 'large';
  variant: ButtonVariant;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const SIZE_MAP: Record<ButtonSize, String> = {
  small: 'rounded-lg py-2 px-3 font-medium text-xs',
  medium: 'rounded-lg py-2.5 px-4 font-medium text-sm',
  large: 'rounded-lg py-3 px-5 font-medium text-lg',
};
const VARIANT_MAP: Record<ButtonVariant, String> = {
  primary: 'bg-primary text-white disabled:bg-rose-300 hover:bg-rose-500',
  primary_bg: 'bg-primary-bg text-white disabled:bg-white',
  secondary:
    'bg-secondary text-white disabled:bg-neutral-300 hover:bg-neutral-700',
  success: 'bg-success text-white disabled:bg-lime-200 hover:bg-lime-600',
  warning: 'bg-warning text-white disabled:bg-orange-300 hover:bg-orange-400',
  danger: 'bg-danger text-white disabled:bg-red-300 hover:bg-red-700',
  white: 'bg-white text-secondary hover:bg-gray-100',
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
      className={`inline-flex h-fit w-fit items-center justify-center gap-2 ${SIZE_MAP[size]} ${VARIANT_MAP[variant]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
