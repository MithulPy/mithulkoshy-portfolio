// src/pages/About.js
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.section`
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

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const About = () => (
  <AboutContainer>
    <Heading>About Me</Heading>
    <Paragraph>
      I hold a Bachelor of Technology in Computer Science and Engineering from SRM Institute of Science and Technology, India, and an Advanced Diploma in Software Engineering Technology - Game Programming from Centennial College, Toronto, ON.
    </Paragraph>
    <Paragraph>
      With 3.5 years of experience in software development, quality assurance, and test automation, I have developed a strong background in Agile methodologies, CI/CD pipelines, and the software development lifecycle (SDLC). I am skilled in programming languages including Python, Java, C#, JavaScript, C++, and Kotlin. My web development skills span across React, Angular, AngularJS, HTML, CSS, and TypeScript, and I am proficient with cloud platforms like AWS, Microsoft Azure, and Google Cloud Platform.
    </Paragraph>
    <Paragraph>
      I am passionate about leveraging technology to solve complex problems and create efficient solutions. I have hands-on experience in using various tools and frameworks like Git, Postman, Selenium, JIRA, Jenkins, and more to streamline development processes and improve product quality.
    </Paragraph>
  </AboutContainer>
);

export default About;
