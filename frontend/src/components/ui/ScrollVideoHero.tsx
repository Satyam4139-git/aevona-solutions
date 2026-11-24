import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Full-screen brand video at the top of the home page (same scroll behaviour as tcs.com).
 *
 * The video fills the screen under the sticky header and stays PINNED in place.
 * As the visitor scrolls, the website content slides up over it with a flat edge
 * while the video drifts up slowly (parallax), like the reference.
 *
 * Files live in /public/videos.
 */
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

export const ScrollVideoHero: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    const hint = hintRef.current;
    const layer = layerRef.current;
    if (!wrap || !sticky || !hint || !layer) return;

    let raf = 0;

    const render = () => {
      raf = 0;
      const header = document.querySelector('header');
      const hdr = header ? header.getBoundingClientRect().height : 112;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Full screen under the header. On narrow / portrait screens keep the 16:9 frame
      // so the text inside the video is never cropped.
      const avail = Math.max(240, vh - hdr);
      const frame = (vw * 9) / 16;
      const H = vw / avail < 1.3 ? Math.min(avail, frame) : avail;

      sticky.style.height = `${H}px`;

      // The wrapper is taller than the video so it can stay pinned; a negative bottom
      // margin pulls the website content up so it slides over the video.
      wrap.style.height = `${H * 2}px`;
      wrap.style.marginBottom = `${-H}px`;
      sticky.style.top = `${hdr}px`;

      const top = wrap.getBoundingClientRect().top;
      const p = clamp((hdr - top) / H);

      // TCS-style layered scroll:
      //  1. the hero stays pinned under the header,
      //  2. the artwork does NOT move or zoom: it is only revealed/covered,
      //  3. the white content sheet rises over it at full speed with a flat edge,
      //  4. the cue rides just above the rising sheet edge, then disappears under it.
      layer.style.transform = 'none';
      hint.style.transform = `translate3d(0, ${(-p * H).toFixed(2)}px, 0)`;
      hint.style.opacity = `${clamp((0.9 - p) / 0.2)}`;
      hint.style.visibility = p > 0.95 ? 'hidden' : 'visible';
    };

    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    // Keep the video playing (some browsers block autoplay until the tab is active),
    // and rest it once the website fully covers it to save battery.
    const video = videoRef.current;
    let io: IntersectionObserver | undefined;
    if (video) {
      const start = () => { void video.play().catch(() => undefined); };
      start();
      document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) start(); else video.pause();
        }, { threshold: 0 });
        io.observe(sticky);
      }
    }

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) window.cancelAnimationFrame(raf);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative z-0 bg-white" style={{ height: '200svh' }}>
      <div ref={stickyRef} className="sticky z-0 w-full overflow-hidden bg-white" style={{ top: 112, height: '80svh' }}>
        <div ref={layerRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          className="absolute inset-0 block h-full w-full object-cover"
          src="/videos/aevona-intro.mp4"
          poster="/videos/aevona-intro-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          aria-label="Aevona Solution introduction video"
        />
        </div>

        {/* Sits on the bottom edge of the visible hero and rides up with the white sheet (like TCS "Learn more") */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 px-5 pb-6 sm:px-10 will-change-transform"
        >
          <Link
            to="/services"
            className="pointer-events-auto ml-auto inline-flex items-center gap-2 rounded-full bg-[#0b4f9c] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#083b75]"
          >
            Explore our services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
