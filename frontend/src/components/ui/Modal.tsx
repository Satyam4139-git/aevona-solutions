import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      {/* Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-[#1c1019]/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div
        className={cn(
          'relative w-full rounded-2xl bg-white dark:bg-[#1e1220] border border-[#e08858]/30 dark:border-[#3a2530] p-6 shadow-2xl z-10 my-8 transition-all',
          maxWidths[maxWidth]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#f6e9de] dark:border-[#33222c]">
          <div>
            {title && (
              <h3 className="text-xl font-bold font-serif text-[#1c1019] dark:text-[#fbf4ee]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#a63d2a] dark:text-[#ebdacd] hover:bg-[#f6e9de] dark:hover:bg-[#33222c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
};
