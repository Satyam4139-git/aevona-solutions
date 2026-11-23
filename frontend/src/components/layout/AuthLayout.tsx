import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { ShieldCheck, Sparkles, Cpu, Layers } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#ffffff]  text-[#12202f] ">
      {/* Left Column: Visual Brand Banner (Desktop & Tablet) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#12202f] via-[#1b2b3d] to-[#0c1824] p-12 flex-col justify-between overflow-hidden">
        {/* Glowing background highlights */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0b4f9c]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#0b4f9c]/20 rounded-full blur-3xl" />

        {/* Top Branding */}
        <div className="relative z-10">
          <Logo variant="light" size="lg" />
        </div>

        {/* Middle Visual & Messaging */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b4f9c]/20 border border-[#0b4f9c]/30 text-xs font-semibold text-[#0b4f9c]">
            <Sparkles className="w-3.5 h-3.5" />
            Enterprise Digital SaaS & Solutions
          </div>

          <h1 className="text-4xl xl:text-5xl font-serif font-bold text-[#ffffff] leading-tight">
            Building Technology That Creates <span className="text-[#0b4f9c]">Real Impact.</span>
          </h1>

          <p className="text-base text-[#dbe2e9]/80 leading-relaxed">
            Welcome to the Aevona Solution Portal. Manage cloud deployments, track enterprise project milestones, analyze metrics, and collaborate with our engineering team in real-time.
          </p>

          {/* Feature Bullets */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-[#0b4f9c] mb-1.5" />
              <div className="text-xs font-bold text-white">SOC2 & Enterprise Security</div>
              <div className="text-[11px] text-[#dbe2e9]/70">Zero-trust architecture</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Cpu className="w-5 h-5 text-[#0b4f9c] mb-1.5" />
              <div className="text-xs font-bold text-white">Real-Time Cloud Ops</div>
              <div className="text-[11px] text-[#dbe2e9]/70">Multi-region telemetry</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Layers className="w-5 h-5 text-[#0b4f9c] mb-1.5" />
              <div className="text-xs font-bold text-white">Unified Service Hub</div>
              <div className="text-[11px] text-[#dbe2e9]/70">Projects, tasks, files & BI</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-[#0b4f9c] mb-1.5" />
              <div className="text-xs font-bold text-white">Dedicated Support</div>
              <div className="text-[11px] text-[#dbe2e9]/70">24/7 engineering SLA</div>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial Snippet */}
        <div className="relative z-10 pt-6 border-t border-white/10 text-xs text-[#dbe2e9]/70 flex items-center justify-between">
          <span>Trusted by 50+ Enterprise Clients worldwide</span>
          <div className="flex items-center space-x-4">
            <Link to="/privacy" className="hover:text-[#0b4f9c]">Privacy</Link>
            <Link to="/terms" className="hover:text-[#0b4f9c]">Terms</Link>
          </div>
        </div>
      </div>

      {/* Right Column: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 xl:p-16 overflow-y-auto">
        <div className="lg:hidden flex items-center justify-between mb-8">
          <Logo size="md" />
          <Link to="/" className="text-xs font-medium text-[#4a5a6a] ">
            ← Back to Home
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-6">
          <Outlet />
        </div>

        <div className="mt-8 text-center text-xs text-[#4a5a6a]/70 ">
          Need help? <Link to="/contact" className="underline hover:text-[#4a5a6a] ">Contact Aevona Support</Link>
        </div>
      </div>
    </div>
  );
};
