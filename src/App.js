// src/App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Buddy from './components/Buddy';
import LogoMarquee from './components/LogoMarquee';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Work from './sections/Work';
import Education from './sections/Education';
import Contact from './sections/Contact';

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 200;
  transform-origin: 0%;
  background: ${({ theme }) => theme.colors.primary};
`;

// Probe is on by default; only an explicit "hide" from the navbar turns it off.
const BUDDY_KEY = 'probe-visible';
const readBuddyPref = () => {
  try {
    return localStorage.getItem(BUDDY_KEY) !== 'off';
  } catch {
    return true;
  }
};

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [buddyOn, setBuddyOn] = useState(readBuddyPref);

  const toggleBuddy = () => {
    setBuddyOn((on) => {
      try {
        localStorage.setItem(BUDDY_KEY, on ? 'off' : 'on');
      } catch {
        // storage unavailable; preference lasts for this visit only
      }
      return !on;
    });
  };

  return (
    <>
      <ProgressBar style={{ scaleX }} />
      <Navbar buddyOn={buddyOn} onToggleBuddy={toggleBuddy} />
      <main>
        <Hero />
        <LogoMarquee />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Education />
        <Contact />
      </main>
      <Footer />
      {buddyOn && <Buddy />}
    </>
  );
}

export default App;
