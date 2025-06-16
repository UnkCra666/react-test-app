import React, { useState } from 'react';
import './Header.css';

const Header = ({ currentView, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (view) => {
    onNavigate(view);
    setIsMobileMenuOpen(false); // Закрываем мобильное меню после навигации
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Логотип */}
        <div className="logo" onClick={() => handleNavigation('catalog')}>
          <span className="logo-icon">🎯</span>
          <span className="logo-text">QuizMania</span>
        </div>

        {/* Десктопное меню */}
        <nav className="nav-desktop">
          <button 
            className={`nav-link ${currentView === 'catalog' ? 'active' : ''}`}
            onClick={() => handleNavigation('catalog')}
          >
            Викторины
          </button>
          <button 
            className={`nav-link ${currentView === 'faq' ? 'active' : ''}`}
            onClick={() => handleNavigation('faq')}
          >
            FAQ
          </button>
        </nav>

        {/* Бургер-меню для мобильных */}
        <button 
          className={`burger-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Мобильное меню */}
      <div className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
        <button 
          className={`nav-link-mobile ${currentView === 'catalog' ? 'active' : ''}`}
          onClick={() => handleNavigation('catalog')}
        >
          <span className="nav-icon">🎯</span>
          Викторины
        </button>
        <button 
          className={`nav-link-mobile ${currentView === 'faq' ? 'active' : ''}`}
          onClick={() => handleNavigation('faq')}
        >
          <span className="nav-icon">❓</span>
          FAQ
        </button>
      </div>

      {/* Оверлей для закрытия мобильного меню */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;