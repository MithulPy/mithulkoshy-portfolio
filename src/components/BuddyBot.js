// src/components/BuddyBot.js
// The drawing of Probe. Purely presentational: Buddy.js decides the expression and drives the animation controls.
import React, { useId } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const VIEW_W = 80;
export const VIEW_H = 76;

const RED = '#ff2a1f';
const EYE_Y = 39;

const breathe = keyframes`
  0%, 100% { transform: scale(1, 1); }
  50% { transform: scale(0.985, 1.035); }
`;
const trot = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2.5px); }
`;
const stepA = keyframes`
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(18deg); }
`;
const stepB = keyframes`
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-18deg); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`;
const spin = keyframes`
  to { transform: rotate(360deg); }
`;
const flicker = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

const Svg = styled.svg`
  display: block;
  overflow: visible;
  transition: transform 0.25s ease;

  .leg {
    stroke: var(--text);
    stroke-width: 3;
    stroke-linecap: round;
    transform-box: fill-box;
  }
  .leg.l { transform-origin: 100% 0; }
  .leg.r { transform-origin: 0 0; }
  .breathe {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    animation: ${breathe} 3.2s ease-in-out infinite;
  }
  .bulb { animation: ${pulse} 1.8s ease-in-out infinite; }
  .stroke-eye {
    fill: none;
    stroke: #fff;
    stroke-width: 2.2;
    stroke-linecap: round;
  }
  .mouth {
    fill: none;
    stroke: #fff;
    stroke-width: 1.6;
    stroke-linecap: round;
  }
  .dizzy {
    fill: none;
    stroke: #fff;
    stroke-width: 1.3;
    transform-box: fill-box;
    transform-origin: center;
    animation: ${spin} 0.8s linear infinite;
  }
  .laser { animation: ${flicker} 0.18s linear infinite; }

  ${({ $walking }) =>
    $walking &&
    css`
      .leg.a { animation: ${stepA} 0.22s linear infinite; }
      .leg.b { animation: ${stepB} 0.22s linear infinite; }
      .breathe { animation: ${trot} 0.22s ease-in-out infinite; }
    `}
`;

const starPath = (cx, cy, R, r) => {
  const pts = [];
  for (let i = 0; i < 10; i += 1) {
    const rad = i % 2 === 0 ? R : r;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(' L')} Z`;
};

const heartPath = (cx, cy) =>
  `M${cx} ${cy + 3.4} C${cx - 5.5} ${cy - 0.5} ${cx - 3.2} ${cy - 5.6} ${cx} ${cy - 2.4} C${cx + 3.2} ${cy - 5.6} ${cx + 5.5} ${cy - 0.5} ${cx} ${cy + 3.4} Z`;

const spiralPath = (cx, cy) =>
  `M${cx} ${cy} m-0.8 0 a0.8 0.8 0 1 1 1.6 0 a1.8 1.8 0 1 1 -3.6 0 a2.8 2.8 0 1 1 5.6 0 a3.6 3.6 0 1 1 -7.2 0`;

const Eye = ({ cx, expression, blink }) => {
  switch (expression) {
    case 'happy':
      return <path className="stroke-eye" d={`M${cx - 3.5} 41 Q${cx} 35 ${cx + 3.5} 41`} />;
    case 'sleepy':
      return <path className="stroke-eye" d={`M${cx - 3.5} 39.5 Q${cx} 42.5 ${cx + 3.5} 39.5`} />;
    case 'surprised':
      return (
        <g>
          <circle cx={cx} cy={EYE_Y} r="4.4" fill="#fff" />
          <circle cx={cx} cy={EYE_Y} r="1.7" fill="#0b0b0b" />
        </g>
      );
    case 'star':
      return <path d={starPath(cx, EYE_Y, 5, 2.2)} fill="#fff" />;
    case 'love':
      return <path d={heartPath(cx, EYE_Y)} fill={RED} />;
    case 'dizzy':
      return <path className="dizzy" d={spiralPath(cx, EYE_Y)} />;
    case 'focus':
      return <rect className="laser" x={cx - 4} y="37.4" width="8" height="3.4" rx="1.7" fill={RED} />;
    case 'think':
      return <rect x={cx - 2.4 + 1.5} y={33.5} width="4.8" height="8" rx="2.4" fill="#fff" />;
    default:
      return (
        <motion.rect
          x={cx - 2.6}
          y="34.5"
          width="5.2"
          height="9"
          rx="2.6"
          fill="#fff"
          animate={{ scaleY: blink ? 0.12 : 1 }}
          transition={{ duration: 0.07 }}
          style={{ originY: '50%' }}
        />
      );
  }
};

