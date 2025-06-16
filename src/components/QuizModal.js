import React, { useEffect, useRef } from 'react';
import './QuizModal.css';

const QuizModal = ({ quiz, onStart, onContinue, onClose, hasProgress }) => {
  const modalRef = useRef(null);

  // Закрытие модального окна по нажатию Escape
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStart = () => {
    onStart(quiz);
  };

  const handleContinue = () => {
    onContinue(quiz);
  };

  const progressPercentage = hasProgress 
    ? Math.round((Object.keys(hasProgress.answers || {}).length / quiz.questionsCount) * 100)
    : 0;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div 
        className="quiz-modal" 
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        {/* Кнопка закрытия */}
        <button 
          className="modal-close"
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          ✕
        </button>

        {/* Изображение викторины */}
        <div className="quiz-modal-image">
          <img 
            src={quiz.image || '/images/default-quiz.jpg'} 
            alt={quiz.title}
            onError={(e) => {
              e.target.src = '/images/default-quiz.jpg';
            }}
          />
          {hasProgress && (
            <div className="modal-progress-badge">
              <span>{progressPercentage}%</span>
            </div>
          )}
        </div>

        {/* Контент модального окна */}
        <div className="quiz-modal-content">
          <div className="quiz-modal-header">
            <h2 id="quiz-modal-title" className="quiz-modal-title">
              {quiz.title}
            </h2>
            
            <div className="quiz-modal-meta">
              <div className="meta-item">
                <span className="meta-icon">📝</span>
                <span>{quiz.questionsCount} вопросов</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">⏱️</span>
                <span>{quiz.estimatedTime}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">
                  {quiz.category === 'character' && '🎭'}
                  {quiz.category === 'personality' && '🧠'}
                  {quiz.category === 'archetype' && '⚡'}
                  {quiz.category === 'universe' && '🌌'}
                </span>
                <span>{getCategoryName(quiz.category)}</span>
              </div>
            </div>
          </div>

          <div className="quiz-modal-body">
            <p className="quiz-modal-description">
              {quiz.description}
            </p>

            {quiz.subcategory && (
              <div className="quiz-modal-subcategory">
                <span className="subcategory-label">Подкатегория:</span>
                <span className="subcategory-value">{quiz.subcategory}</span>
              </div>
            )}

            {/* Информация о прогрессе */}
            {hasProgress && (
              <div className="quiz-modal-progress">
                <div className="progress-info">
                  <h4 className="progress-title">📊 У вас есть сохраненный прогресс</h4>
                  <div className="progress-details">
                    <span>Отвечено: {Object.keys(hasProgress.answers || {}).length} из {quiz.questionsCount}</span>
                    <span>Прогресс: {progressPercentage}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Особенности викторины */}
            <div className="quiz-features">
              <h4 className="features-title">Что тебя ждет:</h4>
              <ul className="features-list">
                <li>
                  <span className="feature-icon">🎯</span>
                  Персонализированный результат
                </li>
                <li>
                  <span className="feature-icon">💾</span>
                  Автосохранение прогресса
                </li>
                <li>
                  <span className="feature-icon">📱</span>
                  Возможность поделиться результатом
                </li>
                <li>
                  <span className="feature-icon">🔄</span>
                  Можно пройти заново в любое время
                </li>
              </ul>
            </div>
          </div>

          {/* Действия */}
          <div className="quiz-modal-actions">
            {hasProgress ? (
              <div className="actions-with-progress">
                <button 
                  className="btn btn-primary btn-large"
                  onClick={handleContinue}
                >
                  <span className="btn-icon">▶️</span>
                  Продолжить с {progressPercentage}%
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleStart}
                >
                  <span className="btn-icon">🔄</span>
                  Начать заново
                </button>
              </div>
            ) : (
              <div className="actions-new">
                <button 
                  className="btn btn-primary btn-large"
                  onClick={handleStart}
                >
                  <span className="btn-icon">🚀</span>
                  Начать викторину
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={onClose}
                >
                  Отмена
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Вспомогательная функция для получения названия категории
const getCategoryName = (category) => {
  const categoryNames = {
    character: 'Персонаж',
    personality: 'Личность',
    archetype: 'Архетип',
    universe: 'Вселенная'
  };
  return categoryNames[category] || 'Другое';
};

export default QuizModal;