import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Левая секция - логотип и описание */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="footer-logo-icon">🎯</span>
              <span className="footer-logo-text">QuizMania</span>
            </div>
            <p className="footer-description">
              Открой себя с помощью увлекательных викторин и тестов личности
            </p>
          </div>

          {/* Центральная секция - навигация */}
          <div className="footer-section">
            <h3 className="footer-title">Навигация</h3>
            <div className="footer-links">
              <button 
                className="footer-link"
                onClick={() => onNavigate('catalog')}
              >
                Все викторины
              </button>
              <button 
                className="footer-link"
                onClick={() => onNavigate('faq')}
              >
                Часто задаваемые вопросы
              </button>
              <button 
                className="footer-link"
                onClick={() => onNavigate('privacy')}
              >
                Политика конфиденциальности
              </button>
            </div>
          </div>

          {/* Правая секция - социальные сети */}
          <div className="footer-section">
            <h3 className="footer-title">Поделиться</h3>
            <div className="social-links">
              <a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Поделиться в Telegram"
              >
                <span className="social-icon">📱</span>
                Telegram
              </a>
              <a 
                href="https://vk.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Поделиться ВКонтакте"
              >
                <span className="social-icon">🔵</span>
                VK
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Поделиться в Twitter"
              >
                <span className="social-icon">🐦</span>
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя секция - копирайт */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-copyright">
            <p>© {currentYear} QuizMania. Сделано с ❤️ для любителей викторин</p>
            <div className="footer-meta">
              <span>Версия 1.0</span>
              <span>•</span>
              <span>Обновлено сегодня</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;