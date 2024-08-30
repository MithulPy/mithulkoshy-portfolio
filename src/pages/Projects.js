// src/pages/Projects.js
import React from 'react';
import styled from 'styled-components';

const ProjectsContainer = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;

  @media (min-width: 768px) {
    padding: 6rem 8rem;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
`;

const ProjectTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Projects = () => (
  <ProjectsContainer>
    <Heading>Notable Projects</Heading>
    
    <ProjectTitle>Python-Based Automation Framework</ProjectTitle>
    <Description>
      Developed and maintained a Python-based automation framework using pyTest, significantly improving test efficiency and coverage for web, API, and mobile platforms.
    </Description>

    <ProjectTitle>C# Regression Test Automation Framework</ProjectTitle>
    <Description>
      Automated regression test cases using C# with Selenium on the MSTest framework, reducing manual testing time by 40%, ensuring the reliability of web applications through test automation.
    </Description>

    <ProjectTitle>Unreal Engine and Unity Game Projects</ProjectTitle>
    <Description>
      Developed multiple 2D and 3D games in Unity, Unreal Engine, and VR using C# scripts and blueprints. View these projects on my <a href="https://mithulgrad.itch.io/" target="_blank" rel="noopener noreferrer">itch.io page</a>.
    </Description>

    <ProjectTitle>Automated Car Parking System</ProjectTitle>
    <Description>
      Project conducted under the Smart Sensor Networks domain to determine the nearest available parking location using a mobile app for pre-booking, developed using Arduino, Java, and Android Studio.
    </Description>

    <ProjectTitle>Web Application Development</ProjectTitle>
    <Description>
      Developed a tournament website in Angular with MongoDB. The website includes registration and login pages with authentication, allowing users to view, add, edit tournaments, view brackets, and comment on a forum.
    </Description>

    <ProjectTitle>BlueSalt x Wimtach Hackathon – 1st Place Winner (2023)</ProjectTitle>
    <Description>
      Participated in a 2-day hackathon, developed UI/UX using Figma for an advertisement website.
    </Description>

    <ProjectTitle>Marion Surgical x Wimtach Hackathon - 3rd Place Winner (2023)</ProjectTitle>
    <Description>
      Participated in a 3-day hackathon, developed a Tower Defense game in VR using Unity and C#.
    </Description>
  </ProjectsContainer>
);

export default Projects;
