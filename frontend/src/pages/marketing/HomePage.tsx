import { GoldBalls } from '../../components/ui/GoldBalls';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Smartphone,
  Cloud,
  Database,
  Compass,
  Cpu,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Layers3,
  Workflow,
  Rocket,
  BarChart3,
  Server,
  BrainCircuit,
  Menu,
  Globe2,
} from 'lucide-react';

import { Button } from '../../components/ui/Button';
import { PromoVideoSection } from '../../components/ui/PromoVideoSection';
import { ProjectShowcase } from '../../components/ui/ProjectShowcase';

export const HomePage: React.FC = () => {
  const services = [
    {
      title: 'Full-Stack Web & SaaS',
      icon: Code2,
      desc: 'Scalable web applications, custom software and SaaS platforms built around real business needs.',
    },
    {
      title: 'Mobile Application Development',
      icon: Smartphone,
      desc: 'Modern mobile experiences designed for usability, performance and seamless digital workflows.',
    },
    {
      title: 'Cloud & DevOps Engineering',
      icon: Cloud,
      desc: 'Reliable cloud infrastructure, deployment pipelines, containers and scalable production systems.',
    },
    {
      title: 'Data Engineering & Analytics',
      icon: Database,
      desc: 'Data pipelines, databases, analytics systems and structured data workflows for better decisions.',
    },
    {
      title: 'AI, ML & Intelligent Automation',
      icon: Cpu,
      desc: 'Practical AI and machine learning solutions combined with automation to improve business operations.',
    },
    {
      title: 'UI/UX & Product Design',
      icon: Compass,
      desc: 'Clean, intuitive digital interfaces and product experiences designed for clarity and conversion.',
    },
  ];

  const solutions = [
    {
      number: '01',
      title: 'Digital Transformation',
      desc: 'Modernize business processes, systems and digital experiences with scalable technology.',
      icon: Layers3,
    },
    {
      number: '02',
      title: 'Intelligent Automation',
      desc: 'Connect AI, data and automation to reduce repetitive workflows and improve efficiency.',
      icon: BrainCircuit,
    },
    {
      number: '03',
      title: 'Enterprise SaaS',
      desc: 'Build secure, scalable platforms designed around real business operations and growth.',
      icon: Globe2,
    },
    {
      number: '04',
      title: 'Cloud Modernization',
      desc: 'Design resilient cloud infrastructure with better deployment, monitoring and scalability.',
      icon: Server,
    },
  ];


  const technologies = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'FastAPI',
    'Flask',
    'Next.js',
    'Tailwind CSS',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Git & GitHub',
    'REST APIs',
    'Scikit-learn',
    'XGBoost',
    'AI / ML',
  ];

  return (
    <div className="hl-borders min-h-screen bg-[#ffffff]  text-[#12202f] ">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="gold-balls relative overflow-hidden pt-12 lg:pt-20 pb-16 lg:pb-20">
<GoldBalls />

        {/* Background glow */}
        <div className="absolute top-0 left-1/3 w-[650px] h-[400px] rounded-full bg-[#0b4f9c]/20  blur-[120px] pointer-events-none" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-[#0b4f9c]/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* ================= LEFT ================= */}

            <div className="lg:col-span-7">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b4f9c]/15 border border-[#0b4f9c]/40 text-xs font-semibold text-[#4a5a6a] ">

                <Zap className="w-3.5 h-3.5" />

                Next-Gen Enterprise Technology & SaaS Platform

              </div>

              {/* Heading */}
              <h1 className="mt-7 text-5xl sm:text-6xl lg:text-[72px] xl:text-[80px] font-Clarkson font-bold leading-[0.98] tracking-tight text-[#12202f] ">

                Technology for a

                <span className="block text-[#0b4f9c] ">
                  Brighter Tomorrow.
                </span>

              </h1>

              {/* Description */}
              <p className="mt-7 max-w-2xl text-base sm:text-lg lg:text-xl text-[#4a5a6a]/90  leading-8">

                We design, engineer, and deploy high-impact digital solutions,
                cloud infrastructure, and custom SaaS platforms that help
                businesses operate, scale, and evolve.

              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

                <Link to="/signup">

                  <Button
                    variant="gold"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Explore Platform Portal
                  </Button>

                </Link>

                <Link to="/contact">

                  <Button
                    variant="outline"
                    size="lg"
                  >
                    Start a Conversation
                  </Button>

                </Link>

              </div>

              {/* Stats */}
              <div className="mt-10 pt-7 border-t border-[#0b4f9c]/30">

                <div className="grid grid-cols-3 gap-5">

                  <div>
                    <div className="text-2xl sm:text-3xl font-serif font-bold">
                      50+
                    </div>

                    <div className="mt-1 text-xs sm:text-sm text-[#4a5a6a] ">
                      Projects Delivered
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-serif font-bold">
                      30+
                    </div>

                    <div className="mt-1 text-xs sm:text-sm text-[#4a5a6a] ">
                      Happy Clients
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-serif font-bold">
                      100%
                    </div>

                    <div className="mt-1 text-xs sm:text-sm text-[#4a5a6a] ">
                      Client Satisfaction
                    </div>
                  </div>

                </div>

              </div>

            </div>


            {/* ================= RIGHT IMAGE ================= */}

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-3 rounded-xl border border-[#0b4f9c]/20 " />
              <div className="aenova-showreel-float relative isolate overflow-hidden rounded-xl border border-[#1b2b3d] bg-[#0c1824] shadow-[0_30px_70px_rgba(0,0,0,.45)] [container-type:inline-size]" style={{ aspectRatio: '620 / 477' }}>
                <img
                   src="/images/services-hero.png"
                   alt="Enterprise technology, software engineering and digital solutions by Aevona Solution"
                   title="Aevona Solution Enterprise Services"
                   className="absolute inset-0 h-full w-full object-cover"
                />
                <svg aria-hidden="true" viewBox="0 0 620 477" className="pointer-events-none absolute inset-0 z-10 h-full w-full">
                  <defs>
                    <radialGradient id="orbit-dot-glow"><stop offset="0" stopColor="#bcd5ee" stopOpacity=".9" /><stop offset="1" stopColor="#1a63b5" stopOpacity="0" /></radialGradient>
                    <path id="orbit-path" d="M97.5 261a240 240 0 1 1 480 0a240 240 0 1 1 -480 0" />
                  </defs>
                  <g>
                    <circle r="12" fill="url(#orbit-dot-glow)" />
                    <circle r="3.6" fill="#7fb0e0" />
                    <animateMotion dur="16s" repeatCount="indefinite" rotate="auto"><mpath href="#orbit-path" /></animateMotion>
                  </g>
                </svg>

                <div className="absolute z-20 inline-flex items-center gap-2 rounded-xl border border-[#0b4f9c]/25 bg-[#0c1824] px-3 shadow-lg" style={{ left: '1.5%', top: '0.8%', height: '6.2%', fontSize: 'clamp(7px,1.6cqw,11px)' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0b4f9c] shadow-[0_0_10px_#0b4f9c]" />
                  <span className="font-bold uppercase tracking-[.18em] text-[#0b4f9c]">Our Services</span>
                </div>

                {[
                  { title: 'AI & Machine Learning', sub: 'Generative AI & ML', icon: BrainCircuit, tint: '#1a63b5', box: { left: '4.6%', top: '7.2%', width: '28%', height: '18%' }, still: true },
                  { title: 'Full-Stack Web & SaaS', sub: 'Scalable platforms', icon: Code2, tint: '#1a63b5', box: { left: '69%', top: '4.5%', width: '30%', height: '10.5%' } },
                  { title: 'Cloud & DevOps', sub: 'Secure infrastructure', icon: Cloud, tint: '#1a63b5', box: { left: '67.5%', top: '51%', width: '31.5%', height: '11.8%' }, still: true },
                  { title: 'Data Engineering', sub: 'Pipelines & analytics', icon: Database, tint: '#34d399', box: { left: '63.2%', top: '75.2%', width: '35.8%', height: '19.5%' }, still: true },
                  { title: 'Mobile Applications', sub: 'iOS & Android', icon: Smartphone, tint: '#34d399', box: { left: '1.5%', top: '84.5%', width: '24%', height: '11%' } },
                  { title: 'UI/UX Product Design', sub: 'Research to prototype', icon: Compass, tint: '#1a63b5', box: { left: '1.5%', top: '49%', width: '28%', height: '11%' } },
                ].map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <div
                      key={service.title}
                      className="absolute z-20 flex items-center gap-[4%] rounded-2xl border border-[#9cc0e6]/30 px-[3%] shadow-[0_12px_34px_rgba(0,0,0,.55)]"
                      style={{ ...service.box, background: 'linear-gradient(135deg,#0c1824 0%,#0c1824 100%)', fontSize: 'clamp(8px,1.9cqw,13px)', ...(service.still ? {} : { animation: `aenova-float 4s ease-in-out ${index * -0.45}s infinite` }) }}
                    >
                      <ServiceIcon className="h-[1.5em] w-[1.5em] shrink-0" style={{ color: service.tint }} />
                      <div className="min-w-0">
                        <div className="font-bold leading-tight text-white">{service.title}</div>
                        <div className="mt-[.25em] text-[.82em] leading-tight text-[#9fb2c6]">{service.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* PROMO VIDEO */}
      <PromoVideoSection />

      {/* =========================================================
          TRUST / CAPABILITIES STRIP
      ========================================================= */}

      <section className="gold-balls border-y border-[#0b4f9c]/20 bg-[#ffffff]/60 ">
<GoldBalls />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="py-7 flex flex-wrap justify-center lg:justify-between gap-x-8 gap-y-4">

            {[
              'Full-Stack Engineering',
              'SaaS Development',
              'Cloud & DevOps',
              'Data Engineering',
              'AI & Machine Learning',
              'Business Automation',
              'UI/UX & Product Design',
              'API & System Integration',
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#4a5a6a] "
              >

                <span className="w-1.5 h-1.5 rounded-full bg-[#0b4f9c]" />

                {item}

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* PROJECT SHOWCASE (names + details, animated) */}
      <ProjectShowcase />

      {/* =========================================================
          SERVICES
      ========================================================= */}

      <section className="gold-balls py-24 lg:py-32">
<GoldBalls />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14"><div className="max-w-3xl">

            <span className="text-sm font-bold uppercase tracking-[0.26em] text-[#0b4f9c] ">
              Our Expertise
            </span>

            <h2 className="mt-4 text-5xl sm:text-6xl font-Clarkson font-bold leading-tight">
              Technology built around
              <span className="text-[#0b4f9c] ">
                {' '}business outcomes.
              </span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#4a5a6a]/80  leading-7 max-w-2xl">
              From application engineering to cloud infrastructure and
              intelligent automation, we provide end-to-end technology
              services for modern organizations.
            </p>

          </div>
            <figure className="relative">
              <div className="absolute -inset-2 rounded-xl border border-[#0b4f9c]/15" />
              <img src="/images/ai-trends.png" alt="Top AI trends driving business growth and innovation in 2026" className="relative w-full rounded-3xl border border-[#2a3a4c] object-cover shadow-[0_24px_60px_rgba(0,0,0,.4)]" loading="lazy" />
            </figure>
          </div>


          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {services.map((item, idx) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="group relative p-7 sm:p-8 rounded-xl bg-white  border border-[#0b4f9c]/25 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >

                  {/* Background glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#0b4f9c]/10 blur-3xl group-hover:bg-[#0b4f9c]/20 transition-colors duration-500" />

                  <div className="relative">

                    <div className="flex items-center justify-between">

                      <div className="w-13 h-13 p-3 rounded-2xl bg-[#0b4f9c]/15 border border-[#0b4f9c]/30 text-[#4a5a6a]  group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-full h-full" />
                      </div>

                      <span className="text-xs font-serif text-[#0b4f9c]/50 ">
                        0{idx + 1}
                      </span>

                    </div>

                    <h3 className="mt-7 text-2xl font-serif font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-base text-[#4a5a6a]/75  leading-7">
                      {item.desc}
                    </p>

                    <Link
                      to="/services"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#4a5a6a]  group/link"
                    >
                      Explore Service

                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          SOLUTIONS
      ========================================================= */}

      <section className="gold-balls py-24 lg:py-32 bg-[#ffffff] ">
<GoldBalls />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

            {/* Left */}
            <div className="lg:col-span-4">

              <span className="text-sm font-bold uppercase tracking-[0.26em] text-[#0b4f9c] ">
                Solutions
              </span>

              <h2 className="mt-4 text-5xl sm:text-6xl font-Clarkson font-bold leading-tight">
                Built for the way
                <span className="text-[#0b4f9c] ">
                  {' '}business works.
                </span>
              </h2>

              <p className="mt-6 text-base text-[#4a5a6a]/80  leading-7">
                Technology should solve meaningful problems. Our solutions
                combine engineering, strategy and modern infrastructure to
                create systems that are ready for what comes next.
              </p>

              <Link
                to="/services"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#4a5a6a] "
              >
                Explore Solutions
                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>


            {/* Right */}
            <div className="lg:col-span-8">

              <div className="border-t border-[#0b4f9c]/30">

                {solutions.map((solution) => {

                  const Icon = solution.icon;

                  return (

                    <div
                      key={solution.number}
                      className="group py-7 border-b border-[#0b4f9c]/30 grid grid-cols-[48px_1fr_auto] gap-5 items-start hover:bg-[#ffffff]/40  px-3 -mx-3 transition-colors duration-300"
                    >

                      <span className="text-xs font-serif text-[#0b4f9c]  pt-1">
                        {solution.number}
                      </span>

                      <div>

                        <div className="flex items-center gap-3">

                          <Icon className="w-5 h-5 text-[#0b4f9c] " />

                          <h3 className="text-xl sm:text-2xl font-serif font-bold">
                            {solution.title}
                          </h3>

                        </div>

                        <p className="mt-3 text-base text-[#4a5a6a]/70  leading-7 max-w-xl">
                          {solution.desc}
                        </p>

                      </div>

                      <ArrowRight className="w-5 h-5 text-[#0b4f9c]  group-hover:translate-x-2 transition-transform" />

                    </div>

                  );

                })}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          ENTERPRISE TECHNOLOGY
      ========================================================= */}

      <section className="gold-balls py-24 lg:py-32">
<GoldBalls />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Visual */}
            <div className="relative order-2 lg:order-1">

              <div className="absolute -inset-5 rounded-xl bg-[#0b4f9c]/10 blur-2xl" />

              <div className="relative rounded-xl bg-[#12202f] p-5 sm:p-7 shadow-2xl overflow-hidden">

                <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-[#0b4f9c]/20 blur-[90px]" />

                {/* Dashboard */}
                <div className="relative rounded-2xl border border-[#0b4f9c]/20 bg-[#0c1824] overflow-hidden">

                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#0b4f9c]/15">

                    <div className="flex items-center gap-2">

                      <div className="w-2.5 h-2.5 rounded-full bg-[#0b4f9c]" />

                      <span className="text-xs font-semibold text-[#ffffff]">
                        Aevona Platform
                      </span>

                    </div>

                    <span className="text-[10px] text-[#0b4f9c]">
                      SYSTEMS ONLINE
                    </span>

                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 p-4">

                    <div className="p-4 rounded-xl bg-[#12202f] border border-[#0b4f9c]/10">

                      <TrendingUp className="w-4 h-4 text-[#0b4f9c]" />

                      <div className="mt-4 text-2xl font-serif font-bold text-[#ffffff]">
                        98.4%
                      </div>

                      <div className="text-[10px] text-[#0b4f9c]/60 mt-1">
                        Platform Performance
                      </div>

                    </div>

                    <div className="p-4 rounded-xl bg-[#12202f] border border-[#0b4f9c]/10">

                      <BarChart3 className="w-4 h-4 text-[#0b4f9c]" />

                      <div className="mt-4 text-2xl font-serif font-bold text-[#ffffff]">
                        +45.9%
                      </div>

                      <div className="text-[10px] text-[#0b4f9c]/60 mt-1">
                        Business Growth
                      </div>

                    </div>

                  </div>

                  {/* Fake chart */}
                  <div className="px-4 pb-4">

                    <div className="rounded-xl bg-[#12202f] border border-[#0b4f9c]/10 p-5">

                      <div className="flex justify-between">

                        <span className="text-xs text-[#ffffff]/70">
                          Platform Activity
                        </span>

                        <span className="text-[10px] text-[#0b4f9c]">
                          LIVE
                        </span>

                      </div>

                      <div className="mt-6 flex items-end gap-2 h-24">

                        {[30, 45, 38, 60, 52, 72, 64, 85, 76, 92, 84, 100].map(
                          (height, index) => (

                            <div
                              key={index}
                              className="flex-1 rounded-t bg-[#0b4f9c]/50 hover:bg-[#0b4f9c] transition-colors"
                              style={{ height: `${height}%` }}
                            />

                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Content */}
            <div className="order-1 lg:order-2">

              <span className="text-sm font-bold uppercase tracking-[0.26em] text-[#0b4f9c] ">
                Enterprise Technology
              </span>

              <h2 className="mt-4 text-5xl sm:text-6xl font-Clarkson font-bold leading-tight">
                Systems designed to
                <span className="text-[#0b4f9c] ">
                  {' '}scale with you.
                </span>
              </h2>

              <p className="mt-6 text-sm sm:text-base text-[#4a5a6a]/80  leading-7">
                We combine modern application development, cloud infrastructure,
                data systems and automation to build technology that remains
                reliable as your business evolves.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  'Scalable application architecture',
                  'Secure cloud infrastructure',
                  'Data-driven business systems',
                  'Modern deployment and automation',
                  'Long-term maintainability',
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 text-base"
                  >

                    <CheckCircle2 className="w-5 h-5 text-[#0b4f9c] " />

                    <span>{item}</span>

                  </div>

                ))}

              </div>

              <Link
                to="/services"
                className="mt-9 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#12202f]  text-[#ffffff]  text-sm font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                Explore Our Capabilities
                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          HOW WE WORK
      ========================================================= */}

      <section className="gold-balls py-24 bg-[#12202f] text-[#ffffff]">
<GoldBalls />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <span className="text-sm font-bold uppercase tracking-[0.26em] text-[#0b4f9c]">
              How We Work
            </span>

            <h2 className="mt-4 text-4xl sm:text-5xl font-Clarkson font-bold">
              From "Idea" to "Impact".
            </h2>

            <p className="mt-5 text-sm text-white/60 leading-7">
              A structured approach designed to keep technology aligned with
              business goals from the first conversation to deployment.
            </p>

          </div>


          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                number: '01',
                title: 'Discover',
                desc: 'Understand the business problem, users and technical requirements.',
                icon: Compass,
              },
              {
                number: '02',
                title: 'Design',
                desc: 'Translate requirements into a clear product and technical architecture.',
                icon: Layers3,
              },
              {
                number: '03',
                title: 'Build',
                desc: 'Engineer reliable and scalable technology around the defined goals.',
                icon: Code2,
              },
              {
                number: '04',
                title: 'Deploy',
                desc: 'Launch, monitor and continuously improve the solution.',
                icon: Rocket,
              },
              {
                number: '05',
                title: 'Manage',
                desc: 'Maintain and optimize the solution for long-term success.',
                icon: Workflow,
              }
            ].map((step) => {

              const Icon = step.icon;

              return (

                <div
                  key={step.number}
                  className="workflow-zigzag-card relative p-7 rounded-3xl border border-[#0b4f9c]/20 bg-[#12202f]/70 hover:bg-[#12202f] transition-colors"
                >

                  <div className="flex items-center justify-between">

                    <Icon className="w-6 h-6 text-[#0b4f9c]" />

                    <span className="text-xs font-serif text-[#0b4f9c]/50">
                      {step.number}
                    </span>

                  </div>

                  <h3 className="mt-8 text-2xl font-serif font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm text-white/55 leading-6">
                    {step.desc}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          TECHNOLOGY STACK
      ========================================================= */}

      <section className="gold-balls py-24 bg-[#ffffff] ">
<GoldBalls />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <span className="text-sm font-bold uppercase tracking-[0.26em] text-[#0b4f9c] ">
              Technology
            </span>

            <h2 className="mt-4 text-5xl sm:text-6xl font-Clarkson font-bold leading-tight">
              Powered by modern technology.
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#4a5a6a]/75  leading-7">
              A flexible technology ecosystem for building reliable,
              maintainable and scalable digital products.
            </p>

          </div>


          <div className="mt-12 flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">

            {technologies.map((technology) => (

              <div
                key={technology}
                className="px-5 py-3.5 rounded-full bg-[#ffffff]  border border-[#0b4f9c]/25 text-base font-semibold text-[#4a5a6a]  hover:border-[#0b4f9c] hover:-translate-y-1 hover:shadow-md transition-all duration-300 shadow-sm"
              >
                {technology}
              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          IMPACT
      ========================================================= */}

      <section className="gold-balls py-24">
<GoldBalls />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative rounded-xl overflow-hidden bg-[#12202f] text-[#ffffff] p-8 sm:p-12 lg:p-16">

            <div className="absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full bg-[#0b4f9c]/15 blur-[120px]" />

            <div className="relative">

              <div className="text-center">

                <span className="text-sm font-bold uppercase tracking-[0.26em] text-[#0b4f9c]">
                  Our Impact
                </span>

                <h2 className="mt-4 text-4xl sm:text-5xl font-serif font-bold">
                  Built to create lasting value.
                </h2>

              </div>


              <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#0b4f9c]/20">

                <div className="py-7 sm:py-0 sm:px-8 text-center">

                  <Award className="w-6 h-6 mx-auto text-[#0b4f9c]" />

                  <div className="mt-4 text-4xl sm:text-5xl font-serif font-bold">
                    50+
                  </div>

                  <div className="mt-2 text-xs text-white/55 uppercase tracking-wider">
                    Projects Delivered
                  </div>

                </div>


                <div className="py-7 sm:py-0 sm:px-8 text-center">

                  <Building2 className="w-6 h-6 mx-auto text-[#0b4f9c]" />

                  <div className="mt-4 text-4xl sm:text-5xl font-serif font-bold">
                    30+
                  </div>

                  <div className="mt-2 text-xs text-white/55 uppercase tracking-wider">
                    Happy Clients
                  </div>

                </div>


                <div className="py-7 sm:py-0 sm:px-8 text-center">

                  <TrendingUp className="w-6 h-6 mx-auto text-[#0b4f9c]" />

                  <div className="mt-4 text-4xl sm:text-5xl font-serif font-bold">
                    100%
                  </div>

                  <div className="mt-2 text-xs text-white/55 uppercase tracking-wider">
                    Client Satisfaction
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="gold-balls pb-24 lg:pb-32">
<GoldBalls />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0b4f9c] via-[#0b4f9c] to-[#1a63b5] text-white shadow-2xl">

            <div className="absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full bg-white/10 blur-[100px]" />

            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#12202f]/20 blur-[100px]" />

            <div className="relative px-7 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

              <div className="max-w-2xl">

                <span className="text-xs uppercase tracking-[0.3em] font-Clarkson text-white/80">
                  Let's Build Something Meaningful
                </span>

                <h2 className="mt-5 text-4xl sm:text-5xl font-Clarkson font-bold leading-tight">
                  Let's build technology
                  that moves your business forward.
                </h2>

                <p className="mt-5 max-w-xl text-sm sm:text-base text-white/80 leading-7">
                  Have an idea, challenge, or digital transformation project
                  in mind? Connect with our team and start turning the idea
                  into something real.
                </p>

              </div>


              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">

                <Link to="/contact">

                  <Button
                    variant="primary"
                    size="lg"
                    className="!bg-white hover:!bg-[#e6eef8] !text-[#0b4f9c] border-none"
                  >
                    Start a Conversation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                </Link>

                <Link to="/signup">

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/50 text-white hover:bg-white/10"
                  >
                    Explore Platform
                  </Button>

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

        </div>

      

    
  );
};
