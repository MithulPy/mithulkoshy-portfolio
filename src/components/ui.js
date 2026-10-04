// src/components/ui.js
// Shared layout primitives used across sections.
import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { techMeta } from './TechIcon';

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 1.25rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const SectionWrap = styled.section`
  position: relative;
  overflow: hidden;
  padding: 5rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 768px) {
    padding: 7.5rem 0;
  }
`;

const Head = styled.div`
  position: relative;
  display: grid;
  gap: 0.9rem;
  margin-bottom: 3.25rem;

  @media (min-width: 900px) {
    grid-template-columns: 200px 1fr;
    align-items: baseline;
  }
`;

export const Eyebrow = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.primaryInk};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const SerifTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 400;
  font-size: clamp(2.1rem, 4.6vw, 3.4rem);
  letter-spacing: -0.02em;
  line-height: 1.08;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Oversized outlined section number sitting behind the heading.
const Numeral = styled(motion.span)`
  position: absolute;
  right: -0.5rem;
  top: -3.5rem;
  z-index: -1;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-style: italic;
  font-size: clamp(8rem, 18vw, 15rem);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) => theme.colors.primaryLine};
  pointer-events: none;
  user-select: none;
`;

// `perch` marks the title as a spot where Probe (the page buddy) can sit.
export const Section = ({ id, eyebrow, title, perch, children }) => (
  <SectionWrap id={id}>
    <Container style={{ position: 'relative', isolation: 'isolate' }}>
      <Reveal>
        <Head>
          <Numeral
            aria-hidden="true"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow.split(' ')[0]}
          </Numeral>
          <Eyebrow>{eyebrow}</Eyebrow>
          <SerifTitle>
            <span data-perch={perch || id}>{title}</span>
          </SerifTitle>
        </Head>
      </Reveal>
      {children}
    </Container>
  </SectionWrap>
);

export const Reveal = ({ children, delay = 0, as = 'div', ...rest }) => {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export const Card = styled.div`
  position: relative;
  height: 100%;
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 1.6rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  padding: 0.28rem 0.6rem;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`;

// A tag with the tool's logo in its brand colour.
export const TechTag = ({ name }) => {
  const { Icon, color } = techMeta(name);
  return (
    <Tag>
      <Icon aria-hidden="true" style={{ color, fontSize: '0.85rem' }} />
      {name}
    </Tag>
  );
};

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.4rem;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  svg { transition: transform 0.2s ease; }
  &:hover svg { transform: translateX(3px); }

  ${({ $variant, theme }) =>
    $variant === 'ghost'
      ? `
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.borderStrong};
    &:hover { background: ${theme.colors.surface}; }
  `
      : `
    color: ${theme.colors.buttonFg};
    background: ${theme.colors.buttonBg};
    box-shadow: ${theme.glow};
    &:hover { transform: translateY(-1px); filter: brightness(1.08); }
  `}
`;
