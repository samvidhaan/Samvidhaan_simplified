import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ChatPage from './components/ChatPage';
import AboutConstitution from './components/AboutConstitution';
import HistoryPage from './components/HistoryPage';
import FundamentalRights from './components/FundamentalRights';
import NeedPage from './components/NeedPage';

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen">
        <Navigation />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/about" element={<AboutConstitution />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/rights" element={<FundamentalRights />} />
          <Route path="/need" element={<NeedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
