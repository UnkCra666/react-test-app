import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import QuizCatalog from './components/QuizCatalog';
import QuizModal from './components/QuizModal';
import QuizPro from './components/QuizPro';
import ResultModal from './components/ResultModal';
import FAQ from './components/FAQ';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  // Основное состояние приложения
  const [currentView, setCurrentView] = useState('catalog'); // catalog, quiz, faq, privacy
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  
  // Модальные окна
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  
  // Прогресс викторины
  const [quizProgress, setQuizProgress] = useState({});

  // Загрузка сохраненного прогресса при старте
  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      setQuizProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Сохранение прогресса
  useEffect(() => {
    localStorage.setItem('quizProgress', JSON.stringify(quizProgress));
  }, [quizProgress]);

  // Функция для навигации между разделами
  const navigateTo = (view) => {
    setCurrentView(view);
  };

  // Открытие превью викторины
  const openQuizModal = (quiz) => {
    setActiveQuiz(quiz);
    setShowQuizModal(true);
  };

  // Закрытие превью викторины
  const closeQuizModal = () => {
    setShowQuizModal(false);
    setActiveQuiz(null);
  };

  // Начало викторины
  const startQuiz = async (quiz) => {
    try {
      // Загружаем данные викторины из JSON файла
      const response = await import(`./data/${quiz.dataFile}`);
      setQuizData(response.default);
      setActiveQuiz(quiz);
      
      // Проверяем есть ли сохраненный прогресс
      const savedAnswers = quizProgress[quiz.id]?.answers || {};
      const savedQuestion = quizProgress[quiz.id]?.currentQuestion || 0;
      
      setAnswers(savedAnswers);
      setCurrentQuestion(savedQuestion);
      setCurrentView('quiz');
      setShowQuizModal(false);
    } catch (error) {
      console.error('Ошибка загрузки викторины:', error);
    }
  };

  // Продолжение викторины
  const continueQuiz = async (quiz) => {
    await startQuiz(quiz);
  };

  // Ответ на вопрос
  const answerQuestion = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    // Сохраняем прогресс
    const newProgress = {
      ...quizProgress,
      [activeQuiz.id]: {
        answers: newAnswers,
        currentQuestion: currentQuestion,
        lastUpdated: Date.now()
      }
    };
    setQuizProgress(newProgress);
  };

  // Переход к следующему вопросу
  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      const nextQ = currentQuestion + 1;
      setCurrentQuestion(nextQ);
      
      // Обновляем прогресс
      const newProgress = {
        ...quizProgress,
        [activeQuiz.id]: {
          ...quizProgress[activeQuiz.id],
          currentQuestion: nextQ
        }
      };
      setQuizProgress(newProgress);
    } else {
      // Викторина завершена, вычисляем результат
      finishQuiz();
    }
  };

  // Переход к предыдущему вопросу
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      const prevQ = currentQuestion - 1;
      setCurrentQuestion(prevQ);
      
      // Обновляем прогресс
      const newProgress = {
        ...quizProgress,
        [activeQuiz.id]: {
          ...quizProgress[activeQuiz.id],
          currentQuestion: prevQ
        }
      };
      setQuizProgress(newProgress);
    }
  };

  // Завершение викторины и подсчет результата
  const finishQuiz = () => {
    const scores = {};
    
    // Подсчитываем баллы для каждого возможного результата
    Object.values(answers).forEach(answer => {
      Object.entries(answer.scores).forEach(([resultId, score]) => {
        scores[resultId] = (scores[resultId] || 0) + score;
      });
    });
    
    // Находим результат с наибольшим количеством баллов
    let bestResult = null;
    let maxScore = -1;
    
    quizData.results.forEach(result => {
      const score = scores[result.id] || 0;
      if (score > maxScore) {
        maxScore = score;
        bestResult = result;
      }
    });
    
    setQuizResult(bestResult);
    setShowResultModal(true);
    
    // Очищаем прогресс завершенной викторины
    const newProgress = { ...quizProgress };
    delete newProgress[activeQuiz.id];
    setQuizProgress(newProgress);
  };

  // Закрытие результата и возврат к каталогу
  const closeResult = () => {
    setShowResultModal(false);
    setQuizResult(null);
    setCurrentView('catalog');
    setActiveQuiz(null);
    setQuizData(null);
    setCurrentQuestion(0);
    setAnswers({});
  };

  // Перезапуск викторины
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResultModal(false);
    setQuizResult(null);
    
    // Очищаем сохраненный прогресс
    const newProgress = { ...quizProgress };
    delete newProgress[activeQuiz.id];
    setQuizProgress(newProgress);
  };

  // Выход из викторины
  const exitQuiz = () => {
    setCurrentView('catalog');
    setActiveQuiz(null);
    setQuizData(null);
  };

  // Рендер основного контента в зависимости от текущего view
  const renderMainContent = () => {
    switch (currentView) {
      case 'catalog':
        return (
          <QuizCatalog 
            onQuizSelect={openQuizModal}
            quizProgress={quizProgress}
          />
        );
      case 'quiz':
        return (
          <QuizPro
            quiz={activeQuiz}
            quizData={quizData}
            currentQuestion={currentQuestion}
            answers={answers}
            onAnswer={answerQuestion}
            onNext={nextQuestion}
            onPrev={prevQuestion}
            onExit={exitQuiz}
          />
        );
      case 'faq':
        return <FAQ />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return (
          <QuizCatalog 
            onQuizSelect={openQuizModal}
            quizProgress={quizProgress}
          />
        );
    }
  };

  return (
    <div className="App">
      <Header 
        currentView={currentView}
        onNavigate={navigateTo}
      />
      
      <main className="main-content">
        {renderMainContent()}
      </main>
      
      <Footer onNavigate={navigateTo} />
      
      {/* Модальное окно превью викторины */}
      {showQuizModal && activeQuiz && (
        <QuizModal
          quiz={activeQuiz}
          onStart={startQuiz}
          onContinue={continueQuiz}
          onClose={closeQuizModal}
          hasProgress={quizProgress[activeQuiz.id]}
        />
      )}
      
      {/* Модальное окно результата */}
      {showResultModal && quizResult && (
        <ResultModal
          result={quizResult}
          quiz={activeQuiz}
          onClose={closeResult}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;