import React, { useState } from 'react';
import { CreditCard, Download, Check, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export const BillingPage: React.FC = () => {
  const { billingPlans: plans, invoices, currentSubscription, upgradePlan } = useDashboard();
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string } | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleSelectUpgrade = (planId: string, planName: string) => {
    setSelectedPlan({ id: planId, name: planName });
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedPlan) return;
    await upgradePlan(selectedPlan.id);
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
          Billing & Subscription Overview
        </h1>
        <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80 mt-1">
          Manage platform tiers, bandwidth usage quotas, payment methods, and PDF invoices.
        </p>
      </div>

      {/* Current Subscription Banner */}
      <div className="bg-gradient-to-r from-[#1c1019] via-[#3b2a35] to-[#1c1019] text-[#fbf4ee] p-6 sm:p-8 rounded-3xl border border-[#e08858]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e08858]/20 text-xs font-semibold text-[#e08858] border border-[#e08858]/30">
            <Sparkles className="w-3.5 h-3.5" /> {currentSubscription ? 'Current Active Subscription' : 'Plans for your next step'}
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#fbf4ee]">
            {currentSubscription ? `${currentSubscription.name} Plan` : 'Choose a plan that fits'}
          </h2>
          <p className="text-xs text-[#ebdacd]/80">
            {currentSubscription
              ? `${currentSubscription.price} / ${currentSubscription.billingPeriod}`
              : 'Starter $199 · Professional $799 · Business $1,999 monthly · Enterprise custom'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="gold" size="md" onClick={() => {
            const business = plans.find(p => p.name === 'Business');
            if (business) handleSelectUpgrade(business.id, business.name);
          }}>
            Upgrade Plan
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e08858]/30 bg-white dark:bg-[#1e1220] p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#1c1019] dark:text-[#fbf4ee]">Talk with the Aevona team</h3>
          <p className="mt-1 text-sm text-[#5e4650] dark:text-[#e08858]/80">Studio 51, Birmingham B4 7AH</p>
          <p className="mt-1 text-sm text-[#5e4650] dark:text-[#e08858]/80">
            <a href="mailto:info@aevonasolution.com">info@aevonasolution.com</a> · <a href="mailto:aevonasolution@gmail.com">aevonasolution@gmail.com</a>
          </p>
          <p className="mt-1 text-sm text-[#5e4650] dark:text-[#e08858]/80">
            <a href="tel:+447404010483">+44 7404 010483</a> · <a href="tel:+919875643914">+91 98756 43914</a>
          </p>
        </div>
        <a className="inline-flex items-center rounded-xl bg-[#e08858] px-4 py-3 text-sm font-bold text-[#1c1019]" href="mailto:info@aevonasolution.com?subject=Plan%20enquiry">CONTACT ABOUT A PLAN ↗</a>
      </div>

      {/* Usage Quota Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1e1220] border border-[#e08858]/30 shadow-md space-y-2">
          <div className="text-xs font-semibold text-[#5e4650] dark:text-[#e08858]/80">Active Projects</div>
          <div className="text-xl font-bold font-serif text-[#1c1019] dark:text-[#fbf4ee]">3 of 10 Used</div>
          <div className="h-2 w-full bg-[#f6e9de] dark:bg-[#2a1a25] rounded-full overflow-hidden">
            <div className="h-full bg-[#e08858] rounded-full" style={{ width: '30%' }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1e1220] border border-[#e08858]/30 shadow-md space-y-2">
          <div className="text-xs font-semibold text-[#5e4650] dark:text-[#e08858]/80">Encrypted Storage</div>
          <div className="text-xl font-bold font-serif text-[#1c1019] dark:text-[#fbf4ee]">39.1 GB of 100 GB</div>
          <div className="h-2 w-full bg-[#f6e9de] dark:bg-[#2a1a25] rounded-full overflow-hidden">
            <div className="h-full bg-[#c45139] rounded-full" style={{ width: '39%' }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1e1220] border border-[#e08858]/30 shadow-md space-y-2">
          <div className="text-xs font-semibold text-[#5e4650] dark:text-[#e08858]/80">Team Seats</div>
          <div className="text-xl font-bold font-serif text-[#1c1019] dark:text-[#fbf4ee]">5 of 15 Seats</div>
          <div className="h-2 w-full bg-[#f6e9de] dark:bg-[#2a1a25] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: '33%' }} />
          </div>
        </div>
      </div>

      {/* Subscription Plans Selection Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
          Available SaaS Platform Plans
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-6 border flex flex-col justify-between space-y-6 relative transition-all ${
                p.isCurrent
                  ? 'bg-white dark:bg-[#1e1220] border-2 border-[#e08858] shadow-xl'
                  : 'bg-white/80 dark:bg-[#1e1220]/80 border-[#e08858]/30 hover:border-[#e08858]'
              }`}
            >
              {p.isCurrent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#5e4650] text-white text-[10px] font-bold uppercase tracking-wider">
                  Current Plan
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">{p.name}</h4>
                  <div className="text-2xl font-bold text-[#5e4650] dark:text-[#e08858] mt-1 font-serif">
                    {p.price} <span className="text-xs text-[#5e4650]/70 font-normal">/ month</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-[#1c1019] dark:text-[#fbf4ee]">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#e08858] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={p.isCurrent ? 'outline' : 'gold'}
                fullWidth
                size="sm"
                disabled={p.isCurrent}
                onClick={() => handleSelectUpgrade(p.id, p.name)}
              >
                {p.isCurrent ? 'Active Tier' : `Select ${p.name}`}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices History Table */}
      <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
          Billing History & Invoices
        </h3>

        <div className="divide-y divide-[#f6e9de] dark:divide-[#33222c]">
          {invoices.map((inv) => (
            <div key={inv.id} className="py-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">{inv.number}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {inv.status}
                  </span>
                </div>
                <div className="text-xs text-[#5e4650] dark:text-[#e08858]/80 mt-0.5">{inv.description}</div>
                <div className="text-[10px] text-[#c45139]">{inv.date}</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">{inv.amount}</span>
                <Button variant="outline" size="sm" onClick={() => alert(`Downloading invoice ${inv.number}`)} icon={<Download className="w-3.5 h-3.5" />}>
                  PDF
                </Button>
              </div>
            </div>
          ))}
          {invoices.length === 0 && (
            <div className="py-8 text-center text-xs text-[#5e4650]/60 italic">
              No invoices yet. Your billing history will appear here once you're on a paid plan.
            </div>
          )}
        </div>
      </div>

      {/* CHECKOUT MODAL PREVIEW */}
      <Modal isOpen={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} title={`Upgrade to ${selectedPlan?.name ?? ''} Plan`}>
        <div className="space-y-4 text-center py-4">
          <ShieldCheck className="w-12 h-12 text-[#e08858] mx-auto" />
          <h3 className="text-base font-bold text-[#1c1019] dark:text-[#fbf4ee]">
            Confirm Plan Upgrade
          </h3>
          <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80">
            This connects to the Aevona billing API. In production, this step also redirects to Stripe/Paddle for payment collection.
          </p>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsCheckoutModalOpen(false)}>Cancel</Button>
            <Button variant="gold" size="sm" onClick={handleConfirmUpgrade}>
              Confirm Upgrade
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
