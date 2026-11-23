import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { confirmResetPassword } = useAuth();
  const token = searchParams.get('token');

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { label: 'None', score: 0, color: 'bg-gray-300' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()]/.test(password)) score++;

    if (score <= 1) return { label: 'Weak', score, color: 'bg-rose-500' };
    if (score === 2 || score === 3) return { label: 'Moderate', score, color: 'bg-amber-500' };
    return { label: 'Strong', score, color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password || password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!token) {
      setError('This reset link is invalid or missing. Please request a new one.');
      return;
    }

    setLoading(true);
    const success = await confirmResetPassword(token, password);
    setLoading(false);
    if (success) {
      setSubmitted(true);
    } else {
      setError('This reset link is invalid or has expired. Please request a new one.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#12202f] ">
          Reset Password
        </h2>
        <p className="text-sm text-[#4a5a6a]  mt-1">
          Create a new secure password for your Aevona enterprise account.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-white  border border-[#0b4f9c]/40  text-center space-y-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-100  text-emerald-600  flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#12202f] ">Password Updated!</h3>
            <p className="text-xs text-[#4a5a6a]  mt-1">
              Your password has been successfully reset. You can now log in.
            </p>
          </div>
          <Button variant="gold" fullWidth onClick={() => navigate('/login')}>
            Sign In Now
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-100  border border-rose-300  text-xs text-rose-800 ">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#12202f]  mb-1.5">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0b4f9c]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-white  border border-[#0b4f9c]/50  rounded-xl text-sm text-[#12202f]  focus:outline-none focus:ring-2 focus:ring-[#0b4f9c]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#0b4f9c]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Strength meter */}
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-[#4a5a6a] ">Password Strength:</span>
                <span className="text-[#12202f] ">{strength.label}</span>
              </div>
              <div className="h-1.5 w-full bg-[#f3f6f9]  rounded-full overflow-hidden flex gap-1">
                <div className={`h-full transition-all duration-300 ${strength.score >= 1 ? strength.color : ''} flex-1`} />
                <div className={`h-full transition-all duration-300 ${strength.score >= 2 ? strength.color : ''} flex-1`} />
                <div className={`h-full transition-all duration-300 ${strength.score >= 3 ? strength.color : ''} flex-1`} />
                <div className={`h-full transition-all duration-300 ${strength.score >= 4 ? strength.color : ''} flex-1`} />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#12202f]  mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0b4f9c]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white  border border-[#0b4f9c]/50  rounded-xl text-sm text-[#12202f]  focus:outline-none focus:ring-2 focus:ring-[#0b4f9c]"
              />
            </div>
          </div>

          <Button type="submit" variant="gold" fullWidth size="lg" disabled={loading}>
            {loading ? 'Updating Password...' : 'Reset Password'}
          </Button>
        </form>
      )}

      <div className="text-center pt-2">
        <Link to="/login" className="text-xs text-[#4a5a6a]  font-semibold hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};
