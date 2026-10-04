// src/sections/Skills.js
import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, Reveal, Section } from '../components/ui';
import { techMeta } from '../components/TechIcon';
import { skills } from '../data/profile';

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Bento: widen the first and last groups so the rows fill evenly */
  @media (min-width: 1040px) {
    grid-template-columns: repeat(3, 1fr);

    > :first-child,
    > :last-child { grid-column: span 2; }
  }
`;

const Group = styled(Card)`
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -20%;
    width: 60%;
    height: 80%;
    background: radial-gradient(closest-side, ${({ theme }) => theme.colors.primarySoft}, transparent);
    pointer-events: none;
  }

  h3 {
    position: relative;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-family: ${({ theme }) => theme.fonts.serif};
    font-weight: 400;
    font-size: 1.35rem;
    margin-bottom: 1.25rem;
  }
  h3 small {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.subtle};
  }
`;

const Tiles = styled(motion.ul)`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
`;

const Tile = styled(motion.li)`
  --brand: var(--accent);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 92px;
  padding: 0.85rem 0.5rem 0.7rem;
  border-radius: 14px;
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  cursor: default;

  svg {
    font-size: 1.65rem;
    color: var(--brand);
    filter: saturate(0.85);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.25s ease;
  }
  span {
    font-size: 0.74rem;
    line-height: 1.25;
    color: ${({ theme }) => theme.colors.muted};
    transition: color 0.2s ease;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--brand) 55%, transparent);
    background: color-mix(in srgb, var(--brand) 9%, var(--surface));
    box-shadow: 0 10px 28px -12px color-mix(in srgb, var(--brand) 70%, transparent);
  }
  &:hover svg {
    transform: scale(1.18) rotate(-6deg);
    filter: saturate(1.2) drop-shadow(0 0 8px color-mix(in srgb, var(--brand) 60%, transparent));
  }
  &:hover span { color: ${({ theme }) => theme.colors.text}; }
`;

const tilesVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};
const tileVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const Skills = () => {
  const reduce = useReducedMotion();
  return (
    <Section id="skills" eyebrow="03 · Toolkit" title={<>Skills &amp; <em>technologies</em></>}>
      <Grid>
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 0.06}>
            <Group>
              <h3>
                {s.group}
                <small>{String(s.items.length).padStart(2, '0')}</small>
              </h3>
              <Tiles
                variants={tilesVariants}
                initial={reduce ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
              >
                {s.items.map((item) => {
                  const { Icon, color } = techMeta(item);
                  return (
                    <Tile key={item} variants={tileVariants} style={{ '--brand': color }}>
                      <Icon aria-hidden="true" />
                      <span>{item}</span>
                    </Tile>
                  );
                })}
              </Tiles>
            </Group>
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
};

export default Skills;
