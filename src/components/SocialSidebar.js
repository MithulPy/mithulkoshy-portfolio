// src/components/SocialSidebar.js
import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const SidebarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;

  @media (max-width: 768px) {
    left: 1rem;
  }
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  margin: 0.5rem 0;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Line = styled.div`
  width: 1px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.text};
  margin-top: 1rem;
`;

const SocialSidebar = () => {
  return (
    <SidebarContainer>
      <IconLink href="https://github.com/MithulPy" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </IconLink>
      <IconLink href="https://www.linkedin.com/in/mithulkoshy/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </IconLink>
      <Line />
    </SidebarContainer>
  );
};

export default SocialSidebar;
