// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #ffffff;
    --bg-elev: #ffffff;
    --surface: #f6f6f6;
    --surface-hover: #efefef;
    --border: rgba(10, 10, 10, 0.09);
    --border-strong: rgba(10, 10, 10, 0.18);
    --text: #0a0a0a;
    --muted: #525252;
    --subtle: #8a8a8a;
    --accent: #e10600;
    --accent-ink: #c40500;
    --accent-soft: rgba(225, 6, 0, 0.07);
    --accent-line: rgba(225, 6, 0, 0.3);
    --btn-bg: #e10600;
    --btn-fg: #ffffff;
    --glow: 0 10px 30px -10px rgba(225, 6, 0, 0.5);
    --shadow: 0 1px 2px rgba(10, 10, 10, 0.04), 0 12px 40px -12px rgba(10, 10, 10, 0.16);
    color-scheme: light;
  }

  :root[data-theme='dark'] {
    --bg: #070707;
    --bg-elev: #111111;
    --surface: #161616;
    --surface-hover: #1d1d1d;
    --border: rgba(255, 255, 255, 0.08);
    --border-strong: rgba(255, 255, 255, 0.16);
    --text: #f5f5f5;
    --muted: #a1a1a1;
    --subtle: #6e6e6e;
    --accent: #ff2a1f;
    --accent-ink: #ff4d44;
    --accent-soft: rgba(255, 42, 31, 0.1);
    --accent-line: rgba(255, 42, 31, 0.38);
    --btn-bg: #e10600;
    --btn-fg: #ffffff;
    --glow: 0 10px 40px -8px rgba(255, 30, 20, 0.6);
    --shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 16px 48px -16px rgba(0, 0, 0, 0.8);
    color-scheme: dark;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 88px;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: 16px;
    background: var(--bg);
    color: var(--text);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a { color: inherit; text-decoration: none; }

  h1, h2, h3, h4 { margin: 0; line-height: 1.15; }
  p { margin: 0; }

  ::selection { background: var(--accent-soft); color: var(--text); }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyle;
