import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import HomePage from './Pages/HomePage';
import ProjectPage from './Pages/ProjectPage/ProjectPage';
import UserPage from './Pages/UserPage/UserPage';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
        </Routes>
      </Router>
  );
}

export default App;
