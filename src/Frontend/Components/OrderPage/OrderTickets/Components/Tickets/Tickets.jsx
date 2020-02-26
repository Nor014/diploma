import React from "react";
import moment from 'moment';
import { Link } from "react-router-dom";

import { ReactComponent as WifiIcon } from './order-tickets_icon-wifi.svg';
import { ReactComponent as Express } from './order-tickets_icon-express.svg';
import { ReactComponent as Eating } from './order-tickets__icon-eating.svg';

export default class Tickets extends React.Component {

  render() {
    const { data, maxTicketsToShow } = this.props;
    console.log(maxTicketsToShow)

    return (
      <div className="tickets">

        {data.map((el, index) =>
          index + 1 <= maxTicketsToShow && (
            <div className="ticket-card" key={el.departure._id}>
              <div className="ticket-card__train">
                <div className="ticket-card__train-inner">
                  <p className='ticket-card__train-name'>{el.departure.train.name}</p>
                  <p className="ticket-card__train-path"> {el.departure.from.city.name} → <br />
                    {el.departure.to.city.name}</p>
                </div>
              </div>

              <div className="ticket-card__details">
                <div className="ticket-card__path-details">
                  <div className="ticket-card__path-item">
                    <p className="ticket-card__time">{el.departure.from.datetimeToRender}</p>
                    <p className="ticket-card__city ">{el.departure.from.city.name}</p>
                    <p className="ticket-card__station">{el.departure.from.railway_station_name}</p>
                  </div>

                  <p className="ticket-card__duration arrow-pointer arrow-pointer_type_departure">{el.departure.durationToRender}</p>

                  <div className="ticket-card__path-item">
                    <p className="ticket-card__time">{el.departure.to.datetimeToRender}</p>
                    <p className="ticket-card__city">{el.departure.to.city.name}</p>
                    <p className="ticket-card__station">{el.departure.to.railway_station_name}</p>
                  </div>
                </div>

                {el.arrival &&
                  <div className="ticket-card__path-details">
                    <div className="ticket-card__path-item">
                      <p className="ticket-card__time">{el.arrival.from.datetimeToRender}</p>
                      <p className="ticket-card__city ">{el.arrival.from.city.name}</p>
                      <p className="ticket-card__station">{el.arrival.from.railway_station_name}</p>
                    </div>

                    <p className="ticket-card__duration arrow-pointer arrow-pointer_type_arrival">{el.arrival.durationToRender}</p>

                    <div className="ticket-card__path-item">
                      <p className="ticket-card__time">{el.arrival.to.datetimeToRender}</p>
                      <p className="ticket-card__city">{el.arrival.to.city.name}</p>
                      <p className="ticket-card__station">{el.arrival.to.railway_station_name}</p>
                    </div>
                  </div>}
              </div>

              <div className="ticket-card__seats">
                <div className="ticket-card__seats-classes">
                  {el.departure.have_first_class &&
                    <div className="ticket-card__seats-info">
                      <p className="ticket-card__seats-name">Люкс</p>
                      <p className="ticket-card__seats-amount">{el.departure.available_seats_info.first}</p>
                      <p className="ticket-card__seats-cost">от <span className='ticket-card__seats-span'>{el.departure.price_info.first.top_price}</span> ₽</p>

                      <div className="ticket-card__seats-details">
                        {el.departure.price_info.first.top_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">верхние</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.first.top_price}</span> ₽</p>
                          </div>}

                        {el.departure.price_info.first.bottom_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">нижние</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.first.bottom_price}</span> ₽</p>
                          </div>}

                        {el.departure.price_info.first.side_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">боковые</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.first.side_price}</span> ₽</p>
                          </div>}
                      </div>
                    </div>}

                  {el.departure.have_second_class &&
                    <div className="ticket-card__seats-info">
                      <p className="ticket-card__seats-name">Купе</p>
                      <p className="ticket-card__seats-amount">{el.departure.available_seats_info.second}</p>
                      <p className="ticket-card__seats-cost">от <span className='ticket-card__seats-span'>{el.departure.price_info.second.top_price}</span> ₽</p>

                      <div className="ticket-card__seats-details">
                        {el.departure.price_info.second.top_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">верхние</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.second.top_price}</span> ₽</p>
                          </div>}

                        {el.departure.price_info.second.bottom_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">нижние</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.second.bottom_price}</span> ₽</p>
                          </div>}

                        {el.departure.price_info.second.side_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">боковые</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.second.side_price}</span> ₽</p>
                          </div>}
                      </div>
                    </div>}

                  {el.departure.have_third_class &&
                    <div className="ticket-card__seats-info">
                      <p className="ticket-card__seats-name">Плацкарт</p>
                      <p className="ticket-card__seats-amount">{el.departure.available_seats_info.third}</p>
                      <p className="ticket-card__seats-cost">от <span className='ticket-card__seats-span'>{el.departure.price_info.third.top_price}</span> ₽</p>

                      <div className="ticket-card__seats-details">
                        {el.departure.price_info.third.top_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">верхние</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.third.top_price}</span> ₽</p>
                          </div>}

                        {el.departure.price_info.third.bottom_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">нижние</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.third.bottom_price}</span> ₽</p>
                          </div>}

                        {el.departure.price_info.third.side_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">боковые</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.third.side_price}</span> ₽</p>
                          </div>}
                      </div>
                    </div>}

                  {el.departure.have_fourth_class &&
                    <div className="ticket-card__seats-info">
                      <p className="ticket-card__seats-name">Сидячий</p>
                      <p className="ticket-card__seats-amount">{el.departure.available_seats_info.fourth}</p>
                      <p className="ticket-card__seats-cost">от <span className='ticket-card__seats-span'>{el.departure.price_info.fourth.top_price}</span> ₽</p>

                      <div className="ticket-card__seats-details">
                        {el.departure.price_info.fourth.top_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">верхние</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.fourth.top_price}</span> ₽</p>
                          </div>}

                        {el.departure.price_info.fourth.bottom_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">нижние</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.fourth.bottom_price}</span> ₽</p>
                          </div>}

                        {el.departure.price_info.fourth.side_price &&
                          <div className="ticket-card__seats-info">
                            <p className="ticket-card__seats-name">боковые</p>
                            <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span'>{el.departure.price_info.fourth.side_price}</span> ₽</p>
                          </div>}
                      </div>
                    </div>}
                </div>

                <div className="ticket-card__seats-services">
                  {el.departure.have_wifi && <WifiIcon className='ticket-card__seats-service' />}
                  {el.departure.is_express && <Express className='ticket-card__seats-service' />}
                  <Eating className='ticket-card__seats-service' />
                </div>

                <div className="ticket-card__btn-wrap">
                  <Link className='ticket-card__btn link btn btn_theme_yellow btn_size_small' to={{
                    pathname: `/order/${el.departure._id}`,
                    state: el.departure
                  }}>Выбрать места aaaaa</Link>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    )
  }
}