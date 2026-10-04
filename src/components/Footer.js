// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { Container } from './ui';
import { profile } from '../data/profile';

const Wrap = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.subtle};
  font-size: 0.875rem;
`;

const Row = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const Icons = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.1rem;

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Footer = () => (
  <Wrap>
    <Row>
      <p>© {new Date().getFullYear()} {profile.shortName}. Built with React &amp; Framer Motion.</p>
      <Icons>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
        <a href={`mailto:${profile.email}`} aria-label="Email"><FiMail /></a>
      </Icons>
    </Row>
  </Wrap>
);

export default Footer;
