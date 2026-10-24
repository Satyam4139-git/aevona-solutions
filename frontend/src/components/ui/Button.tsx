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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-[#e08858] to-[#f59a62] text-white hover:brightness-95 shadow-md shadow-[#e08858]/30 focus:ring-[#e08858] dark:text-[#140a14]',
    secondary: 'bg-[#f6e9de] hover:bg-[#ebdacd] text-[#1c1019] focus:ring-[#e08858] dark:bg-[#2a1a25] dark:hover:bg-[#3a2530] dark:text-[#fbf4ee]',
    outline: 'border border-[#e08858] text-[#5e4650] hover:bg-[#e08858]/10 focus:ring-[#e08858] dark:border-[#c45139] dark:text-[#e08858] dark:hover:bg-[#c45139]/15',
    ghost: 'text-[#5e4650] hover:bg-[#f6e9de]/60 focus:ring-[#e08858] dark:text-[#fbf4ee] dark:hover:bg-[#2a1a25]',
    gold: 'bg-gradient-to-r from-[#e08858] to-[#f59a62] text-white hover:opacity-95 shadow-md shadow-[#e08858]/25 focus:ring-[#e08858]',
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
