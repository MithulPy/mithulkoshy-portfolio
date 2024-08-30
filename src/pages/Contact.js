// src/pages/Contact.js
import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const ContactContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  height: auto; /* Adjust height to fit content */
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
  text-align: center;

  @media (min-width: 768px) {
    padding: 6rem 8rem;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  a {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
    margin: 1rem 0;
    text-decoration: none;
    display: flex;
    align-items: center;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }

    svg {
      margin-right: 0.5rem;
      font-size: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;

    a {
      margin: 0 1rem;
    }
  }
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 500px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input, textarea {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    width: 100%;
    padding: 0.8rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const Contact = () => (
  <ContactContainer>
    <Heading>Contact Me</Heading>
    <SubHeading>I'm open to opportunities and collaborations. Feel free to reach out!</SubHeading>
    
    <ContactLinks>
      <a href="mailto:mithulofficial@gmail.com">
        <FaEnvelope />
        mithulofficial@gmail.com
      </a>
      <a href="https://www.linkedin.com/in/mithulkoshy/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
        LinkedIn
      </a>
    </ContactLinks>

    <ContactForm>
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </ContactForm>
  </ContactContainer>
);

export default Contact;
