
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
  User,
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { CursorToggle, MotionToggle } from '../ui/MotionEffects';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, currentUser } = useAuth();

  // Main navigation
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="
        sticky top-0 z-40
        bg-white
        dark:bg-[#1e1018]
        border-b border-[#c45139]/40
        shadow-[0_4px_20px_rgba(40,20,32,0.08)]
      "
    >
      <div className="aenova-utility-bar">
        <div className="aenova-utility-inner">
          <span>Studio 51, Birmingham B4 7AH</span>
          <div>
            <a href="mailto:info@aevonasolution.com">info@aevonasolution.com</a>
            <a href="tel:+447404010483">+44 7404 010483</a>
            <Link to="/contact#estimate">Cost calculator ↗</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-2
                  text-sm font-medium
                  rounded-lg
                  transition-all duration-200

                  ${
                    active
                      ? `
                        text-[#1c1019]
                        dark:text-[#fbf4ee]
                        bg-[#e08858]/35
                        font-semibold
                        shadow-sm
                      `
                      : `
                        text-[#3b2a35]/85
                        dark:text-[#fbf4ee]/80
                        hover:text-[#1c1019]
                        dark:hover:text-[#e08858]
                        hover:bg-[#e08858]/20
                      `
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <CursorToggle />
          <MotionToggle />
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button
                variant="gold"
                size="sm"
                icon={<LayoutDashboard className="w-4 h-4" />}
              >
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              {/* Sign In */}
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<User className="w-4 h-4" />}
                >
                  Sign In
                </Button>
              </Link>

              {/* Get Started */}
              <Link to="/signup">
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <span className="motion-toggle-mobile"><MotionToggle /></span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="
              p-2
              rounded-lg
              text-[#5e4650]
              dark:text-[#e08858]
              hover:bg-[#e08858]/20
              transition-colors
            "
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="
            lg:hidden
            bg-white
            dark:bg-[#1e1018]
            border-t border-[#c45139]/20
            border-b border-[#c45139]/40
            px-4
            pt-3
            pb-6
            space-y-2
            animate-fade-in
            shadow-lg
          "
        >
          {/* Mobile Navigation Links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`
                block
                px-4
                py-2.5
                rounded-lg
                text-base
                font-medium
                transition-colors

                ${
                  isActive(link.path)
                    ? `
                      bg-[#e08858]/30
                      text-[#1c1019]
                      dark:text-[#fbf4ee]
                      font-semibold
                    `
                    : `
                      text-[#1c1019]
                      dark:text-[#fbf4ee]
                      hover:bg-[#e08858]/20
                    `
                }
              `}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Actions */}
          <div className="pt-4 border-t border-[#c45139]/30 space-y-2">
            <CursorToggle />
          <MotionToggle />

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="gold"
                  fullWidth
                  icon={<LayoutDashboard className="w-4 h-4" />}
                >
                  Dashboard ({currentUser?.name})
                </Button>
              </Link>
            ) : (
              <>
                {/* Sign In */}
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    fullWidth
                  >
                    Sign In
                  </Button>
                </Link>

                {/* Get Started */}
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="primary"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
