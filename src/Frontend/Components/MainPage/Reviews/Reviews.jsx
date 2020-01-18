import React from 'react';
import Slider from '../../GeneralBlocks/Slider/Slider';

export default class Reviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [
        [{
          name: 'Екатерина Вальнова',
          avatar: 'https://cdn1.savepice.ru/uploads/2020/1/17/00fb877c0af612599af03a6a8b88ab5d-full.jpg',
          text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
        },
        {
          name: 'Евгений Стрыкало',
          avatar: 'https://cdn1.savepice.ru/uploads/2020/1/17/bdb3a3bf388af2b9fd1ecdf1c8c5e032-full.jpg',
          text: 'СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке..'
        }],
        [{
          name: 'Екатерина Вальнова',
          avatar: 'https://cdn1.savepice.ru/uploads/2020/1/17/00fb877c0af612599af03a6a8b88ab5d-full.jpg',
          text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
        },
        {
          name: 'Евгений Стрыкало',
          avatar: 'https://cdn1.savepice.ru/uploads/2020/1/17/bdb3a3bf388af2b9fd1ecdf1c8c5e032-full.jpg',
          text: 'СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке..'
        }],
        [{
          name: 'Екатерина Вальнова',
          avatar: 'https://cdn1.savepice.ru/uploads/2020/1/17/00fb877c0af612599af03a6a8b88ab5d-full.jpg',
          text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
        }]
      ]
    }
  }

  render() {
    return (
      <div className="reviews container" id='reviews'>
        <h2 className="reviews__title text text_level_second text_weight_500 text_transform_uppercase">отзывы</h2>
        <Slider slideContent={this.state.reviews} parentClassName='reviews__slider' />
      </div>
    )
  }
}

