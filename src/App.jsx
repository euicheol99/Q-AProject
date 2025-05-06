import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';

import HomePage from './pages/HomePage';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import FindIdPage from './pages/FindIdPage';
import FindPasswordPage from './pages/FindPasswordPage';
import PostForm from './pages/PostForm';
import PostDetail from './pages/PostDetail';
import UserDetail from './pages/UserDetail';

import Header from './components/Header';
import GlobalStyle from './GlobalStyle';
import { darkTheme, lightTheme } from './themes';
import useUserStore from './store/UserStore';

function App() {
  const [isDark, setIsDark] = useState(false);
  const { setUser } = useUserStore();

  useEffect(() => {
    const userStr = sessionStorage.getItem('loginUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUser(user);
    }
  }, [setUser]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Header toggleTheme={() => setIsDark((prev) => !prev)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/findid" element={<FindIdPage />} />
          <Route path="/findpassword" element={<FindPasswordPage />} />
          <Route path="/postform" element={<PostForm />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
