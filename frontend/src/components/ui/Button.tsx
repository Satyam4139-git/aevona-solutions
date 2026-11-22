import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#0b4f9c] text-white hover:bg-[#083b75] shadow-sm focus:ring-[#0b4f9c]',
    secondary: 'bg-[#f3f6f9] hover:bg-[#dbe2e9] text-[#12202f] focus:ring-[#0b4f9c]   ',
    outline: 'border border-[#0b4f9c] text-[#4a5a6a] hover:bg-[#0b4f9c]/10 focus:ring-[#0b4f9c]   ',
    ghost: 'text-[#4a5a6a] hover:bg-[#f3f6f9]/60 focus:ring-[#0b4f9c]  ',
    gold: 'bg-[#0b4f9c] text-white hover:bg-[#083b75] shadow-sm focus:ring-[#0b4f9c]',
    danger: 'bg-red-700 hover:bg-red-800 text-white focus:ring-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
