import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { ThemeContextProvider } from './contexts/ThemeContext';
import theme from './styles/theme';
import './styles/global.css';

const Home = lazy(() => import('./pages/Home'));
const Preferences = lazy(() => import('./pages/Preferences'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Error = lazy(() => import('./pages/Error'));

function App() {
  return (
    <ThemeContextProvider theme={theme}>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
