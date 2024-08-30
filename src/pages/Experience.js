// src/pages/Experience.js
import React from 'react';
import styled from 'styled-components';

const ExperienceContainer = styled.section`
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

const JobTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Company = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const Duration = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Experience = () => (
  <ExperienceContainer>
    <Heading>Experience</Heading>
    
    <JobTitle>Developer (Co-op)</JobTitle>
    <Company>WIMTACH, Scarborough, ON</Company>
    <Duration>May 2023 – Sept 2023</Duration>
    <Description>
      Designed and enhanced VR gameplay experiences using Unreal Engine 5 in C#. Conducted regular testing, automation, deployment, and debugging with comprehensive documentation for game mechanics, design, and UI/UX frontend development, reducing bug reports by 30%.
    </Description>

    <JobTitle>QA Automation Specialist (Co-op)</JobTitle>
    <Company>Teranet Inc., Mississauga, ON</Company>
    <Duration>Sept 2022 - Dec 2022</Duration>
    <Description>
      Automated regression test cases in C# with Selenium on the MSTest framework for web automation, reducing manual testing time by 40%. Focused on QA methodologies, creating test plans, and performing testing to ensure application functionality meets business requirements.
    </Description>

    <JobTitle>Software Developer (Test Automation)</JobTitle>
    <Company>UST, Kerala, India</Company>
    <Duration>May 2019 - Dec 2021</Duration>
    <Description>
      Developed a Python-based automation framework in pyTest, created Java and Python test automation scripts for web, API, and mobile platforms, significantly improving test efficiency and coverage. Engineered and maintained a Java test automation suite using TestNG for continuous integration.
    </Description>
    
    <JobTitle>IT Intern</JobTitle>
    <Company>Qatargas, Doha, Qatar</Company>
    <Duration>June 2017 - July 2017</Duration>
    <Description>
      Performed troubleshooting, password reset/recovery, encryption, updating software/anti-virus, port access for external storage devices, network connectivity, enabling certificates, redirecting workflows.
    </Description>
  </ExperienceContainer>
);

export default Experience;
