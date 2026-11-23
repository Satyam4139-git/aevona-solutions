
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { ShieldCheck, LockKeyhole, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminTokenStorage, api } from '../../lib/api';

export const AdminLoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleGoogleSuccess = async (credential?: string) => {
    if (!credential) {
      setError('Google did not return a sign-in credential.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      logout();

      const tokens = await api.auth.adminGoogleLogin(credential);

      adminTokenStorage.setTokens(
        tokens.access_token,
        tokens.refresh_token
      );

      navigate('/admin', { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Admin sign-in failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-[70vh]
        flex
        items-center
        justify-center
        px-4
        py-12
      "
      style={{
        fontFamily:
          'Clarkson, Inter, Helvetica Neue, Arial, sans-serif',
      }}
    >
      <div className="w-full max-w-md">

        {/* Main Card */}
        <div
          className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-[#dbe2e9]/70
            bg-[#ffffff]
            shadow-[0_24px_70px_rgba(40,20,32,0.12)]
          "
        >

          {/* Decorative top gradient */}
          <div
            className="
              absolute
              inset-x-0
              top-0
              h-1.5
              bg-gradient-to-r
              from-[#083b75]
              via-[#0b4f9c]
              to-[#083b75]
            "
          />

          <div className="px-7 py-9 sm:px-10 sm:py-11">

            {/* Security Icon */}
            <div className="flex justify-center">
              <div
                className="
                  relative
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#0b4f9c]/50
                  bg-[#f3f6f9]
                  text-[#4a5a6a]
                  shadow-[0_10px_25px_rgba(40,20,32,0.10)]
                "
              >
                <ShieldCheck
                  className="h-8 w-8"
                  strokeWidth={1.7}
                />

                <div
                  className="
                    absolute
                    -right-1
                    -top-1
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-[#ffffff]
                    bg-[#083b75]
                  "
                />
              </div>
            </div>

            {/* Heading */}
            <div className="mt-6 text-center">

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#083b75]
                "
              >
                Secure access
              </p>

              <h1
                className="
                  mt-2
                  text-[28px]
                  font-bold
                  tracking-[-0.03em]
                  text-[#2a3a4c]
                  sm:text-[30px]
                "
              >
                Admin sign-in
              </h1>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-sm
                  text-[13px]
                  leading-6
                  text-[#4a5a6a]
                "
              >
                Sign in with an approved Google account
                to securely access the administration portal.
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#dbe2e9]" />
              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#8aa0b8]
                "
              >
                Authorized accounts only
              </span>
              <div className="h-px flex-1 bg-[#dbe2e9]" />
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="
                  mb-5
                  rounded-2xl
                  border
                  border-[#e7b8b8]
                  bg-[#fff4f3]
                  px-4
                  py-3
                  text-[13px]
                  leading-5
                  text-[#9b3c3c]
                "
              >
                <div className="flex gap-3">
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#b95757]" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Google Login */}
            <div
              className="
                flex
                min-h-[48px]
                justify-center
                rounded-2xl
              "
              aria-busy={loading}
            >
              <GoogleLogin
                onSuccess={(response) =>
                  void handleGoogleSuccess(response.credential)
                }
                onError={() =>
                  setError(
                    'Google sign-in failed. Please try again.'
                  )
                }
                theme="outline"
                size="large"
                shape="pill"
                text="signin_with"
                width="320"
              />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="mt-5 flex items-center justify-center gap-2">
                <div
                  className="
                    h-3.5
                    w-3.5
                    animate-spin
                    rounded-full
                    border-2
                    border-[#0b4f9c]
                    border-t-[#4a5a6a]
                  "
                />

                <p
                  className="
                    text-[11px]
                    font-medium
                    tracking-wide
                    text-[#4a5a6a]
                  "
                >
                  Authenticating securely…
                </p>
              </div>
            )}

            {/* Security Note */}
            <div
              className="
                mt-7
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-[#e3eaf1]
                bg-[#f3f6f9]
                px-4
                py-3.5
              "
            >
              <LockKeyhole
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-[#083b75]
                "
                strokeWidth={1.8}
              />

              <p
                className="
                  text-[11px]
                  leading-5
                  text-[#4a5a6a]
                "
              >
                Admin access is restricted to approved
                accounts. Your authentication is handled
                securely through Google.
              </p>
            </div>

            {/* Back to Client Login */}
            <div className="mt-8 text-center">

              <Link
                to="/login"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-[12px]
                  font-medium
                  text-[#4a5a6a]
                  transition-colors
                  duration-200
                  hover:text-[#2a3a4c]
                "
              >
                <ArrowLeft
                  className="
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-200
                    group-hover:-translate-x-1
                  "
                />

                Return to client sign-in
              </Link>

            </div>

          </div>
        </div>

        {/* Footer */}
        <p
          className="
            mt-6
            text-center
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-[#8aa0b8]
          "
        >
          Protected administration portal
        </p>

      </div>
    </div>
  );
};
