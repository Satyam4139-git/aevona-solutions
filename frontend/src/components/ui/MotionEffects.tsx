import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CURSOR_EVENT = 'aevona-cursor-state';
const CURSOR_STORAGE = 'aevona_cursor_enabled';

export const CursorToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(CURSOR_STORAGE);
      return saved === null ? window.matchMedia('(pointer: fine)').matches : saved === 'true';
    } catch {
      return false;
    }
  });

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(CURSOR_STORAGE, String(next));
    } catch {
      // The cursor remains usable when browser storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent(CURSOR_EVENT, { detail: next }));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      className="cursor-toggle"
      title="Toggle the Aevona motion cursor"
    >
      ◉ Cursor {enabled ? 'on' : 'off'}
    </button>
  );
};

const BALLS_STORAGE = 'aevona_balls_motion';

/* SVG (SMIL) animations are not controlled by CSS, so pause/resume them here. */
const syncSvgMotion = () => {
  const off = document.documentElement.classList.contains('aevona-motion-off');
  document.querySelectorAll('svg').forEach((svg) => { off ? svg.pauseAnimations() : svg.unpauseAnimations(); });
};

/* Switches the floating gold balls (rise + zigzag + scroll sway) on or off. */
export const MotionToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem(BALLS_STORAGE) !== 'false'; } catch { return true; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('aevona-motion-off', !enabled);
    syncSvgMotion();
  }, [enabled]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try { localStorage.setItem(BALLS_STORAGE, String(next)); } catch { /* storage unavailable: still works this visit */ }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      className="cursor-toggle"
      title="Turn the website movement (floating balls, scroll animations, hover effects) on or off"
    >
      ✦ Motion {enabled ? 'on' : 'off'}
    </button>
  );
};

export const MotionEffects: React.FC = () => {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(CURSOR_STORAGE);
    } catch {
      // Default to the desktop cursor preference when storage is blocked.
    }
    let cursorEnabled = finePointer && (saved === null || saved === 'true');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let followX = x;
    let followY = y;
    let previousScroll = window.scrollY;
    let scrollDirection: 'up' | 'down' = 'down';
    let frame = 0;
    const particles: Array<{ x: number; y: number; life: number }> = [];

    const canvas = document.createElement('canvas');
    canvas.className = 'aevona-particle-trail';
    canvas.setAttribute('aria-hidden', 'true');
    const cursor = document.createElement('div');
    cursor.className = 'aevona-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<i></i><span>EXPLORE</span>';
    const elevator = document.createElement('button');
    elevator.className = 'aevona-elevator';
    elevator.type = 'button';
    elevator.setAttribute('aria-label', 'Back to top');
    elevator.textContent = '↑';
    document.body.append(canvas, cursor, elevator);
    const context = canvas.getContext('2d');

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const setCursorState = (enabled: boolean) => {
      cursorEnabled = enabled && finePointer;
      document.documentElement.classList.toggle('aevona-custom-pointer', cursorEnabled);
      cursor.classList.toggle('is-visible', cursorEnabled);
      canvas.classList.toggle('is-visible', cursorEnabled);
    };
    const onCursorState = (event: Event) => setCursorState((event as CustomEvent<boolean>).detail);

    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      const card = event.target instanceof Element ? event.target.closest('main section .grid > *, main section .projects > *') : null;
      if (card instanceof HTMLElement) {
        const bounds = card.getBoundingClientRect();
        const localX = event.clientX - bounds.left;
        const localY = event.clientY - bounds.top;
        card.classList.add('aevona-spotlight');
        card.style.setProperty('--spot-x', `${localX}px`);
        card.style.setProperty('--spot-y', `${localY}px`);
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a,button,[role="button"]') : null;
      cursor.classList.toggle('is-active', Boolean(target));
      if (target) {
        const href = target instanceof HTMLAnchorElement ? target.getAttribute('href') || '' : '';
        const label = target.getAttribute('data-cursor') ||
          (href.includes('login') || href.includes('dashboard') ? 'PORTAL' :
            href.includes('github') ? 'GITHUB' :
              href.includes('contact') || href.startsWith('mailto:') ? "LET'S TALK" : 'EXPLORE');
        cursor.querySelector('span')!.textContent = label.toUpperCase();
      } else {
        cursor.querySelector('span')!.textContent = 'EXPLORE';
      }
    };

    const onScroll = () => {
      const nextScroll = window.scrollY;
      scrollDirection = nextScroll < previousScroll ? 'up' : 'down';
      previousScroll = nextScroll;
      elevator.textContent = '↑';
      elevator.title = 'Back to top';
      elevator.classList.toggle('is-visible', nextScroll > 450);
    };
    const onElevatorClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const onPointerOut = (event: PointerEvent) => {
      const from = event.target instanceof Element ? event.target.closest('main section .grid > *, main section .projects > *') : null;
      const to = event.relatedTarget instanceof Element ? event.relatedTarget.closest('main section .grid > *, main section .projects > *') : null;
      if (from instanceof HTMLElement && from !== to) {
        from.classList.remove('aevona-spotlight');
        from.style.removeProperty('--tilt-x');
        from.style.removeProperty('--tilt-y');
      }
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const item = entry.target as HTMLElement;
        item.dataset.scrollDirection = scrollDirection;
        if (entry.isIntersecting) {
          const siblings = Array.from(item.parentElement?.children ?? []).filter((child) =>
            (child as HTMLElement).classList.contains('aevona-reveal')
          );
          const index = siblings.indexOf(item);
          const order = Math.min(index, 4);
          const isWorkflowCard = item.classList.contains('workflow-zigzag-card');
          item.style.setProperty('--reveal-delay', `${Math.max(0, order) * (isWorkflowCard ? 120 : 90)}ms`);
          requestAnimationFrame(() => item.classList.add('is-visible'));
        }
      }
    }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });

    const revealSelector = 'main section, main section .grid > *, main > .space-y-8 > *, .workflow-zigzag-card';
    const collectRevealTargets = (root: ParentNode) => {
      if (root instanceof Element && root.matches(revealSelector) && !root.classList.contains('aevona-reveal')) {
        root.classList.add('aevona-reveal');
        const siblings = Array.from(root.parentElement?.children ?? []).filter((child) =>
          (child as HTMLElement).classList.contains('aevona-reveal')
        );
        observer.observe(root);
      }
      root.querySelectorAll(revealSelector).forEach((element) => {
        const item = element as HTMLElement;
        if (item.classList.contains('aevona-reveal')) return;
        item.classList.add('aevona-reveal');
        const siblings = Array.from(item.parentElement?.children ?? []).filter((child) =>
          (child as HTMLElement).classList.contains('aevona-reveal')
        );
        observer.observe(item);
      });
    };

    const mutationObserver = new MutationObserver((records) => {
      for (const record of records) record.addedNodes.forEach((node) => {
        if (node instanceof Element) collectRevealTargets(node);
      });
    });

    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (!context) return;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (!cursorEnabled) return;

      followX += (x - followX) * 0.14;
      followY += (y - followY) * 0.14;
            cursor.style.left = `${followX}px`;
      cursor.style.top = `${followY}px`;

      
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.life -= 0.023;
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        context.beginPath();
        context.arc(particle.x, particle.y, 2 * particle.life, 0, Math.PI * 2);
        context.fillStyle = `rgba(115, 240, 223, ${particle.life * 0.42})`;
        context.fill();
      }
    };

    resize();
    setCursorState(cursorEnabled);
    collectRevealTargets(document);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    elevator.addEventListener('click', onElevatorClick);
    window.addEventListener(CURSOR_EVENT, onCursorState);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('scroll', onScroll);
      elevator.removeEventListener('click', onElevatorClick);
      window.removeEventListener(CURSOR_EVENT, onCursorState);
      document.documentElement.classList.remove('aevona-custom-pointer');
      canvas.remove();
      cursor.remove();
      elevator.remove();
    };
  }, []);

  return null;
};


