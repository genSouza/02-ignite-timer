import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { Router } from './components/Router';
import { CyclesContextProvider } from './contexts/CyclesContext';

import { defaultTheme } from './styles/default.theme';
import { GlobalStyle } from './styles/global.theme';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
