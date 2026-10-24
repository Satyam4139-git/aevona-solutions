import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Globe,
  Code2,
  Cloud,
  Cpu,
  Compass,
  Database,
  Layers,
  Building,
  User as UserIcon,
  Sliders
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Steps 1 to 6

  // Form states across onboarding
  const [personalInfo, setPersonalInfo] = useState({
    jobTitle: currentUser?.jobTitle || 'Product Strategist',
    phone: currentUser?.phone || '+1 (555) 234-5678',
    location: currentUser?.location || 'San Francisco, CA'
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: currentUser?.company || 'Aevona Tech',
    companySize: '10-50 employees',
    industry: 'Technology & Software'
  });

  const [selectedUseCases, setSelectedUseCases] = useState<string[]>(['Build an application', 'Cloud infrastructure']);

  const [preferences, setPreferences] = useState({
    emailUpdates: true,
    taskAlerts: true,
    weeklyReport: true
  });

  const useCaseOptions = [
    { id: 'website', label: 'Build a website', desc: 'Custom web apps & brand portals', icon: Globe },
    { id: 'app', label: 'Build an application', desc: 'SaaS product & mobile apps', icon: Code2 },
    { id: 'cloud', label: 'Cloud infrastructure', desc: 'AWS/Azure migration & DevOps', icon: Cloud },
    { id: 'automation', label: 'Business automation', desc: 'AI agents & workflow automation', icon: Cpu },
    { id: 'consulting', label: 'IT consulting', desc: 'Architecture & stack audit', icon: Compass },
    { id: 'data', label: 'Data solutions', desc: 'ETL, data pipelines & BI', icon: Database },
    { id: 'other', label: 'Other', desc: 'Custom enterprise request', icon: Layers }
  ];

  const handleToggleUseCase = (label: string) => {
    if (selectedUseCases.includes(label)) {
      setSelectedUseCases(selectedUseCases.filter(u => u !== label));
    } else {
      setSelectedUseCases([...selectedUseCases, label]);
    }
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    updateUser({
      onboarded: true,
      jobTitle: personalInfo.jobTitle,
      phone: personalInfo.phone,
      location: personalInfo.location,
      company: companyInfo.companyName
    });
    navigate('/dashboard');
  };

  const stepTitles = [
    'Welcome',
    'Personal Info',
    'Company Info',
    'Choose Use Case',
    'Preferences',
    'Complete'
  ];

  return (
    <div className="min-h-screen bg-[#fbf4ee] dark:bg-[#100810] text-[#1c1019] dark:text-[#fbf4ee] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#e08858]/30 dark:border-[#3a2530]">
        <Logo size="md" />

        {/* Progress Dots / Steps */}
        <div className="flex items-center space-x-2">
          {stepTitles.map((st, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < step;
            const isCurrent = stepNum === step;
            return (
              <div key={st} className="flex items-center">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#5e4650] text-white dark:bg-[#e08858] dark:text-[#140a14] ring-4 ring-[#e08858]/30'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#f6e9de] dark:bg-[#2a1a25] text-[#5e4650] dark:text-[#e08858]'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : `0${stepNum}`}
                </div>
                {stepNum < 6 && (
                  <div
                    className={`w-4 sm:w-8 h-0.5 mx-1 transition-colors ${
                      stepNum < step ? 'bg-emerald-600' : 'bg-[#f6e9de] dark:bg-[#2a1a25]'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8">
        <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/40 dark:border-[#3a2530] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 animate-fade-in">
          {/* STEP 01: WELCOME */}
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e08858] to-[#5e4650] text-white flex items-center justify-center mx-auto shadow-gold-glow">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e08858] font-serif">
                  Step 01 • Welcome
                </span>
                <h1 className="text-3xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-1">
                  Welcome to Aevona Solution, {currentUser?.name || 'Partner'}!
                </h1>
                <p className="text-sm text-[#5e4650] dark:text-[#e08858]/80 mt-2 max-w-md mx-auto leading-relaxed">
                  Let’s customize your workspace experience in under 2 minutes so you can access your SaaS platform projects, tools, and technical services.
                </p>
              </div>

              <div className="pt-4">
                <Button variant="gold" size="lg" onClick={handleNext} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  Get Started Setup
                </Button>
              </div>
            </div>
          )}

          {/* STEP 02: PERSONAL INFORMATION */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e08858] font-serif">
                  Step 02 • Personal Details
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-1">
                  Tell us about your role
                </h2>
                <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80">
                  This helps customize project permissions and team notifications.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
                    Job Title / Designation
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-[#c45139]" />
                    <input
                      type="text"
                      value={personalInfo.jobTitle}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, jobTitle: e.target.value })}
                      placeholder="e.g. VP of Technology / Product Owner"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:ring-2 focus:ring-[#e08858]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:ring-2 focus:ring-[#e08858]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
                    Location / Timezone
                  </label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA (PST)"
                    className="w-full px-4 py-2.5 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:ring-2 focus:ring-[#e08858]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 03: COMPANY INFORMATION */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e08858] font-serif">
                  Step 03 • Organization
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-1">
                  Company Details
                </h2>
                <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80">
                  Configure workspace parameters for your enterprise organization.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-[#c45139]" />
                    <input
                      type="text"
                      value={companyInfo.companyName}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:ring-2 focus:ring-[#e08858]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
                    Company Size
                  </label>
                  <select
                    value={companyInfo.companySize}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, companySize: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:ring-2 focus:ring-[#e08858]"
                  >
                    <option value="1-10 employees">1 - 10 employees</option>
                    <option value="10-50 employees">10 - 50 employees</option>
                    <option value="50-250 employees">50 - 250 employees</option>
                    <option value="250+ employees">250+ Enterprise employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
                    Industry Category
                  </label>
                  <select
                    value={companyInfo.industry}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:ring-2 focus:ring-[#e08858]"
                  >
                    <option value="Technology & Software">Technology & Software</option>
                    <option value="Finance & Fintech">Finance & Fintech</option>
                    <option value="Healthcare & Telemed">Healthcare & Telemed</option>
                    <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                    <option value="Education & EdTech">Education & EdTech</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 04: CHOOSE USE CASE */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e08858] font-serif">
                  Step 04 • Objectives
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-1">
                  What are you looking to accomplish?
                </h2>
                <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80">
                  Select all digital solutions relevant to your organization.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {useCaseOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedUseCases.includes(opt.label);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleToggleUseCase(opt.label)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#e08858] bg-[#e08858]/15 shadow-sm'
                          : 'border-[#e08858]/30 dark:border-[#3a2530] bg-[#fbf4ee]/50 dark:bg-[#140a14] hover:border-[#e08858]/60'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-[#5e4650] text-white dark:bg-[#e08858] dark:text-[#140a14]' : 'bg-[#f6e9de] dark:bg-[#2a1a25] text-[#5e4650] dark:text-[#e08858]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">{opt.label}</div>
                        <div className="text-[11px] text-[#5e4650]/70 dark:text-[#e08858]/60 mt-0.5">{opt.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 05: PREFERENCES */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e08858] font-serif">
                  Step 05 • Platform Preferences
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-1">
                  Notification & Reports
                </h2>
                <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80">
                  Manage how you receive project updates and engineering alerts.
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/30 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">Email Notifications</div>
                    <div className="text-[11px] text-[#5e4650]/70 dark:text-[#e08858]/60">Receive task assignments and project milestones.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.emailUpdates}
                    onChange={(e) => setPreferences({ ...preferences, emailUpdates: e.target.checked })}
                    className="w-4 h-4 accent-[#5e4650] dark:accent-[#e08858]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/30 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">Critical Security & Task Alerts</div>
                    <div className="text-[11px] text-[#5e4650]/70 dark:text-[#e08858]/60">Instant notifications for urgent deployment changes.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.taskAlerts}
                    onChange={(e) => setPreferences({ ...preferences, taskAlerts: e.target.checked })}
                    className="w-4 h-4 accent-[#5e4650] dark:accent-[#e08858]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/30 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">Weekly Analytics Digest</div>
                    <div className="text-[11px] text-[#5e4650]/70 dark:text-[#e08858]/60">Summary report of monthly bandwidth and task completion.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.weeklyReport}
                    onChange={(e) => setPreferences({ ...preferences, weeklyReport: e.target.checked })}
                    className="w-4 h-4 accent-[#5e4650] dark:accent-[#e08858]"
                  />
                </label>
              </div>
            </div>
          )}

          {/* STEP 06: COMPLETE */}
          {step === 6 && (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e08858] font-serif">
                  Step 06 • Setup Complete
                </span>
                <h1 className="text-3xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-1">
                  You're all set!
                </h1>
                <p className="text-sm text-[#5e4650] dark:text-[#e08858]/80 mt-2 max-w-md mx-auto">
                  Your enterprise portal for <span className="font-bold text-[#1c1019] dark:text-[#fbf4ee]">{companyInfo.companyName}</span> has been provisioned.
                </p>
              </div>

              <div className="pt-4">
                <Button variant="gold" size="lg" fullWidth onClick={handleFinish} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  Enter Dashboard Now
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Controls for Steps 2 to 5 */}
          {step > 1 && step < 6 && (
            <div className="flex items-center justify-between pt-6 border-t border-[#f6e9de] dark:border-[#33222c]">
              <Button variant="ghost" size="sm" onClick={handleBack} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>

              <div className="flex items-center gap-2">
                {step === 4 || step === 5 ? (
                  <Button variant="ghost" size="sm" onClick={handleNext}>
                    Skip
                  </Button>
                ) : null}
                <Button variant="gold" size="md" onClick={handleNext} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-[#5e4650]/70 dark:text-[#e08858]/60">
        © {new Date().getFullYear()} AEVONA SOLUTION. All rights reserved.
      </div>
    </div>
  );
};
