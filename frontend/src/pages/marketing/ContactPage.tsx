import { GoldBalls } from '../../components/ui/GoldBalls';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  Clock3,
  Sparkles,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { api } from '../../lib/api';
import { PricingEstimator } from '../../components/ui/PricingEstimator';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      await api.contact.submit({
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        company: String(form.get('company') || ''),
        service: String(form.get('service') || ''),
        message: String(form.get('message') || ''),
        website: String(form.get('website') || ''),
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your message. Please email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff]  text-[#12202f]  overflow-hidden">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="gold-balls relative pt-16 sm:pt-20 lg:pt-24 pb-14">
<GoldBalls />

        {/* Ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[#0b4f9c]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute left-[7%] top-40 w-40 h-40 rounded-full bg-[#083b75]/5 blur-3xl" />

        <div className="absolute right-[7%] top-52 w-40 h-40 rounded-full bg-[#083b75]/5 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b4f9c]/10 border border-[#0b4f9c]/35">

            <Sparkles className="w-3.5 h-3.5 text-[#0b4f9c]" />

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.22em] text-[#4a5a6a] ">
              Let's Connect
            </span>

          </div>

          <h1 className="mt-7 font-Clarkson font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.055em] leading-[1.02]">

            <span className="text-[#12202f] ">
              Have an idea?
            </span>

            <br />

            <span className="text-[#4a5a6a] ">
              Let's build it.
            </span>

          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-sm sm:text-base leading-8 font-Clarkson text-[#4a5a6a]/75 ">
            Tell us what you're working on, what you're trying to solve,
            or where your current system is falling apart. We'll take it
            from there.
          </p>

          {/* Response indicators */}
          <div className="mt-9 flex flex-wrap justify-center gap-3">

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white  border border-[#0b4f9c]/25 shadow-sm">

              <Clock3 className="w-3.5 h-3.5 text-[#0b4f9c]" />

              <span className="text-[9px] font-Clarkson font-semibold text-[#4a5a6a] ">
                Response within 24 hours
              </span>

            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white  border border-[#0b4f9c]/25 shadow-sm">

              <ShieldCheck className="w-3.5 h-3.5 text-[#083b75]" />

              <span className="text-[9px] font-Clarkson font-semibold text-[#4a5a6a] ">
                Your information stays private
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTACT AREA
      ====================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
<GoldBalls />

        <div className="space-y-10">


          {/* =================================================
              CONTACT INFORMATION
          ================================================== */}

          <div className="relative overflow-hidden rounded-xl bg-[#12202f]  border border-[#0b4f9c]/30 p-7 sm:p-10 shadow-xl mb-10">

            {/* Side accent line */}
            <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-[#0b4f9c]" />

            {/* Decorative glow */}
            <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#0b4f9c]/10 blur-3xl" />

            <div className="relative h-full flex flex-col">

              <div>

                <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">
                  Contact Information
                </span>

                <h2 className="mt-4 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.04em] text-[#ffffff]">
                  Start a conversation.
                </h2>

                <p className="mt-4 text-xs leading-6 font-Clarkson text-[#ffffff]/55">
                  Whether you're planning a new product or improving an
                  existing system, we're ready to understand the problem
                  before proposing the solution.
                </p>

              </div>


              {/* Contact cards */}
              <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-3">


                {/* Location */}
                <div className="group p-4 rounded-2xl bg-[#ffffff]/5 border border-[#ffffff]/10 hover:bg-[#ffffff]/10 transition-colors">

                  <div className="flex items-start gap-4">

                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0b4f9c]/10 flex items-center justify-center">

                      <MapPin className="w-4 h-4 text-[#0b4f9c]" />

                    </div>

                    <div>

                      <div className="text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#ffffff]/40">
                        Headquarters
                      </div>

                      <div className="mt-1 text-xs font-Clarkson leading-5 text-[#ffffff]/75">
                        Studio 51
                        <br />
                        Birmingham B4 7AH
                      </div>

                    </div>

                  </div>

                </div>


                {/* Email */}
                <div className="group p-4 rounded-2xl bg-[#ffffff]/5 border border-[#ffffff]/10 hover:bg-[#ffffff]/10 transition-colors">

                  <div className="flex items-start gap-4">

                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0b4f9c]/10 flex items-center justify-center">

                      <Mail className="w-4 h-4 text-[#0b4f9c]" />

                    </div>

                    <div>

                      <div className="text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#ffffff]/40">
                        Email Us
                      </div>

                      <div className="mt-1 space-y-1 text-xs font-Clarkson text-[#ffffff]/75">
                        <div>info@aevonasolution.com</div>
                        <div>aevonasolution@gmail.com</div>
                      </div>

                    </div>

                  </div>

                </div>


                {/* Phone */}
                <div className="group p-4 rounded-2xl bg-[#ffffff]/5 border border-[#ffffff]/10 hover:bg-[#ffffff]/10 transition-colors">

                  <div className="flex items-start gap-4">

                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0b4f9c]/10 flex items-center justify-center">

                      <Phone className="w-4 h-4 text-[#0b4f9c]" />

                    </div>

                    <div>

                      <div className="text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#ffffff]/40">
                        Call Us
                      </div>

                      <div className="mt-1 space-y-1 text-xs font-Clarkson text-[#ffffff]/75">
                        <div>+44 7404 010483</div>
                        <div>+91 98756 43914</div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* Bottom note */}
              <div className="mt-auto pt-8">

                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-lg bg-[#083b75]/15 flex items-center justify-center">

                    <MessageCircle className="w-3.5 h-3.5 text-[#5f9bd6]" />

                  </div>

                  <div>

                    <div className="text-[9px] font-Clarkson font-semibold text-[#ffffff]/70">
                      Prefer a quick conversation?
                    </div>

                    <div className="mt-1 text-[8px] font-Clarkson text-[#ffffff]/40">
                      Email us directly and we'll get back to you.
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          <PricingEstimator />

          {/* =================================================
              FORM
          ================================================== */}

          <div className="bg-white  border border-[#0b4f9c]/30 rounded-xl p-7 sm:p-10 shadow-xl">

            {submitted ? (

              /* =============================================
                 SUCCESS STATE
              ============================================== */

              <div className="min-h-[560px] flex items-center justify-center">

                <div className="text-center max-w-md">

                  <div className="relative mx-auto w-20 h-20">

                    <div className="absolute inset-0 rounded-full bg-[#083b75]/10 animate-pulse" />

                    <div className="relative w-20 h-20 rounded-full bg-[#083b75]/15 border border-[#083b75]/30 flex items-center justify-center">

                      <CheckCircle2 className="w-9 h-9 text-[#2f6db5]" />

                    </div>

                  </div>

                  <h3 className="mt-7 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.04em] text-[#12202f] ">
                    Message received.
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm leading-7 font-Clarkson text-[#4a5a6a]/65 ">
                    Thanks for reaching out to Aevona Solution. Your
                    message has been received and our team will get back
                    to you within 24 hours.
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/20">

                    <CheckCircle2 className="w-3.5 h-3.5 text-[#083b75]" />

                    <span className="text-[9px] font-Clarkson font-semibold text-[#4a5a6a] ">
                      Successfully submitted
                    </span>

                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-7 flex items-center gap-2 mx-auto text-[10px] font-Clarkson font-semibold text-[#4a5a6a]  hover:gap-3 transition-all"
                  >
                    Send another message
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>

            ) : (

              /* =============================================
                 CONTACT FORM
              ============================================== */

              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                {submitError && <div role="alert" className="rounded-xl border border-rose-800 bg-rose-950/40 p-3 text-sm text-rose-200">{submitError}</div>}

                <div>

                  <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">
                    Send a Message
                  </span>

                  <h2 className="mt-3 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.04em] text-[#12202f] ">
                    Tell us what you're building.
                  </h2>

                  <p className="mt-3 text-xs leading-6 font-Clarkson text-[#4a5a6a]/55 ">
                    Give us a little context and we'll take it from there.
                  </p>

                </div>


                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#12202f] ">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Alex Morgan"
                      className="w-full h-12 px-4 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/25 text-xs font-Clarkson text-[#12202f]  placeholder:text-[#4a5a6a]/35  outline-none focus:border-[#0b4f9c] focus:ring-2 focus:ring-[#0b4f9c]/10 transition-all"
                    />

                  </div>


                  <div>

                    <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#12202f] ">
                      Work Email *
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@company.com"
                      className="w-full h-12 px-4 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/25 text-xs font-Clarkson text-[#12202f]  placeholder:text-[#4a5a6a]/35  outline-none focus:border-[#0b4f9c] focus:ring-2 focus:ring-[#0b4f9c]/10 transition-all"
                    />

                  </div>

                </div>


                {/* Company */}
                <div>

                  <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#12202f] ">
                    Company / Organization
                  </label>

                  <input
                    type="text"
                    name="company"
                    placeholder="Aevona Enterprises"
                    className="w-full h-12 px-4 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/25 text-xs font-Clarkson text-[#12202f]  placeholder:text-[#4a5a6a]/35  outline-none focus:border-[#0b4f9c] focus:ring-2 focus:ring-[#0b4f9c]/10 transition-all"
                  />

                </div>


                {/* Project Type */}
                <div>

                  <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#12202f] ">
                    What can we help with?
                  </label>

                  <select
                    name="service"
                    defaultValue=""
                    className="w-full h-12 px-4 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/25 text-xs font-Clarkson text-[#12202f]  outline-none focus:border-[#0b4f9c] focus:ring-2 focus:ring-[#0b4f9c]/10 transition-all"
                  >

                    <option value="" disabled>
                      Select a service
                    </option>

                    <option value="web">
                      Web & Application Development
                    </option>

                    <option value="data">
                      Data & Analytics
                    </option>

                    <option value="cloud">
                      Cloud Infrastructure
                    </option>

                    <option value="mobile">
                      Mobile App Development
                    </option>

                    <option value="automation">
                      Business Automation
                    </option>

                    <option value="design">
                      UI/UX & Product Design
                    </option>

                    <option value="other">
                      Something Else
                    </option>

                  </select>

                </div>


                {/* Message */}
                <div>

                  <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#12202f] ">
                    Message *
                  </label>

                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project, requirements, timeline, or the problem you're trying to solve..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#ffffff]  border border-[#0b4f9c]/25 text-xs leading-6 font-Clarkson text-[#12202f]  placeholder:text-[#4a5a6a]/35  outline-none resize-none focus:border-[#0b4f9c] focus:ring-2 focus:ring-[#0b4f9c]/10 transition-all"
                  />

                </div>


                {/* Submit */}
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  fullWidth
                  disabled={loading}
                  icon={<Send className="w-4 h-4" />}
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                </Button>


                {/* Privacy note */}
                <div className="flex items-center justify-center gap-2">

                  <ShieldCheck className="w-3 h-3 text-[#083b75]" />

                  <span className="text-[8px] font-Clarkson text-[#4a5a6a]/40 ">
                    Your information is only used to respond to your enquiry.
                  </span>

                </div>

              </form>

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section className="gold-balls max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
<GoldBalls />

        <div className="relative overflow-hidden rounded-xl bg-white  border border-[#0b4f9c]/30 px-7 py-10 sm:px-12">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="text-center md:text-left">

              <div className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">
                Prefer email?
              </div>

              <div className="mt-2 text-lg sm:text-xl font-Clarkson font-bold text-[#12202f] ">
                info@aevonasolution.com
              </div>

            </div>

            <a
              href="mailto:info@aevonasolution.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#4a5a6a] text-white   text-[10px] font-Clarkson font-bold hover:-translate-y-0.5 transition-all"
            >
              Email Aevona
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

      </section>

    </div>
  );
};
