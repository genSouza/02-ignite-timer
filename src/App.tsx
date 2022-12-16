import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { Router } from './components/Router';

import { defaultTheme } from './styles/default.theme';
import { GlobalStyle } from './styles/global.theme';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
