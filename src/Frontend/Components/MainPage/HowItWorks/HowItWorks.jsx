import React from 'react';

export default class HowItWorks extends React.Component {
  render() {
    return (
      <div className="how-it-works" id='how-it-works'>
        <div className="how-it-works__inner container">
          <div className="how-it-works__header">
            <h2 className="how-it-works__title text text_level_second text_theme_white text_weight_500 text_transform_uppercase">Как это работает</h2>
            <button className="btn btn_theme_transparent btn_size_big" type='button'>Узнать больше</button>
          </div>

          <div className="how-it-works__body">
            <div className="how-it-works__item how-it-works_icon_order">Удобный заказ на сайте</div>
            <div className="how-it-works__item how-it-works_icon_from-home">Нет необходимости ехать в офис</div>
            <div className="how-it-works__item how-it-works_icon_choice">Огромный выбор направлений</div>
          </div>
        </div>
      </div>
    )
  }
}