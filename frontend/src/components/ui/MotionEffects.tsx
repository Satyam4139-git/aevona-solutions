import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* The custom cursor, particle trail, spotlight and elevator button were removed for the corporate theme.
   These exports are kept so the rest of the app compiles unchanged. */
export const CursorToggle: React.FC = () => null;
export const MotionToggle: React.FC = () => null;
export const MotionEffects: React.FC = () => null;

/* Gentle fade-up reveal for page sections as they scroll into view. */
export const PageMotion: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { (e.target as HTMLElement).classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    const timer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('main section').forEach((el, i) => {
        if (i === 0) return; // keep the hero visible immediately
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) return;
        el.classList.add('reveal');
        io.observe(el);
      });
    }, 50);
    return () => { window.clearTimeout(timer); io.disconnect(); };
  }, [pathname]);

  return null;
};
