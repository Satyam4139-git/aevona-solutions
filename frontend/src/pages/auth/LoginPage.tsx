import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

export const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(
    searchParams.get('error') === 'oauth_not_configured'
      ? 'Social sign-in is not configured yet. Please sign in with your email and password.'
      : ''
  );

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const requestedDestination = searchParams.get('next');
  const postLoginDestination = requestedDestination && (requestedDestination.startsWith('/dashboard/') || requestedDestination === '/dashboard')
    ? requestedDestination
    : '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(identifier, password);
      navigate(postLoginDestination, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid login credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#12202f] ">
          Welcome back
        </h2>
        <p className="text-sm text-[#4a5a6a]  mt-1">
          Access your Aevona enterprise dashboard & services.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-100  border border-rose-300  text-xs text-rose-800 ">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#12202f]  mb-1.5">
            Work Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#0b4f9c]" />
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="name@company.com"
              className="w-full pl-10 pr-4 py-2.5 bg-white  border border-[#0b4f9c]/50  rounded-xl text-sm text-[#12202f]  focus:outline-none focus:ring-2 focus:ring-[#0b4f9c]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-[#12202f] ">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-[#4a5a6a]  hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
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
              className="absolute right-3 top-3 text-[#0b4f9c] hover:text-[#12202f] "
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-[#4a5a6a]  rounded border-[#0b4f9c]"
            />
            <span className="text-xs text-[#4a5a6a]  font-medium">Remember this browser</span>
          </label>
        </div>

        <Button
          type="submit"
          variant="gold"
          fullWidth
          size="lg"
          disabled={loading}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-[#0b4f9c]/30  w-full" />
        <span className="absolute bg-[#ffffff]  px-3 text-xs text-[#083b75]  uppercase tracking-wider font-semibold">
          Or continue with
        </span>
      </div>

     {/* OAuth Social Buttons */}
     <div className="flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (!credentialResponse.credential) {
            setError('Google did not return a sign-in credential.');
            return;
          }
          setLoading(true);
          setError('');
          void googleLogin(credentialResponse.credential)
            .then(() => navigate(postLoginDestination, { replace: true }))
            .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Google sign-in failed.'))
            .finally(() => setLoading(false));
        }}
        onError={() => setError('Google sign-in failed. Please try again.')}
        width="400"
      />

      </div>

      {/* Footer Link */}
      <p className="text-center text-xs text-[#4a5a6a]  pt-2">
        Don't have an enterprise account?{' '}
        <Link to="/signup" className="font-bold text-[#4a5a6a]  hover:underline">
          Create Account
        </Link>
      </p>
      <p className="text-center text-xs text-[#4a5a6a] ">
        Aevona staff? <Link to="/admin/login" className="font-bold underline">Admin sign-in</Link>
      </p>
    </div>
  );
};
