// src/sections/Work.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FiArrowUpRight, FiCode, FiCpu, FiFileText, FiGitPullRequest, FiPlay } from 'react-icons/fi';
import { Reveal, Section, TagRow, TechTag } from '../components/ui';
import { projects } from '../data/profile';

const ICONS = {
  'Agentic AI': FiCpu,
  Framework: FiGitPullRequest,
  'Proof of Concept': FiFileText,
  Games: FiPlay,
};

const FLOW_SECONDS = 3.2;

const travel = keyframes`
  from { left: 0%; opacity: 1; }
  96% { opacity: 1; }
  to { left: 100%; opacity: 0; }
`;

// A node lights up as the pulse passes through it.
const ping = keyframes`
  0%, 10% {
    color: var(--text);
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft), 0 0 16px -2px var(--accent);
  }
  28%, 100% {
    color: var(--muted);
    border-color: var(--border-strong);
    box-shadow: none;
  }
`;

const Flow = styled.div`
  position: relative;
  margin-bottom: 1.6rem;
  padding: 1.15rem 0.85rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background:
    radial-gradient(var(--border-strong) 1px, transparent 1px) 0 0 / 14px 14px,
    ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

const Track = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;

  /* dashed wire between the nodes */
  &::before {
    content: '';
    position: absolute;
    left: 1.25rem;
    right: 1.25rem;
    top: 50%;
    height: 1px;
    background: linear-gradient(90deg, var(--accent-line) 55%, transparent 0) 0 0 / 8px 1px;
  }
`;

const PulseLane = styled.div`
  position: absolute;
  left: 1.25rem;
  right: 1.25rem;
  top: 50%;
  height: 0;

  span {
    position: absolute;
    top: 0;
    width: 8px;
    height: 8px;
    margin: -4px 0 0 -4px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px 3px var(--accent);
    animation: ${travel} ${FLOW_SECONDS}s linear infinite;
  }
`;

const Node = styled.span`
  position: relative;
  z-index: 1;
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.66rem;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  animation: ${ping} ${FLOW_SECONDS}s linear infinite;
`;

const FlowViz = ({ steps }) => (
  <Flow aria-label={`Flow: ${steps.join(' to ')}`}>
    <Track>
      <PulseLane aria-hidden="true">
        <span />
      </PulseLane>
      {steps.map((step, i) => (
        <Node key={step} style={{ animationDelay: `${(FLOW_SECONDS * i) / (steps.length - 1)}s` }}>
          {step}
        </Node>
      ))}
    </Track>
  </Flow>
);

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1040px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled.article`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ $featured, theme }) => ($featured ? theme.colors.primaryLine : theme.colors.border)};
  background: ${({ $featured, theme }) =>
    $featured
      ? `linear-gradient(180deg, ${theme.colors.primarySoft}, transparent 55%), ${theme.colors.elevated}`
      : theme.colors.elevated};
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.colors.primaryLine};
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;

  .icon {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 11px;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.primaryInk};
    background: ${({ theme }) => theme.colors.primarySoft};
  }
  .kind {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.subtle};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 400;
  font-size: 1.45rem;
  letter-spacing: -0.01em;
  margin-bottom: 0.6rem;
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.94rem;
  margin-bottom: 1.4rem;
  flex: 1;
`;

const LinkOut = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 1.1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryInk};

  &:hover { text-decoration: underline; }
`;

const Work = () => (
  <Section id="work" eyebrow="04 · Work" title={<>Selected <em>work</em></>}>
    <Grid>
      {projects.map((p, i) => {
        const Icon = ICONS[p.kind] || FiCode;
        return (
          <Reveal key={p.title} delay={(i % 3) * 0.06}>
            <ProjectCard $featured={p.featured}>
              <Top>
                <span className="icon"><Icon /></span>
                <span className="kind">{p.featured ? '★ Featured · ' : ''}{p.kind}</span>
              </Top>
              {p.flow && <FlowViz steps={p.flow} />}
              <Title>{p.title}</Title>
              <Desc>{p.description}</Desc>
              <TagRow>
                {p.tags.map((t) => (
                  <TechTag key={t} name={t} />
                ))}
              </TagRow>
              {p.link && (
                <LinkOut href={p.link.href} target="_blank" rel="noopener noreferrer">
                  View on {p.link.label} <FiArrowUpRight />
                </LinkOut>
              )}
            </ProjectCard>
          </Reveal>
        );
      })}
    </Grid>
  </Section>
);

export default Work;
