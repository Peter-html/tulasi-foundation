import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsListPage from './pages/ProjectsListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ScrollToTop from './components/ScrollToTop';
import TulasiChatbot from './components/TulasiChatbot';
import FloatingActions from './components/FloatingActions';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route path="/project/:projectId" element={<ProjectDetailPage />} />
      </Routes>

      {/* Global floating action stack & Help Desk Chatbot */}
      <FloatingActions />
      <TulasiChatbot />
    </>
  );
}

export default App;
