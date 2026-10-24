import { GoldBalls } from '../../components/ui/GoldBalls';

import React, { useMemo, useState } from 'react';
import { catalogServicesMock } from '../../data/mockData';
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Sparkles,
  Clock3,
  Code2,
  Palette,
  Database,
  Cloud,
  ShieldCheck,
  BarChart3,
  BrainCircuit,
  Layers3,
  Lightbulb,
  X,
  Cpu,
  Globe2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

/* =========================================================
   FRONTEND SERVICE DATA
   These do NOT require any backend changes.
========================================================= */

const additionalServices = [
  {
    id: 'design',
    title: 'UI/UX Design',
    shortTitle: 'Design',
    category: 'Design',
    description:
      'Thoughtful interfaces and user experiences designed to make digital products intuitive, elegant, and memorable.',
    features: [
      'Product UI Design',
      'UX Research',
      'Design Systems',
      'Wireframes & Prototypes',
      'Responsive Design',
      'Usability Improvements',
    ],
    timeline: '2–4 Weeks',
    icon: Palette,
    accent: 'rose',
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    shortTitle: 'Data',
    category: 'Data',
    description:
      'Turn raw data into useful insights with analytics systems, dashboards, data pipelines, and intelligent reporting.',
    features: [
      'Data Analytics',
      'Interactive Dashboards',
      'Data Visualization',
      'ETL Pipelines',
      'Business Intelligence',
      'Predictive Analytics',
    ],
    timeline: '3–6 Weeks',
    icon: BarChart3,
    accent: 'sage',
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    shortTitle: 'AI / ML',
    category: 'AI',
    description:
      'Intelligent solutions using machine learning and modern AI technologies to automate workflows and unlock new capabilities.',
    features: [
      'ML Models',
      'AI Automation',
      'NLP Solutions',
      'Recommendation Systems',
      'LLM Integrations',
      'Model Deployment',
    ],
    timeline: '4–8 Weeks',
    icon: BrainCircuit,
    accent: 'gold',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud',
    category: 'Cloud',
    description:
      'Modern infrastructure and deployment workflows that keep applications secure, scalable, observable, and reliable.',
    features: [
      'Cloud Deployment',
      'CI/CD Pipelines',
      'Docker & Containers',
      'Infrastructure Setup',
      'Monitoring',
      'Performance Optimization',
    ],
    timeline: '2–5 Weeks',
    icon: Cloud,
    accent: 'olive',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    shortTitle: 'Security',
    category: 'Security',
    description:
      'Security-focused engineering practices that help protect applications, infrastructure, and sensitive business data.',
    features: [
      'Security Audits',
      'Application Security',
      'Access Control',
      'API Security',
      'Risk Assessment',
      'Security Best Practices',
    ],
    timeline: '2–5 Weeks',
    icon: ShieldCheck,
    accent: 'terracotta',
  },
  {
    id: 'consulting',
    title: 'Technology Consulting',
    shortTitle: 'Consulting',
    category: 'Consulting',
    description:
      'Practical technology guidance for businesses deciding what to build, how to build it, and how to scale it.',
    features: [
      'Technical Strategy',
      'Architecture Planning',
      'Technology Selection',
      'Product Roadmaps',
      'Digital Transformation',
      'Technical Audits',
    ],
    timeline: '1–3 Weeks',
    icon: Lightbulb,
    accent: 'gold',
  },
];

/* =========================================================
   EXISTING MOCK SERVICES + NEW FRONTEND SERVICES
========================================================= */

const baseServices = catalogServicesMock.map((service: any) => ({
  ...service,
  category: service.category || 'Development',
  timeline: service.estimatedTimeline,
  description: service.fullDesc,
  icon: Code2,
  accent: 'brown',
}));

const allServices = [
  ...baseServices,
  ...additionalServices,
];

/* =========================================================
   CATEGORY CONFIG
========================================================= */

const categories = [
  {
    name: 'All',
    icon: Layers3,
  },
  {
    name: 'Development',
    icon: Code2,
  },
  {
    name: 'Design',
    icon: Palette,
  },
  {
    name: 'Data',
    icon: Database,
  },
  {
    name: 'AI',
    icon: BrainCircuit,
  },
  {
    name: 'Cloud',
    icon: Cloud,
  },
  {
    name: 'Security',
    icon: ShieldCheck,
  },
  {
    name: 'Consulting',
    icon: Lightbulb,
  },
];

