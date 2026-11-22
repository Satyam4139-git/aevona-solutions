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
        <h2 className="text-2xl sm:text-3xl font-Clarkson font-bold text-[#12202f] ">
          Create Enterprise Account
        </h2>
        <p className="text-sm text-[#4a5a6a]  mt-1">
          Join Aevona Solution platform to launch and manage your digital infrastructure.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-100  border border-rose-300  text-xs text-rose-800 ">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#12202f]  mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 w-4 h-4 text-[#0b4f9c]" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Morgan"
              className="w-full pl-10 pr-4 py-2 bg-white  border border-[#0b4f9c]/50  rounded-xl text-sm text-[#12202f]  focus:outline-none focus:ring-2 focus:ring-[#0b4f9c]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-Clarkson text-[#12202f]  mb-1">
            Work Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#0b4f9c]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="w-full pl-10 pr-4 py-2 bg-white  border border-[#0b4f9c]/50  rounded-xl text-sm text-[#12202f]  focus:outline-none focus:ring-2 focus:ring-[#0b4f9c]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-Clarkson text-[#12202f]  mb-1">
            Company Name *
          </label>
          <div className="relative">
            <Building className="absolute left-3.5 top-3 w-4 h-4 text-[#0b4f9c]" />
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Aevona Enterprises Inc."
              className="w-full pl-10 pr-4 py-2 bg-white  border border-[#0b4f9c]/50  rounded-xl text-sm text-[#12202f]  focus:outline-none focus:ring-2 focus:ring-[#0b4f9c]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-Clarkson text-[#12202f]  mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#0b4f9c]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-9 py-2 bg-white  border border-[#0b4f9c]/50  rounded-xl text-sm text-[#12202f]  focus:outline-none focus:ring-2 focus:ring-[#0b4f9c]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-3 text-[#0b4f9c]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-Clarkson text-[#12202f]  mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#0b4f9c]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 bg-white  border border-[#0b4f9c]/50  rounded-xl text-sm text-[#12202f]  focus:outline-none focus:ring-2 focus:ring-[#0b4f9c]"
              />
            </div>
          </div>
        </div>

        {/* Password Strength Requirements */}
        <div className="p-2.5 rounded-xl bg-[#f3f6f9]/50  border border-[#0b4f9c]/30 text-xs space-y-1">
          <div className="text-[11px] font-semibold text-[#4a5a6a] ">
            Password Security Checklist:
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-700  font-semibold' : 'text-[#083b75]'}`}>
              <Check className="w-3.5 h-3.5" /> At least 8 characters
            </div>
            <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-700  font-semibold' : 'text-[#083b75]'}`}>
              <Check className="w-3.5 h-3.5" /> Contains a number
            </div>
            <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-700  font-semibold' : 'text-[#083b75]'}`}>
              <Check className="w-3.5 h-3.5" /> Special character
            </div>
            <div className={`flex items-center gap-1.5 ${passwordsMatch ? 'text-emerald-700  font-semibold' : 'text-[#083b75]'}`}>
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
            className="w-4 h-4 mt-0.5 accent-[#4a5a6a]  rounded border-[#0b4f9c]"
          />
          <span className="text-xs text-[#4a5a6a]  leading-normal">
            I agree to the <Link to="/terms" className="underline font-Clarkson hover:text-[#12202f] ">Terms & Conditions</Link> and acknowledge the <Link to="/privacy" className="underline font-Clarkson hover:text-[#12202f] ">Privacy Policy</Link>.
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
        <div className="border-t border-[#0b4f9c]/30  w-full" />
        <span className="absolute bg-[#ffffff]  px-3 text-xs text-[#083b75]  uppercase tracking-wider font-semibold">
          Or sign up with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleOAuthSignup('Google')}
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white  border border-[#0b4f9c]/40  text-xs font-semibold text-[#12202f]  hover:bg-[#f3f6f9]/50  transition-colors"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuthSignup('Microsoft')}
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white  border border-[#0b4f9c]/40  text-xs font-semibold text-[#12202f]  hover:bg-[#f3f6f9]/50  transition-colors"
        >
          Microsoft
        </button>
      </div>

      <p className="text-center text-xs text-[#4a5a6a]  pt-1">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#4a5a6a]  hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};
