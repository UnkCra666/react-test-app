import React, { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import './QuizCatalog.css';

const QuizCatalog = ({ onQuizSelect, quizProgress }) => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загружаем данные категорий и викторин
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import('../data/categories.json');
        const data = response.default;
        setCategories(data.categories);
        setQuizzes(data.quizzes);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Фильтрация викторин по категориям
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredQuizzes(quizzes);
    } else {
      const filtered = quizzes.filter(quiz => quiz.category === selectedCategory);
      setFilteredQuizzes(filtered);
    }
  }, [selectedCategory, quizzes]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (loading) {
    return (
      <div className="catalog-loading">
        <div className="loading-spinner"></div>
        <p>Загружаем викторины...</p>
      </div>
    );
  }

  return (
    <div className="quiz-catalog">
      {/* Заголовок секции */}
      <div className="catalog-header">
        <h1 className="catalog-title">
          Выбери свою викторину
          <span className="title-emoji">✨</span>
        </h1>
        <p className="catalog-subtitle">
          Открой новые грани своей личности с помощью увлекательных тестов
        </p>
      </div>

      {/* Фильтры категорий */}
      <div className="category-filters">
        <h2 className="filters-title">Категории</h2>
        <div className="filters-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-text">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Информация о выбранной категории */}
      {selectedCategory !== 'all' && (
        <div className="category-info">
          {(() => {
            const currentCategory = categories.find(cat => cat.id === selectedCategory);
            return currentCategory?.description ? (
              <p className="category-description">
                <span className="category-icon">{currentCategory.icon}</span>
                {currentCategory.description}
              </p>
            ) : null;
          })()}
        </div>
      )}

      {/* Сетка викторин */}
      <div className="quizzes-section">
        <div className="quizzes-header">
          <h2 className="section-title">
            {selectedCategory === 'all' 
              ? `Все викторины (${filteredQuizzes.length})`
              : `${categories.find(cat => cat.id === selectedCategory)?.name} (${filteredQuizzes.length})`
            }
          </h2>
        </div>

        {filteredQuizzes.length > 0 ? (
          <div className="quizzes-grid">
            {filteredQuizzes.map(quiz => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onSelect={onQuizSelect}
                progress={quizProgress[quiz.id]}
              />
            ))}
          </div>
        ) : (
          <div className="no-quizzes">
            <div className="no-quizzes-icon">🔍</div>
            <h3>Викторины не найдены</h3>
            <p>В этой категории пока нет викторин. Попробуйте выбрать другую категорию.</p>
            <button 
              className="btn btn-primary"
              onClick={() => handleCategorySelect('all')}
            >
              Показать все викторины
            </button>
          </div>
        )}
      </div>

      {/* Статистика */}
      <div className="catalog-stats">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">{quizzes.length}</span>
            <span className="stat-label">Викторин</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{categories.length - 1}</span>
            <span className="stat-label">Категорий</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{Object.keys(quizProgress).length}</span>
            <span className="stat-label">В процессе</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCatalog;