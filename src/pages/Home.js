// src/pages/Home.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SocialSidebar from '../components/SocialSidebar';

const HomeContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 4rem 2rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
  position: relative;
  overflow: hidden; /* Ensure shapes don't overflow */

  @media (min-width: 768px) {
    padding: 6rem 8rem;
  }
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle at top left, rgba(255, 223, 0, 0.3), transparent),
              linear-gradient(135deg, rgba(255, 223, 0, 0.1), rgba(255, 223, 0, 0));
  border-radius: 50%;
  z-index: 0;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const BackgroundShape2 = styled(motion.div)`
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle at bottom right, rgba(255, 223, 0, 0.3), transparent),
              linear-gradient(135deg, rgba(255, 223, 0, 0.1), rgba(255, 223, 0, 0));
  border-radius: 50%;
  z-index: 0;
  animation: float2 8s ease-in-out infinite;

  @keyframes float2 {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(15px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  margin-right: 2rem;
  z-index: 2; /* Ensure it's above the shapes */
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2; /* Ensure it's above the shapes */

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const Greeting = styled(motion.h1)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Name = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const Role = styled(motion.h3)`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1rem;
  max-width: 600px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const SectionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;

  li {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SkillBubbles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillBubble = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: scale(1.1);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 10;

  ${SkillBubble}:hover & {
    display: block;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <BackgroundShape />
      <BackgroundShape2 />
      <SocialSidebar />
      <LeftColumn>
        <Greeting
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Hi, my name is
        </Greeting>
        <Name
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Mithul Koshy.
        </Name>
        <Role
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Software Development Engineer in Test
        </Role>
        <Description
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          I am a software developer specializing in software development, quality assurance, and test automation. I have a proven track record in system analysis, test scenario development, and test case execution. Currently, I’m focused on developing innovative solutions that bring ideas to life on the web.
        </Description>
      </LeftColumn>

      <RightColumn>
        <SectionTitle>Experience & Projects</SectionTitle>
        <SectionList>
          <li>Developer (Co-op) at WIMTACH</li>
          <li>QA Automation Specialist at Teranet Inc.</li>
          <li>Software Developer (Test Automation) at UST</li>
          <li>IT Intern at Qatargas</li>
          <li>Unreal Engine and Unity Game Projects</li>
        </SectionList>

        <SectionTitle>Core Skills</SectionTitle>
        <SkillBubbles>
          <SkillBubble>
            Python
            <Tooltip>Used in automation frameworks at UST</Tooltip>
          </SkillBubble>
          <SkillBubble>
            Java
            <Tooltip>Used in test automation with Selenium</Tooltip>
          </SkillBubble>
          <SkillBubble>
            C#
            <Tooltip>Developed VR gameplay experiences at WIMTACH</Tooltip>
          </SkillBubble>
          <SkillBubble>
            JavaScript
            <Tooltip>Used in frontend development with Angular</Tooltip>
          </SkillBubble>
          <SkillBubble>
            React
            <Tooltip>Experience with modern web development</Tooltip>
          </SkillBubble>
          <SkillBubble>
            AWS
            <Tooltip>Integrated with Lambda and Lex for services</Tooltip>
          </SkillBubble>
          <SkillBubble>
            Selenium
            <Tooltip>Automated regression test cases at Teranet</Tooltip>
          </SkillBubble>
          <SkillBubble>
            Jenkins
            <Tooltip>Used for CI/CD pipelines at UST</Tooltip>
          </SkillBubble>
          <SkillBubble>
            Docker
            <Tooltip>Used in various projects for containerization</Tooltip>
          </SkillBubble>
        </SkillBubbles>
      </RightColumn>
    </HomeContainer>
  );
};

export default Home;
