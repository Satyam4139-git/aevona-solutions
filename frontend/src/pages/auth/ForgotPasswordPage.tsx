import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await resetPassword(email);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
          Password Recovery
        </h2>
        <p className="text-sm text-[#5e4650] dark:text-[#e08858]/80 mt-1">
          Enter your registered work email address to receive password reset instructions.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1e1220] border border-[#e08858]/40 dark:border-[#3a2530] shadow-lg text-center space-y-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1c1019] dark:text-[#fbf4ee]">Check your email for instructions</h3>
            <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80 mt-1">
              We sent a password reset link to <span className="font-semibold text-[#1c1019] dark:text-[#fbf4ee]">{email}</span>.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/reset-password">
              <Button variant="outline" size="sm">
                Mock Reset Link Screen →
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1.5">
              Work Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#c45139]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1e1220] border border-[#e08858]/50 dark:border-[#3a2530] rounded-xl text-sm text-[#1c1019] dark:text-[#fbf4ee] focus:outline-none focus:ring-2 focus:ring-[#e08858]"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            fullWidth
            size="lg"
            disabled={loading}
          >
            {loading ? 'Sending Request...' : 'Send Reset Link'}
          </Button>
        </form>
      )}

      <div className="pt-2 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5e4650] dark:text-[#e08858] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
        </Link>
      </div>
    </div>
  );
};
