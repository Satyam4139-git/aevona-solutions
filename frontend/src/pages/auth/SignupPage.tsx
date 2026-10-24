import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Building, Check, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Password requirements state
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !company || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!hasMinLength || !hasNumber) {
      setError('Password does not satisfy requirements.');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('You must accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      await signup(fullName, email, company, password);
      navigate('/verify-email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignup = (provider: string) => {
    navigate(`/auth/callback?provider=${provider.toLowerCase()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-Clarkson font-bold text-[#1c1019] dark:text-[#fbf4ee]">
          Create Enterprise Account
        </h2>
        <p className="text-sm text-[#5e4650] dark:text-[#e08858]/80 mt-1">
          Join Aevona Solution platform to launch and manage your digital infrastructure.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 w-4 h-4 text-[#c45139]" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Morgan"
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1e1220] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:outline-none focus:ring-2 focus:ring-[#e08858]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-Clarkson text-[#1c1019] dark:text-[#fbf4ee] mb-1">
            Work Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#c45139]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1e1220] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:outline-none focus:ring-2 focus:ring-[#e08858]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-Clarkson text-[#1c1019] dark:text-[#fbf4ee] mb-1">
            Company Name *
          </label>
          <div className="relative">
            <Building className="absolute left-3.5 top-3 w-4 h-4 text-[#c45139]" />
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Aevona Enterprises Inc."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1e1220] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:outline-none focus:ring-2 focus:ring-[#e08858]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-Clarkson text-[#1c1019] dark:text-[#fbf4ee] mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#c45139]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-9 py-2 bg-white dark:bg-[#1e1220] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:outline-none focus:ring-2 focus:ring-[#e08858]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-3 text-[#c45139]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-Clarkson text-[#1c1019] dark:text-[#fbf4ee] mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#c45139]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1e1220] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:outline-none focus:ring-2 focus:ring-[#e08858]"
              />
            </div>
          </div>
        </div>

        {/* Password Strength Requirements */}
        <div className="p-2.5 rounded-xl bg-[#f6e9de]/50 dark:bg-[#1e1220] border border-[#e08858]/30 text-xs space-y-1">
          <div className="text-[11px] font-semibold text-[#5e4650] dark:text-[#e08858]">
            Password Security Checklist:
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-[#a63d2a]'}`}>
              <Check className="w-3.5 h-3.5" /> At least 8 characters
            </div>
            <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-[#a63d2a]'}`}>
              <Check className="w-3.5 h-3.5" /> Contains a number
            </div>
            <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-[#a63d2a]'}`}>
              <Check className="w-3.5 h-3.5" /> Special character
            </div>
            <div className={`flex items-center gap-1.5 ${passwordsMatch ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-[#a63d2a]'}`}>
              <Check className="w-3.5 h-3.5" /> Passwords match
            </div>
          </div>
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-2.5 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 accent-[#5e4650] dark:accent-[#e08858] rounded border-[#e08858]"
          />
          <span className="text-xs text-[#5e4650] dark:text-[#e08858]/90 leading-normal">
            I agree to the <Link to="/terms" className="underline font-Clarkson hover:text-[#1c1019] dark:hover:text-[#fbf4ee]">Terms & Conditions</Link> and acknowledge the <Link to="/privacy" className="underline font-Clarkson hover:text-[#1c1019] dark:hover:text-[#fbf4ee]">Privacy Policy</Link>.
          </span>
        </label>

        <Button
          type="submit"
          variant="gold"
          fullWidth
          size="lg"
          disabled={loading}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-[#e08858]/30 dark:border-[#3a2530] w-full" />
        <span className="absolute bg-[#fbf4ee] dark:bg-[#100810] px-3 text-xs text-[#a63d2a] dark:text-[#e08858]/60 uppercase tracking-wider font-semibold">
          Or sign up with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleOAuthSignup('Google')}
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white dark:bg-[#1e1220] border border-[#e08858]/40 dark:border-[#3a2530] text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] hover:bg-[#f6e9de]/50 dark:hover:bg-[#2a1a25] transition-colors"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuthSignup('Microsoft')}
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white dark:bg-[#1e1220] border border-[#e08858]/40 dark:border-[#3a2530] text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] hover:bg-[#f6e9de]/50 dark:hover:bg-[#2a1a25] transition-colors"
        >
          Microsoft
        </button>
      </div>

      <p className="text-center text-xs text-[#5e4650] dark:text-[#e08858]/80 pt-1">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#5e4650] dark:text-[#e08858] hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};
