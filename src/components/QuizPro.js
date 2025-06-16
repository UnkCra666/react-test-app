import React, { useState, useEffect } from 'react';
import './QuizPro.css';

const QuizPro = ({ 
  quiz, 
  quizData, 
  currentQuestion, 
  answers, 
  onAnswer, 
  onNext, 
  onPrev, 
  onExit 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const currentQ = quizData?.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === quizData.questions.length - 1;

  // Проверяем, отвечен ли текущий вопрос
  useEffect(() => {
    const existingAnswer = answers[currentQ?.id];
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer);
      setIsAnswered(true);
    } else {
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [currentQuestion, answers, currentQ?.id]);

  // Анимация появления вопроса
  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 300);
    return () => clearTimeout(timer);
  }, [currentQuestion]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswer(currentQ.id, answer);
  };

  const handleNext = () => {
    if (isAnswered) {
      onNext();
    }
  };

  const handlePrev = () => {
    onPrev();
  };

  const handleExit = () => {
    if (window.confirm('Вы уверены, что хотите выйти? Прогресс будет сохранен.')) {
      onExit();
    }
  };

  if (!quizData || !currentQ) {
    return (
      <div className="quiz-loading">
        <div className="loading-spinner"></div>
        <p>Загружаем вопросы...</p>
      </div>
    );
  }

  return (
    <div className="quiz-pro">
      {/* Шапка с прогрессом */}
      <div className="quiz-header">
        <div className="quiz-nav">
          <button 
            className="btn btn-outline btn-small"
            onClick={handleExit}
          >
            <span className="btn-icon">←</span>
            Выйти
          </button>
          
          <div className="quiz-title-small">
            {quiz.title}
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-info">
            <span className="progress-text">
              Вопрос {currentQuestion + 1} из {quizData.questions.length}
            </span>
            <span className="progress-percentage">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className={`quiz-content ${showAnimation ? 'animating' : ''}`}>
        {/* Изображение к вопросу */}
        {currentQ.image && (
          <div className="question-image">
            <img 
              src={currentQ.image} 
              alt="Иллюстрация к вопросу"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Текст вопроса */}
        <div className="question-section">
          <h2 className="question-text">
            {currentQ.text}
          </h2>
          {currentQ.subtitle && (
            <p className="question-subtitle">
              {currentQ.subtitle}
            </p>
          )}
        </div>

        {/* Варианты ответов */}
        <div className="answers-section">
          <div className="answers-grid">
            {currentQ.answers.map((answer, index) => (
              <div
                key={index}
                className={`answer-card ${
                  selectedAnswer === answer ? 'selected' : ''
                } ${isAnswered && selectedAnswer !== answer ? 'dimmed' : ''}`}
                onClick={() => handleAnswerSelect(answer)}
              >
                <div className="answer-content">
                  {answer.image && (
                    <div className="answer-image">
                      <img 
                        src={answer.image} 
                        alt={answer.text}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="answer-text">
                    {answer.text}
                  </div>
                  {selectedAnswer === answer && (
                    <div className="answer-check">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div className="quiz-navigation">
        <button 
          className="btn btn-outline"
          onClick={handlePrev}
          disabled={isFirstQuestion}
        >
          <span className="btn-icon">←</span>
          Назад
        </button>

        <div className="nav-info">
          <div className="question-counter">
            {Array.from({ length: quizData.questions.length }, (_, i) => (
              <div
                key={i}
                className={`counter-dot ${
                  i === currentQuestion ? 'current' : ''
                } ${
                  answers[quizData.questions[i]?.id] ? 'answered' : ''
                }`}
              />
            ))}
          </div>
        </div>

        <button 
          className={`btn ${isAnswered ? 'btn-primary' : 'btn-outline'}`}
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {isLastQuestion ? (
            <>
              <span className="btn-icon">🏁</span>
              Завершить
            </>
          ) : (
            <>
              Далее
              <span className="btn-icon">→</span>
            </>
          )}
        </button>
      </div>

      {/* Подсказка для неотвеченного вопроса */}
      {!isAnswered && (
        <div className="quiz-hint">
          <span className="hint-icon">💡</span>
          <span className="hint-text">
            Выберите один из вариантов ответа, чтобы продолжить
          </span>
        </div>
      )}
    </div>
  );
};

export default QuizPro;