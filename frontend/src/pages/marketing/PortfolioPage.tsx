import { GoldBalls } from '../../components/ui/GoldBalls';
import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  X,
  Layers3,
  Code2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SHOWCASE_PROJECTS, PROJECT_CATEGORIES } from '../../data/projects';

type Project = {
  id: number;
  name: string;
  description: string;
  serviceType: string;
  highlights: string[];
  tech: string[];
};

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  /* Projects come from src/data/projects.ts (names + details only, no repository links). */
  const displayProjects: Project[] = SHOWCASE_PROJECTS.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.details,
    serviceType: p.category,
    highlights: p.highlights,
    tech: p.tech,
  }));

  const categories = PROJECT_CATEGORIES;

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

  const clearFilters = () => {
    setFilter('All');
    setSearch('');
  };

  return (
    <div className="hl-borders min-h-screen bg-[#ffffff]  text-[#12202f]  overflow-hidden">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="gold-balls relative pt-20 sm:pt-24 lg:pt-28 pb-16">
<GoldBalls />

        {/* Background atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#0b4f9c]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute left-[4%] top-48 w-40 h-40 rounded-full bg-[#083b75]/5 blur-3xl" />

        <div className="absolute right-[6%] top-64 w-44 h-44 rounded-full bg-[#083b75]/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left lg:[&_p]:mx-0 lg:[&_.justify-center]:justify-start lg:[&_h1]:!text-5xl xl:[&_h1]:!text-6xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#0b4f9c]/40 bg-[#0b4f9c]/10">

            <Sparkles className="w-4 h-4 text-[#0b4f9c]" />

            <span className="text-xs font-Clarkson font-bold uppercase tracking-[0.22em] text-[#4a5a6a] ">
              Selected Work
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-8 font-Clarkson font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1] tracking-[-0.055em]">

            <span className="text-[#12202f] ">
              Ideas turned into
            </span>

            <br />

            <span className="text-[#4a5a6a] ">
              digital reality.
            </span>

          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-8 font-Clarkson text-[#4a5a6a]/80 ">
            A collection of AI systems, applications, analytics platforms,
            automation solutions, and digital products built to solve
            real-world problems.
          </p>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <div className="px-7 py-4 rounded-2xl bg-white  border border-[#0b4f9c]/25 shadow-sm">
              <div className="text-2xl font-Clarkson font-bold text-[#12202f] ">
                {displayProjects.length}+
              </div>

              <div className="mt-1 text-[11px] font-Clarkson uppercase tracking-wider text-[#4a5a6a]/55 ">
                Projects
              </div>
            </div>

            <div className="px-7 py-4 rounded-2xl bg-white  border border-[#0b4f9c]/25 shadow-sm">
              <div className="text-2xl font-Clarkson font-bold text-[#12202f] ">
                4+
              </div>

              <div className="mt-1 text-[11px] font-Clarkson uppercase tracking-wider text-[#4a5a6a]/55 ">
                Domains
              </div>
            </div>

            <div className="px-7 py-4 rounded-2xl bg-white  border border-[#0b4f9c]/25 shadow-sm">
              <div className="text-2xl font-Clarkson font-bold text-[#12202f] ">
                100%
              </div>

              <div className="mt-1 text-[11px] font-Clarkson uppercase tracking-wider text-[#4a5a6a]/55 ">
                Built with Purpose
              </div>
            </div>

          </div>

        </div>
          <figure className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
            <div className="absolute -inset-2 rounded-xl border border-[#0b4f9c]/25" />
            <img src="/images/portfolio.jpg" alt="A hand reaching toward a glowing AI network in a server room" className="relative aspect-[7/5] w-full rounded-xl border border-[#0b4f9c]/20 object-cover object-[center_30%] shadow-[0_24px_60px_rgba(28,16,28,.25)]" />
          </figure>
        </div>
      </section>


      {/* =====================================================
          FILTER + SEARCH
      ====================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-10">
<GoldBalls />

        <div className="rounded-xl bg-white  border border-[#0b4f9c]/30 p-5 sm:p-6 shadow-sm">

          {/* Search */}
          <div className="relative">

            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a5a6a]/40 " />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, technologies, services..."
              className="w-full h-14 pl-14 pr-12 rounded-2xl bg-[#ffffff]  border border-[#0b4f9c]/20 outline-none font-Clarkson text-sm sm:text-base text-[#12202f]  placeholder:text-[#4a5a6a]/40  focus:border-[#0b4f9c] focus:ring-2 focus:ring-[#0b4f9c]/10 transition-all"
            />

            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#4a5a6a]/50 hover:text-[#4a5a6a]  "
              >
                <X className="w-5 h-5" />
              </button>
            )}

          </div>


          {/* Categories */}
          <div className="mt-5 flex items-center gap-3 overflow-x-auto pb-1">

            <div className="hidden sm:flex items-center gap-2 mr-2 text-[#4a5a6a]/45 ">

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
                      ? 'bg-[#4a5a6a] text-white border-[#4a5a6a] shadow-md   '
                      : 'bg-[#ffffff]  text-[#4a5a6a]  border-[#0b4f9c]/20 hover:border-[#0b4f9c]/60 hover:-translate-y-0.5'
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

            <span className="text-xs font-Clarkson font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">
              The Work
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-Clarkson font-bold tracking-[-0.035em] text-[#12202f] ">
              Projects worth exploring
            </h2>

          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#4a5a6a]/45 ">

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
                className="group relative overflow-hidden rounded-xl bg-white  border border-[#0b4f9c]/25 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#0b4f9c]/60 transition-all duration-500"
              >

                {/* Accent glow */}
                <div className="absolute -right-20 -top-20 w-52 h-52 rounded-full bg-[#0b4f9c]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-7 sm:p-8">

                  {/* Top row */}
                  <div className="flex items-center justify-between gap-3">

                    <span className="inline-flex items-center px-3 py-2 rounded-full bg-[#0b4f9c]/10 text-[#083b75]  text-[10px] font-Clarkson font-bold uppercase tracking-wider">
                      {proj.serviceType}
                    </span>

                    <span className="text-xs font-Clarkson font-semibold text-[#4a5a6a]/25 ">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                  </div>


                  {/* Project icon */}
                  <div className="mt-8 w-14 h-14 rounded-2xl bg-[#ffffff]  border border-[#0b4f9c]/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">

                    <Code2 className="w-6 h-6 text-[#4a5a6a] " />

                  </div>


                  {/* Title */}
                  <h3 className="mt-6 text-2xl sm:text-[1.65rem] leading-tight font-Clarkson font-bold tracking-[-0.025em] text-[#12202f] ">
                    {proj.name}
                  </h3>


                  {/* Description */}
                  <p className="mt-4 text-sm sm:text-[15px] leading-7 font-Clarkson text-[#4a5a6a]/70 ">
                    {proj.description}
                  </p>


                  {/* Highlights + technologies */}
                  <div className="mt-6 pt-5 border-t border-[#0b4f9c]/20 space-y-4">

                    <ul className="space-y-2">
                      {proj.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs sm:text-[13px] font-Clarkson font-medium text-[#12202f]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0b4f9c] shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-md border border-[#0b4f9c]/40 bg-white text-[11px] font-Clarkson font-semibold text-[#0b4f9c]">
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* Empty state */
          <div className="py-24 rounded-xl bg-white  border border-[#0b4f9c]/30 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0b4f9c]/10 flex items-center justify-center">

              <Search className="w-7 h-7 text-[#0b4f9c]" />

            </div>

            <h3 className="mt-6 font-Clarkson font-bold text-2xl text-[#12202f] ">
              No projects found
            </h3>

            <p className="mt-3 text-sm font-Clarkson text-[#4a5a6a]/60 ">
              Try a different category or search term.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 text-sm font-Clarkson font-semibold text-[#4a5a6a]  underline underline-offset-4"
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

        <div className="rounded-xl bg-white  border border-[#0b4f9c]/30 p-8 sm:p-10 lg:p-14">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>

              <span className="text-xs font-Clarkson font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">
                What sits behind the work
              </span>

              <h2 className="mt-4 text-3xl sm:text-4xl font-Clarkson font-bold tracking-[-0.035em] text-[#12202f] ">
                More than a pretty interface.
              </h2>

              <p className="mt-5 text-base sm:text-lg leading-8 font-Clarkson text-[#4a5a6a]/70  max-w-xl">
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
                  className="flex items-center gap-3 p-4 sm:p-5 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/15 hover:border-[#0b4f9c]/40 transition-colors"
                >

                  <div className="w-2 h-2 rounded-full bg-[#0b4f9c] shrink-0" />

                  <span className="text-xs sm:text-sm font-Clarkson font-semibold text-[#4a5a6a] ">
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

        <div className="relative overflow-hidden rounded-xl bg-[#12202f]  border border-[#0b4f9c]/30 px-8 py-16 sm:px-12 sm:py-20 text-center">

          <div className="absolute left-[15%] top-0 w-52 h-52 rounded-full bg-[#0b4f9c]/10 blur-3xl" />

          <div className="absolute right-[15%] bottom-0 w-52 h-52 rounded-full bg-[#083b75]/10 blur-3xl" />

          <div className="relative">

            <span className="text-xs font-Clarkson uppercase tracking-[0.25em] text-[#0b4f9c]">
              Have an idea?
            </span>

            <h2 className="mt-6 max-w-3xl mx-auto text-3xl sm:text-4xl lg:text-5xl font-Clarkson font-bold tracking-[-0.04em] text-[#ffffff]">

              Your next project could

              <span className="text-[#0b4f9c]">
                {' '}be here.
              </span>

            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-7 font-Clarkson text-[#ffffff]/60">
              Let's turn your product idea, business challenge, or technical
              requirement into something people actually want to use.
            </p>

            <div className="mt-9">

              <Link to="/signup">

                <button className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-[#0b4f9c] text-white text-sm font-Clarkson font-bold hover:bg-[#9cc0e6] hover:-translate-y-1 transition-all shadow-lg">

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
