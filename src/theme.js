// src/theme.js
// Tokens resolve to CSS variables defined in GlobalStyle, so light/dark switch without re-rendering.
const theme = {
  colors: {
    background: 'var(--bg)',
    elevated: 'var(--bg-elev)',
    surface: 'var(--surface)',
    surfaceHover: 'var(--surface-hover)',
    border: 'var(--border)',
    borderStrong: 'var(--border-strong)',
    text: 'var(--text)',
    muted: 'var(--muted)',
    subtle: 'var(--subtle)',
    primary: 'var(--accent)',
    primaryInk: 'var(--accent-ink)',
    primarySoft: 'var(--accent-soft)',
    primaryLine: 'var(--accent-line)',
    buttonBg: 'var(--btn-bg)',
    buttonFg: 'var(--btn-fg)',
  },
  fonts: {
    main: "'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif",
    serif: "'Newsreader', 'Iowan Old Style', Georgia, serif",
    mono: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  shadow: 'var(--shadow)',
  glow: 'var(--glow)',
  maxWidth: '1140px',
  radius: '18px',
};

export default theme;
