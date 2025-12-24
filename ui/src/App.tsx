import { useState } from 'react';
import { Page } from './types';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ChatPage from './components/ChatPage';
import AboutConstitution from './components/AboutConstitution';
import HistoryPage from './components/HistoryPage';
import FundamentalRights from './components/FundamentalRights';
import NeedPage from './components/NeedPage';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'quiz':
        return <QuizPage />;
      case 'chat':
        return <ChatPage />;
      case 'about':
        return <AboutConstitution />;
      case 'history':
        return <HistoryPage />;
      case 'rights':
        return <FundamentalRights />;
      case 'need':
        return <NeedPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
