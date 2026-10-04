// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { Container } from './ui';
import { BuddyGlyph } from './Buddy';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'contact', label: 'Contact' },
];

const Bar = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  transition: background 0.3s ease, border-color 0.3s ease;
  border-bottom: 1px solid ${({ $scrolled, theme }) => ($scrolled ? theme.colors.border : 'transparent')};
  background: ${({ $scrolled }) => ($scrolled ? 'color-mix(in srgb, var(--bg) 82%, transparent)' : 'transparent')};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'saturate(160%) blur(14px)' : 'none')};
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 72px;
`;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.25rem;

  .mark {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-size: 1rem;
    font-style: italic;
  }
`;

const Links = styled.nav`
  display: none;
  align-items: center;
  gap: 0.15rem;

  @media (min-width: 900px) {
    display: flex;
  }
`;

const NavLink = styled.a`
  position: relative;
  isolation: isolate;
  padding: 0.45rem 0.85rem;
  font-size: 0.9rem;
  border-radius: 10px;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.muted)};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Pill = styled(motion.span)`
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surface};
`;

const Tools = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const IconButton = styled.button`
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $on, theme }) => ($on ? theme.colors.primarySoft : 'transparent')};
  color: ${({ $on, theme }) => ($on ? theme.colors.primaryInk : theme.colors.text)};
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  svg.buddy { width: 22px; height: 22px; }
`;

const MenuButton = styled(IconButton)`
  @media (min-width: 900px) {
    display: none;
  }
`;

const MobilePanel = styled(motion.nav)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 1.25rem;
  background: var(--bg);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  a {
    padding: 0.9rem 0;
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: 1.35rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  a:last-child { border-bottom: 0; margin-bottom: 0.75rem; }

  @media (min-width: 900px) {
    display: none;
  }
`;

const SECTION_IDS = LINKS.map((l) => l.id);

const useActiveSection = (ids) => {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

const useTheme = () => {
  const [mode, setMode] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');

  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#070707' : '#ffffff');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // storage unavailable (private mode); the toggle still works for this visit
    }
    setMode(next);
  };

  return [mode, toggle];
};

const Navbar = ({ buddyOn, onToggleBuddy }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mode, toggleTheme] = useTheme();
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Bar $scrolled={scrolled || open}>
      <Inner>
        <Logo href="#top" aria-label="Mithul Koshy, back to top">
          <span className="mark">MK</span>
          Mithul Koshy
        </Logo>
        <Links aria-label="Primary">
          {LINKS.map(({ id, label }) => (
            <NavLink key={id} href={`#${id}`} $active={active === id}>
              {active === id && <Pill layoutId="nav-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              {label}
            </NavLink>
          ))}
        </Links>
        <Tools>
          <IconButton
            type="button"
            onClick={onToggleBuddy}
            $on={buddyOn}
            aria-pressed={buddyOn}
            aria-label={buddyOn ? 'Hide Probe, the page buddy' : 'Show Probe, the page buddy'}
            title={buddyOn ? 'Hide Probe' : 'Show Probe'}
          >
            <BuddyGlyph className="buddy" />
          </IconButton>
          <IconButton
            type="button"
            onClick={toggleTheme}
            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title="Toggle theme"
          >
            {mode === 'dark' ? <FiSun /> : <FiMoon />}
          </IconButton>
          <MenuButton
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <FiX /> : <FiMenu />}
          </MenuButton>
        </Tools>
      </Inner>
      <AnimatePresence>
        {open && (
          <MobilePanel initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
            {LINKS.map(({ id, label }) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </MobilePanel>
        )}
      </AnimatePresence>
    </Bar>
  );
};

export default Navbar;
