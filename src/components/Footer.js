// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Footer = () => (
  <FooterContainer>
    <p>&copy; {new Date().getFullYear()} Mithul Koshy. All Rights Reserved.</p>
  </FooterContainer>
);

export default Footer;
