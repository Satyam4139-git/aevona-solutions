/* Pricing matches the "Aevona Solution Brochure" (Startup Partner Rates).
   All amounts are introductory STARTING prices (India in INR, International in USD). */
export interface PriceItem { id: string; name: string; inr: number; usd: number; }
export interface PriceCategory { id: string; label: string; items: PriceItem[]; }
export interface MaintenancePlan { id: string; name: string; inr: number; usd: number; allowance: string; }

export const PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: 'websites', label: 'Websites & Digital Presence',
    items: [
      { id: 'w1', name: 'Landing page (single page)', inr: 4999, usd: 99 },
      { id: 'w2', name: 'Portfolio website', inr: 6999, usd: 149 },
      { id: 'w3', name: 'Business website (up to 5 pages)', inr: 9999, usd: 199 },
      { id: 'w4', name: 'Professional website (up to 10 pages)', inr: 14999, usd: 299 },
      { id: 'w5', name: 'Corporate website', inr: 24999, usd: 499 },
      { id: 'w6', name: 'Basic e-commerce website', inr: 19999, usd: 399 },
    ],
  },
  {
    id: 'apps', label: 'Web & Mobile Applications',
    items: [
      { id: 'a1', name: 'Basic web application', inr: 19999, usd: 399 },
      { id: 'a2', name: 'Business management application', inr: 29999, usd: 599 },
      { id: 'a3', name: 'Custom MVP development', inr: 39999, usd: 799 },
      { id: 'a4', name: 'SaaS application', inr: 69999, usd: 1499 },
      { id: 'a5', name: 'Basic Android application', inr: 24999, usd: 499 },
      { id: 'a6', name: 'Cross-platform mobile application', inr: 34999, usd: 699 },
    ],
  },
  {
    id: 'backend', label: 'Backend & API',
    items: [
      { id: 'b1', name: 'Basic REST API', inr: 4999, usd: 99 },
      { id: 'b2', name: 'API integration', inr: 2999, usd: 59 },
      { id: 'b3', name: 'Authentication system', inr: 4999, usd: 99 },
      { id: 'b4', name: 'Database design', inr: 4999, usd: 99 },
      { id: 'b5', name: 'Custom backend development', inr: 14999, usd: 299 },
      { id: 'b6', name: 'Complete application backend', inr: 19999, usd: 399 },
    ],
  },
  {
    id: 'architecture', label: 'System Architecture',
    items: [
      { id: 's1', name: 'Technical consultation (per session)', inr: 999, usd: 25 },
      { id: 's2', name: 'Application architecture planning', inr: 4999, usd: 99 },
      { id: 's3', name: 'Database architecture', inr: 3999, usd: 79 },
      { id: 's4', name: 'API architecture & documentation', inr: 4999, usd: 99 },
      { id: 's5', name: 'Complete system architecture', inr: 9999, usd: 199 },
    ],
  },
  {
    id: 'cloud', label: 'Cloud, Deployment & DevOps',
    items: [
      { id: 'c1', name: 'Website deployment', inr: 1999, usd: 39 },
      { id: 'c2', name: 'Backend deployment', inr: 2999, usd: 59 },
      { id: 'c3', name: 'CI/CD pipeline setup', inr: 4999, usd: 99 },
      { id: 'c4', name: 'Docker configuration', inr: 2999, usd: 59 },
      { id: 'c5', name: 'Cloud infrastructure setup', inr: 5999, usd: 119 },
      { id: 'c6', name: 'Complete DevOps setup', inr: 9999, usd: 199 },
    ],
  },
  {
    id: 'bundles', label: 'Project Bundles',
    items: [
      { id: 'p1', name: 'Launch Package (single-page site, SEO, 2 revisions)', inr: 4999, usd: 99 },
      { id: 'p2', name: 'Business Growth (5 pages, WhatsApp, performance)', inr: 9999, usd: 199 },
      { id: 'p3', name: 'Digital Business (custom site, backend, admin dashboard)', inr: 24999, usd: 499 },
    ],
  },
];

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  { id: 'm1', name: 'Basic Maintenance', inr: 999, usd: 19, allowance: 'Up to 1 support hour/month' },
  { id: 'm2', name: 'Standard Maintenance', inr: 2499, usd: 49, allowance: 'Up to 3 support hours/month' },
  { id: 'm3', name: 'Advanced Maintenance', inr: 4999, usd: 99, allowance: 'Up to 6 support hours/month' },
  { id: 'm4', name: 'Dedicated Development Support', inr: 9999, usd: 199, allowance: 'Up to 12 support hours/month' },
];
