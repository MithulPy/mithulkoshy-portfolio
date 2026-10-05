// src/components/Buddy.js
// Probe: a small QA agent that lives on the page. It crawls to the heading you're reading,
// reacts to the section it's in, follows the cursor with its eyes, naps when you go idle,
// gets dizzy when you speed-scroll and shares QA / agent facts in a chat bubble.
// Perch points are any elements marked with data-perch="<id>" (data-perch-mode="block" to sit on a box).
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { FiX } from 'react-icons/fi';
import BuddyBot, { BuddyGlyph, VIEW_H, VIEW_W } from './BuddyBot';
import { buddyFacts, buddyHype, buddyInfo, buddyLines, buddyReactions } from '../data/profile';

export { BuddyGlyph };

const RATIO = VIEW_H / VIEW_W;
const TALK_COOLDOWN_MS = 9000;
const IDLE_TALK_MS = 14000; // chats roughly this often while you hang around
const SLEEP_AFTER_MS = 90000;
const WANDER_AFTER_IDLE_MS = 3000; // only strolls off once you've left it alone for a bit
const IDLE_KINDS = ['section', 'hype', 'fact'];

const rand = (min, max) => min + Math.random() * (max - min);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const clamp = (v, min, max) => Math.max(min, Math.min(v, max));
// Perch ids look like "skills", "exp-2" or, while strolling, "wander:skills:3".
const basePerch = (perchId) => (perchId && perchId.startsWith('wander:') ? perchId.split(':')[1] : perchId);
const sectionOf = (perchId) => {
  const base = basePerch(perchId);
  return base && base.startsWith('exp-') ? 'experience' : base;
};
// Long enough to read comfortably (~4 words/second), but never lingering.
const readingTime = (text) => clamp(1800 + text.split(/\s+/).length * 260, 5000, 9000);

// What Probe does when it arrives in a section, and what it gets up to while idling there.
const SECTION_MOODS = {
  hero: { enter: 'wave', idle: ['wave', 'hop', 'look', 'stretch'] },
  about: { enter: 'think', idle: ['think', 'look', 'stretch'] },
  experience: { enter: 'scan', idle: ['scan', 'look', 'think'] },
  skills: { enter: 'sparkle', idle: ['sparkle', 'scan', 'hop'] },
  work: { enter: 'excited', idle: ['excited', 'sparkle', 'spin'] },
  recognition: { enter: 'celebrate', idle: ['celebrate', 'sparkle', 'dance'] },
  contact: { enter: 'dance', idle: ['dance', 'love', 'wave'] },
};

const PARTICLES = {
  z: { glyph: 'z', color: 'var(--muted)', dx: [8, 22], dy: [-46, -30] },
  heart: { glyph: '♥', color: '#ff2a1f', dx: [-20, 20], dy: [-52, -30] },
  spark: { glyph: '✦', color: '#ff2a1f', dx: [-30, 30], dy: [-44, -10] },
  bang: { glyph: '!', color: '#ff2a1f', dx: [14, 18], dy: [-34, -28] },
  question: { glyph: '?', color: 'var(--text)', dx: [14, 18], dy: [-34, -28] },
  note: { glyph: '♪', color: 'var(--text)', dx: [-24, 24], dy: [-46, -26] },
  confetti: { glyph: '', color: '', dx: [-50, 50], dy: [-64, -18] },
};
const CONFETTI_COLORS = ['#ff2a1f', '#ffffff', '#0a0a0a', '#e10600'];

const Mover = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 90;
  pointer-events: none;

  @media print {
    display: none;
  }
`;

const Tilt = styled(motion.div)`
  position: relative;
`;

const Body = styled(motion.button)`
  position: relative;
  z-index: 1;
  pointer-events: auto;
  display: block;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  filter: drop-shadow(0 6px 10px rgba(225, 6, 0, 0.25));