/* Scroll progress bar + count-up numbers (50+, 100%, ...). Does nothing when Motion is off. */
export const PageMotion: React.FC = () => {
  const { pathname } = useLocation();

  /* Boxes slide in from the left or right depending on where they sit on the page. */
  useEffect(() => {
    const BOX = /rounded-(2xl|3xl|\[1\.75rem\]|\[2rem\])/;
    const seen = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement; seen.unobserve(el);
        const idx = Array.from(el.parentElement?.children ?? []).indexOf(el);
        el.style.setProperty('--reveal-delay', `${Math.min(idx, 4) * 120}ms`);
        requestAnimationFrame(() => el.classList.add('is-visible'));
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    const prepare = () => {
      const vw = window.innerWidth;
      document.querySelectorAll<HTMLElement>('main section *').forEach((el) => {
        if (!el.classList.contains('aevona-reveal') && typeof el.className === 'string' && BOX.test(el.className) && /\bborder\b|border-\[/.test(el.className)
            && !el.closest('.aevona-reveal:not(section)') && getComputedStyle(el).position !== 'absolute') {
          el.classList.add('aevona-reveal');
          seen.observe(el);
        }
      });
      let n = 0;
      document.querySelectorAll<HTMLElement>('.aevona-reveal:not(section):not(.is-visible)').forEach((el) => {
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - vw / 2;
        let x = 0;
        if (vw >= 768) x = dx < -vw * 0.1 ? -110 : dx > vw * 0.1 ? 110 : 0;
        else x = n % 2 === 0 ? -70 : 70;
        el.style.setProperty('--reveal-x', `${x}px`);
        n += 1;
      });
    };
    const timers = [250, 900, 2200].map((ms) => window.setTimeout(prepare, ms));
    return () => { timers.forEach(clearTimeout); seen.disconnect(); };
  }, [pathname]);

  useEffect(() => {
    const bar = document.createElement('div');
    bar.className = 'it-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.append(bar);
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); bar.remove(); };
  }, []);

  useEffect(() => {
    const timers: number[] = [];
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        if (document.documentElement.classList.contains('aevona-motion-off')) continue;
        const m = (el.dataset.count || '').match(/^(\d{1,4})(\D*)$/);
        if (!m) continue;
        const target = Number(m[1]); const suffix = m[2]; const start = performance.now(); const dur = 1400;
        const tick = (now: number) => {
          const k = Math.min(1, (now - start) / dur);
          el.textContent = `${Math.round(target * (1 - Math.pow(1 - k, 3)))}${suffix}`;
          if (k < 1) timers.push(requestAnimationFrame(tick));
        };
        timers.push(requestAnimationFrame(tick));
      }
    }, { threshold: 0.6 });
    const t = window.setTimeout(() => {
      syncSvgMotion();
      document.querySelectorAll<HTMLElement>('main *').forEach((el) => {
        if (el.childElementCount === 0 && /^\d{1,4}[+%]?$/.test((el.textContent || '').trim()) && /font-(bold|serif)/.test(el.className)) {
          el.dataset.count = (el.textContent || '').trim();
          io.observe(el);
        }
      });
    }, 400);
    return () => { clearTimeout(t); io.disconnect(); timers.forEach(cancelAnimationFrame); };
  }, [pathname]);

  return null;
};
