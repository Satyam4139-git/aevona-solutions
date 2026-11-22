
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Save,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/ui/Button';

type SettingsTab =
  | 'profile'
  | 'account'
  | 'security'
  | 'notifications'
  | 'appearance';

export const SettingsPage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [searchParams] = useSearchParams();

  const requestedTab = searchParams.get('tab');
  const validTabs: SettingsTab[] = [
    'profile',
    'account',
    'security',
    'notifications',
    'appearance',
  ];

  const initialTab: SettingsTab =
    validTabs.find((tab) => tab === requestedTab) || 'profile';

  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile Form State
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(
    currentUser?.phone || '+1 (555) 234-5678'
  );
  const [company, setCompany] = useState(
    currentUser?.company || 'Aevona Enterprises'
  );
  const [jobTitle, setJobTitle] = useState(
    currentUser?.jobTitle || 'VP of Strategy'
  );
  const [location, setLocation] = useState(
    currentUser?.location || ''
  );

  // Account Preferences State
  const [language, setLanguage] = useState(
    currentUser?.preferences?.language || 'English (US)'
  );
  const [timezone, setTimezone] = useState(
    currentUser?.preferences?.timezone || 'PST (UTC-8)'
  );
  const [dateFormat, setDateFormat] = useState(
    currentUser?.preferences?.dateFormat || 'MM/DD/YYYY'
  );

  // Notification Toggles
  const [notifs, setNotifs] = useState({
    emailNotifications:
      currentUser?.preferences?.emailNotifications ?? true,
    projectUpdates:
      currentUser?.preferences?.projectUpdates ?? true,
    taskNotifications:
      currentUser?.preferences?.taskNotifications ?? true,
    marketingEmails:
      currentUser?.preferences?.marketingEmails ?? false,
    securityAlerts:
      currentUser?.preferences?.securityAlerts ?? true,
  });

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUser({
      name,
      email,
      phone,
      company,
      jobTitle,
      location,
      preferences: {
        ...currentUser?.preferences,
        language,
        timezone,
        dateFormat,
        ...notifs,
        theme,
      },
    });

    setSavedSuccess(true);
    window.setTimeout(() => setSavedSuccess(false), 3000);
  };

  const tabs: {
    id: SettingsTab;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const inputClass =
    'w-full px-3.5 py-2.5 bg-[#ffffff]  border border-[#0b4f9c]/50 rounded-xl text-sm text-[#12202f]  outline-none focus:ring-2 focus:ring-[#0b4f9c]/40';

  const labelClass =
    'block text-xs font-semibold text-[#12202f]  mb-1';

  const panelClass =
    'bg-white  border border-[#0b4f9c]/30 rounded-3xl p-6 sm:p-8 shadow-sm';

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#12202f] ">
          System Settings
        </h1>
        <p className="text-xs text-[#4a5a6a]  mt-1">
          Manage your personal profile, security configuration,
          notifications, and theme settings.
        </p>
      </div>

      {/* Save Success Message */}
      {savedSuccess && (
        <div
          role="status"
          className="p-3.5 rounded-xl bg-emerald-100 text-emerald-800   text-xs font-semibold flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Settings saved successfully!
        </div>
      )}

      {/* Settings Tabs */}
      <div className="flex items-center gap-2 border-b border-[#0b4f9c]/30 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isCurrent = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isCurrent}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                isCurrent
                  ? 'bg-[#4a5a6a] text-white  '
                  : 'bg-white  text-[#4a5a6a]  hover:bg-[#f3f6f9] '
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <form
          onSubmit={handleSaveProfile}
          className={`${panelClass} space-y-6`}
        >
          <div className="flex items-center gap-4 pb-6 border-b border-[#f3f6f9] ">
            <img
              src={
                currentUser?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
              }
              alt={name || 'User avatar'}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#0b4f9c]"
            />

            <div>
              <h3 className="text-base font-bold text-[#12202f] ">
                {name}
              </h3>
              <p className="text-xs text-[#4a5a6a] ">
                {jobTitle} • {company}
              </p>
              <button
                type="button"
                className="text-xs font-semibold text-[#4a5a6a]  hover:underline mt-1"
                onClick={() => {
                  document.getElementById('avatar-url')?.focus();
                }}
              >
                Change Avatar Photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="profile-name" className={labelClass}>
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="profile-email" className={labelClass}>
                Email Address
              </label>
              <input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="profile-phone" className={labelClass}>
                Phone Number
              </label>
              <input
                id="profile-phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="profile-company" className={labelClass}>
                Company
              </label>
              <input
                id="profile-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="profile-job-title" className={labelClass}>
                Job Title
              </label>
              <input
                id="profile-job-title"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="profile-location" className={labelClass}>
                Location
              </label>
              <input
                id="profile-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#f3f6f9] ">
            <Button
              type="submit"
              variant="gold"
              size="md"
              icon={<Save className="w-4 h-4" />}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      )}

      {/* ACCOUNT TAB */}
      {activeTab === 'account' && (
        <form
          onSubmit={handleSaveProfile}
          className={`${panelClass} space-y-4`}
        >
          <h3 className="text-base font-serif font-bold text-[#12202f] ">
            Localization & Account Format
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="account-language" className={labelClass}>
                Language
              </label>
              <select
                id="account-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={inputClass}
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
              </select>
            </div>

            <div>
              <label htmlFor="account-timezone" className={labelClass}>
                Timezone
              </label>
              <select
                id="account-timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className={inputClass}
              >
                <option value="PST (UTC-8)">PST (UTC-8)</option>
                <option value="EST (UTC-5)">EST (UTC-5)</option>
                <option value="UTC">UTC</option>
                <option value="CET (UTC+1)">CET (UTC+1)</option>
                <option value="IST (UTC+5:30)">IST (UTC+5:30)</option>
              </select>
            </div>

            <div>
              <label htmlFor="account-date-format" className={labelClass}>
                Date Format
              </label>
              <select
                id="account-date-format"
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className={inputClass}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#f3f6f9] ">
            <Button
              type="submit"
              variant="gold"
              size="md"
              icon={<Save className="w-4 h-4" />}
            >
              Save Preferences
            </Button>
          </div>
        </form>
      )}

      {/* SECURITY TAB */}
      {activeTab === 'security' && (
        <div className={`${panelClass} space-y-6`}>
          <h3 className="text-base font-serif font-bold text-[#12202f] ">
            Security & Authentication
          </h3>

          <div className="p-4 rounded-2xl bg-[#ffffff]  border border-[#0b4f9c]/30 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#0b4f9c] mt-0.5" />
              <div>
                <div className="text-xs font-bold text-[#12202f] ">
                  Two-Factor Authentication (2FA)
                </div>
                <div className="text-[11px] text-[#4a5a6a]  mt-1">
                  Use an authenticator app for an additional layer of
                  account protection.
                </div>
              </div>
            </div>

            <Button type="button" variant="outline" size="sm">
              Enable 2FA
            </Button>
          </div></div>
      )}

      {/* NOTIFICATIONS TAB */}
      {activeTab === 'notifications' && (
        <form
          onSubmit={handleSaveProfile}
          className={`${panelClass} space-y-4`}
        >
          <h3 className="text-base font-serif font-bold text-[#12202f] ">
            Notification Preferences
          </h3>

          {Object.entries(notifs).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/20 cursor-pointer"
            >
              <span className="text-xs font-bold text-[#12202f]  capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>

              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setNotifs((previous) => ({
                    ...previous,
                    [key]: e.target.checked,
                  }))
                }
                className="w-4 h-4 accent-[#4a5a6a] "
              />
            </label>
          ))}

          <div className="flex justify-end pt-4 border-t border-[#f3f6f9] ">
            <Button
              type="submit"
              variant="gold"
              size="md"
              icon={<Save className="w-4 h-4" />}
            >
              Save Notification Preferences
            </Button>
          </div>
        </form>
      )}

      {/* APPEARANCE TAB */}
      {activeTab === 'appearance' && (
        <div className={`${panelClass} space-y-4`}>
          <div>
            <h3 className="text-base font-serif font-bold text-[#12202f] ">
              Theme Identity Preference
            </h3>
            <p className="text-xs text-[#4a5a6a]  mt-1">
              The workspace uses the Aevona corporate light theme: white surfaces,
              navy text and blue accents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 pt-2">
            {[
              {
                id: 'light',
                title: 'Light Theme',
                desc: 'Clean white workspace with blue accents',
              },
              ].map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={theme === item.id}
                onClick={() => setTheme(item.id as any)}
                className={`text-left p-4 rounded-2xl border cursor-pointer transition-all ${
                  theme === item.id
                    ? 'border-[#0b4f9c] bg-[#0b4f9c]/15 shadow-md'
                    : 'border-[#0b4f9c]/30 bg-[#ffffff]/50  hover:border-[#0b4f9c]'
                }`}
              >
                <div className="text-xs font-bold text-[#12202f] ">
                  {item.title}
                </div>
                <div className="text-[11px] text-[#4a5a6a]/80  mt-1">
                  {item.desc}
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-[#f3f6f9] ">
            <Button
              type="button"
              variant="gold"
              size="md"
              icon={<Save className="w-4 h-4" />}
              onClick={handleSaveProfile as any}
            >
              Save Appearance
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