`;

const ScanBeam = styled(motion.div)`
  position: absolute;
  left: 50%;
  width: 150px;
  height: 170px;
  margin-left: -75px;
  transform-origin: 50% 0;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  background: linear-gradient(to bottom, rgba(255, 42, 31, 0.5), rgba(255, 42, 31, 0.08) 70%, transparent);
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30%;
    height: 2px;
    background: rgba(255, 42, 31, 0.9);
    box-shadow: 0 0 10px 2px rgba(255, 42, 31, 0.8);
  }
`;

const Particle = styled(motion.span)`
  position: absolute;
  left: 50%;
  top: 15%;
  z-index: 2;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 700;
  line-height: 1;
  pointer-events: none;
  user-select: none;
`;

const Bubble = styled(motion.div)`
  position: absolute;
  z-index: 3;
  ${({ $below }) => ($below ? 'top: calc(100% + 10px);' : 'bottom: calc(100% + 10px);')}
  pointer-events: auto;
  padding: 0.7rem 0.9rem 0.8rem;
  border-radius: 14px;
  font-size: 0.85rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.primaryLine};
  box-shadow: ${({ theme }) => theme.shadow}, 0 0 24px -10px rgba(255, 42, 31, 0.6);

  .who {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.primaryInk};
  }
  .who button {
    display: grid;
    place-items: center;
    padding: 2px;
    border: 0;
    background: none;
    color: ${({ theme }) => theme.colors.subtle};
    cursor: pointer;
  }
  .who button:hover { color: ${({ theme }) => theme.colors.text}; }
`;

const Dots = styled.span`
  display: inline-flex;
  gap: 4px;
  padding: 0.35rem 0;

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const TypingDots = () => (
  <Dots aria-label="Probe is typing">
    {[0, 1, 2].map((i) => (
      <motion.i
        key={i}
        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
      />
    ))}
  </Dots>
);

