import React from 'react';

export default class OrderSteps extends React.Component {

  render() {
    return (
      <div className="order-steps">
        <div className="order-step__item order-steps_size_big order-steps_active">
          <p className="order-step__text text text_theme_white text_level_third">Билеты</p>
        </div>
        <div className="order-step__item order-steps_size_small ">
          <p className="order-step__text text text_theme_white text_level_third">Пассажиры</p>
        </div>
        <div className="order-step__item order-steps_size_small ">
          <p className="order-step__text text text_theme_white text_level_third">Оплата</p>
        </div>
        <div className="order-step__item order-steps_size_big ">
          <p className="order-step__text text text_theme_white text_level_third">Проверка</p>
        </div>
      </div>
    )
  }
}