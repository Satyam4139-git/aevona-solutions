
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({
  showSubtitle = true,
  size = 'md',
  to = '/',
}) => {
  const heights = { sm: 'h-7', md: 'h-9', lg: 'h-14' };

  const Content = (
    <div className="inline-flex items-center group cursor-pointer">
      <img
        src={logo}
        alt="AEVONA"
        className={`${heights[size]} w-auto object-contain rounded-md bg-[#100810] px-2 py-1 dark:bg-transparent dark:p-0 group-hover:scale-105 transition-transform duration-300`}
      />
    </div>
  );

  if (to) {
    return <Link to={to}>{Content}</Link>;
  }

  return Content;
};
