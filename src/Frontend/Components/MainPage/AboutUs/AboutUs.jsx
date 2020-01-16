import React from 'react';

export default class AboutUs extends React.Component {
  render() {
    return (
      <div className="about-us container" id='about-us'>
        <h2 className="about-us__title text text_level_second text_weight_500 text_transform_uppercase">о нас</h2>
        <div className="about-us__content">
          <p className="about-us__text">Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей заказывают жд билеты через интернет.</p>
          <p className="about-us__text">Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о преимуществах заказа через интернет.</p>
          <p className="about-us__text text text_weight_600">Покупать жд билеты дешево можно за 90 суток до отправления поезда. Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.</p>
        </div>
      </div>
    )
  }
}