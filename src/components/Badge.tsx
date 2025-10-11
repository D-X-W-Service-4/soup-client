import { type ReactNode } from 'react';

type BadgeSize = 'small' | 'medium' | 'large';
type BadgeVariant =
  | 'primary'
  | 'primary-bg'
  | 'secondary'
  | 'secondary-bg'
  | 'success'
  | 'warning'
  | 'danger';

export interface BadgeProps {
  size: BadgeSize;
  variant: BadgeVariant;
  children?: ReactNode;
  className?: string;
}

const SIZE_MAP: Record<BadgeSize, string> = {
  small: 'py-1 px-2.5 font-medium text-[10px]',
  medium: 'py-1 px-2.5 font-medium text-xs',
  large: 'py-1 px-2.5 font-medium text-sm',
};

const VARIANT_MAP: Record<BadgeVariant, string> = {
  primary: 'bg-primary text-white',
  'primary-bg': 'bg-primary-bg text-secondary',
  secondary: 'bg-secondary text-white',
  'secondary-bg': 'bg-secondary-bg text-secondary',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  danger: 'bg-danger text-white',
};

export default function Badge({
  size,
  variant,
  children,
  className = '',
}: BadgeProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2.5 px-2.5 py-1 rounded-[20px]';

  const sizeClass = SIZE_MAP[size];
  const variantClass = VARIANT_MAP[variant];

  const combinedClasses =
    `${baseClasses} ${sizeClass} ${variantClass} ${className}`.trim();

  return <span className={combinedClasses}>{children}</span>;
}
