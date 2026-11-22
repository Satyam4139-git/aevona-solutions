import React from 'react';
import { Logo } from '../../components/ui/Logo';
import { Loader2 } from 'lucide-react';

export const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffffff]  text-[#12202f]  flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-sm mx-auto animate-fade-in">
        <Logo size="lg" />
        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-[#4a5a6a] ">
          <Loader2 className="w-5 h-5 animate-spin text-[#0b4f9c]" />
          Loading AEVONA Platform...
        </div>
      </div>
    </div>
  );
};