/* =========================================================
   ACCENT STYLES
========================================================= */

const accentStyles: Record<
  string,
  {
    icon: string;
    glow: string;
    badge: string;
    line: string;
  }
> = {
  gold: {
    icon: 'bg-[#e08858]/20 text-[#a63d2a] dark:text-[#e08858]',
    glow: 'bg-[#e08858]/10',
    badge: 'bg-[#e08858]/10 text-[#a63d2a] dark:text-[#e08858]',
    line: 'bg-[#e08858]',
  },

  sage: {
    icon: 'bg-[#a63d2a]/15 text-[#d08a68]',
    glow: 'bg-[#a63d2a]/10',
    badge: 'bg-[#a63d2a]/10 text-[#d08a68]',
    line: 'bg-[#a63d2a]',
  },

  rose: {
    icon: 'bg-[#a34646]/15 text-[#8f4a4a]',
    glow: 'bg-[#a34646]/10',
    badge: 'bg-[#a34646]/10 text-[#8f4a4a]',
    line: 'bg-[#a34646]',
  },

  olive: {
    icon: 'bg-[#b06f53]/15 text-[#a86a4a]',
    glow: 'bg-[#b06f53]/10',
    badge: 'bg-[#b06f53]/10 text-[#a86a4a]',
    line: 'bg-[#b06f53]',
  },

  terracotta: {
    icon: 'bg-[#a63d2a]/15 text-[#8D513C]',
    glow: 'bg-[#a63d2a]/10',
    badge: 'bg-[#a63d2a]/10 text-[#8D513C]',
    line: 'bg-[#a63d2a]',
  },

  brown: {
    icon: 'bg-[#5e4650]/10 text-[#5e4650] dark:text-[#e08858]',
    glow: 'bg-[#5e4650]/10',
    badge: 'bg-[#5e4650]/10 text-[#5e4650] dark:text-[#e08858]',
    line: 'bg-[#5e4650]',
  },
};

