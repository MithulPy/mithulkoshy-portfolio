// src/sections/Experience.js
import React from 'react';
import styled from 'styled-components';
import { Reveal, Section, TagRow, TechTag } from '../components/ui';
import { experience } from '../data/profile';

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled(Reveal)`
  display: grid;
  gap: 0.6rem;
  padding: 2rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child { border-top: 0; padding-top: 0; }

  @media (min-width: 900px) {
    grid-template-columns: 200px 1fr;
    gap: 0.9rem;
  }
`;

const Period = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.subtle};
  padding-top: 0.35rem;

  .now {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.4rem;
    padding: 0.15rem 0.5rem;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.primaryInk};
    background: ${({ theme }) => theme.colors.primarySoft};
  }
  .now::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  @media (max-width: 899px) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0;
    .now { margin-top: 0; }
  }
`;

const Role = styled.h3`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 400;
  font-size: clamp(1.4rem, 2.6vw, 1.75rem);
  letter-spacing: -0.015em;
`;

const Company = styled.p`
  margin: 0.35rem 0 1.1rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.muted};

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primaryInk};
  }
`;

const Points = styled.ul`
  margin: 0 0 1.25rem;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.55rem;
  max-width: 760px;

  li {
    position: relative;
    padding-left: 1.2rem;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.97rem;
  }
  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 7px;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const Experience = () => (
  <Section id="experience" eyebrow="02 · Experience" title={<>Where I’ve <em>worked</em></>}>
    <List>
      {experience.map((job, i) => (
        <Item forwardedAs="li" key={`${job.company}-${job.period}`} delay={Math.min(i * 0.04, 0.16)}>
          <Period>
            <div>{job.period}</div>
            {job.current && <span className="now">Current</span>}
          </Period>
          <div>
            <Role>
              {/* The first role sits right under the section title, which is already a perch */}
              <span data-perch={i === 0 ? undefined : `exp-${i}`}>{job.role}</span>
            </Role>
            <Company>
              <strong>{job.company}</strong> · {job.location}
            </Company>
            <Points>
              {job.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </Points>
            <TagRow>
              {job.tags.map((t) => (
                <TechTag key={t} name={t} />
              ))}
            </TagRow>
          </div>
        </Item>
      ))}
    </List>
  </Section>
);

export default Experience;
