import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SHOWCASE_PROJECTS } from '../../data/projects';

const AUTO_MS = 5000;

/** Animated project showcase: project names on the left, details on the right. No external links. */
export const ProjectShowcase: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // reveal animation when scrolled into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // auto-rotate through projects
  useEffect(() => {
    if (paused || !visible) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % SHOWCASE_PROJECTS.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, paused, visible]);

  const project = SHOWCASE_PROJECTS[active];

  return (
    <section className="py-24 lg:py-28 bg-white">
      <style>{`
        @keyframes pjFadeUp { from { opacity:0; transform: translateY(14px);} to { opacity:1; transform:none;} }
        @keyframes pjSlideIn { from { opacity:0; transform: translateX(-16px);} to { opacity:1; transform:none;} }
        @keyframes pjFill { from { transform: scaleX(0);} to { transform: scaleX(1);} }
        .pj-detail > * { animation: pjFadeUp .55s ease both; }
        .pj-detail > *:nth-child(2) { animation-delay:.07s; }
        .pj-detail > *:nth-child(3) { animation-delay:.14s; }
        .pj-detail > *:nth-child(4) { animation-delay:.21s; }
        .pj-detail > *:nth-child(5) { animation-delay:.28s; }
        .pj-item { opacity:0; }
        .pj-in .pj-item { animation: pjSlideIn .5s ease forwards; }
        .pj-bar { transform-origin:left; animation: pjFill ${AUTO_MS}ms linear forwards; }
      `}</style>

      <div ref={rootRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'pj-in' : ''}`}>
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">Selected Work</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#12202f]">
            Projects we are proud of
          </h2>
          <p className="mt-4 text-[#4a5a6a]">
            Intelligent systems, platforms and analytics built to solve real problems.
          </p>
        </div>

        <div
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Project names */}
          <div className="lg:col-span-5 rounded-xl border-2 border-[#0b4f9c]/40 bg-white p-3 shadow-sm">
            <ul className="space-y-2">
              {SHOWCASE_PROJECTS.map((p, i) => (
                <li key={p.id} className="pj-item" style={{ animationDelay: `${i * 70}ms` }}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`relative w-full overflow-hidden text-left flex items-center gap-4 rounded-lg border px-4 py-3 transition-all duration-300 ${
                      i === active
                        ? 'border-[#0b4f9c] bg-[#0b4f9c]/10 shadow-[0_0_0_3px_rgba(11,79,156,.12)] translate-x-1'
                        : 'border-[#0b4f9c]/25 bg-white hover:border-[#0b4f9c]/70 hover:translate-x-1'
                    }`}
                  >
                    <span className={`text-xs font-bold tabular-nums ${i === active ? 'text-[#0b4f9c]' : 'text-[#4a5a6a]/50'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-semibold ${i === active ? 'text-[#12202f]' : 'text-[#4a5a6a]'}`}>{p.name}</span>
                    {i === active && !paused && (
                      <span key={`bar-${active}`} className="pj-bar absolute left-0 bottom-0 h-0.5 w-full bg-[#0b4f9c]" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Details */}
          <div className="lg:col-span-7 rounded-xl border-2 border-[#0b4f9c]/50 bg-gradient-to-br from-white to-[#f3f6f9] p-7 sm:p-9 shadow-[0_18px_50px_-24px_rgba(11,79,156,.5)]">
            <div key={project.id} className="pj-detail">
              <span className="inline-flex rounded-full border border-[#0b4f9c]/50 bg-[#0b4f9c]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#083b75]">
                {project.category}
              </span>
              <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-[#12202f]">{project.name}</h3>
              <p className="mt-4 leading-7 text-[#4a5a6a]">{project.details}</p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-1">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 rounded-lg border border-[#0b4f9c]/30 bg-white px-4 py-2.5 text-sm font-medium text-[#12202f]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0b4f9c]" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-md border border-[#0b4f9c]/40 bg-white px-3 py-1 text-xs font-semibold text-[#0b4f9c]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0b4f9c] px-6 py-3 text-sm font-bold text-[#0b4f9c] transition-all hover:bg-[#0b4f9c] hover:text-white hover:-translate-y-0.5"
          >
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
