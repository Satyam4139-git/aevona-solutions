import React from 'react';
import { Button } from '../../components/ui/Button';
import { CreditCard, Download, Check, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const BillingPage: React.FC = () => {
  const { invoices, currentSubscription } = useDashboard();

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#12202f] ">
          Billing & Subscription Overview
        </h1>
        <p className="text-xs text-[#4a5a6a]  mt-1">
          Manage platform tiers, bandwidth usage quotas, payment methods, and PDF invoices.
        </p>
      </div>

      {/* Current Subscription Banner */}
      <div className="bg-gradient-to-r from-[#12202f] via-[#1b2b3d] to-[#12202f] text-[#ffffff] p-6 sm:p-8 rounded-3xl border border-[#0b4f9c]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b4f9c]/20 text-xs font-semibold text-[#0b4f9c] border border-[#0b4f9c]/30">
            <Sparkles className="w-3.5 h-3.5" /> {currentSubscription ? 'Current Active Subscription' : 'Plans for your next step'}
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#ffffff]">
            {currentSubscription ? `${currentSubscription.name} Plan` : 'Choose a plan that fits'}
          </h2>
          <p className="text-xs text-[#dbe2e9]/80">
            {currentSubscription
              ? `${currentSubscription.price} / ${currentSubscription.billingPeriod}`
              : 'Starter $199 · Professional $799 · Business $1,999 monthly · Enterprise custom'}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#0b4f9c]/30 bg-white  p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#12202f] ">Talk with the Aevona team</h3>
          <p className="mt-1 text-sm text-[#4a5a6a] ">Studio 51, Birmingham B4 7AH</p>
          <p className="mt-1 text-sm text-[#4a5a6a] ">
            <a href="mailto:info@aevonasolution.com">info@aevonasolution.com</a> · <a href="mailto:aevonasolution@gmail.com">aevonasolution@gmail.com</a>
          </p>
          <p className="mt-1 text-sm text-[#4a5a6a] ">
            <a href="tel:+447404010483">+44 7404 010483</a> · <a href="tel:+919875643914">+91 98756 43914</a>
          </p>
        </div>
        <a className="inline-flex items-center rounded-xl bg-[#0b4f9c] px-4 py-3 text-sm font-bold text-white" href="mailto:info@aevonasolution.com?subject=Plan%20enquiry">CONTACT ABOUT A PLAN ↗</a>
      </div>

      {/* Invoices History Table */}
      <div className="bg-white  border border-[#0b4f9c]/30 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-serif font-bold text-[#12202f] ">
          Billing History & Invoices
        </h3>

        <div className="divide-y divide-[#f3f6f9] ">
          {invoices.map((inv) => (
            <div key={inv.id} className="py-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#12202f] ">{inv.number}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {inv.status}
                  </span>
                </div>
                <div className="text-xs text-[#4a5a6a]  mt-0.5">{inv.description}</div>
                <div className="text-[10px] text-[#0b4f9c]">{inv.date}</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#12202f] ">{inv.amount}</span>
                <Button variant="outline" size="sm" onClick={() => alert(`Downloading invoice ${inv.number}`)} icon={<Download className="w-3.5 h-3.5" />}>
                  PDF
                </Button>
              </div>
            </div>
          ))}
          {invoices.length === 0 && (
            <div className="py-8 text-center text-xs text-[#4a5a6a]/60 italic">
              No invoices yet. Your billing history will appear here once you're on a paid plan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
