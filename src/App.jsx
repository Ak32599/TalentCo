import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import SignIn from './pages/Signin';
import HomePage from './pages/LandingPage';
import ProfessionalsListPage from './pages/ProfessionalsListPage';
import ProfessionalDetailPage from './pages/ProfessionalDetailPage';
import ContactPage from './pages/ContactPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import DashboardPage from './pages/DashboardPage';
import PopularCategories from './components/PopularCategories';
import LearningResources from './pages/LearningResources';

import './App.css';

const MainAppLayout = ({ onSearch }) => (
  <div className="app-container">
    <Header onSearch={onSearch} />
    <main style={{ padding: '20px' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/all" element={<PopularCategories />} />
        <Route path="/category/:categoryName" element={<ProfessionalsListPage />} />
        <Route path="/professional/:id" element={<ProfessionalDetailPage />} />
        <Route path="/contact/:id" element={<ContactPage />} />
        <Route path="/learn" element={<LearningResources />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

function App() {
  const [, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/*" element={<MainAppLayout onSearch={handleSearch} />} />
    </Routes>
  );
}

export default App;
