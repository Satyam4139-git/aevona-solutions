import React, { useEffect, useRef } from 'react';

/* Scroll-driven zigzag: one shared listener writes sin/cos of the scroll position only to the
   ball layers that are currently on screen, so scrolling stays smooth. */
const visibleLayers = new Set<HTMLElement>();
let listeners = 0;
let ticking = false;
const update = () => {
  ticking = false;
  const t = window.scrollY / 90;
  const a = Math.sin(t).toFixed(3);
  const b = Math.cos(t * 0.8).toFixed(3);
  visibleLayers.forEach((el) => { el.style.setProperty('--zz-a', a); el.style.setProperty('--zz-b', b); });
};
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

const BALLS = [
  { left: 4, size: 6, dur: 18, delay: -3, amp: 16 },
  { left: 11, size: 4, dur: 22, delay: -12, amp: 22 },
  { left: 18, size: 8, dur: 26, delay: -7, amp: 14 },
  { left: 27, size: 5, dur: 20, delay: -16, amp: 24 },
  { left: 35, size: 4, dur: 17, delay: -1, amp: 18 },
  { left: 44, size: 7, dur: 24, delay: -10, amp: 20 },
  { left: 52, size: 5, dur: 19, delay: -5, amp: 26 },
  { left: 60, size: 4, dur: 23, delay: -18, amp: 15 },
  { left: 68, size: 8, dur: 27, delay: -9, amp: 18 },
  { left: 76, size: 5, dur: 21, delay: -14, amp: 22 },
  { left: 84, size: 6, dur: 18, delay: -4, amp: 16 },
  { left: 91, size: 4, dur: 25, delay: -20, amp: 24 },
  { left: 96, size: 7, dur: 22, delay: -8, amp: 14 },
];

const ALL = BALLS.filter((_, i) => i % 2 === 0).map((b) => ({ ...b, dur: Math.round(b.dur * 2.3) }));

export const GoldBalls: React.FC = () => {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Pause balls in sections that are not on screen, to keep the page smooth.
    const el = layer.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      el.classList.toggle('is-paused', !e.isIntersecting);
      if (e.isIntersecting) { visibleLayers.add(el); update(); } else { visibleLayers.delete(el); }
    }, { rootMargin: '100px' });
    io.observe(el.parentElement ?? el);
    return () => { io.disconnect(); visibleLayers.delete(el); };
  }, []);
  useEffect(() => {
    if (listeners++ === 0) { window.addEventListener('scroll', onScroll, { passive: true }); update(); }
    return () => { if (--listeners === 0) window.removeEventListener('scroll', onScroll); };
  }, []);
  return (
  <div ref={layer} className="gold-ball-layer" aria-hidden="true">
    {ALL.map((b, i) => (
      <span
        key={i}
        className={`gold-ball ${i % 2 ? 'zz-b' : 'zz-a'}`}
        style={{
          ['--top' as string]: `${(i * 23 + 9) % 86}%`,
          ['--sway' as string]: `${(i % 3 === 0 ? -1 : 1) * (28 + (i % 4) * 8)}px`,
          left: `${b.left}%`,
          width: b.size * 1.3 + 3,
          height: b.size * 1.3 + 3,
          animationDuration: `${b.dur}s`,
          animationDelay: `${b.delay}s`,
        }}
      >
        <i style={{ ['--amp' as string]: `${b.amp}px`, animationDuration: `${7 + (i % 4) * 2}s` }} />
      </span>
    ))}
  </div>
  );
};
