import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'danger' | 'gold' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className
}) => {
  const variants = {
    default: 'bg-[#f3f6f9] text-[#4a5a6a]  ',
    success: 'bg-emerald-100 text-emerald-800    ',
    warning: 'bg-amber-100 text-amber-900    ',
    info: 'bg-sky-100 text-sky-800    ',
    danger: 'bg-rose-100 text-rose-800    ',
    gold: 'bg-[#0b4f9c]/20 text-[#083b75] border border-[#0b4f9c]/40  ',
    outline: 'border border-[#0b4f9c]/30 text-[#4a5a6a]  ',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[11px] font-semibold',
    md: 'px-3 py-1 text-xs font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let variant: BadgeProps['variant'] = 'default';

  switch (status.toLowerCase()) {
    case 'completed':
    case 'active':
    case 'paid':
    case 'resolved':
      variant = 'success';
      break;
    case 'in progress':
    case 'under review':
    case 'review':
      variant = 'gold';
      break;
    case 'planning':
    case 'to do':
    case 'requested':
    case 'open':
    case 'pending':
      variant = 'info';
      break;
    case 'urgent':
    case 'overdue':
    case 'high':
    case 'archived':
    case 'closed':
      variant = 'danger';
      break;
    case 'medium':
      variant = 'warning';
      break;
    default:
      variant = 'default';
  }

  return <Badge variant={variant}>{status}</Badge>;
};
