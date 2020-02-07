import React from 'react';

import { ReactComponent as FirstClassIcon } from '../Coach/coach_icon_first-class.svg';
import { ReactComponent as SecondClassIcon } from '../Coach/coach_icon_second-class.svg';
import { ReactComponent as ThirdClassIcon } from '../Coach/coach_icon_third-class.svg';
import { ReactComponent as FourthClassIcon } from '../Coach/coach_icon_fourth-class.svg';


export default class Coach extends React.Component {

  render() {

    return (
      <div className="coach">
        <h2 className="coach__title">Тип вагона</h2>

        <div className="coach__classes">
          <button className="coach__class-btn btn ">
            <FourthClassIcon className='coach__class-icon' />
            <p className="coach__class-name">Сидячий</p>
          </button>

          <button className="coach__class-btn btn">
            <ThirdClassIcon className='coach__class-icon' />
            <p className="coach__class-name">Плацкарт</p>
          </button>

          <button className="coach__class-btn btn coach_btn_active">
            <SecondClassIcon className='coach__class-icon' />
            <p className="coach__class-name">Купе</p>
          </button>

          <button className="coach__class-btn btn">
            <FirstClassIcon className='coach__class-icon' />
            <p className="coach__class-name">Люкс</p>
          </button>
        </div>

        <div className="coach__wagons">
          <div className="coach__wagons-inner">
            <p className="coach__wagons-lable">Вагоны</p>
            <ul className="coach__wagons-list">
              <li className="coach__wagons-item"><button className='btn coach__wagons-btn'>ГОБЛ-33</button></li>
              <li className="coach__wagons-item"><button className='btn coach__wagons-btn'>UTNF-152</button></li>
            </ul>
          </div>
          <p className="coach__wagons-text">Нумерация вагонов начинается с головы поезда</p>
        </div>

        <div className="coach__details">
          <div className="coach__details-wagon coach__details-item">
            <div className="coach__details-wagon-inner">
              <p className="coach__details-wagon-name">UTNF-152</p>
              <p className="coach__details-wagon-label">Вагон</p>
            </div>
          </div>

          <div className="coach__details-seats coach__details-item">
            <p className="coach__section-title">Места <span className='coach__seats-amount'>11</span></p>
            <p className="coach__text">Верхние <span className='coach__seats-top-amount'>5</span></p>
            <p className="coach__text">Нижние <span className='coach__seats-bottom-amount'>6</span></p>
          </div>
        </div>
      </div>
    )
  }
}