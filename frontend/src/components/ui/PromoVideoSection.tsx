import React from 'react';
import { Play } from 'lucide-react';

/** Brand promo video block for the home page. Files live in /public/videos. */
export const PromoVideoSection: React.FC = () => (
  <section className="py-20 lg:py-24 bg-[#f3f6f9]">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0b4f9c]/40 bg-white text-xs font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">
          <Play className="w-3.5 h-3.5" /> Aevona in motion
        </span>
        <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-[#12202f]">
          See how we turn ideas into digital reality
        </h2>
      </div>

      <div className="relative mt-10 promo-frame">
        <div className="absolute -inset-3 rounded-2xl border border-[#0b4f9c]/30 promo-ring" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-xl border-2 border-[#0b4f9c]/60 bg-white shadow-[0_20px_60px_-20px_rgba(11,79,156,.45)]">
          <video
            className="block w-full aspect-video bg-[#12202f]"
            src="/videos/aevona-promo.mp4"
            poster="/videos/aevona-promo-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </section>
);
