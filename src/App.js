import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BoardPage from './pages/BoardPage';
import NavBar from './components/NavBar';
import CreateBoard from './components/CreateBoard';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/new-board" element={<CreateBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
