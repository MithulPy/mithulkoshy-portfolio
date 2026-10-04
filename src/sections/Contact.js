// src/sections/Contact.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiArrowRight, FiCheck, FiCopy, FiGithub, FiLinkedin } from 'react-icons/fi';
import { Button, Container, Eyebrow, Reveal, SerifTitle } from '../components/ui';
import { profile } from '../data/profile';

const Wrap = styled.section`
  padding: 5rem 0 6rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 768px) {
    padding: 7.5rem 0;
  }
`;

const Panel = styled.div`
  position: relative;
  overflow: hidden;
  padding: 3.5rem 1.5rem;
  border-radius: 28px;
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &::before {
    content: '';
    position: absolute;
    inset: auto -20% -60% -20%;
    height: 80%;
    background: radial-gradient(closest-side, ${({ theme }) => theme.colors.primarySoft}, transparent);
    pointer-events: none;
  }

  @media (min-width: 768px) {
    padding: 5.5rem 3rem;
  }
`;

const Title = styled(SerifTitle)`
  margin: 1rem auto 1.1rem;
  max-width: 680px;
  font-size: clamp(2.3rem, 5.4vw, 4rem);
`;

const Sub = styled.p`
  position: relative;
  max-width: 520px;
  margin: 0 auto 2.25rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.05rem;
`;

const Actions = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
`;

const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.2rem;
  border-radius: 12px;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover { border-color: ${({ theme }) => theme.colors.borderStrong}; }
`;

const Socials = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.muted};

  a:hover { color: ${({ theme }) => theme.colors.primaryInk}; }
`;

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Wrap id="contact">
      <Container>
        <Reveal>
          <Panel>
            <Eyebrow>06 · Contact</Eyebrow>
            <Title>
              <span data-perch="contact">
                Let’s build something <em>reliable</em>
              </span>
            </Title>
            <Sub>
              Open to SDET, QA automation and AI-for-testing roles. If you’re hiring or want to talk about agentic QA,
              I’d love to hear from you.
            </Sub>
            <Actions>
              <Button href={`mailto:${profile.email}`}>
                Say hello <FiArrowRight />
              </Button>
              <CopyButton type="button" onClick={copyEmail}>
                {copied ? <FiCheck /> : <FiCopy />}
                {copied ? 'Copied!' : profile.email}
              </CopyButton>
            </Actions>
            <Socials>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
            </Socials>
          </Panel>
        </Reveal>
      </Container>
    </Wrap>
  );
};

export default Contact;
