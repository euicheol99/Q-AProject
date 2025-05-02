import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound'
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './themes';
import { useState } from 'react';
import GlobalStyle from './GlobalStyle';
import LoginPage from './pages/LoginPage';
import FindIdPage from './pages/FindIdPage';
import FindPasswordPage from './pages/FindPasswordPage';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Header toggleTheme={() => setIsDark(prev => !prev)}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<Registration />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/findid' element={<FindIdPage />} />
            <Route path='/findpassword' element={<FindPasswordPage />} />
            <Route path="/*" element={<NotFound />}/>
          </Routes>
        </Header>
      </Router>
    </ThemeProvider>
  );
}

export default App;
