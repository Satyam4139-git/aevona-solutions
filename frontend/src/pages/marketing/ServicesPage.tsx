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
    icon: 'bg-[#0b4f9c]/20 text-[#083b75] ',
    glow: 'bg-[#0b4f9c]/10',
    badge: 'bg-[#0b4f9c]/10 text-[#083b75] ',
    line: 'bg-[#0b4f9c]',
  },

  sage: {
    icon: 'bg-[#083b75]/15 text-[#4a88c9]',
    glow: 'bg-[#083b75]/10',
    badge: 'bg-[#083b75]/10 text-[#4a88c9]',
    line: 'bg-[#083b75]',
  },

  rose: {
    icon: 'bg-[#a34646]/15 text-[#8f4a4a]',
    glow: 'bg-[#a34646]/10',
    badge: 'bg-[#a34646]/10 text-[#8f4a4a]',
    line: 'bg-[#a34646]',
  },

  olive: {
    icon: 'bg-[#1f5ba6]/15 text-[#174f94]',
    glow: 'bg-[#1f5ba6]/10',
    badge: 'bg-[#1f5ba6]/10 text-[#174f94]',
    line: 'bg-[#1f5ba6]',
  },

  terracotta: {
    icon: 'bg-[#083b75]/15 text-[#0a3a70]',
    glow: 'bg-[#083b75]/10',
    badge: 'bg-[#083b75]/10 text-[#0a3a70]',
    line: 'bg-[#083b75]',
  },

  brown: {
    icon: 'bg-[#4a5a6a]/10 text-[#4a5a6a] ',
    glow: 'bg-[#4a5a6a]/10',
    badge: 'bg-[#4a5a6a]/10 text-[#4a5a6a] ',
    line: 'bg-[#4a5a6a]',
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
    <div className="min-h-screen bg-[#ffffff]  text-[#12202f]  overflow-hidden">

      {/* ===================================================
          HERO
      ==================================================== */}

      <section className="gold-balls relative pt-16 sm:pt-20 lg:pt-24 pb-14">
<GoldBalls />

        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0b4f9c]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="absolute left-[8%] top-28 w-20 h-20 rounded-full bg-[#083b75]/5 blur-2xl" />

        <div className="absolute right-[8%] top-44 w-24 h-24 rounded-full bg-[#083b75]/5 blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center text-center lg:text-left">

          <div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0b4f9c]/40 bg-[#0b4f9c]/10">

            <Sparkles className="w-3.5 h-3.5 text-[#0b4f9c]" />

            <span className="text-[10px] sm:text-[11px] font-Clarkson font-bold uppercase tracking-[0.22em] text-[#4a5a6a] ">
              Aevona Services
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-7 font-Clarkson font-bold text-4xl sm:text-5xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.05em]">

            <span className="text-[#12202f] ">
              Everything you need
            </span>

            <br />

            <span className="text-[#4a5a6a] ">
              to build what's next.
            </span>

          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base leading-8 font-Clarkson text-[#4a5a6a]/80 ">
            From product design and software development to data,
            AI, cloud, and strategy, we bring the pieces together
            to create digital experiences that actually work.
          </p>

          {/* Service stats */}
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white  border border-[#0b4f9c]/25 shadow-sm">
              <Layers3 className="w-3.5 h-3.5 text-[#0b4f9c]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#4a5a6a] ">
                {allServices.length}+ Services
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white  border border-[#0b4f9c]/25 shadow-sm">
              <Globe2 className="w-3.5 h-3.5 text-[#083b75]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#4a5a6a] ">
                End-to-End Solutions
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white  border border-[#0b4f9c]/25 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-[#083b75]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#4a5a6a] ">
                Modern Technology
              </span>
            </div>

          </div>

          </div>

          {/* Hero image, side by side with the text */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-xl border border-[#0b4f9c]/30 " />
            <img
              src="/images/ai-human-robot.jpg"
              alt="A human hand and a robotic hand reaching toward a glowing AI chip"
              className="relative w-full rounded-xl border border-[#0b4f9c]/30 shadow-[0_24px_60px_rgba(28,16,28,.25)] object-cover"
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

        <div className="rounded-xl bg-white  border border-[#0b4f9c]/30 p-4 sm:p-5 shadow-sm">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* Search */}
            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5a6a]/45 " />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services, features, technologies..."
                className="w-full h-12 pl-11 pr-11 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/20 outline-none font-Clarkson text-xs text-[#12202f]  placeholder:text-[#4a5a6a]/40  focus:border-[#0b4f9c] focus:ring-2 focus:ring-[#0b4f9c]/10 transition-all"
              />

              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4a5a6a]/50 hover:text-[#4a5a6a]  "
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
                        ? 'bg-[#12202f] text-[#ffffff] border-[#12202f] shadow-md   '
                        : 'bg-[#ffffff]  text-[#4a5a6a]  border-[#0b4f9c]/20 hover:border-[#0b4f9c]/60'
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

          <div className="relative overflow-hidden rounded-xl bg-[#12202f]  border border-[#0b4f9c]/30">

            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#0b4f9c]/10 blur-3xl" />

            <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-[#083b75]/5 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 p-7 sm:p-10 lg:p-14">

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0b4f9c]/10 border border-[#0b4f9c]/20">

                  <Sparkles className="w-3 h-3 text-[#0b4f9c]" />

                  <span className="text-[9px] font-Clarkson uppercase tracking-[0.2em] text-[#0b4f9c]">
                    Featured Capability
                  </span>

                </div>

                <h2 className="mt-5 max-w-2xl font-Clarkson font-bold text-2xl sm:text-3xl lg:text-4xl tracking-[-0.035em] text-[#ffffff]">
                  Digital products that
                  <span className="text-[#0b4f9c]"> feel effortless.</span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 font-Clarkson text-[#ffffff]/65">
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
                      className="px-3 py-1.5 rounded-full border border-[#ffffff]/10 bg-[#ffffff]/5 text-[10px] font-Clarkson text-[#ffffff]/70"
                    >
                      {item}
                    </span>
                  ))}

                </div>

              </div>

              <div className="hidden lg:flex items-center justify-center">

                <div className="relative w-32 h-32 rounded-xl border border-[#0b4f9c]/20 bg-[#0b4f9c]/5">

                  <div className="absolute inset-5 rounded-xl bg-[#0b4f9c]/10 flex items-center justify-center">

                    <Cpu className="w-10 h-10 text-[#0b4f9c]" />

                  </div>

                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#083b75] border-4 border-[#12202f]" />

                  <div className="absolute -bottom-3 -left-3 w-7 h-7 rounded-full bg-[#083b75] border-4 border-[#12202f]" />

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

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">
              Explore
            </span>

            <h2 className="mt-2 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.035em] text-[#12202f] ">
              What we can build together
            </h2>

          </div>

          <span className="hidden sm:block text-[10px] font-Clarkson text-[#4a5a6a]/45 ">
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
                  className="group relative overflow-hidden rounded-xl bg-white  border border-[#0b4f9c]/25 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#0b4f9c]/55 transition-all duration-500"
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

                      <span className="text-[10px] font-Clarkson font-semibold text-[#4a5a6a]/30 ">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                    </div>


                    {/* Title */}
                    <div className="mt-6 flex items-center gap-3 flex-wrap">

                      <h3 className="text-xl font-Clarkson font-bold tracking-[-0.025em] text-[#12202f] ">
                        {service.title}
                      </h3>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[8px] font-Clarkson font-bold uppercase tracking-wider ${accent.badge}`}
                      >
                        {service.category}
                      </span>

                    </div>


                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm leading-7 font-Clarkson text-[#4a5a6a]/75 ">
                      {service.description || service.fullDesc}
                    </p>


                    {/* Features */}
                    <div className="mt-7">

                      <div className="flex items-center gap-2 mb-3">

                        <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#4a5a6a]/45 ">
                          Includes
                        </span>

                        <div className="h-px flex-1 bg-[#f3f6f9] " />

                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                        {service.features?.map(
                          (feature: string, featureIndex: number) => (

                            <div
                              key={featureIndex}
                              className="flex items-start gap-2 text-[10px] sm:text-[11px] leading-5 font-Clarkson text-[#4a5a6a] "
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
                    <div className="mt-7 pt-5 border-t border-[#f3f6f9]  flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                      <div className="flex items-center gap-2">

                        <Clock3 className="w-3.5 h-3.5 text-[#0b4f9c]" />

                        <span className="text-[10px] font-Clarkson font-semibold text-[#4a5a6a] ">
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

          <div className="py-20 rounded-xl bg-white  border border-[#0b4f9c]/30 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0b4f9c]/10 flex items-center justify-center">

              <Search className="w-6 h-6 text-[#0b4f9c]" />

            </div>

            <h3 className="mt-5 font-Clarkson font-bold text-lg text-[#12202f] ">
              No matching services
            </h3>

            <p className="mt-2 text-xs font-Clarkson text-[#4a5a6a]/60 ">
              Try another search term or category.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 text-xs font-Clarkson font-semibold text-[#4a5a6a]  underline underline-offset-4"
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

          <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">
            How we work
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.035em] text-[#12202f] ">
            From idea to impact.
          </h2>

          <p className="mt-3 max-w-xl mx-auto text-xs sm:text-sm leading-6 font-Clarkson text-[#4a5a6a]/65 ">
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
                className="group relative p-6 rounded-2xl bg-white  border border-[#0b4f9c]/25 hover:-translate-y-1 transition-all duration-300"
              >

                <div className="flex items-center justify-between">

                  <span
                    className={`text-[10px] font-Clarkson font-bold ${accent.badge} px-2.5 py-1 rounded-full`}
                  >
                    {step.number}
                  </span>

                  <ArrowRight className="w-3.5 h-3.5 text-[#0b4f9c]/40 group-hover:text-[#0b4f9c] group-hover:translate-x-1 transition-all" />

                </div>

                <h3 className="mt-6 text-sm font-Clarkson font-bold text-[#12202f] ">
                  {step.title}
                </h3>

                <p className="mt-2 text-[11px] leading-5 font-Clarkson text-[#4a5a6a]/65 ">
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

        <div className="relative overflow-hidden rounded-xl bg-[#12202f]  border border-[#0b4f9c]/30 px-7 py-14 sm:px-12 sm:py-16 text-center">

          {/* Decorative lights */}
          <div className="absolute left-[20%] top-0 w-40 h-40 rounded-full bg-[#0b4f9c]/10 blur-3xl" />

          <div className="absolute right-[20%] bottom-0 w-40 h-40 rounded-full bg-[#083b75]/10 blur-3xl" />

          <div className="relative">

            <div className="inline-flex items-center gap-2">

              <span className="w-1.5 h-1.5 rounded-full bg-[#0b4f9c]" />

              <span className="text-[10px] font-Clarkson uppercase tracking-[0.25em] text-[#0b4f9c]">
                Build something better
              </span>

              <span className="w-1.5 h-1.5 rounded-full bg-[#0b4f9c]" />

            </div>

            <h2 className="mt-5 max-w-3xl mx-auto text-2xl sm:text-3xl lg:text-4xl font-Clarkson font-bold tracking-[-0.04em] text-[#ffffff]">

              Have a problem worth solving?

              <br />

              <span className="text-[#0b4f9c]">
                Let's build the solution.
              </span>

            </h2>

            <p className="mt-5 max-w-xl mx-auto text-xs sm:text-sm leading-7 font-Clarkson text-[#ffffff]/60">
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
