import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  User as UserIcon,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useDashboard } from '../../context/DashboardContext';
import { CursorToggle } from '../ui/MotionEffects';

interface DashboardTopbarProps {
  onOpenMobileSidebar: () => void;
}

export const DashboardTopbar: React.FC<DashboardTopbarProps> = ({
  onOpenMobileSidebar,
}) => {
  const { currentUser, logout } = useAuth();
  const { setTheme, isDark } = useTheme();
  const { notifications, markNotificationRead, setIsSearchModalOpen } =
    useDashboard();
  const navigate = useNavigate();
  const location = useLocation();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter((notification) => !notification.read);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }

      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(event.target as Node)
      ) {
        setNotifMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === '/dashboard') return 'Dashboard';
    if (path.startsWith('/dashboard/projects/')) return 'Project Details';
    if (path.startsWith('/dashboard/projects')) return 'Projects Management';
    if (path.startsWith('/dashboard/services')) return 'Services Directory';
    if (path.startsWith('/dashboard/analytics')) return 'Platform Analytics';
    if (path.startsWith('/dashboard/tasks')) return 'Task Management';
    if (path.startsWith('/dashboard/files')) return 'File Management';
    if (path.startsWith('/dashboard/messages')) return 'Team Messaging';
    if (path.startsWith('/dashboard/notifications')) return 'Notification Center';
    if (path.startsWith('/dashboard/team')) return 'Team & Access Management';
    if (path.startsWith('/dashboard/billing')) return 'Billing & Subscriptions';
    if (path.startsWith('/dashboard/settings')) return 'System Settings';
    if (path.startsWith('/dashboard/support')) return 'Help & Support';

    return 'Dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[#ebdacd] dark:border-[#3a2530] bg-[#FFFFFF] dark:bg-[#1e1220] px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="rounded-lg p-2 text-[#5e4650] dark:text-[#d9b8a4] hover:bg-[#ebdacd] dark:hover:bg-[#3a2530] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div>
          <h2 className="text-lg font-bold text-[#1c1019] dark:text-[#fbf4ee] sm:text-xl">
            {getPageTitle()}
          </h2>
          <div className="hidden text-[11px] text-[#5e4650] dark:text-[#d9b8a4] sm:block">
            AEVONA SaaS Platform • Enterprise Workspace
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="hidden xl:block">
          <CursorToggle />
        </div>

        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-[#ebdacd] dark:border-[#3a2530] bg-[#fbf4ee] dark:bg-[#2a1520] px-3 py-2 text-xs font-medium text-[#5e4650] dark:text-[#d9b8a4] transition-colors hover:bg-[#ebdacd] dark:hover:bg-[#3a2530]"
          aria-label="Search"
        >
          <Search className="h-4 w-4 text-[#c45139]" />
          <span className="hidden md:inline">Search...</span>
          <kbd className="hidden rounded bg-[#FFFFFF] dark:bg-[#1e1220] px-1.5 py-0.5 font-mono text-[10px] text-[#5e4650] dark:text-[#d9b8a4] shadow-xs md:inline-block">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          title="Toggle theme"
          aria-label="Toggle theme"
          className="rounded-xl border border-[#ebdacd] dark:border-[#3a2530] bg-[#fbf4ee] dark:bg-[#2a1520] p-2.5 text-[#c45139] transition-colors hover:bg-[#ebdacd] dark:hover:bg-[#3a2530]"
        >
          {isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            aria-label="Notifications"
            className="relative rounded-xl border border-[#ebdacd] dark:border-[#3a2530] bg-[#fbf4ee] dark:bg-[#2a1520] p-2.5 text-[#c45139] transition-colors hover:bg-[#ebdacd] dark:hover:bg-[#3a2530]"
          >
            <Bell className="h-4 w-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#FFFFFF] dark:border-[#1e1220] bg-[#e08858] text-[10px] font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-80 animate-fade-in rounded-2xl border border-[#ebdacd] dark:border-[#3a2530] bg-[#FFFFFF] dark:bg-[#1e1220] p-4 shadow-2xl sm:w-96">
              <div className="flex items-center justify-between border-b border-[#ebdacd] dark:border-[#3a2530] pb-3">
                <h4 className="font-serif text-sm font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                  Notifications ({unreadNotifs.length} new)
                </h4>
                <Link
                  to="/dashboard/notifications"
                  onClick={() => setNotifMenuOpen(false)}
                  className="text-xs font-semibold text-[#c45139] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="max-h-80 space-y-2 overflow-y-auto py-2">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#5e4650] dark:text-[#d9b8a4]">
                    No notifications
                  </div>
                ) : (
                  notifications.slice(0, 4).map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => {
                        markNotificationRead(notification.id);
                        if (notification.link) navigate(notification.link);
                        setNotifMenuOpen(false);
                      }}
                      className={`cursor-pointer rounded-xl p-2.5 text-left transition-colors ${
                        notification.read
                          ? 'hover:bg-[#fbf4ee]'
                          : 'bg-[#c45139]/10 hover:bg-[#c45139]/15'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                          {notification.title}
                        </span>
                        <span className="text-[10px] text-[#5e4650] dark:text-[#d9b8a4]">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#c9b8bc]">
                        {notification.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-[#ebdacd] dark:hover:bg-[#3a2530]"
            aria-label="User menu"
          >
            <img
              src={
                currentUser?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
              }
              alt={currentUser?.name || 'User profile'}
              className="h-9 w-9 rounded-full border-2 border-[#c45139] object-cover"
            />
            <div className="hidden text-left sm:block">
              <div className="text-xs font-bold leading-tight text-[#1c1019] dark:text-[#fbf4ee]">
                {currentUser?.name}
              </div>
              <div className="text-[10px] text-[#5e4650] dark:text-[#d9b8a4]">
                {currentUser?.role || 'Owner'}
              </div>
            </div>
            <ChevronDown className="hidden h-4 w-4 text-[#5e4650] dark:text-[#d9b8a4] sm:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-56 animate-fade-in space-y-1 rounded-2xl border border-[#ebdacd] dark:border-[#3a2530] bg-[#FFFFFF] dark:bg-[#1e1220] p-2 shadow-2xl">
              <div className="border-b border-[#ebdacd] dark:border-[#3a2530] p-3">
                <p className="truncate text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                  {currentUser?.name}
                </p>
                <p className="truncate text-[10px] text-[#5e4650] dark:text-[#d9b8a4]">
                  {currentUser?.email}
                </p>
              </div>

              <Link
                to="/dashboard/settings?tab=profile"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#1c1019] dark:text-[#fbf4ee] transition-colors hover:bg-[#ebdacd] dark:hover:bg-[#3a2530]"
              >
                <UserIcon className="h-4 w-4 text-[#c45139]" />
                <span>Profile</span>
              </Link>

              <Link
                to="/dashboard/settings"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#1c1019] dark:text-[#fbf4ee] transition-colors hover:bg-[#ebdacd] dark:hover:bg-[#3a2530]"
              >
                <Settings className="h-4 w-4 text-[#c45139]" />
                <span>Settings</span>
              </Link>

              <Link
                to="/dashboard/billing"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#1c1019] dark:text-[#fbf4ee] transition-colors hover:bg-[#ebdacd] dark:hover:bg-[#3a2530]"
              >
                <CreditCard className="h-4 w-4 text-[#c45139]" />
                <span>Billing</span>
              </Link>

              <Link
                to="/dashboard/support"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#1c1019] dark:text-[#fbf4ee] transition-colors hover:bg-[#ebdacd] dark:hover:bg-[#3a2530]"
              >
                <HelpCircle className="h-4 w-4 text-[#c45139]" />
                <span>Help & Support</span>
              </Link>

              <div className="border-t border-[#ebdacd] dark:border-[#3a2530] pt-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-rose-300 transition-colors hover:bg-rose-950/40"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};