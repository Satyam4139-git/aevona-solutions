import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

/* Uses the existing AEVONA logo at public/images/logo.png.
   The artwork is light-on-transparent, so it sits on a dark rounded
   badge that stays readable on both light and dark parts of the site. */
export const Logo: React.FC<LogoProps> = ({ size = 'md', to = '/' }) => {
  const height = { sm: 'h-5', md: 'h-7', lg: 'h-10' }[size];
  const padding = { sm: 'px-2.5 py-1.5', md: 'px-3 py-2', lg: 'px-4 py-3' }[size];

  const Content = (
    <span
      className={`inline-flex items-center rounded-lg bg-[#1e1220] cursor-pointer ${padding}`}
      aria-label="Aevona Solution"
    >
      <img
        src="/images/logo.png"
        alt="Aevona"
        className={`${height} w-auto block`}
        draggable={false}
      />
    </span>
  );

  return to ? <Link to={to}>{Content}</Link> : Content;
};