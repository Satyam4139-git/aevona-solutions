import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

/* Wordmark built in CSS/SVG so it reads clearly on the light theme.
   (images/logo.png is a light-on-dark asset and is left untouched in the repo.) */
export const Logo: React.FC<LogoProps> = ({ size = 'md', to = '/', variant = 'auto' }) => {
  const text = { sm: 'text-lg', md: 'text-[22px]', lg: 'text-3xl' }[size];
  const box = { sm: 'w-6 h-6', md: 'w-8 h-8', lg: 'w-11 h-11' }[size];
  const onDark = variant === 'light';

  const Content = (
    <div className="inline-flex items-center gap-2.5 group cursor-pointer" aria-label="Aevona Solution">
      <span className={`${box} inline-grid place-items-center rounded-md ${onDark ? 'bg-white text-[#0b4f9c]' : 'bg-[#0b4f9c] text-white'}`}>
        <svg viewBox="0 0 24 24" className="w-[62%] h-[62%]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20L12 4l8 16M7.5 14h9" />
        </svg>
      </span>
      <span className={`font-heading font-bold tracking-tight ${text} ${onDark ? 'text-white' : 'text-[#0b4f9c]'}`}>
        Aevona<span className={`font-medium ${onDark ? 'text-white/70' : 'text-[#12202f]'}`}> Solution</span>
      </span>
    </div>
  );

  return to ? <Link to={to}>{Content}</Link> : Content;
};
