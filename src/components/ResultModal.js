import React, { useEffect, useRef, useState } from 'react';
import './ResultModal.css';

const ResultModal = ({ result, quiz, onClose, onRestart }) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [progressAnimation, setProgressAnimation] = useState(0);

  // Анимация появления модального окна
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Запускаем анимацию прогресса
      const progressTimer = setTimeout(() => {
        setProgressAnimation(100);
      }, 500);
      return () => clearTimeout(progressTimer);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Обработка клавиши Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Фокус на модальном окне для доступности
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  // Закрытие по клику на оверлей
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Функция для получения иконки персонажа
  const getCharacterIcon = (resultName) => {
    const iconMap = {
      'Железный Человек': '🦾',
      'Капитан Америка': '🛡️',
      'Человек-Паук': '🕷️',
      'Тор': '⚡',
      'Халк': '💚',
      'Черная Вдова': '🕸️',
      'Доктор Стрэндж': '🔮',
      'Алая Ведьма': '🔴',
      'Соколиный Глаз': '🏹'
    };
    return iconMap[resultName] || '🦸';
  };

  // Функция для получения иконок характеристик
  const getTraitIcon = (trait) => {
    const traitIcons = {
      'Гениальный': '🧠',
      'Харизматичный': '✨',
      'Уверенный': '💪',
      'Изобретательный': '🔧',
      'Честный': '💎',
      'Лидер': '👑',
      'Самоотверженный': '❤️',
      'Справедливый': '⚖️',
      'Остроумный': '😄',
      'Ловкий': '🤸',
      'Ответственный': '📋',
      'Добрый': '🌟',
      'Могучий': '💥',
      'Благородный': '🏰',
      'Импульсивный': '⚡',
      'Мощный': '💪',
      'Неудержимый': '🌪️',
      'Защитник': '🛡️',
      'Эмоциональный': '💖',
      'Умная': '🎓',
      'Скрытная': '🥷',
      'Верная': '🤝',
      'Мудрый': '🧙',
      'Мистический': '🔮',
      'Рассудительный': '🤔',
      'Загадочная': '🌙',
      'Интуитивная': '💫',
      'Точный': '🎯',
      'Надежный': '🔒',
      'Скромный': '🙏',
      'Тактичный': '♟️'
    };
    return traitIcons[trait] || '⭐';
  };

  // Обработка функции "Поделиться"
  const handleShare = async () => {
    const shareText = `🎉 Я прошел викторину "${quiz.title}" и получил результат: ${result.title}!\n\n${result.description.substring(0, 100)}...\n\nПройди и ты: ${window.location.href}`;
    
    try {
      if (navigator.share && navigator.canShare) {
        await navigator.share({
          title: `${quiz.title} - ${result.title}`,
          text: shareText,
          url: window.location.href
        });
      } else {
        // Fallback - копирование в буфер обмена
        await navigator.clipboard.writeText(shareText);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Ошибка при попытке поделиться:', error);
      // Альтернативный способ копирования для старых браузеров
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 3000);
      } catch (fallbackError) {
        console.error('Не удалось скопировать текст:', fallbackError);
      }
    }
  };

  // Перезапуск викторины
  const handleRestart = () => {
    onRestart();
    onClose();
  };

  // Расчет процента прогресса (для визуализации)
  const progressPercentage = Math.round(progressAnimation);
  const circumference = 2 * Math.PI * 45; // радиус 45
  const strokeDashoffset = circumference - (progressAnimation / 100) * circumference;

  return (
    <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleOverlayClick}>
      <div 
        className={`result-modal ${isVisible ? 'modal-enter' : ''}`}
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
        aria-describedby="result-description"
      >
        {/* Кнопка закрытия */}
        <button 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Закрыть результат"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        {/* Заголовок с анимацией завершения */}
        <div className="result-header">
          <div className="completion-circle">
            <svg className="progress-ring" width="120" height="120" viewBox="0 0 120 120">
              <circle
                className="progress-ring-bg"
                stroke="#E2E8F0"
                strokeWidth="8"
                fill="transparent"
                r="45"
                cx="60"
                cy="60"
              />
              <circle
                className="progress-ring-progress"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="transparent"
                r="45"
                cx="60"
                cy="60"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: 'stroke-dashoffset 2s ease-in-out',
                  transform: 'rotate(-90deg)',
                  transformOrigin: '60px 60px'
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B9D" />
                  <stop offset="50%" stopColor="#FF8FB1" />
                  <stop offset="100%" stopColor="#FFA8CC" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-content">
              <div className="progress-percentage">{progressPercentage}%</div>
              <div className="progress-label">Готово!</div>
            </div>
          </div>

          <div className="result-badge">
            <span className="badge-icon">{getCharacterIcon(result.name)}</span>
            <span className="badge-text">Твой результат</span>
          </div>
        </div>

        {/* Основной контент результата */}
        <div className="result-content">
          <div className="result-title-section">
            <h2 id="result-title" className="result-title">
              {result.title}
            </h2>
            <div className="result-subtitle">
              {result.subtitle || `Поздравляем! Ты получил результат "${result.name}"`}
            </div>
          </div>

          {/* Изображение результата */}
          {result.image && (
            <div className="result-image-container">
              <img 
                src={result.image} 
                alt={result.name}
                className="result-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Описание результата */}
          <div id="result-description" className="result-description">
            <p>{result.description}</p>
          </div>

          {/* Характеристики персонажа */}
          {result.traits && result.traits.length > 0 && (
            <div className="result-traits">
              <h3 className="traits-title">Твои характеристики:</h3>
              <div className="traits-grid">
                {result.traits.map((trait, index) => (
                  <div key={index} className="trait-card">
                    <span className="trait-icon">{getTraitIcon(trait)}</span>
                    <span className="trait-text">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Статистика викторины */}
          <div className="quiz-stats">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-icon">📊</span>
                <div className="stat-content">
                  <span className="stat-label">Викторина</span>
                  <span className="stat-value">{quiz.title}</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">❓</span>
                <div className="stat-content">
                  <span className="stat-label">Вопросов</span>
                  <span className="stat-value">{quiz.questionsCount}</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🎯</span>
                <div className="stat-content">
                  <span className="stat-label">Результат</span>
                  <span className="stat-value">{result.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Действия пользователя */}
        <div className="result-actions">
          <button 
            className="action-btn primary-btn"
            onClick={handleShare}
            type="button"
          >
            <span className="btn-icon">🔗</span>
            <span className="btn-text">Поделиться результатом</span>
          </button>
          
          <div className="secondary-actions">
            <button 
              className="action-btn secondary-btn"
              onClick={handleRestart}
              type="button"
            >
              <span className="btn-icon">🔄</span>
              <span className="btn-text">Пройти снова</span>
            </button>
            
            <button 
              className="action-btn outline-btn"
              onClick={onClose}
              type="button"
            >
              <span className="btn-icon">📋</span>
              <span className="btn-text">К каталогу</span>
            </button>
          </div>
        </div>

        {/* Уведомление об успешном копировании */}
        {showShareSuccess && (
          <div className="share-notification">
            <div className="notification-content">
              <span className="notification-icon">✅</span>
              <span className="notification-text">Результат скопирован в буфер обмена!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultModal;