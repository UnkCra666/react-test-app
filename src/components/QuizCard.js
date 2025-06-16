import React from 'react';
import './QuizCard.css';

const QuizCard = ({ quiz, onSelect, progress }) => {
  const hasProgress = progress && progress.answers && Object.keys(progress.answers).length > 0;
  const progressPercentage = hasProgress 
    ? Math.round((Object.keys(progress.answers).length / quiz.questionsCount) * 100)
    : 0;

  const handleCardClick = () => {
    onSelect(quiz);
  };

  return (
    <div className="quiz-card" onClick={handleCardClick}>
      {/* Изображение викторины */}
      <div className="quiz-card-image">
        <img 
          src={quiz.image || '/images/default-quiz.jpg'} 
          alt={quiz.title}
          onError={(e) => {
            e.target.src = '/images/default-quiz.jpg';
          }}
        />
        {hasProgress && (
          <div className="progress-badge">
            <span className="progress-text">{progressPercentage}%</span>
          </div>
        )}
      </div>

      {/* Контент карточки */}
      <div className="quiz-card-content">
        <div className="quiz-card-header">
          <h3 className="quiz-title">{quiz.title}</h3>
          <div className="quiz-meta">
            <span className="quiz-questions">
              <span className="meta-icon">📝</span>
              {quiz.questionsCount} вопросов
            </span>
            <span className="quiz-time">
              <span className="meta-icon">⏱️</span>
              {quiz.estimatedTime}
            </span>
          </div>
        </div>

        <p className="quiz-description">{quiz.description}</p>

        {/* Категория и подкатегория */}
        <div className="quiz-tags">
          <span className="quiz-category">
            {quiz.category === 'character' && '🎭'}
            {quiz.category === 'personality' && '🧠'}
            {quiz.category === 'archetype' && '⚡'}
            {quiz.category === 'universe' && '🌌'}
            {getCategoryName(quiz.category)}
          </span>
          {quiz.subcategory && (
            <span className="quiz-subcategory">
              {quiz.subcategory}
            </span>
          )}
        </div>

        {/* Прогресс-бар */}
        {hasProgress && (
          <div className="quiz-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="progress-label">Прогресс: {progressPercentage}%</span>
          </div>
        )}
      </div>

      {/* Кнопка действия */}
      <div className="quiz-card-action">
        <button className="quiz-action-btn">
          {hasProgress ? (
            <>
              <span className="action-icon">▶️</span>
              Продолжить
            </>
          ) : (
            <>
              <span className="action-icon">🚀</span>
              Начать
            </>
          )}
        </button>
      </div>

      {/* Эффект наведения */}
      <div className="quiz-card-overlay">
        <div className="overlay-content">
          <span className="overlay-icon">👆</span>
          <span className="overlay-text">
            {hasProgress ? 'Продолжить прохождение' : 'Начать викторину'}
          </span>
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

export default QuizCard;