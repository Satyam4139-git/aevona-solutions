
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Loader2,
  ShieldCheck,
  LockKeyhole,
} from 'lucide-react';

export const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider') || 'OAuth';
  const navigate = useNavigate();

  useEffect(() => {
    // Social sign-in requires a configured OAuth provider on the backend; not wired up yet.
    const timer = setTimeout(() => {
      navigate('/login?error=oauth_not_configured');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const formattedProvider =
    provider.charAt(0).toUpperCase() + provider.slice(1);

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

          {/* Top Accent */}
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

          <div className="px-7 py-10 sm:px-10 sm:py-12">

            {/* Animated Security Icon */}
            <div className="flex justify-center">
              <div className="relative">

                {/* Outer pulse ring */}
                <div
                  className="
                    absolute
                    inset-[-8px]
                    rounded-xl
                    border
                    border-[#0b4f9c]/30
                    animate-ping
                  "
                  style={{
                    animationDuration: '2.5s',
                  }}
                />

                {/* Icon Container */}
                <div
                  className="
                    relative
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#0b4f9c]/50
                    bg-[#f3f6f9]
                    text-[#4a5a6a]
                    shadow-[0_12px_30px_rgba(40,20,32,0.12)]
                  "
                >
                  <ShieldCheck
                    className="h-9 w-9"
                    strokeWidth={1.6}
                  />

                  {/* Status Dot */}
                  <span
                    className="
                      absolute
                      right-1.5
                      top-1.5
                      h-3
                      w-3
                      rounded-full
                      border-2
                      border-[#f3f6f9]
                      bg-[#083b75]
                    "
                  />
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="mt-8 text-center">

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#083b75]
                "
              >
                Secure authentication
              </p>

              <h1
                className="
                  mt-2
                  text-[27px]
                  font-bold
                  tracking-[-0.03em]
                  text-[#2a3a4c]
                  sm:text-[29px]
                "
              >
                Authenticating with {formattedProvider}
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
                We are securely verifying your
                authentication credentials and preparing
                your session.
              </p>

            </div>

            {/* Progress Section */}
            <div className="mt-8">

              <div className="mb-3 flex items-center justify-between">
                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#083b75]
                  "
                >
                  Verification
                </span>

                <span
                  className="
                    text-[10px]
                    font-medium
                    text-[#8aa0b8]
                  "
                >
                  In progress
                </span>
              </div>

              {/* Progress Track */}
              <div
                className="
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-[#f3f6f9]
                "
              >
                <div
                  className="
                    h-full
                    w-2/3
                    rounded-full
                    bg-gradient-to-r
                    from-[#083b75]
                    to-[#0b4f9c]
                    animate-pulse
                  "
                />
              </div>

            </div>

            {/* Status */}
            <div
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-[#e3eaf1]
                bg-[#f3f6f9]
                px-5
                py-4
              "
            >

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#f3f6f9]
                "
              >
                <Loader2
                  className="
                    h-4
                    w-4
                    animate-spin
                    text-[#4a5a6a]
                  "
                  strokeWidth={2}
                />
              </div>

              <div className="text-left">

                <p
                  className="
                    text-[11px]
                    font-semibold
                    text-[#2a3a4c]
                  "
                >
                  Establishing secure session
                </p>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    text-[#6b7b8c]
                  "
                >
                  Please wait while we complete verification.
                </p>

              </div>

            </div>

            {/* Security Information */}
            <div
              className="
                mt-5
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-[#e3eaf1]
                bg-[#ffffff]
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
                  text-[10px]
                  leading-5
                  text-[#6b7b8c]
                "
              >
                Your authentication credentials are handled
                securely. You will be redirected automatically
                once verification is complete.
              </p>
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
          Secure authentication portal
        </p>

      </div>
    </div>
  );
};