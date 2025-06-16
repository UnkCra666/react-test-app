import React, { useState } from 'react';
import './FAQ.css';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button
        className={`faq-question ${isOpen ? 'active' : ''}`}
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="question-text">{question}</span>
        <span className="question-icon">+</span>
      </button>
      
      <div className="faq-answer">
        <div className="answer-content">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "Как работают викторины?",
      answer: "Викторины основаны на системе подсчета баллов. Каждый ответ дает определенное количество баллов различным результатам. В конце викторины определяется результат с наибольшим количеством баллов."
    },
    {
      question: "Сохраняется ли мой прогресс?",
      answer: "Да! Ваш прогресс автоматически сохраняется в браузере. Вы можете в любой момент закрыть страницу и продолжить с того места, где остановились."
    },
    {
      question: "Можно ли пройти викторину заново?",
      answer: "Конечно! Вы можете пройти любую викторину столько раз, сколько захотите. Каждый раз результат может быть разным в зависимости от ваших ответов."
    },
    {
      question: "Какие типы викторин доступны?",
      answer: "У нас есть викторины разных типов: определение персонажей из популярных франшиз (Disney, Marvel, аниме), психологические тесты на тип личности, мифологические архетипы и многое другое."
    },
    {
      question: "Как поделиться результатом?",
      answer: "После прохождения викторины вы можете нажать кнопку 'Поделиться результатом'. Результат будет скопирован в буфер обмена, и вы сможете поделиться им в социальных сетях или мессенджерах."
    },
    {
      question: "Сколько времени занимает прохождение викторины?",
      answer: "Время прохождения зависит от конкретной викторины. Обычно это занимает от 2 до 10 минут. Примерное время указано в описании каждой викторины."
    },
    {
      question: "Можно ли изменить ответ на предыдущий вопрос?",
      answer: "Да, вы можете вернуться к предыдущим вопросам и изменить свои ответы до завершения викторины."
    },
    {
      question: "Работает ли сайт на мобильных устройствах?",
      answer: "Да! Наш сайт полностью адаптирован для мобильных устройств и планшетов. Все функции работают одинаково хорошо на любых устройствах."
    },
    {
      question: "А можно вам написать лично?",
      answer: "Конечно, особенно если вы случайно захотите скинуть в личку свою очаровательную улыбку... или что-то большое, розовое и мягкое... например, плюшевого мишку 😏🎀",
    },
    {
      question: "А можно ли как-то повлиять на исход викторины?",
      answer: "Только если вы отправите свою самую обворожительную кружочку... ну или хотя бы ту, где вы после душа с мокрыми волосами... (если вы это читаете, вы знаете, что это про вас 😘)"
    },
    {
      question: "А что делать, если я не прошёл тест, но всё равно хочу бонус?",
      answer: "Напишите нам с кодовым словом «луна» и приложите фото, от которого сбивается дыхание. Только для избранных)) 💖🌙"
    }
  ];

  return (
    <div className="faq">
      <div className="faq-header">
        <h1 className="faq-title">Часто задаваемые вопросы</h1>
        <p className="faq-subtitle">
          Ответы на самые популярные вопросы о наших викторинах
        </p>
      </div>

      <div className="faq-content">
        <div className="faq-list">
          {faqData.map((item, index) => (
            <FAQItem 
              key={index} 
              question={item.question} 
              answer={item.answer}
              index={index}
            />
          ))}
        </div>

        <div className="faq-contact">
          <div className="contact-card">
            <h3 className="contact-title">Не нашли ответ на свой вопрос?</h3>
            <p className="contact-text">
              Если у вас есть вопросы, которые не рассмотрены в FAQ, 
              вы можете связаться с нами любым удобным способом.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <span className="method-icon">📧</span>
                <span className="method-text">support@quizapp.com</span>
              </div>
              <div className="contact-method">
                <span className="method-icon">💬</span>
                <span className="method-text">Онлайн-чат поддержки</span>
              </div>
              <div className="contact-method">
                <span className="method-icon">📱</span>
                <span className="method-text">Социальные сети</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;