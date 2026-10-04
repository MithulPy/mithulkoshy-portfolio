import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import App from './App';
import theme from './theme';

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders the hero and keeps private details off the page', () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  expect(screen.getByRole('heading', { level: 1, name: /mithul koshy/i })).toBeInTheDocument();
  // No phone numbers (e.g. "+91 12345 67890") anywhere on the page
  expect(document.body.textContent).not.toMatch(/\+\d{1,3}[\s-]?\d{4,5}[\s-]?\d{4,5}/);
  expect(screen.queryByText(/relocat/i)).not.toBeInTheDocument();
});
