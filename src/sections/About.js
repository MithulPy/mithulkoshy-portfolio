// src/sections/About.js
import React from 'react';
import styled from 'styled-components';
import { Reveal, Section } from '../components/ui';
import { about, awards } from '../data/profile';

const Body = styled.div`
  display: grid;
  gap: 2.75rem;

  /* Align with the title column of the section header */
  @media (min-width: 900px) {
    padding-left: calc(200px + 0.9rem);
  }

  @media (min-width: 1040px) {
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
  }
`;

const Text = styled.div`
  display: grid;
  gap: 1.2rem;
  font-size: 1.08rem;
  color: ${({ theme }) => theme.colors.muted};

  p:first-child {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Quote = styled.figure`
  margin: 0;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  align-self: start;

  blockquote {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: 1.35rem;
    line-height: 1.4;
    letter-spacing: -0.01em;
  }
  blockquote::before {
    content: '“';
    display: block;
    height: 2.4rem;
    font-size: 4rem;
    line-height: 1;
    color: ${({ theme }) => theme.colors.primary};
  }
  figcaption {
    margin-top: 1.25rem;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.muted};
  }
  figcaption strong { color: ${({ theme }) => theme.colors.text}; font-weight: 600; }
`;

const About = () => {
  const shining = awards[0];
  return (
    <Section id="about" eyebrow="01 · About" title={<>Quality engineering, <em>accelerated</em> by AI</>}>
      <Body>
        <Reveal>
          <Text>
            {about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Text>
        </Reveal>
        <Reveal delay={0.1}>
          <Quote>
            <blockquote>
              His innovative problem-solving achieved our automation roadmap and supported proof of concepts for other
              business lines.
            </blockquote>
            <figcaption>
              <strong>{shining.name}</strong>, {shining.org}
            </figcaption>
          </Quote>
        </Reveal>
      </Body>
    </Section>
  );
};

export default About;
