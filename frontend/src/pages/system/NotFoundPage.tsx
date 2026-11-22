import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffffff]  text-[#12202f]  flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <Logo size="lg" />

        <div className="w-20 h-20 rounded-full bg-[#0b4f9c]/20 border border-[#0b4f9c]/40 text-[#4a5a6a]  flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-6xl font-serif font-bold text-[#0b4f9c] ">404</span>
          <h1 className="text-2xl font-serif font-bold text-[#12202f]  mt-2">
            Looks like this page took a wrong turn.
          </h1>
          <p className="text-xs text-[#4a5a6a]  mt-2">
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
