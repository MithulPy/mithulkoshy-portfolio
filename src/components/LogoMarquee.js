// src/components/LogoMarquee.js
// Endless strip of tool logos between the hero and the first section. Pauses on hover.
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { techMeta } from './TechIcon';

const TOOLS = [
  'Playwright',
  'TypeScript',
  'Selenium',
  'WebdriverIO',
  'Cypress',
  'Claude',
  'Copilot',
  'Codex',
  'Java',
  'Python',
  'C#',
  'Cucumber',
  'pytest',
  'Appium',
  'Postman',
  'GraphQL',
  'Jenkins',
  'Azure DevOps',
  'Git',
  'JIRA',
  'AWS',
  'Azure',
  'GCP',
  'MongoDB',
];

const scroll = keyframes`
  to { transform: translateX(-50%); }
`;

const Wrap = styled.section`
  position: relative;
  padding: 1.6rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
`;

const Label = styled.p`
  margin-bottom: 1rem;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subtle};
`;

const Rail = styled.ul`
  display: flex;
  width: max-content;
  margin: 0;
  padding: 0;
  list-style: none;
  animation: ${scroll} 55s linear infinite;

  ${Wrap}:hover & {
    animation-play-state: paused;
  }
`;

const Item = styled.li`
  --brand: var(--accent);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0 1.6rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.subtle};
  white-space: nowrap;
  transition: color 0.2s ease;

  svg {
    font-size: 1.45rem;
    filter: grayscale(1);
    opacity: 0.75;
    transition: filter 0.25s ease, opacity 0.25s ease, transform 0.25s ease;
    color: var(--brand);
  }

  &:hover { color: ${({ theme }) => theme.colors.text}; }
  &:hover svg {
    filter: grayscale(0) drop-shadow(0 0 8px color-mix(in srgb, var(--brand) 60%, transparent));
    opacity: 1;
    transform: scale(1.15);
  }
`;

const LogoMarquee = () => (
  <Wrap aria-label="Tools I work with">
    <Label>Tools I work with every day</Label>
    <Rail>
      {/* The list is rendered twice so the loop is seamless */}
      {[0, 1].map((copy) =>
        TOOLS.map((name) => {
          const { Icon, color } = techMeta(name);
          return (
            <Item key={`${copy}-${name}`} style={{ '--brand': color }} aria-hidden={copy === 1}>
              <Icon aria-hidden="true" />
              {name}
            </Item>
          );
        })
      )}
    </Rail>
  </Wrap>
);

export default LogoMarquee;
