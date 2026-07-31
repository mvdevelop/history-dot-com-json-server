import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Content from './pages/Content.tsx';
import AddContentPage from './pages/AddContentPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/content" element={<Content />} />
        <Route path="/add" element={<AddContentPage />} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/extra" element={<div>Extra Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;