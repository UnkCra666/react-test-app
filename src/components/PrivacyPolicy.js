import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="privacy-header">
        <h1 className="privacy-title">Политика конфиденциальности</h1>
        <p className="privacy-subtitle">
          Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
        </p>
      </div>

      <div className="privacy-content">
        <div className="privacy-section">
          <h2 className="section-title">1. Общие положения</h2>
          <p className="section-text">
            Настоящая Политика конфиденциальности описывает, как мы собираем, 
            используем и защищаем вашу информацию при использовании нашего 
            веб-приложения викторин.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">2. Какую информацию мы собираем</h2>
          <div className="section-text">
            <p>Мы собираем следующие типы информации:</p>
            <ul className="info-list">
              <li>
                <strong>Данные викторин:</strong> Ваши ответы на вопросы викторин 
                и результаты прохождения
              </li>
              <li>
                <strong>Техническая информация:</strong> IP-адрес, тип браузера, 
                операционная система для улучшения работы сайта
              </li>
              <li>
                <strong>Локальные данные:</strong> Прогресс прохождения викторин 
                сохраняется в локальном хранилище вашего браузера
              </li>
            </ul>
          </div>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">3. Как мы используем информацию</h2>
          <div className="section-text">
            <p>Собранная информация используется для:</p>
            <ul className="info-list">
              <li>Обеспечения работы викторин и сохранения прогресса</li>
              <li>Улучшения пользовательского опыта</li>
              <li>Анализа использования сайта и его оптимизации</li>
              <li>Технической поддержки пользователей</li>
            </ul>
          </div>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">4. Хранение данных</h2>
          <p className="section-text">
            Прогресс викторин сохраняется локально в вашем браузере и не 
            передается на наши серверы. Вы можете в любой момент очистить 
            эти данные через настройки браузера.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">5. Передача данных третьим лицам</h2>
          <p className="section-text">
            Мы не продаем, не обмениваем и не передаем ваши персональные 
            данные третьим лицам без вашего согласия, за исключением случаев, 
            предусмотренных законодательством.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">6. Безопасность</h2>
          <p className="section-text">
            Мы принимаем соответствующие меры безопасности для защиты вашей 
            информации от несанкционированного доступа, изменения, раскрытия 
            или уничтожения.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">7. Cookies</h2>
          <p className="section-text">
            Наш сайт использует локальное хранилище браузера для сохранения 
            прогресса викторин. Мы не используем сторонние cookies для 
            отслеживания пользователей.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">8. Права пользователей</h2>
          <div className="section-text">
            <p>У вас есть право:</p>
            <ul className="info-list">
              <li>Знать, какие данные о вас собираются</li>
              <li>Получить доступ к своим данным</li>
              <li>Исправить или удалить свои данные</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>
          </div>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">9. Изменения в политике</h2>
          <p className="section-text">
            Мы можем обновлять эту Политику конфиденциальности время от времени. 
            Все изменения будут опубликованы на этой странице с указанием даты 
            последнего обновления.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">10. Контактная информация</h2>
          <p className="section-text">
            Если у вас есть вопросы относительно этой Политики конфиденциальности, 
            вы можете связаться с нами:
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>Email: sendmehotpic@gmail.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>Телефон: +7 (999) 123-45-67</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Адрес: г. Москва, ул. Пушкина, д. Калатушкина</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;