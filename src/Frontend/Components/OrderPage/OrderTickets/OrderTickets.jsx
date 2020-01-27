import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';

import { ReactComponent as WifiIcon } from './order-tickets_icon-wifi.svg';
import { ReactComponent as Express } from './order-tickets_icon-express.svg';
import { ReactComponent as Eating } from './order-tickets__icon-eating.svg';

class OrderTickets extends React.Component {

  secondsToTime = (seconds) => {
    return moment(seconds * 1000).format("HH:mm")
  }

  secondsToDuration = (seconds) => {
    const totalDuration = seconds / 60 / 60;
    const hours = Math.floor(totalDuration);
    const minutes = ((totalDuration - hours) * 60).toFixed(0)

    return `${hours} : ${minutes}`;
  }

  render() {
    const { data } = this.props.ticketsData;
    console.log(data.items, moment(355500 * 1000).format("HH:mm"))

    return (
      <div className="order-tickets">
       
        <div className="ticket-card">
          <div className="ticket-card__train">
            <div className="ticket-card__inner">
              <p className='ticket-card__train-name'>116С </p>
              <p className="ticket-card__train-path">Москва → <br /> Санкт-Петербург <br />«Мегаполис»</p>
            </div>
          </div>

          <div className="ticket-card__details">
            <div className="ticket-card__path-details">
              <div className="ticket-card__path-item">
                <p className="ticket-card__time">00:10</p>
                <p className="ticket-card__city ">Москва</p>
                <p className="ticket-card__station">Курский вокзал</p>
              </div>

              <p className="ticket-card__duration ticket-card_pointer_departure">9:42</p>

              <div className="ticket-card__path-item">
                <p className="ticket-card__time">09:52</p>
                <p className="ticket-card__city">Санкт-Питербург</p>
                <p className="ticket-card__station">Ладожский вокзал</p>
              </div>
            </div>

            <div className="ticket-card__path-details">
              <div className="ticket-card__path-item">
                <p className="ticket-card__time">00:10</p>
                <p className="ticket-card__city ">Москва</p>
                <p className="ticket-card__station">Курский вокзал</p>
              </div>

              <p className="ticket-card__duration ticket-card_pointer_arrival">9:42</p>

              <div className="ticket-card__path-item">
                <p className="ticket-card__time">09:52</p>
                <p className="ticket-card__city">Санкт-Питербург</p>
                <p className="ticket-card__station">Ладожский вокзал</p>
              </div>
            </div>

          </div>

          <div className="ticket-card__seats">
            <div className="ticket-card__seats-classes">
              <div className="ticket-card__seats-class">
                <p className="ticket-card__seats-class-name">Купе</p>
                <p className="ticket-card__seats-amount">95</p>
                <p className="ticket-card__seats-cost">от <span className='ticket-card__seats-span'>3000</span> ₽</p>
              </div>

              <div className="ticket-card__seats-class">
                <p className="ticket-card__seats-class-name">Сидячий</p>
                <p className="ticket-card__seats-amount">95</p>
                <p className="ticket-card__seats-cost">от <span className='ticket-card__seats-span'>3000</span> ₽</p>
              </div>

              <div className="ticket-card__seats-class">
                <p className="ticket-card__seats-class-name">Плацкарт</p>
                <p className="ticket-card__seats-amount">95</p>
                <p className="ticket-card__seats-cost">от <span className='ticket-card__seats-span'>3000</span> ₽</p>
              </div>
            </div>

            <div className="ticket-card__seats-services">
              <WifiIcon className='ticket-card__seats-service' />
              <Express className='ticket-card__seats-service' />
              <Eating className='ticket-card__seats-service' />
            </div>

            <button className='ticket-card__btn btn btn_theme_yellow btn_size_small'>Выбрать места</button>

          </div>
        </div>

        {data.items !== undefined &&
          data.items.map(el => {
            return (
              <div className="ticket-card">
                <div className="ticket-card__train">
                  <div className="ticket-card__inner">
                    <p className='ticket-card__train-name'>{el.departure.train.name}</p>
                    <p className="ticket-card__train-path">{el.departure.from.city.name} → <br /> {el.departure.to.city.name}</p>
                  </div>
                </div>

                <div className="ticket-card__details">
                  <div className="ticket-card__path-details">
                    <div className="ticket-card__path-item">
                      <p className="ticket-card__time">{this.secondsToTime(el.departure.from.datetime)}</p>
                      <p className="ticket-card__city ">{el.departure.from.city.name}</p>
                      <p className="ticket-card__station">{el.departure.from.railway_station_name}</p>
                    </div>

                    <p className="ticket-card__duration ticket-card_pointer_departure">{this.secondsToDuration(el.departure.duration)}</p>

                    <div className="ticket-card__path-item">
                      <p className="ticket-card__time">{this.secondsToTime(el.departure.to.datetime)}</p>
                      <p className="ticket-card__city">{el.departure.to.city.name}</p>
                      <p className="ticket-card__station">{el.departure.to.railway_station_name}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { ticketsData } = state;

  return {
    ticketsData: ticketsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTickets)