import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fbf4ee] dark:bg-[#100810] text-[#1c1019] dark:text-[#fbf4ee] flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <Logo size="lg" />

        <div className="w-20 h-20 rounded-full bg-[#e08858]/20 border border-[#e08858]/40 text-[#5e4650] dark:text-[#e08858] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-6xl font-serif font-bold text-[#c45139] dark:text-[#e08858]">404</span>
          <h1 className="text-2xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-2">
            Looks like this page took a wrong turn.
          </h1>
          <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80 mt-2">
            The page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="gold" size="md" icon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="md">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
