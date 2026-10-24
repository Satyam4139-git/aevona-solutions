import React from 'react';
import { Logo } from '../../components/ui/Logo';
import { Loader2 } from 'lucide-react';

export const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fbf4ee] dark:bg-[#100810] text-[#1c1019] dark:text-[#fbf4ee] flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-sm mx-auto animate-fade-in">
        <Logo size="lg" />
        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-[#5e4650] dark:text-[#e08858]">
          <Loader2 className="w-5 h-5 animate-spin text-[#e08858]" />
          Loading AEVONA Platform...
        </div>
      </div>
    </div>
  );
};