const Mouth = ({ expression }) => {
  switch (expression) {
    case 'happy':
    case 'love':
    case 'star':
      return <path d="M36.2 45.4 Q40 50.6 43.8 45.4 Z" fill="#fff" />;
    case 'surprised':
      return <ellipse cx="40" cy="47" rx="1.7" ry="2" fill="#fff" />;
    case 'sleepy':
      return <path className="mouth" d="M38.2 47 L41.8 47" />;
    case 'dizzy':
      return <path className="mouth" d="M35.5 47 q1.1 -1.4 2.2 0 t2.2 0 t2.2 0 t2.2 0" />;
    case 'focus':
      return <path className="mouth" d="M37 47 L43 47" style={{ stroke: RED }} />;
    case 'think':
      return <path className="mouth" d="M37.5 47.4 Q40 46 42.5 46.6" />;
    default:
      return <path className="mouth" d="M37 46.2 Q40 48.4 43 46.2" />;
  }
};

const BuddyBot = ({
  size,
  walking,
  facing,
  expression,
  blink,
  eyeX,
  eyeY,
  bodyControls,
  legControls,
  antennaControls,
  shadowControls,
}) => {
  const id = useId().replace(/:/g, '');
  const blush = ['happy', 'love', 'star'].includes(expression);

  return (
    <Svg
      $walking={walking}
      width={size}
      height={Math.round((size * VIEW_H) / VIEW_W)}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      fill="none"
      style={{ transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-body`} cx="38%" cy="28%" r="78%">
          <stop offset="0" stopColor="#ff6a5f" />
          <stop offset="0.5" stopColor="#e10600" />
          <stop offset="1" stopColor="#6e0000" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.ellipse
        cx="40"
        cy="73.5"
        rx="17"
        ry="2.6"
        fill="#000"
        initial={{ opacity: 0.28 }}
        animate={shadowControls}
        style={{ originX: '50%', originY: '50%' }}
      />

      <motion.g animate={bodyControls} style={{ originX: '50%', originY: '100%' }}>
        <path className="leg l a" d="M21 52 L12 69" />
        <path className="leg l b" d="M27 57 L20 72" />
        <path className="leg l a" d="M34 60 L31 74" />
        <path className="leg r a" d="M46 60 L49 74" />
        <path className="leg r b" d="M53 57 L60 72" />
        <motion.path className="leg r b" d="M59 52 L68 69" animate={legControls} style={{ originX: 0, originY: 0 }} />

        <g className="breathe">
          <motion.g animate={antennaControls} style={{ originX: 0, originY: 1 }}>
            <path d="M40 25 C40 18 43 13 46.5 10" stroke="var(--text)" strokeWidth="2.2" strokeLinecap="round" />
            <circle className="bulb" cx="47" cy="8.5" r="3.8" fill={RED} filter={`url(#${id}-glow)`} />
          </motion.g>

          <ellipse cx="40" cy="42" rx="26" ry="19" fill={`url(#${id}-body)`} />
          <ellipse cx="30" cy="29.5" rx="10" ry="3.6" fill="#fff" opacity="0.3" transform="rotate(-14 30 29.5)" />
          {blush && (
            <g fill="#fff" opacity="0.35">
              <ellipse cx="17" cy="45" rx="3.2" ry="1.8" />
              <ellipse cx="63" cy="45" rx="3.2" ry="1.8" />
            </g>
          )}

          <rect x="20" y="29" width="40" height="22" rx="11" fill="#0b0b0b" stroke="rgba(255, 80, 70, 0.55)" />
          <motion.g style={{ x: eyeX, y: eyeY }}>
            <Eye cx={32} expression={expression} blink={blink} />
            <Eye cx={48} expression={expression} blink={blink} />
            <Mouth expression={expression} />
          </motion.g>
        </g>
      </motion.g>
    </Svg>
  );
};

// Simplified, single-colour version for icon buttons.
export const BuddyGlyph = (props) => (
  <svg viewBox="0 0 80 76" fill="none" aria-hidden="true" {...props}>
    <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
      <path d="M21 52 12 69M27 57l-7 15M59 52l9 17M53 57l7 15M40 25c0-7 3-12 6.5-15" />
    </g>
    <ellipse cx="40" cy="42" rx="26" ry="19" fill="currentColor" />
    <rect x="20" y="29" width="40" height="22" rx="11" fill="var(--bg)" />
    <rect x="29.4" y="34.5" width="5.2" height="9" rx="2.6" fill="currentColor" />
    <rect x="45.4" y="34.5" width="5.2" height="9" rx="2.6" fill="currentColor" />
  </svg>
);

export default BuddyBot;
