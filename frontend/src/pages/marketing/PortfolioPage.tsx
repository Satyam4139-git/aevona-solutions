import { GoldBalls } from '../../components/ui/GoldBalls';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  Filter,
  Search,
  Sparkles,
  X,
  Layers3,
  Code2,
  Github,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';

type Project = {
  id: number;
  name: string;
  description: string;
  serviceType: string;
  github: string;
};

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [backendProjects, setBackendProjects] = useState<Project[]>([]);

  useEffect(() => {
    let active = true;
    api.portfolio.list()
      .then((items) => {
        if (!active) return;
        setBackendProjects(items.map((item, index) => ({
          id: index + 1,
          name: item.name,
          description: item.description,
          serviceType: item.category,
          github: item.projectUrl || '',
        })));
      })
      .catch(() => {
        // Keep the supplied portfolio available if the API is offline.
      });
    return () => { active = false; };
  }, []);

  /*
   * ============================================================
   * PROJECTS
   * ============================================================
   * Static fallback while the public portfolio endpoint is unavailable.
   */

  const projects: Project[] = [
    {
      id: 1,
      name: 'Jap-Earthquake-ml',
      serviceType: 'AI & ML',
      description:
        'An intelligent post-earthquake damage assessment system using swarm intelligence-based optimization to prioritize structurally vulnerable bridge regions. Graph Neural Networks model connectivity between bridge components to identify damage-prone sections.',
      github:
        'https://github.com/HarshRajSahu007/Jap-Earthquake-ml',
    },

    {
      id: 2,
      name: 'MultiAgent_Real_Estate_CB',
      serviceType: 'AI & ML',
      description:
        'A multi-agent real estate platform with an intelligent router that directs queries to specialized agents for property issue detection and tenancy FAQs. Computer vision and NLP enable automated property assessment and tenant query resolution.',
      github:
        'https://github.com/HarshRajSahu007/MultiAgent_Real_Estate_CB',
    },

    {
      id: 3,
      name: 'AI-Powered Insurance Claim Analysis System',
      serviceType: 'AI & ML',
      description:
        'An AI pipeline combining OCR, PDF parsing, NLP summarization, embeddings, and XGBoost for automated insurance claim analysis. A FastAPI backend processes structured and unstructured claim data for automated risk classification.',
      github:
        'https://github.com/Dimple-11/Ai_claim_model_1',
    },

    {
      id: 4,
      name: 'Sentiment Analysis on Social Media Posts',
      serviceType: 'AI & ML',
      description:
        'A Simple RNN-based sentiment classifier supported by an NLTK preprocessing pipeline for tokenization, stopword removal, and stemming with real-time Flask predictions.',
      github:
        'https://github.com/Dimple-11/Sentimental-Analysis',
    },

    {
      id: 5,
      name: 'Smart Travel Reservation System',
      serviceType: 'Web & Application Development',
      description:
        'A full-stack travel reservation platform for booking bus and railway tickets through a unified system. Users can search routes, check seat availability, book tickets, and manage reservations, while administrators manage schedules, vehicles, bookings, and records.',
      github:
        'https://github.com/mukunda6751/JAVA-PROJECT',
    },

    {
      id: 6,
      name: 'Phishing URL Detection',
      serviceType: 'Data & Analytics',
      description:
        'A machine learning pipeline that classifies URLs as phishing or legitimate using engineered URL-based features and a LightGBM classifier. The project includes data analysis, model evaluation, exported predictions, and a deployable trained-model bundle.',
      github:
        'https://github.com/Satyam4139-git/phishing_project',
    },

    {
      id: 7,
      name: 'Superstore Sales Dataset Analysis',
      serviceType: 'Data & Analytics',
      description:
        'A business analytics project focused on profitability, ROI, and regional margin analysis. Dynamic KPI dashboards and standardized metric definitions were developed to improve reporting consistency and identify operational efficiency gaps.',
      github:
        'https://github.com/sanskarsinha677/superstore-sql-analysis',
    },

    {
      id: 8,
      name: 'Digital Onboarding System',
      serviceType: 'Business Automation',
      description:
        'A KYC/KYB and CRM integration requirements system covering BRD, FRS, RTM, use cases, and structured test scenarios. Includes an idempotent webhook architecture and a PASS / REVIEW / FAIL rule engine for audit and compliance traceability.',
      github:
        'https://github.com/sanskarsinha677/digital-onboarding-kyc-kyb-crm-requirements-pack',
    },

    {
      id: 9,
      name: 'CascadeX – Early Information Cascade Prediction',
      serviceType: 'AI & ML',
      description:
        'A machine learning project focused on predicting information cascades at an early stage within social networks, exploring how information propagates through connected users and network structures.',
      github:
        'https://github.com/Dimple-11/CascadeX-Early-Information-Cascade-Prediction-in-Social-Networks',
    },

    {
      id: 10,
      name: 'EduFlow – Modern Educational Platform',
      serviceType: 'Web & Application Development',
      description:
        'A modern mobile-first educational platform built with React, Vite, TypeScript, and Tailwind CSS. EduFlow provides an interactive learning experience across mobile, tablet, and desktop with a startup-inspired EdTech interface.',
      github:
        'https://github.com/Dimple-11/EduFlow',
    },
  ];

  const displayProjects = backendProjects.length > 0 ? backendProjects : projects;

  const categories = [
    'All',
    'AI & ML',
    'Web & Application Development',
    'Data & Analytics',
    'Business Automation',
  ];

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return displayProjects.filter((project) => {
      const matchesCategory =
        filter === 'All' || project.serviceType === filter;

      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.serviceType.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [filter, search, displayProjects]);

  const featuredProject = displayProjects[0];

  const clearFilters = () => {
    setFilter('All');
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-[#fbf4ee] dark:bg-[#140a14] text-[#1c1019] dark:text-[#fbf4ee] overflow-hidden">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="gold-balls relative pt-20 sm:pt-24 lg:pt-28 pb-16">
<GoldBalls />

        {/* Background atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#e08858]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute left-[4%] top-48 w-40 h-40 rounded-full bg-[#a63d2a]/5 blur-3xl" />

        <div className="absolute right-[6%] top-64 w-44 h-44 rounded-full bg-[#a63d2a]/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left lg:[&_p]:mx-0 lg:[&_.justify-center]:justify-start lg:[&_h1]:!text-5xl xl:[&_h1]:!text-6xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#e08858]/40 bg-[#e08858]/10">

            <Sparkles className="w-4 h-4 text-[#e08858]" />

            <span className="text-xs font-Clarkson font-bold uppercase tracking-[0.22em] text-[#5e4650] dark:text-[#e08858]">
              Selected Work
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-8 font-Clarkson font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1] tracking-[-0.055em]">

            <span className="text-[#1c1019] dark:text-[#fbf4ee]">
              Ideas turned into
            </span>

            <br />

            <span className="text-[#5e4650] dark:text-[#e08858]">
              digital reality.
            </span>

          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-8 font-Clarkson text-[#5e4650]/80 dark:text-[#e08858]/75">
            A collection of AI systems, applications, analytics platforms,
            automation solutions, and digital products built to solve
            real-world problems.
          </p>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <div className="px-7 py-4 rounded-2xl bg-white dark:bg-[#1e1220] border border-[#e08858]/25 shadow-sm">
              <div className="text-2xl font-Clarkson font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                {displayProjects.length}+
              </div>

              <div className="mt-1 text-[11px] font-Clarkson uppercase tracking-wider text-[#5e4650]/55 dark:text-[#e08858]/55">
                Projects
              </div>
            </div>

            <div className="px-7 py-4 rounded-2xl bg-white dark:bg-[#1e1220] border border-[#e08858]/25 shadow-sm">
              <div className="text-2xl font-Clarkson font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                4+
              </div>

              <div className="mt-1 text-[11px] font-Clarkson uppercase tracking-wider text-[#5e4650]/55 dark:text-[#e08858]/55">
                Domains
              </div>
            </div>

            <div className="px-7 py-4 rounded-2xl bg-white dark:bg-[#1e1220] border border-[#e08858]/25 shadow-sm">
              <div className="text-2xl font-Clarkson font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                100%
              </div>

              <div className="mt-1 text-[11px] font-Clarkson uppercase tracking-wider text-[#5e4650]/55 dark:text-[#e08858]/55">
                Built with Purpose
              </div>
            </div>

          </div>

        </div>
          <figure className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
            <div className="absolute -inset-2 rounded-[2rem] border border-[#e08858]/25" />
            <img src="/images/portfolio.jpg" alt="A hand reaching toward a glowing AI network in a server room" className="relative aspect-[7/5] w-full rounded-[1.75rem] border border-[#e08858]/20 object-cover object-[center_30%] shadow-[0_24px_60px_rgba(28,16,28,.25)]" />
          </figure>
        </div>
      </section>


      {/* =====================================================
          FEATURED PROJECT
      ====================================================== */}

      {featuredProject && (
        <section className="gold-balls max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16">
<GoldBalls />

          <div className="relative overflow-hidden rounded-[2.25rem] bg-[#1c1019] dark:bg-[#1e1220] border border-[#e08858]/30 shadow-xl">

            {/* Decorative glow */}
            <div className="absolute -right-28 -top-28 w-96 h-96 rounded-full bg-[#e08858]/10 blur-3xl" />

            <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-[#a63d2a]/10 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 p-8 sm:p-12 lg:p-16">

              {/* Content */}
              <div className="flex flex-col justify-center">

                <span className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-[#e08858]/10 border border-[#e08858]/20">

                  <Sparkles className="w-4 h-4 text-[#e08858]" />

                  <span className="text-[11px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#e08858]">
                    Featured Project
                  </span>

                </span>

                <h2 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-Clarkson font-bold tracking-[-0.045em] text-[#fbf4ee]">
                  {featuredProject.name}
                </h2>

                <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 font-Clarkson text-[#fbf4ee]/70">
                  {featuredProject.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <span className="px-4 py-2 rounded-full bg-[#fbf4ee]/5 border border-[#fbf4ee]/10 text-xs font-Clarkson text-[#fbf4ee]/70">
                    {featuredProject.serviceType}
                  </span>

                  <span className="px-4 py-2 rounded-full bg-[#fbf4ee]/5 border border-[#fbf4ee]/10 text-xs font-Clarkson text-[#fbf4ee]/70">
                    Machine Learning
                  </span>

                  <span className="px-4 py-2 rounded-full bg-[#fbf4ee]/5 border border-[#fbf4ee]/10 text-xs font-Clarkson text-[#fbf4ee]/70">
                    Graph Neural Networks
                  </span>

                </div>

                <a
                  href={featuredProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-flex w-fit items-center gap-3 px-6 py-3.5 rounded-xl bg-[#e08858] text-[#1c1019] text-sm font-Clarkson font-bold hover:bg-[#f0c4a4] hover:-translate-y-1 transition-all shadow-lg"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>

              </div>


              {/* Project visual */}
              <div className="flex items-center justify-center">

                <div className="relative w-full max-w-md aspect-[4/3] rounded-[1.75rem] bg-[#fbf4ee]/5 border border-[#fbf4ee]/10 overflow-hidden">

                  {/* Fake dashboard visual */}
                  <div className="absolute top-0 left-0 right-0 h-12 border-b border-[#fbf4ee]/10 flex items-center gap-2 px-5">

                    <span className="w-3 h-3 rounded-full bg-[#a63d2a]" />
                    <span className="w-3 h-3 rounded-full bg-[#e08858]" />
                    <span className="w-3 h-3 rounded-full bg-[#a63d2a]" />

                  </div>

                  <div className="absolute top-20 left-6 right-6">

                    <div className="grid grid-cols-3 gap-3">

                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="h-16 rounded-xl bg-[#e08858]/10 border border-[#e08858]/10"
                        />
                      ))}

                    </div>

                    <div className="mt-4 h-32 rounded-xl bg-[#e08858]/5 border border-[#e08858]/10 flex items-end gap-2 px-5 pb-5">

                      {[35, 60, 45, 80, 55, 90, 70].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-md bg-[#e08858]/40"
                            style={{ height: `${height}%` }}
                          />
                        )
                      )}

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">

                      <div className="h-12 rounded-xl bg-[#a63d2a]/10" />

                      <div className="h-12 rounded-xl bg-[#a63d2a]/10" />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>
      )}


      {/* =====================================================
          FILTER + SEARCH
      ====================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-10">
<GoldBalls />

        <div className="rounded-[2rem] bg-white dark:bg-[#1e1220] border border-[#e08858]/30 p-5 sm:p-6 shadow-sm">

          {/* Search */}
          <div className="relative">

            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5e4650]/40 dark:text-[#e08858]/40" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, technologies, services..."
              className="w-full h-14 pl-14 pr-12 rounded-2xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/20 outline-none font-Clarkson text-sm sm:text-base text-[#1c1019] dark:text-[#fbf4ee] placeholder:text-[#5e4650]/40 dark:placeholder:text-[#e08858]/40 focus:border-[#e08858] focus:ring-2 focus:ring-[#e08858]/10 transition-all"
            />

            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#5e4650]/50 hover:text-[#5e4650] dark:text-[#e08858]/50 dark:hover:text-[#e08858]"
              >
                <X className="w-5 h-5" />
              </button>
            )}

          </div>


          {/* Categories */}
          <div className="mt-5 flex items-center gap-3 overflow-x-auto pb-1">

            <div className="hidden sm:flex items-center gap-2 mr-2 text-[#5e4650]/45 dark:text-[#e08858]/45">

              <Filter className="w-4 h-4" />

              <span className="text-xs font-Clarkson font-bold uppercase tracking-wider">
                Filter
              </span>

            </div>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  shrink-0 px-5 py-3 rounded-xl
                  text-xs sm:text-sm
                  font-Clarkson font-semibold
                  border transition-all duration-300
                  ${
                    filter === cat
                      ? 'bg-[#5e4650] text-white border-[#5e4650] shadow-md dark:bg-[#e08858] dark:text-[#140a14] dark:border-[#e08858]'
                      : 'bg-[#fbf4ee] dark:bg-[#140a14] text-[#5e4650] dark:text-[#e08858] border-[#e08858]/20 hover:border-[#e08858]/60 hover:-translate-y-0.5'
                  }
                `}
              >
                {cat}
              </button>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          PROJECT GRID
      ====================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24">
<GoldBalls />

        <div className="flex items-end justify-between mb-9">

          <div>

            <span className="text-xs font-Clarkson font-bold uppercase tracking-[0.2em] text-[#e08858]">
              The Work
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-Clarkson font-bold tracking-[-0.035em] text-[#1c1019] dark:text-[#fbf4ee]">
              Projects worth exploring
            </h2>

          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#5e4650]/45 dark:text-[#e08858]/45">

            <Layers3 className="w-4 h-4" />

            <span className="text-xs font-Clarkson">
              {filtered.length} projects
            </span>

          </div>

        </div>


        {filtered.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {filtered.map((proj, index) => (

              <article
                key={proj.id}
                className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#1e1220] border border-[#e08858]/25 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#e08858]/60 transition-all duration-500"
              >

                {/* Accent glow */}
                <div className="absolute -right-20 -top-20 w-52 h-52 rounded-full bg-[#e08858]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-7 sm:p-8">

                  {/* Top row */}
                  <div className="flex items-center justify-between gap-3">

                    <span className="inline-flex items-center px-3 py-2 rounded-full bg-[#e08858]/10 text-[#a63d2a] dark:text-[#e08858] text-[10px] font-Clarkson font-bold uppercase tracking-wider">
                      {proj.serviceType}
                    </span>

                    <span className="text-xs font-Clarkson font-semibold text-[#5e4650]/25 dark:text-[#e08858]/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                  </div>


                  {/* Project icon */}
                  <div className="mt-8 w-14 h-14 rounded-2xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">

                    <Code2 className="w-6 h-6 text-[#5e4650] dark:text-[#e08858]" />

                  </div>


                  {/* Title */}
                  <h3 className="mt-6 text-2xl sm:text-[1.65rem] leading-tight font-Clarkson font-bold tracking-[-0.025em] text-[#1c1019] dark:text-[#fbf4ee]">
                    {proj.name}
                  </h3>


                  {/* Description */}
                  <p className="mt-4 text-sm sm:text-[15px] leading-7 font-Clarkson text-[#5e4650]/70 dark:text-[#e08858]/65">
                    {proj.description}
                  </p>


                  {/* GitHub link */}
                  <div className="mt-8 pt-6 border-t border-[#f6e9de] dark:border-[#33222c]">

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full gap-3 px-5 py-3.5 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/20 text-[#5e4650] dark:text-[#e08858] text-sm font-Clarkson font-semibold hover:bg-[#e08858]/15 hover:border-[#e08858]/50 transition-all group/github"
                    >

                      <span className="inline-flex items-center gap-3">

                        <Github className="w-5 h-5" />

                        View GitHub Repository

                      </span>

                      <ExternalLink className="w-4 h-4 group-hover/github:translate-x-1 group-hover/github:-translate-y-1 transition-transform" />

                    </a>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* Empty state */
          <div className="py-24 rounded-[2rem] bg-white dark:bg-[#1e1220] border border-[#e08858]/30 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#e08858]/10 flex items-center justify-center">

              <Search className="w-7 h-7 text-[#e08858]" />

            </div>

            <h3 className="mt-6 font-Clarkson font-bold text-2xl text-[#1c1019] dark:text-[#fbf4ee]">
              No projects found
            </h3>

            <p className="mt-3 text-sm font-Clarkson text-[#5e4650]/60 dark:text-[#e08858]/60">
              Try a different category or search term.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 text-sm font-Clarkson font-semibold text-[#5e4650] dark:text-[#e08858] underline underline-offset-4"
            >
              Clear filters
            </button>

          </div>

        )}

      </section>


      {/* =====================================================
          CAPABILITIES STRIP
      ====================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24">
<GoldBalls />

        <div className="rounded-[2rem] bg-white dark:bg-[#1e1220] border border-[#e08858]/30 p-8 sm:p-10 lg:p-14">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>

              <span className="text-xs font-Clarkson font-bold uppercase tracking-[0.2em] text-[#e08858]">
                What sits behind the work
              </span>

              <h2 className="mt-4 text-3xl sm:text-4xl font-Clarkson font-bold tracking-[-0.035em] text-[#1c1019] dark:text-[#fbf4ee]">
                More than a pretty interface.
              </h2>

              <p className="mt-5 text-base sm:text-lg leading-8 font-Clarkson text-[#5e4650]/70 dark:text-[#e08858]/65 max-w-xl">
                Every project combines thoughtful engineering, modern
                technologies, scalable architecture, data-driven thinking,
                and practical solutions to real-world problems.
              </p>

            </div>


            <div className="grid grid-cols-2 gap-4">

              {[
                'Artificial Intelligence',
                'Machine Learning',
                'Full-Stack Development',
                'Data & Analytics',
                'Business Automation',
                'Modern UI/UX',
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3 p-4 sm:p-5 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/15 hover:border-[#e08858]/40 transition-colors"
                >

                  <div className="w-2 h-2 rounded-full bg-[#e08858] shrink-0" />

                  <span className="text-xs sm:text-sm font-Clarkson font-semibold text-[#5e4650] dark:text-[#e08858]">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-20">
<GoldBalls />

        <div className="relative overflow-hidden rounded-[2rem] bg-[#1c1019] dark:bg-[#1e1220] border border-[#e08858]/30 px-8 py-16 sm:px-12 sm:py-20 text-center">

          <div className="absolute left-[15%] top-0 w-52 h-52 rounded-full bg-[#e08858]/10 blur-3xl" />

          <div className="absolute right-[15%] bottom-0 w-52 h-52 rounded-full bg-[#a63d2a]/10 blur-3xl" />

          <div className="relative">

            <span className="text-xs font-Clarkson uppercase tracking-[0.25em] text-[#e08858]">
              Have an idea?
            </span>

            <h2 className="mt-6 max-w-3xl mx-auto text-3xl sm:text-4xl lg:text-5xl font-Clarkson font-bold tracking-[-0.04em] text-[#fbf4ee]">

              Your next project could

              <span className="text-[#e08858]">
                {' '}be here.
              </span>

            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-7 font-Clarkson text-[#fbf4ee]/60">
              Let's turn your product idea, business challenge, or technical
              requirement into something people actually want to use.
            </p>

            <div className="mt-9">

              <Link to="/signup">

                <button className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-[#e08858] text-[#1c1019] text-sm font-Clarkson font-bold hover:bg-[#f0c4a4] hover:-translate-y-1 transition-all shadow-lg">

                  Start Your Project

                  <ArrowRight className="w-5 h-5" />

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};
