import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ScrollToTop from './components/ScrollToTop';
import ProjectsListPage from './pages/ProjectsListPage';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route path="/project/:projectId" element={<ProjectDetailPage />} />
      </Routes>
      <ChatBot />
    </>
  );
}

export default App;