export const ServicesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  /* =======================================================
     FILTER SERVICES
  ======================================================= */

  const filteredServices = useMemo(() => {
    const query = search.toLowerCase().trim();

    return allServices.filter((service: any) => {
      const matchesCategory =
        activeCategory === 'All' ||
        service.category?.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        !query ||
        service.title?.toLowerCase().includes(query) ||
        service.description?.toLowerCase().includes(query) ||
        service.fullDesc?.toLowerCase().includes(query) ||
        service.features?.some((feature: string) =>
          feature.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#fbf4ee] dark:bg-[#140a14] text-[#1c1019] dark:text-[#fbf4ee] overflow-hidden">

      {/* ===================================================
          HERO
      ==================================================== */}

      <section className="gold-balls relative pt-16 sm:pt-20 lg:pt-24 pb-14">
<GoldBalls />

        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#e08858]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="absolute left-[8%] top-28 w-20 h-20 rounded-full bg-[#a63d2a]/5 blur-2xl" />

        <div className="absolute right-[8%] top-44 w-24 h-24 rounded-full bg-[#a63d2a]/5 blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center text-center lg:text-left">

          <div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e08858]/40 bg-[#e08858]/10">

            <Sparkles className="w-3.5 h-3.5 text-[#e08858]" />

            <span className="text-[10px] sm:text-[11px] font-Clarkson font-bold uppercase tracking-[0.22em] text-[#5e4650] dark:text-[#e08858]">
              Aevona Services
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-7 font-Clarkson font-bold text-4xl sm:text-5xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.05em]">

            <span className="text-[#1c1019] dark:text-[#fbf4ee]">
              Everything you need
            </span>

            <br />

            <span className="text-[#5e4650] dark:text-[#e08858]">
              to build what's next.
            </span>

          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base leading-8 font-Clarkson text-[#5e4650]/80 dark:text-[#e08858]/75">
            From product design and software development to data,
            AI, cloud, and strategy, we bring the pieces together
            to create digital experiences that actually work.
          </p>

          {/* Service stats */}
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#1e1220] border border-[#e08858]/25 shadow-sm">
              <Layers3 className="w-3.5 h-3.5 text-[#e08858]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#5e4650] dark:text-[#e08858]">
                {allServices.length}+ Services
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#1e1220] border border-[#e08858]/25 shadow-sm">
              <Globe2 className="w-3.5 h-3.5 text-[#a63d2a]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#5e4650] dark:text-[#e08858]">
                End-to-End Solutions
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#1e1220] border border-[#e08858]/25 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-[#a63d2a]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#5e4650] dark:text-[#e08858]">
                Modern Technology
              </span>
            </div>

          </div>

          </div>

          {/* Hero image, side by side with the text */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-[#e08858]/30 rotate-2" />
            <img
              src="/images/ai-human-robot.jpg"
              alt="A human hand and a robotic hand reaching toward a glowing AI chip"
              className="relative w-full rounded-[2rem] border border-[#e08858]/30 shadow-[0_24px_60px_rgba(28,16,28,.25)] object-cover"
              style={{ aspectRatio: '850 / 457' }}
            />
          </div>

        </div>
      </section>


      {/* ===================================================
          SEARCH + CATEGORY NAV
      ==================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
<GoldBalls />

        <div className="rounded-[1.75rem] bg-white dark:bg-[#1e1220] border border-[#e08858]/30 p-4 sm:p-5 shadow-sm">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* Search */}
            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5e4650]/45 dark:text-[#e08858]/45" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services, features, technologies..."
                className="w-full h-12 pl-11 pr-11 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/20 outline-none font-Clarkson text-xs text-[#1c1019] dark:text-[#fbf4ee] placeholder:text-[#5e4650]/40 dark:placeholder:text-[#e08858]/40 focus:border-[#e08858] focus:ring-2 focus:ring-[#e08858]/10 transition-all"
              />

              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5e4650]/50 hover:text-[#5e4650] dark:text-[#e08858]/50 dark:hover:text-[#e08858]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

            </div>

          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">

            {categories.map((category) => {

              const Icon = category.icon;

              const isActive = activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`
                    shrink-0 flex items-center gap-2
                    px-4 py-2.5 rounded-xl
                    border text-[10px] sm:text-[11px]
                    font-Clarkson font-semibold
                    transition-all duration-300
                    ${
                      isActive
                        ? 'bg-[#1c1019] text-[#fbf4ee] border-[#1c1019] shadow-md dark:bg-[#e08858] dark:text-[#1c1019] dark:border-[#e08858]'
                        : 'bg-[#fbf4ee] dark:bg-[#140a14] text-[#5e4650] dark:text-[#e08858] border-[#e08858]/20 hover:border-[#e08858]/60'
                    }
                  `}
                >

                  <Icon className="w-3.5 h-3.5" />

                  {category.name}

                </button>
              );
            })}

          </div>

        </div>

      </section>


      {/* ===================================================
          FEATURED SERVICE
      ==================================================== */}

      {!search && activeCategory === 'All' && (
        <section className="gold-balls max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
<GoldBalls />

          <div className="relative overflow-hidden rounded-[2rem] bg-[#1c1019] dark:bg-[#1e1220] border border-[#e08858]/30">

            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#e08858]/10 blur-3xl" />

            <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-[#a63d2a]/5 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 p-7 sm:p-10 lg:p-14">

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e08858]/10 border border-[#e08858]/20">

                  <Sparkles className="w-3 h-3 text-[#e08858]" />

                  <span className="text-[9px] font-Clarkson uppercase tracking-[0.2em] text-[#e08858]">
                    Featured Capability
                  </span>

                </div>

                <h2 className="mt-5 max-w-2xl font-Clarkson font-bold text-2xl sm:text-3xl lg:text-4xl tracking-[-0.035em] text-[#fbf4ee]">
                  Digital products that
                  <span className="text-[#e08858]"> feel effortless.</span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 font-Clarkson text-[#fbf4ee]/65">
                  We combine engineering, design, data, and strategy to
                  create products that are practical today and ready for
                  tomorrow.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">

                  {[
                    'Development',
                    'UI/UX',
                    'Data & AI',
                    'Cloud',
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full border border-[#fbf4ee]/10 bg-[#fbf4ee]/5 text-[10px] font-Clarkson text-[#fbf4ee]/70"
                    >
                      {item}
                    </span>
                  ))}

                </div>

              </div>

              <div className="hidden lg:flex items-center justify-center">

                <div className="relative w-32 h-32 rounded-[2rem] border border-[#e08858]/20 bg-[#e08858]/5">

                  <div className="absolute inset-5 rounded-[1.5rem] bg-[#e08858]/10 flex items-center justify-center">

                    <Cpu className="w-10 h-10 text-[#e08858]" />

                  </div>

                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#a63d2a] border-4 border-[#1c1019]" />

                  <div className="absolute -bottom-3 -left-3 w-7 h-7 rounded-full bg-[#a63d2a] border-4 border-[#1c1019]" />

                </div>

              </div>

            </div>

          </div>

        </section>
      )}


      {/* ===================================================
          SERVICES GRID
      ==================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
<GoldBalls />

        <div className="flex items-end justify-between mb-7">

          <div>

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#e08858]">
              Explore
            </span>

            <h2 className="mt-2 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.035em] text-[#1c1019] dark:text-[#fbf4ee]">
              What we can build together
            </h2>

          </div>

          <span className="hidden sm:block text-[10px] font-Clarkson text-[#5e4650]/45 dark:text-[#e08858]/45">
            {filteredServices.length} available
          </span>

        </div>


        {filteredServices.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {filteredServices.map((service: any, index: number) => {

              const Icon = service.icon || Code2;

              const accent =
                accentStyles[service.accent] || accentStyles.brown;

              return (
                <div
                  key={service.id || index}
                  className="group relative overflow-hidden rounded-[1.75rem] bg-white dark:bg-[#1e1220] border border-[#e08858]/25 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#e08858]/55 transition-all duration-500"
                >

                  {/* Accent glow */}
                  <div
                    className={`absolute -right-20 -top-20 w-48 h-48 rounded-full ${accent.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative p-6 sm:p-8">

                    {/* Top */}
                    <div className="flex items-start justify-between">

                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent.icon}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <span className="text-[10px] font-Clarkson font-semibold text-[#5e4650]/30 dark:text-[#e08858]/30">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                    </div>


                    {/* Title */}
                    <div className="mt-6 flex items-center gap-3 flex-wrap">

                      <h3 className="text-xl font-Clarkson font-bold tracking-[-0.025em] text-[#1c1019] dark:text-[#fbf4ee]">
                        {service.title}
                      </h3>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[8px] font-Clarkson font-bold uppercase tracking-wider ${accent.badge}`}
                      >
                        {service.category}
                      </span>

                    </div>


                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm leading-7 font-Clarkson text-[#5e4650]/75 dark:text-[#e08858]/70">
                      {service.description || service.fullDesc}
                    </p>


                    {/* Features */}
                    <div className="mt-7">

                      <div className="flex items-center gap-2 mb-3">

                        <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#5e4650]/45 dark:text-[#e08858]/45">
                          Includes
                        </span>

                        <div className="h-px flex-1 bg-[#f6e9de] dark:bg-[#33222c]" />

                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                        {service.features?.map(
                          (feature: string, featureIndex: number) => (

                            <div
                              key={featureIndex}
                              className="flex items-start gap-2 text-[10px] sm:text-[11px] leading-5 font-Clarkson text-[#5e4650] dark:text-[#e08858]"
                            >

                              <CheckCircle2
                                className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${accent.icon.split(' ')[1]}`}
                              />

                              <span>{feature}</span>

                            </div>

                          )
                        )}

                      </div>

                    </div>


                    {/* Footer */}
                    <div className="mt-7 pt-5 border-t border-[#f6e9de] dark:border-[#33222c] flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                      <div className="flex items-center gap-2">

                        <Clock3 className="w-3.5 h-3.5 text-[#e08858]" />

                        <span className="text-[10px] font-Clarkson font-semibold text-[#5e4650] dark:text-[#e08858]">
                          {service.timeline || service.estimatedTimeline}
                        </span>

                      </div>

                      <Link to="/login?next=%2Fdashboard%2Fbilling">

                        <Button
                          variant="gold"
                          size="sm"
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          Request Service
                        </Button>

                      </Link>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          /* Empty state */

          <div className="py-20 rounded-[2rem] bg-white dark:bg-[#1e1220] border border-[#e08858]/30 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#e08858]/10 flex items-center justify-center">

              <Search className="w-6 h-6 text-[#e08858]" />

            </div>

            <h3 className="mt-5 font-Clarkson font-bold text-lg text-[#1c1019] dark:text-[#fbf4ee]">
              No matching services
            </h3>

            <p className="mt-2 text-xs font-Clarkson text-[#5e4650]/60 dark:text-[#e08858]/60">
              Try another search term or category.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 text-xs font-Clarkson font-semibold text-[#5e4650] dark:text-[#e08858] underline underline-offset-4"
            >
              Clear filters
            </button>

          </div>

        )}

      </section>


      {/* ===================================================
          PROCESS
      ==================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
<GoldBalls />

        <div className="text-center mb-11">

          <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#e08858]">
            How we work
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.035em] text-[#1c1019] dark:text-[#fbf4ee]">
            From idea to impact.
          </h2>

          <p className="mt-3 max-w-xl mx-auto text-xs sm:text-sm leading-6 font-Clarkson text-[#5e4650]/65 dark:text-[#e08858]/65">
            A simple process designed to keep projects clear,
            collaborative, and moving forward.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {[
            {
              number: '01',
              title: 'Discover',
              description:
                'Understand the problem, goals, users, and technical requirements.',
              accent: 'gold',
            },
            {
              number: '02',
              title: 'Design',
              description:
                'Shape the experience, architecture, and solution before development.',
              accent: 'rose',
            },
            {
              number: '03',
              title: 'Build',
              description:
                'Develop, test, integrate, and refine the solution with care.',
              accent: 'sage',
            },
            {
              number: '04',
              title: 'Launch',
              description:
                'Deploy, monitor, optimize, and help the product keep growing.',
              accent: 'terracotta',
            },
          ].map((step) => {

            const accent = accentStyles[step.accent];

            return (
              <div
                key={step.number}
                className="group relative p-6 rounded-2xl bg-white dark:bg-[#1e1220] border border-[#e08858]/25 hover:-translate-y-1 transition-all duration-300"
              >

                <div className="flex items-center justify-between">

                  <span
                    className={`text-[10px] font-Clarkson font-bold ${accent.badge} px-2.5 py-1 rounded-full`}
                  >
                    {step.number}
                  </span>

                  <ArrowRight className="w-3.5 h-3.5 text-[#e08858]/40 group-hover:text-[#e08858] group-hover:translate-x-1 transition-all" />

                </div>

                <h3 className="mt-6 text-sm font-Clarkson font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                  {step.title}
                </h3>

                <p className="mt-2 text-[11px] leading-5 font-Clarkson text-[#5e4650]/65 dark:text-[#e08858]/65">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </section>


      {/* ===================================================
          FINAL CTA
      ==================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
<GoldBalls />

        <div className="relative overflow-hidden rounded-[2rem] bg-[#1c1019] dark:bg-[#1e1220] border border-[#e08858]/30 px-7 py-14 sm:px-12 sm:py-16 text-center">

          {/* Decorative lights */}
          <div className="absolute left-[20%] top-0 w-40 h-40 rounded-full bg-[#e08858]/10 blur-3xl" />

          <div className="absolute right-[20%] bottom-0 w-40 h-40 rounded-full bg-[#a63d2a]/10 blur-3xl" />

          <div className="relative">

            <div className="inline-flex items-center gap-2">

              <span className="w-1.5 h-1.5 rounded-full bg-[#e08858]" />

              <span className="text-[10px] font-Clarkson uppercase tracking-[0.25em] text-[#e08858]">
                Build something better
              </span>

              <span className="w-1.5 h-1.5 rounded-full bg-[#e08858]" />

            </div>

            <h2 className="mt-5 max-w-3xl mx-auto text-2xl sm:text-3xl lg:text-4xl font-Clarkson font-bold tracking-[-0.04em] text-[#fbf4ee]">

              Have a problem worth solving?

              <br />

              <span className="text-[#e08858]">
                Let's build the solution.
              </span>

            </h2>

            <p className="mt-5 max-w-xl mx-auto text-xs sm:text-sm leading-7 font-Clarkson text-[#fbf4ee]/60">
              Tell us what you are trying to build, improve, or automate.
              We will help turn the idea into a practical digital product.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">

              <Link to="/login?next=%2Fdashboard%2Fbilling">

                <Button
                  variant="gold"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Get Started
                </Button>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};
