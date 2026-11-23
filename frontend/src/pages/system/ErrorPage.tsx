import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { RefreshCw, Home } from 'lucide-react';

export const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffffff]  text-[#12202f]  flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <Logo size="lg" />
        <h1 className="text-3xl font-serif font-bold text-[#12202f] ">
          System Error Encountered
        </h1>
        <p className="text-xs text-[#4a5a6a] ">
          An unexpected technical error occurred while processing your request. Our engineering team has been notified.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="gold" size="md" onClick={() => window.location.reload()} icon={<RefreshCw className="w-4 h-4" />}>
            Reload Page
          </Button>
          <Link to="/">
            <Button variant="outline" size="md" icon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
