import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<Registration />}/>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </Header>
    </Router>
  );
}

export default App;