const useBuddySize = () => {
  const get = () => (window.innerWidth < 640 ? 50 : 68);
  const [size, setSize] = useState(get);
  useEffect(() => {
    const onResize = () => setSize(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
};

const Buddy = () => {
  const reduce = useReducedMotion();
  const size = useBuddySize();
  const height = Math.round(size * RATIO);

  const [spot, setSpot] = useState(null);
  const [walking, setWalking] = useState(false);
  const [facing, setFacing] = useState(1);
  const [expression, setExpression] = useState('normal');
  const [blink, setBlink] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [particles, setParticles] = useState([]);
  const [msg, setMsg] = useState(null);

  const body = useAnimationControls();
  const leg = useAnimationControls();
  const antenna = useAnimationControls();
  const shadow = useAnimationControls();

  const eyeXRaw = useMotionValue(0);
  const eyeYRaw = useMotionValue(0);
  const eyeX = useSpring(eyeXRaw, { stiffness: 260, damping: 22 });
  const eyeY = useSpring(eyeYRaw, { stiffness: 260, damping: 22 });

  const mounted = useRef(false);
  const timers = useRef(new Set());
  const spotRef = useRef(null);
  const facingRef = useRef(1);
  const walkingRef = useRef(false);
  const busy = useRef(false);
  const hovering = useRef(false);
  const sleeping = useRef(false);
  const section = useRef(null);
  const arrivedAt = useRef(null);
  const seenSections = useRef(new Set());
  const lineIdx = useRef({});
  const factIdx = useRef(Math.floor(Math.random() * buddyFacts.length));
  const lastTalk = useRef(0);
  const lastActivity = useRef(Date.now());
  const dizzyPending = useRef(false);
  const lastDizzy = useRef(0);
  const hoverTimer = useRef();
  const particleId = useRef(0);
  const idleTurn = useRef(0);
  const hypeIdx = useRef(Math.floor(Math.random() * buddyHype.length));
  const clicksInSection = useRef(0);
  const wanderCount = useRef(0);

  // setTimeout that is cleared automatically when Probe unmounts.
  const later = useCallback((fn, ms) => {
    const t = setTimeout(() => {
      timers.current.delete(t);
      if (mounted.current) fn();
    }, ms);
    timers.current.add(t);
    return t;
  }, []);
  const wait = useCallback((ms) => new Promise((resolve) => later(resolve, ms)), [later]);
  const play = useCallback((controls, def) => (mounted.current ? controls.start(def) : Promise.resolve()), []);

  useEffect(() => {
    mounted.current = true;
    const pending = timers.current;
    return () => {
      mounted.current = false;
      pending.forEach(clearTimeout);
      pending.clear();
      clearTimeout(hoverTimer.current);
    };
  }, []);

  const restore = useCallback(() => {
    setExpression(sleeping.current ? 'sleepy' : hovering.current ? 'happy' : 'normal');
  }, []);

  const emit = useCallback(
    (kind, count = 1) => {
      if (reduce) return;
      const cfg = PARTICLES[kind];
      const batch = Array.from({ length: count }, () => {
        particleId.current += 1;
        return {
          id: particleId.current,
          kind,
          dx: rand(...cfg.dx),
          dy: rand(...cfg.dy),
          rotate: rand(-40, 40),
          scale: rand(0.8, 1.3),
          color: kind === 'confetti' ? pick(CONFETTI_COLORS) : cfg.color,
          delay: rand(0, 0.25),
        };
      });
      setParticles((p) => [...p, ...batch]);
      later(() => setParticles((p) => p.filter((x) => !batch.includes(x))), 2000);
    },
    [reduce, later]
  );

  // ---- Talking ---------------------------------------------------------------------------
  const say = useCallback(
    (text, { force = false } = {}) => {
      if (!text || (!force && Date.now() - lastTalk.current < TALK_COOLDOWN_MS)) return;
      lastTalk.current = Date.now();
      const key = lastTalk.current;
      const typingMs = reduce ? 0 : 650;
      setMsg({ key, text, typing: typingMs > 0 });
      later(() => setMsg((m) => (m && m.key === key ? { ...m, typing: false } : m)), typingMs);
      later(() => setMsg((m) => (m && m.key === key ? null : m)), typingMs + readingTime(text));
    },
    [reduce, later]
  );

  const nextFact = useCallback(() => {
    const fact = buddyFacts[factIdx.current % buddyFacts.length];
    factIdx.current += 1;
    return fact;
  }, []);

  // Rotate between a remark about the current section, some hype about Mithul, and a QA / agents fact.
  const nextIdleLine = useCallback(
    (sec) => {
      const kind = IDLE_KINDS[idleTurn.current % IDLE_KINDS.length];
      idleTurn.current += 1;
      if (kind === 'hype') {
        hypeIdx.current += 1;
        return buddyHype[hypeIdx.current % buddyHype.length];
      }
      const lines = buddyLines[sec] || [];
      if (kind === 'section' && lines.length > 1) {
        const i = lineIdx.current[sec] ?? 1; // line 0 is the arrival intro
        lineIdx.current[sec] = i + 1 >= lines.length ? 1 : i + 1;
        return lines[i];
      }
      return nextFact();
    },
    [nextFact]
  );

  // ---- Actions ---------------------------------------------------------------------------
  const hopOnce = useCallback(async () => {
    play(shadow, { scaleX: [1, 0.55, 1], opacity: [0.28, 0.1, 0.28], transition: { duration: 0.6 } });
    await play(body, {
      y: [0, -18, 0, -4, 0],
      scaleY: [1, 1.06, 0.86, 1.03, 1],
      scaleX: [1, 0.96, 1.1, 0.99, 1],
      transition: { duration: 0.6, times: [0, 0.35, 0.62, 0.82, 1] },
    });
  }, [play, body, shadow]);

  const actions = {
    wave: async () => {
      setExpression('happy');
      await play(leg, { rotate: [0, -118, -88, -118, -88, 0], transition: { duration: 1.3, ease: 'easeInOut' } });
    },
    hop: async () => {
      setExpression('happy');
      await hopOnce();
    },
    look: async () => {
      setExpression('surprised');
      play(antenna, { rotate: [0, -18, 14, -8, 0], transition: { duration: 0.9 } });
      eyeXRaw.set(-3);
      await wait(550);
      eyeXRaw.set(3);
      await wait(550);
      eyeXRaw.set(0);
    },
    think: async () => {
      setExpression('think');
      emit('question');
      await play(antenna, { rotate: [0, -10, 10, -6, 0], transition: { duration: 1.4 } });
      await wait(700);
    },
    scan: async () => {
      setExpression('focus');
      setScanning(true);
      await wait(2600);
      setScanning(false);
    },
    sparkle: async () => {
      setExpression('star');
      emit('spark', 6);
      await play(body, { rotate: [0, -7, 7, 0], transition: { duration: 0.7 } });
      await wait(500);
    },
    excited: async () => {
      setExpression('star');
      emit('bang');
      await hopOnce();
      await hopOnce();
    },
    spin: async () => {
      setExpression('happy');
      await play(body, { rotate: [0, 360], transition: { duration: 0.8, ease: 'easeInOut' } });
      body.set({ rotate: 0 });
    },
    celebrate: async () => {
      setExpression('star');
      emit('confetti', 16);
      await hopOnce();
      emit('spark', 4);
      await wait(600);
    },
    dance: async () => {
      setExpression('happy');
      emit('note', 3);
      await play(body, {
        rotate: [0, -12, 12, -12, 12, 0],
        y: [0, -5, 0, -5, 0, 0],
        transition: { duration: 1.6, ease: 'easeInOut' },
      });
    },
    love: async () => {
      setExpression('love');
      emit('heart', 5);
      await play(body, { scale: [1, 1.12, 1, 1.12, 1], transition: { duration: 1 } });
      await wait(400);
    },
    stretch: async () => {
      setExpression('sleepy');
      await play(body, { scaleY: [1, 1.18, 0.9, 1], scaleX: [1, 0.9, 1.06, 1], transition: { duration: 1.2 } });
    },
    dizzy: async () => {
      setExpression('dizzy');
      await play(body, { rotate: [0, -10, 10, -8, 8, 0], transition: { duration: 1.6 } });
      await wait(700);
    },
    wake: async () => {
      setExpression('surprised');
      emit('bang');
      await hopOnce();
      await wait(400);
    },
  };
  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  const run = useCallback(
    async (name) => {
      if (busy.current || !mounted.current) return;
      busy.current = true;
      try {
        if (reduce) {
          // Keep the personality (faces) but skip the movement.
          setExpression(name === 'scan' ? 'focus' : name === 'love' ? 'love' : 'happy');
          await wait(1200);
        } else {
          await actionsRef.current[name]?.();
        }
      } finally {
        busy.current = false;
        if (mounted.current) restore();
      }
    },
    [reduce, wait, restore]
  );

  const land = useCallback(() => {
    if (reduce) return;
    play(body, { scaleY: [0.8, 1.08, 1], scaleX: [1.14, 0.96, 1], transition: { duration: 0.4 } });
    play(antenna, { rotate: [0, -24, 16, -10, 5, 0], transition: { duration: 0.9 } });
  }, [reduce, play, body, antenna]);

  // ---- Where to stand --------------------------------------------------------------------
  const measure = useCallback(() => {
    const perches = document.querySelectorAll('[data-perch]');
    if (!perches.length) return;

    const readingLine = window.innerHeight * 0.55;
    let chosen = perches[0];
    perches.forEach((el) => {
      if (el.getBoundingClientRect().top < readingLine) chosen = el;
    });

    const vw = document.documentElement.clientWidth;
    let x;
    let y;
    if (chosen.dataset.perchMode === 'block') {
      const r = chosen.getBoundingClientRect();
      x = r.right - size - 28;
      y = r.top - height + 3;
    } else {
      // Stand on the baseline just past the end of the text; if there's no room, climb on top of it.
      const rects = chosen.getClientRects();
      const r = rects[rects.length - 1] || chosen.getBoundingClientRect();
      if (r.right + 10 + size < vw - 8) {
        x = r.right + 10;
        y = r.bottom - height - r.height * 0.14;
      } else {
        x = r.right - size;
        y = r.top - height + 4;
      }
    }
    x = clamp(x, 8, vw - size - 8) + window.scrollX;
    y += window.scrollY;

    const id = chosen.dataset.perch;
    const prev = spotRef.current;
    if (prev && prev.id === id && Math.abs(prev.x - x) < 2 && Math.abs(prev.y - y) < 2) return;

    const moved = !prev || prev.id !== id;
    const dist = prev ? Math.hypot(x - prev.x, y - prev.y) : 0;
    const duration = !prev || reduce ? 0 : moved ? clamp(0.6 + dist / 800, 0.6, 2) : 0.3;

    if (prev && Math.abs(x - prev.x) > 4) {
      facingRef.current = x < prev.x ? -1 : 1;
      setFacing(facingRef.current);
    }
    if (moved && duration > 0) {
      walkingRef.current = true;
      setWalking(true);
      setMsg(null); // the old section's chatter doesn't follow Probe around
      setExpression('normal');
      eyeXRaw.set(2.5); // look where we're going
    }

    const next = { id, x, y, duration };
    spotRef.current = next;
    setSpot(next);
  }, [size, height, reduce, eyeXRaw]);

  // Stroll to the top edge of a heading or card that's currently on screen.
  const wander = useCallback(() => {
    const current = spotRef.current;
    if (!current || reduce) return false;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const ledges = [];
    document.querySelectorAll('h2, h3, article, figure, blockquote, [data-perch]').forEach((el) => {
      if (el.closest('[data-buddy]')) return;
      const r = el.getBoundingClientRect();
      if (r.width > size * 1.5 && r.top > 110 && r.top < vh - 60) ledges.push(r);
    });
    if (!ledges.length) return false;

    const r = pick(ledges);
    const x = clamp(rand(r.left, r.right - size), 8, vw - size - 8) + window.scrollX;
    const y = r.top - height + 3 + window.scrollY;
    const dist = Math.hypot(x - current.x, y - current.y);
    if (dist < 60) return false;

    wanderCount.current += 1;
    facingRef.current = x < current.x ? -1 : 1;
    setFacing(facingRef.current);
    walkingRef.current = true;
    setWalking(true);
    setExpression('normal');
    eyeXRaw.set(2.5);
    const next = {
      id: `wander:${basePerch(current.id)}:${wanderCount.current}`,
      x,
      y,
      duration: clamp(0.8 + dist / 450, 0.9, 3), // a leisurely stroll
    };
    spotRef.current = next;
    setSpot(next);
    return true;
  }, [size, height, reduce, eyeXRaw]);

  const handleArrive = () => {
    if (walkingRef.current) {
      walkingRef.current = false;
      setWalking(false);
      eyeXRaw.set(0);
    }
    const current = spotRef.current;
    if (!current || arrivedAt.current === current.id) return;
    arrivedAt.current = current.id;
    land();

    if (dizzyPending.current) {
      dizzyPending.current = false;
      later(() => run('dizzy'), 300);
      say(pick(buddyReactions.dizzy), { force: true });
      return;
    }

    // Finished a stroll: have a little look around.
    if (current.id.startsWith('wander:')) {
      if (Math.random() < 0.5) later(() => run('look'), 300);
      return;
    }

    const sec = sectionOf(current.id);
    if (sec === section.current) return;
    section.current = sec;
    clicksInSection.current = 0;
    const mood = SECTION_MOODS[sec] || SECTION_MOODS.hero;
    later(() => run(mood.enter), 350);

    if (!seenSections.current.has(sec)) {
      seenSections.current.add(sec);
      say(buddyLines[sec]?.[0], { force: true });
    } else {
      say(nextIdleLine(sec));
    }
  };

  // Re-measure when scrolling settles or layout changes.
  useEffect(() => {
    let t;
    const schedule = () => {
      clearTimeout(t);
      t = setTimeout(measure, 200);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    ro?.observe(document.body);
    // Show up right away, then settle once web fonts have changed the layout.
    const frame = requestAnimationFrame(measure);
    document.fonts?.ready.then(() => mounted.current && measure());
    const fallback = setTimeout(measure, 900);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      ro?.disconnect();
    };
  }, [measure]);

  // Eyes follow the cursor.
  useEffect(() => {
    const onMove = (e) => {
      const s = spotRef.current;
      if (!s || walkingRef.current || busy.current) return;
      const dx = e.clientX - (s.x - window.scrollX + size / 2);
      const dy = e.clientY - (s.y - window.scrollY + height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 220);
      eyeXRaw.set((dx / d) * 3 * k * facingRef.current);
      eyeYRaw.set((dy / d) * 2.2 * k);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [size, height, eyeXRaw, eyeYRaw]);

  // Random blinking (sometimes a double blink).
  useEffect(() => {
    let t;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 120);
        if (Math.random() < 0.25) {
          setTimeout(() => setBlink(true), 260);
          setTimeout(() => setBlink(false), 380);
        }
        loop();
      }, rand(2200, 5800));
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  // Idle life: every few seconds do something that fits the current section, and sometimes talk.
  useEffect(() => {
    let t;
    const loop = () => {
      t = setTimeout(() => {
        const free = !walkingRef.current && !busy.current && !hovering.current && !sleeping.current;
        if (free && spotRef.current && document.visibilityState === 'visible') {
          const sec = section.current || 'hero';
          const leftAlone = Date.now() - lastActivity.current > WANDER_AFTER_IDLE_MS;
          const strolled = leftAlone && Math.random() < 0.45 && wander();
          if (!strolled) run(pick((SECTION_MOODS[sec] || SECTION_MOODS.hero).idle));
          if (Date.now() - lastTalk.current > IDLE_TALK_MS) say(nextIdleLine(sec));
        }
        loop();
      }, rand(4500, 8000));
    };
    loop();
    return () => clearTimeout(t);
  }, [run, say, nextIdleLine, wander]);

  // Naps when nobody's around; wakes up on any activity. Speed-scrolling makes it dizzy.
  useEffect(() => {
    let wheelTotal = 0;
    let wheelStart = 0;

    const wake = () => {
      lastActivity.current = Date.now();
      if (!sleeping.current) return;
      sleeping.current = false;
      run('wake');
      say(pick(buddyReactions.wake), { force: true });
    };
    const onWheel = (e) => {
      wake();
      const now = Date.now();
      if (now - wheelStart > 450) {
        wheelStart = now;
        wheelTotal = 0;
      }
      wheelTotal += Math.abs(e.deltaY);
      if (wheelTotal > 2600 && now - lastDizzy.current > 30000) {
        lastDizzy.current = now;
        dizzyPending.current = true;
      }
    };

    const events = ['pointermove', 'keydown', 'touchstart', 'scroll'];
    events.forEach((ev) => window.addEventListener(ev, wake, { passive: true }));
    window.addEventListener('wheel', onWheel, { passive: true });

    const check = setInterval(() => {
      if (sleeping.current) {
        emit('z', 1);
        return;
      }
      const free = !busy.current && !walkingRef.current && !hovering.current;
      if (free && Date.now() - lastActivity.current > SLEEP_AFTER_MS) {
        sleeping.current = true;
        setExpression('sleepy');
        say(pick(buddyReactions.sleep));
      }
    }, 1400);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, wake));
      window.removeEventListener('wheel', onWheel);
      clearInterval(check);
    };
  }, [run, say, emit]);

  const onHoverStart = () => {
    hovering.current = true;
    if (!busy.current) setExpression('happy');
    clearTimeout(hoverTimer.current);
    // Hovering for a moment is a "tickle"; wait for any running action to finish first.
    const tickle = () => {
      if (!mounted.current || !hovering.current) return;
      if (busy.current) {
        hoverTimer.current = setTimeout(tickle, 300);
        return;
      }
      run('love');
      say(pick(buddyReactions.tickle), { force: true });
    };
    hoverTimer.current = setTimeout(tickle, 1200);
  };

  const onHoverEnd = () => {
    hovering.current = false;
    clearTimeout(hoverTimer.current);
    if (!busy.current) restore();
  };

  // Clicking gives info about the current section first, then the usual mix of hype and facts.
  const onClick = () => {
    const sec = section.current || 'hero';
    const info = buddyInfo[sec] || [];
    const n = clicksInSection.current;
    clicksInSection.current += 1;
    run(pick(['hop', 'spin', 'sparkle']));
    say(n < info.length ? info[n] : nextIdleLine(sec), { force: true });
  };

  if (!spot) return null;

  // Keep the bubble fully inside the viewport horizontally.
  const vw = document.documentElement.clientWidth;
  const viewportX = spot.x - window.scrollX;
  const alignRight = viewportX > vw / 2;
  const below = spot.y - window.scrollY < 170;
  const bubbleWidth = Math.min(270, vw - 32);
  const bubbleLeft = clamp(alignRight ? size + 4 - bubbleWidth : -4, 16 - viewportX, vw - 16 - bubbleWidth - viewportX);

  return (
    <Mover
      initial={{ x: spot.x, y: spot.y, opacity: 0, scale: 0.4 }}
      animate={{ x: spot.x, y: spot.y, opacity: 1, scale: 1 }}
      transition={{
        x: { duration: spot.duration, ease: 'easeInOut' },
        y: { duration: spot.duration, ease: 'easeInOut' },
        opacity: { duration: 0.4 },
        scale: { type: 'spring', stiffness: 320, damping: 14 },
      }}
      onAnimationComplete={handleArrive}
    >
      <AnimatePresence>
        {msg && (
          <Bubble
            key={msg.key}
            role="status"
            $below={below}
            style={{
              left: bubbleLeft,
              width: bubbleWidth,
              transformOrigin: `${alignRight ? 'right' : 'left'} ${below ? 'top' : 'bottom'}`,
            }}
            initial={{ opacity: 0, scale: 0.85, y: below ? -6 : 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.22 }}
          >
            <div className="who">
              <span>probe › {section.current || 'hello'}</span>
              <button type="button" aria-label="Dismiss message" onClick={() => setMsg(null)}>
                <FiX />
              </button>
            </div>
            {msg.typing ? <TypingDots /> : msg.text}
          </Bubble>
        )}
      </AnimatePresence>

      <Tilt animate={{ rotate: walking ? facing * 5 : 0 }} transition={{ duration: 0.3 }}>
        <AnimatePresence>
          {scanning && (
            <ScanBeam
              style={{ top: height * 0.55 }}
              initial={{ opacity: 0, scaleY: 0.2 }}
              animate={{ opacity: 1, scaleY: 1, rotate: [-28, 28, -28] }}
              exit={{ opacity: 0, scaleY: 0.2 }}
              transition={{ rotate: { duration: 1.3, repeat: Infinity, ease: 'easeInOut' }, default: { duration: 0.25 } }}
            />
          )}
        </AnimatePresence>

        {particles.map((p) => (
          <Particle
            key={p.id}
            style={{ color: p.color, fontSize: 12 + p.scale * 4 }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
            animate={{ opacity: [0, 1, 1, 0], x: p.dx, y: p.dy, scale: p.scale, rotate: p.rotate }}
            transition={{ duration: 1.6, delay: p.delay, ease: 'easeOut' }}
          >
            {p.kind === 'confetti' ? (
              <span style={{ display: 'block', width: 7, height: 4, borderRadius: 1, background: p.color }} />
            ) : (
              PARTICLES[p.kind].glyph
            )}
          </Particle>
        ))}

        <Body
          type="button"
          onClick={onClick}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
          whileTap={{ scale: 0.88 }}
          aria-label="Probe, a playful QA agent. Click for a testing fact."
          title="Click me!"
        >
          <BuddyBot
            size={size}
            walking={walking}
            facing={facing}
            expression={expression}
            blink={blink}
            eyeX={eyeX}
            eyeY={eyeY}
            bodyControls={body}
            legControls={leg}
            antennaControls={antenna}
            shadowControls={shadow}
          />
        </Body>
      </Tilt>
    </Mover>
  );
};

export default Buddy;
