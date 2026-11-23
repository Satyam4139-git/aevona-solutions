import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

/* AEVONA orbital logo.
   - default / "dark" / "auto": navy lettering for light backgrounds
   - variant="light": white lettering for dark backgrounds (footer, auth side panel)
   Files: public/images/aevona-logo.png and public/images/aevona-logo-light.png */
export const Logo: React.FC<LogoProps> = ({ size = 'md', to = '/', variant = 'auto' }) => {
  const height = { sm: 'h-6', md: 'h-8', lg: 'h-12' }[size];
  const src = variant === 'light' ? '/images/aevona-logo-light.png' : '/images/aevona-logo.png';

  const Content = (
    <span className="inline-flex items-center cursor-pointer" aria-label="Aevona Solution">
      <img src={src} alt="Aevona" className={`${height} w-auto block`} draggable={false} />
    </span>
  );

  return to ? <Link to={to}>{Content}</Link> : Content;
};
