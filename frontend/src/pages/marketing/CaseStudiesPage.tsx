import { GoldBalls } from '../../components/ui/GoldBalls';

import React from 'react';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  BarChart3,
  Server,
  Clock3,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      id: 'cs-1',
      client: 'Global FinTech Corp',
      category: 'FINTECH • CLOUD • DATA',
      title:
        'High-Performance Financial Analytics & Microservices Migration',
      challenge:
        'The existing monolithic platform struggled with query latency and unpredictable traffic spikes during market opening hours.',
      solution:
        'We redesigned the architecture around event-driven microservices, Redis caching, PostgreSQL partitioning, and horizontally scalable API services.',
      results: [
        '96% reduction in API response time',
        'Zero downtime during 50,000 req/sec spikes',
        '$140k estimated annual cloud savings',
      ],
      metric: '96%',
      metricLabel: 'Faster API Response',
      icon: BarChart3,
      accent: 'gold',
      stats: [
        { label: 'Response Time', value: '120ms' },
        { label: 'Peak Traffic', value: '50K/s' },
        { label: 'Cloud Savings', value: '$140K' },
      ],
    },
    {
      id: 'cs-2',
      client: 'EduFlow Learning Platforms',
      category: 'EDTECH • SAAS • CLOUD',
      title: 'Multi-Tenant Interactive Learning SaaS Architecture',
      challenge:
        'The platform needed to support live video, automated grading, subscriptions, and thousands of simultaneous learning sessions.',
      solution:
        'We built an auto-scaling cloud architecture with Kubernetes, WebRTC-based video distribution, resilient APIs, and integrated multi-currency billing.',
      results: [
        'Scales to 100,000+ active sessions',
        '99.99% system availability target',
        'Integrated multi-currency subscription billing',
      ],
      metric: '100K+',
      metricLabel: 'Active Sessions',
      icon: Server,
      accent: 'olive',
      stats: [
        { label: 'Concurrent Users', value: '100K+' },
        { label: 'Availability', value: '99.99%' },
        { label: 'Billing', value: 'Global' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff]  text-[#12202f]  overflow-hidden">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="gold-balls relative pt-16 sm:pt-20 lg:pt-24 pb-16">
<GoldBalls />

        {/* Ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0b4f9c]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute left-[8%] top-48 w-40 h-40 rounded-full bg-[#083b75]/5 blur-3xl" />

        <div className="absolute right-[8%] top-64 w-40 h-40 rounded-full bg-[#083b75]/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left lg:[&_p]:mx-0 lg:[&_.justify-center]:justify-start lg:[&_h1]:!text-5xl xl:[&_h1]:!text-6xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b4f9c]/10 border border-[#0b4f9c]/35">

            <Sparkles className="w-3.5 h-3.5 text-[#0b4f9c]" />

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.22em] text-[#4a5a6a] ">
              Case Studies
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-7 font-Clarkson font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.055em] leading-[1.02]">

            <span className="text-[#12202f] ">
              Problems solved.
            </span>

            <br />

            <span className="text-[#4a5a6a] ">
              Results measured.
            </span>

          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-sm sm:text-base leading-8 font-Clarkson text-[#4a5a6a]/75 ">
            A closer look at how we turn complex technical challenges into
            scalable products, reliable systems, and measurable business
            outcomes.
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-wider text-[#4a5a6a]/60 ">
            Case-study metrics in this preview are sample claims from the brief and need verification.
          </p>

          {/* Mini metrics */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">

            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white  border border-[#0b4f9c]/25 shadow-sm">

              <TrendingUp className="w-4 h-4 text-[#0b4f9c]" />

              <span className="text-[10px] font-Clarkson font-semibold text-[#4a5a6a] ">
                Performance Driven
              </span>

            </div>

            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white  border border-[#0b4f9c]/25 shadow-sm">

              <ShieldCheck className="w-4 h-4 text-[#083b75]" />

              <span className="text-[10px] font-Clarkson font-semibold text-[#4a5a6a] ">
                Production Ready
              </span>

            </div>

            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white  border border-[#0b4f9c]/25 shadow-sm">

              <Zap className="w-4 h-4 text-[#083b75]" />

              <span className="text-[10px] font-Clarkson font-semibold text-[#4a5a6a] ">
                Built to Scale
              </span>

            </div>

          </div>

        </div>
          <figure className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
            <div className="absolute -inset-2 rounded-xl border border-[#0b4f9c]/25" />
            <img src="/images/casestudies.jpg" alt="Leaders reviewing an AI ethics framework on a glass display" className="relative aspect-[7/5] w-full rounded-xl border border-[#0b4f9c]/20 object-cover object-[center_30%] shadow-[0_24px_60px_rgba(28,16,28,.25)]" />
          </figure>
        </div>
      </section>


      {/* =====================================================
          CASE STUDIES
      ====================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-10">
<GoldBalls />

        {caseStudies.map((cs, index) => {

          const Icon = cs.icon;

          return (
            <article
              key={cs.id}
              className="group relative overflow-hidden rounded-xl bg-white  border border-[#0b4f9c]/30 shadow-md hover:shadow-2xl transition-all duration-500"
            >

              {/* Decorative glow */}
              <div className="absolute -right-32 -top-32 w-80 h-80 rounded-full bg-[#0b4f9c]/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* =================================================
                  TOP BAR
              ================================================== */}

              <div className="relative px-6 sm:px-10 lg:px-12 pt-7">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/20 flex items-center justify-center">

                      <Icon className="w-5 h-5 text-[#4a5a6a] " />

                    </div>

                    <div>

                      <div className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#0b4f9c]">
                        {cs.client}
                      </div>

                      <div className="mt-1 text-[8px] font-Clarkson tracking-wider text-[#4a5a6a]/45 ">
                        {cs.category}
                      </div>

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    <span className="text-[9px] font-Clarkson font-semibold text-[#4a5a6a]/35 ">
                      CASE 0{index + 1}
                    </span>

                  </div>

                </div>

              </div>


              {/* =================================================
                  MAIN CONTENT
              ================================================== */}

              <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.75fr] gap-10 px-6 sm:px-10 lg:px-12 py-9">

                {/* LEFT */}
                <div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-Clarkson font-bold tracking-[-0.045em] leading-tight text-[#12202f]  max-w-3xl">
                    {cs.title}
                  </h2>

                  {/* Challenge + Solution */}
                  <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-7">

                    {/* Challenge */}
                    <div>

                      <div className="flex items-center gap-2 mb-3">

                        <div className="w-2 h-2 rounded-full bg-[#083b75]" />

                        <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#083b75]">
                          The Challenge
                        </span>

                      </div>

                      <p className="text-xs sm:text-sm leading-7 font-Clarkson text-[#4a5a6a]/70 ">
                        {cs.challenge}
                      </p>

                    </div>


                    {/* Solution */}
                    <div>

                      <div className="flex items-center gap-2 mb-3">

                        <div className="w-2 h-2 rounded-full bg-[#083b75]" />

                        <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#2f6db5] ">
                          Our Solution
                        </span>

                      </div>

                      <p className="text-xs sm:text-sm leading-7 font-Clarkson text-[#4a5a6a]/70 ">
                        {cs.solution}
                      </p>

                    </div>

                  </div>

                </div>


                {/* RIGHT: HERO METRIC */}
                <div className="relative">

                  <div className="h-full min-h-[230px] rounded-xl bg-[#12202f]  border border-[#0b4f9c]/20 p-7 flex flex-col justify-between overflow-hidden">

                    <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-[#0b4f9c]/10 blur-3xl" />

                    <div className="relative">

                      <div className="flex items-center justify-between">

                        <span className="text-[9px] font-Clarkson uppercase tracking-[0.18em] text-[#ffffff]/45">
                          Primary Impact
                        </span>

                        <ArrowUpRight className="w-4 h-4 text-[#0b4f9c]" />

                      </div>

                      <div className="mt-7">

                        <div className="text-5xl sm:text-6xl font-Clarkson font-bold tracking-[-0.06em] text-[#0b4f9c]">
                          {cs.metric}
                        </div>

                        <div className="mt-2 text-xs font-Clarkson text-[#ffffff]/60">
                          {cs.metricLabel}
                        </div>

                      </div>

                    </div>

                    <div className="relative mt-8">

                      <div className="flex items-center gap-2">

                        <CheckCircle2 className="w-4 h-4 text-[#083b75]" />

                        <span className="text-[9px] font-Clarkson font-semibold text-[#ffffff]/55">
                          Measurable business impact
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  STATS
              ================================================== */}

              <div className="relative mx-6 sm:mx-10 lg:mx-12 mb-8 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/20 overflow-hidden">

                <div className="grid grid-cols-1 sm:grid-cols-3">

                  {cs.stats.map((stat, statIndex) => (

                    <div
                      key={stat.label}
                      className={`
                        p-5 sm:p-6
                        ${
                          statIndex !== cs.stats.length - 1
                            ? 'border-b sm:border-b-0 sm:border-r border-[#0b4f9c]/20'
                            : ''
                        }
                      `}
                    >

                      <div className="flex items-center gap-2">

                        {statIndex === 0 && (
                          <Clock3 className="w-3.5 h-3.5 text-[#0b4f9c]" />
                        )}

                        {statIndex === 1 && (
                          <TrendingUp className="w-3.5 h-3.5 text-[#083b75]" />
                        )}

                        {statIndex === 2 && (
                          <Zap className="w-3.5 h-3.5 text-[#083b75]" />
                        )}

                        <span className="text-[8px] font-Clarkson uppercase tracking-wider text-[#4a5a6a]/45 ">
                          {stat.label}
                        </span>

                      </div>

                      <div className="mt-2 text-lg font-Clarkson font-bold text-[#12202f] ">
                        {stat.value}
                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* =================================================
                  RESULTS
              ================================================== */}

              <div className="relative border-t border-[#f3f6f9]  px-6 sm:px-10 lg:px-12 py-7">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                  <div>

                    <div className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#0b4f9c]">
                      Key Results
                    </div>

                    <div className="mt-1 text-xs font-Clarkson text-[#4a5a6a]/50 ">
                      Quantifiable outcomes delivered through the engagement.
                    </div>

                  </div>

                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">

                  {cs.results.map((result, resultIndex) => (

                    <div
                      key={resultIndex}
                      className="group/result flex items-start gap-3 p-4 rounded-xl bg-[#ffffff]/70  border border-[#0b4f9c]/15 hover:border-[#0b4f9c]/40 transition-colors"
                    >

                      <div className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#0b4f9c]/15 flex items-center justify-center">

                        <CheckCircle2 className="w-3 h-3 text-[#0b4f9c]" />

                      </div>

                      <span className="text-[10px] sm:text-[11px] leading-5 font-Clarkson font-medium text-[#4a5a6a]/75 ">
                        {result}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </article>

          );
        })}

      </section>


      {/* =====================================================
          METHODOLOGY
      ====================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
<GoldBalls />

        <div className="rounded-xl bg-white  border border-[#0b4f9c]/30 p-7 sm:p-10 lg:p-12">

          <div className="text-center max-w-2xl mx-auto">

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">
              Our Approach
            </span>

            <h2 className="mt-3 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.04em] text-[#12202f] ">
              From complexity to clarity.
            </h2>

            <p className="mt-4 text-xs sm:text-sm leading-7 font-Clarkson text-[#4a5a6a]/65 ">
              Every engagement follows a structured engineering process
              designed to reduce uncertainty and create measurable outcomes.
            </p>

          </div>


          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {[
              {
                number: '01',
                title: 'Discover',
                text: 'Understand the business problem, users, constraints, and success metrics.',
              },
              {
                number: '02',
                title: 'Architect',
                text: 'Design the technical foundation around scalability, security, and reliability.',
              },
              {
                number: '03',
                title: 'Build',
                text: 'Develop, integrate, test, and continuously improve the solution.',
              },
              {
                number: '04',
                title: 'Measure',
                text: 'Track performance and outcomes against the goals defined at the start.',
              },
            ].map((step) => (

              <div
                key={step.number}
                className="p-5 rounded-2xl bg-[#ffffff]  border border-[#0b4f9c]/15"
              >

                <div className="text-[10px] font-Clarkson font-bold text-[#0b4f9c]">
                  {step.number}
                </div>

                <h3 className="mt-4 text-sm font-Clarkson font-bold text-[#12202f] ">
                  {step.title}
                </h3>

                <p className="mt-2 text-[10px] leading-5 font-Clarkson text-[#4a5a6a]/60 ">
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
<GoldBalls />

        <div className="relative overflow-hidden rounded-xl bg-[#12202f]  border border-[#0b4f9c]/30 px-7 py-14 sm:px-12 sm:py-16 text-center">

          <div className="absolute left-[15%] top-0 w-52 h-52 rounded-full bg-[#0b4f9c]/10 blur-3xl" />

          <div className="absolute right-[15%] bottom-0 w-52 h-52 rounded-full bg-[#083b75]/10 blur-3xl" />

          <div className="relative">

            <span className="text-[10px] font-Clarkson uppercase tracking-[0.25em] text-[#0b4f9c]">
              Your Challenge
            </span>

            <h2 className="mt-5 max-w-3xl mx-auto text-2xl sm:text-3xl lg:text-4xl font-Clarkson font-bold tracking-[-0.04em] text-[#ffffff]">
              Have a problem worth
              <span className="text-[#0b4f9c]"> solving?</span>
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-xs sm:text-sm leading-7 font-Clarkson text-[#ffffff]/60">
              Let's turn your technical challenge into a clear,
              scalable, measurable solution.
            </p>

            <div className="mt-8">

              <Link to="/signup">

                <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0b4f9c] text-white text-xs font-Clarkson font-bold hover:bg-[#9cc0e6] hover:-translate-y-0.5 transition-all shadow-lg">

                  Start a Conversation

                  <ArrowRight className="w-4 h-4" />

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};
