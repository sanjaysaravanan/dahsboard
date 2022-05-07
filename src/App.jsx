import React from 'react';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Reports from './Pages/Reports';
import Charts from './Pages/Charts';

const theme = createTheme({});

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboards" element={<h1>dashboards</h1>} />
              <Route path="reports" element={<Reports />} />
              <Route path="Charts" element={<Charts />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
