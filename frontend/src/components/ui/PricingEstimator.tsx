import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { PRICE_CATEGORIES, MAINTENANCE_PLANS } from '../../data/pricing';

type Region = 'india' | 'intl';

/** Project estimator driven by the Aevona 2026 pricing brochure. */
export const PricingEstimator: React.FC = () => {
  const [region, setRegion] = useState<Region>('india');
  const [categoryId, setCategoryId] = useState(PRICE_CATEGORIES[0].id);
  const [selected, setSelected] = useState<string[]>([]);
  const [planId, setPlanId] = useState('');
  const [urgent, setUrgent] = useState(false);

  const fmt = (n: number) =>
    region === 'india' ? `₹${n.toLocaleString('en-IN')}` : `$${n.toLocaleString('en-US')}`;
  const priceOf = (item: { inr: number; usd: number }) => (region === 'india' ? item.inr : item.usd);

  const allItems = useMemo(() => PRICE_CATEGORIES.flatMap((c) => c.items), []);
  const chosen = allItems.filter((i) => selected.includes(i.id));
  const oneTime = chosen.reduce((sum, i) => sum + priceOf(i), 0);
  const plan = MAINTENANCE_PLANS.find((p) => p.id === planId);
  const monthly = plan ? priceOf(plan) : 0;

  const category = PRICE_CATEGORIES.find((c) => c.id === categoryId) ?? PRICE_CATEGORIES[0];
  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <section id="estimate" className="rounded-xl border-2 border-[#0b4f9c]/50 bg-white p-6 sm:p-10 shadow-xl scroll-mt-28">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#0b4f9c]">Project planning</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#12202f]">Project cost estimator</h2>
          <p className="mt-2 text-sm text-[#4a5a6a]">
            Pick the services you need. Prices are our 2026 introductory starting rates.
          </p>
        </div>

        <div className="inline-flex rounded-lg border-2 border-[#0b4f9c]/50 p-1 bg-[#f3f6f9]" role="tablist" aria-label="Pricing region">
          {([['india', 'India (₹)'], ['intl', 'International ($)']] as const).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={region === id}
              onClick={() => setRegion(id)}
              className={`rounded-md px-4 py-2 text-xs font-bold transition-colors ${
                region === id ? 'bg-[#0b4f9c] text-white' : 'text-[#4a5a6a] hover:text-[#0b4f9c]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.35fr_.65fr] gap-8">
        {/* Selection */}
        <div>
          <div className="flex flex-wrap gap-2">
            {PRICE_CATEGORIES.map((c) => {
              const count = c.items.filter((i) => selected.includes(i.id)).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setCategoryId(c.id)}
                  className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all ${
                    c.id === categoryId
                      ? 'border-[#0b4f9c] bg-[#0b4f9c] text-white'
                      : 'border-[#0b4f9c]/40 bg-white text-[#4a5a6a] hover:border-[#0b4f9c]'
                  }`}
                >
                  {c.label}
                  {count > 0 && <span className="ml-2 rounded-full bg-white/90 px-1.5 text-[10px] text-[#0b4f9c]">{count}</span>}
                </button>
              );
            })}
          </div>

          <ul className="mt-5 space-y-2.5">
            {category.items.map((item) => {
              const on = selected.includes(item.id);
              return (
                <li key={item.id}>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-all ${
                      on ? 'border-[#0b4f9c] bg-[#0b4f9c]/10' : 'border-[#0b4f9c]/30 bg-white hover:border-[#0b4f9c]/70'
                    }`}
                  >
                    <input type="checkbox" checked={on} onChange={() => toggle(item.id)} className="h-4 w-4 accent-[#0b4f9c]" />
                    <span className="flex-1 text-sm font-medium text-[#12202f]">{item.name}</span>
                    <span className="text-sm font-bold text-[#0b4f9c]">{fmt(priceOf(item))}</span>
                  </label>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold text-[#12202f]">
              Monthly maintenance (optional)
              <select
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
                className="mt-2 block w-full rounded-lg border-2 border-[#0b4f9c]/40 bg-white p-3 text-sm"
              >
                <option value="">No maintenance plan</option>
                {MAINTENANCE_PLANS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} – {fmt(priceOf(p))}/mo
                  </option>
                ))}
              </select>
              {plan && <span className="mt-1 block text-[11px] font-normal text-[#4a5a6a]">{plan.allowance}</span>}
            </label>

            <label className="flex items-start gap-3 rounded-lg border-2 border-[#0b4f9c]/30 bg-white p-3 text-xs font-semibold text-[#12202f]">
              <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#0b4f9c]" />
              <span>
                Urgent delivery
                <span className="block font-normal text-[#4a5a6a]">Expedited timelines may add 15–30%.</span>
              </span>
            </label>
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-xl border-2 border-[#0b4f9c]/50 bg-[#f3f6f9] p-6 lg:sticky lg:top-32">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a5a6a]">Your estimate</span>

          {chosen.length === 0 && !plan ? (
            <p className="mt-4 text-sm text-[#4a5a6a]">Select one or more services to see your starting estimate.</p>
          ) : (
            <>
              <ul className="mt-4 space-y-2 text-sm">
                {chosen.map((i) => (
                  <li key={i.id} className="flex items-start justify-between gap-3">
                    <span className="flex items-start gap-2 text-[#12202f]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0b4f9c]" /> {i.name}
                    </span>
                    <span className="font-semibold text-[#12202f]">{fmt(priceOf(i))}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t-2 border-[#0b4f9c]/30 pt-4">
                <div className="text-xs text-[#4a5a6a]">One-time project, starting from</div>
                <div className="mt-1 text-3xl font-bold text-[#0b4f9c]">{fmt(oneTime)}</div>
                {urgent && oneTime > 0 && (
                  <div className="mt-1 text-xs text-[#4a5a6a]">
                    With urgent delivery: {fmt(Math.round(oneTime * 1.15))} – {fmt(Math.round(oneTime * 1.3))}
                  </div>
                )}
                {plan && (
                  <div className="mt-3 text-sm text-[#12202f]">
                    + <span className="font-bold">{fmt(monthly)}</span> / month ({plan.name})
                  </div>
                )}
              </div>
            </>
          )}

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-lg bg-[#0b4f9c] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#083b75]"
          >
            DISCUSS THIS ESTIMATE ↗
          </Link>

          <p className="mt-4 text-[10px] leading-relaxed text-[#4a5a6a]">
            Indicative starting prices, not fixed quotations. Hosting, domain, paid licences and third-party costs are billed
            separately. GST where applicable. Early clients may get up to 20% off through the Startup Partner Programme.
            Final scope is agreed before work begins.
          </p>
        </aside>
      </div>
    </section>
  );
};
