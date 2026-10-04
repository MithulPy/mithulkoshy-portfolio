// src/sections/Hero.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiCpu, FiGitBranch, FiLayers, FiMapPin, FiZap } from 'react-icons/fi';
import { Button, Container } from '../components/ui';
import { focus, profile } from '../data/profile';
import portrait from '../assets/mithul.webp';

const FOCUS_ICONS = { agents: FiCpu, gen: FiZap, pw: FiLayers, ci: FiGitBranch };

const Wrap = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 8.5rem 0 4.5rem;

  @media (min-width: 980px) {
    padding: 10rem 0 6rem;
  }
`;

const flow = keyframes`
  to { stroke-dashoffset: -1200; }
`;

// Glowing red light trails, echoing the backdrop of the portrait.
const Swirl = styled.svg`
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .trail {
    fill: none;
    stroke: var(--accent);
    stroke-linecap: round;
    filter: drop-shadow(0 0 6px var(--accent)) drop-shadow(0 0 18px var(--accent));
  }
  .soft {
    fill: none;
    stroke: var(--accent);
    opacity: 0.12;
  }
  .runner {
    stroke-dasharray: 160 1040;
    animation: ${flow} 9s linear infinite;
  }
  .runner.slow { animation-duration: 14s; }

  :root:not([data-theme='dark']) & .trail { opacity: 0.55; }
`;

const HeroSwirl = () => (
  <Swirl viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="hero-glow" cx="78%" cy="40%" r="45%">
        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1440" height="900" fill="url(#hero-glow)" />
    <path className="soft" strokeWidth="60" d="M-100 820 C 300 760, 700 640, 980 420 S 1380 60, 1560 -40" />
    <path className="trail" strokeWidth="1.6" opacity="0.7" d="M-100 820 C 300 760, 700 640, 980 420 S 1380 60, 1560 -40" />
    <path className="trail" strokeWidth="1" opacity="0.45" d="M-100 900 C 360 820, 760 700, 1040 500 S 1420 160, 1580 60" />
    <path className="trail runner" strokeWidth="2.4" d="M-100 820 C 300 760, 700 640, 980 420 S 1380 60, 1560 -40" />
    <path className="trail runner slow" strokeWidth="1.6" d="M-100 900 C 360 820, 760 700, 1040 500 S 1420 160, 1580 60" />
  </Swirl>
);

const Grid = styled(Container)`
  display: grid;
  gap: 3.5rem;
  align-items: center;

  @media (min-width: 980px) {
    grid-template-columns: 1.35fr 1fr;
    gap: 4.5rem;
  }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 42, 31, 0.6); }
  100% { box-shadow: 0 0 0 9px rgba(255, 42, 31, 0); }
`;

const Status = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.85rem 0.4rem 0.7rem;
  margin-bottom: 1.75rem;
  border-radius: 999px;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};

  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    animation: ${pulse} 1.8s ease-out infinite;
  }
`;

const Headline = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 400;
  font-size: clamp(2.6rem, 5.4vw, 4.4rem);
  line-height: 1.02;
  letter-spacing: -0.03em;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Name = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1.1rem;
`;

const Tagline = styled(motion.p)`
  margin-top: 1.6rem;
  max-width: 540px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Actions = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2.25rem;
`;

const Meta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.subtle};
`;

const PhotoWrap = styled(motion.div)`
  position: relative;
  justify-self: center;
  width: min(100%, 400px);
`;

const Photo = styled.figure`
  margin: 0;
  aspect-ratio: 4 / 5;
  border-radius: 28px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 52% 40%;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 18px -18px -18px 18px;
  z-index: -1;
  border-radius: 28px;
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px dashed ${({ theme }) => theme.colors.primaryLine};
`;

const Sticker = styled(motion.div)`
  position: absolute;
  left: -1.25rem;
  bottom: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 0.95rem;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow};
  font-size: 0.8rem;
  line-height: 1.35;

  strong { display: block; font-weight: 600; }
  span { color: ${({ theme }) => theme.colors.muted}; }

  .badge {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primaryInk};
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    left: 0.75rem;
  }
`;

const FocusRow = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  margin-top: 4.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FocusCard = styled(motion.div)`
  padding: 1.4rem 1.3rem;
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: border-color 0.2s ease;

  &:hover { border-color: ${({ theme }) => theme.colors.primaryLine}; }

  svg {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.primaryInk};
    margin-bottom: 0.9rem;
  }
  h3 {
    font-size: 0.98rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  p {
    font-size: 0.87rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  /* Rounded outer corners for the strip */
  @media (min-width: 1000px) {
    &:first-child { border-radius: 16px 0 0 16px; }
    &:last-child { border-radius: 0 16px 16px 0; }
  }
  @media (max-width: 639px) {
    &:first-child { border-radius: 16px 16px 0 0; }
    &:last-child { border-radius: 0 0 16px 16px; }
  }
  @media (min-width: 640px) and (max-width: 999px) {
    &:nth-child(1) { border-radius: 16px 0 0 0; }
    &:nth-child(2) { border-radius: 0 16px 0 0; }
    &:nth-child(3) { border-radius: 0 0 0 16px; }
    &:nth-child(4) { border-radius: 0 0 16px 0; }
  }
`;

const Hero = () => {
  const reduce = useReducedMotion();
  const anim = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <Wrap id="top">
      <HeroSwirl />
      <Grid>
        <div>
          <Status {...anim(0)}>
            <i /> {profile.status}
          </Status>
          <Headline {...anim(0.08)}>
            <Name>{profile.shortName} · {profile.title}</Name>
            <span data-perch="hero">
              I build <em>agentic</em> QA workflows and tests teams trust.
            </span>
          </Headline>
          <Tagline {...anim(0.16)}>{profile.tagline}</Tagline>
          <Actions {...anim(0.24)}>
            <Button href="#work">
              See my work <FiArrowRight />
            </Button>
            <Button href="#contact" $variant="ghost">
              Get in touch
            </Button>
            <Meta>
              <FiMapPin /> {profile.location}
            </Meta>
          </Actions>
        </div>

        <PhotoWrap {...anim(0.2)}>
          <Backdrop />
          {/* Second "hero" perch: on wide screens Probe sits on the photo; on phones it stays on the headline */}
          <Photo data-perch="hero" data-perch-mode="block">
            <img src={portrait} alt="Portrait of Mithul Koshy" width="400" height="500" />
          </Photo>
          <Sticker {...anim(0.5)}>
            <span className="badge"><FiCpu /></span>
            <div>
              <strong>5+ years</strong>
              <span>in quality engineering</span>
            </div>
          </Sticker>
        </PhotoWrap>
      </Grid>

      <FocusRow>
        {focus.map(({ key, title, text }, i) => {
          const Icon = FOCUS_ICONS[key];
          return (
            <FocusCard key={key} {...anim(0.3 + i * 0.06)}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </FocusCard>
          );
        })}
      </FocusRow>
    </Wrap>
  );
};

export default Hero;
