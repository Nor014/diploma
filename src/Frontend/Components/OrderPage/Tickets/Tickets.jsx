import React from "react";
import { Link } from "react-router-dom";
import SvgIcon from '../../GeneralBlocks/SvgIcon/SvgIcon';


export default class Tickets extends React.Component {
  render() {
    const { data, maxTicketsToShow, renderFromConfirmation } = this.props;
    console.log(data)

    return (
      <div className="tickets">
        {data.map((el, index) => index + 1 <= maxTicketsToShow && (
          <div className="ticket-card" key={el.departure._id}>
            <div className="ticket-card__train"> {/* информация о поезде */}
              <div className="ticket-card__train-inner">
                <p className='ticket-card__train-name'>{el.departure.train.name}</p>
                <p className="ticket-card__train-path"> {el.departure.from.city.name} → <br />
                  {el.departure.to.city.name}</p>
              </div>
            </div>

            <div className="ticket-card__details"> {/* информация о пути */}
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

            <div className="ticket-card__seats"> {/* информация о местах */}
              <div className="ticket-card__seats-classes">
                {el.departure.classes.map((coachClass, index) => {
                  return (
                    <div className="ticket-card__seats-info" key={index}>
                      <p className="ticket-card__seats-name">{coachClass.className}</p>
                      <p className="ticket-card__seats-amount">{coachClass.seatsAmount}</p>
                      <p className="ticket-card__seats-cost">от <span className='ticket-card__seats-span price price_with_ruble-icon'>{coachClass.seatsPrice}</span></p>

                      <div className="ticket-card__seats-details"> {/* Всплывающая подсказка */}
                        {coachClass.seatsDetails.map((details, index) => {
                          return (
                            <div className="ticket-card__seats-info" key={index}>
                              <p className="ticket-card__seats-name">{details.seatsType}</p>
                              <p className="ticket-card__seats-cost"><span className='ticket-card__seats-span price price_with_ruble-icon'>{details.seatsPrice}</span></p>
                            </div>
                          )
                        })}
                      </div>
                    </div>)
                })}
              </div>

              <div className="ticket-card__seats-services">
                {el.departure.have_wifi && <SvgIcon icon='ticket-wifi' className='ticket-card__seats-service' />}
                {el.departure.is_express && <SvgIcon icon='ticket-express' className='ticket-card__seats-service' />}
                <SvgIcon icon='ticket-food' className='ticket-card__seats-service' />
              </div>

              <div className="ticket-card__btn-wrap">
                {!renderFromConfirmation

                  ? <Link className='ticket-card__btn link btn btn_theme_yellow btn_size_small'
                    to={{
                      pathname: `/order/${el.departure._id}`,
                      state: {
                        date_with_breakdown: [{ name: 'departure', data: el.departure }, { name: 'arrival', data: el.arrival || null }],
                        full_path_date: el
                      }
                    }}>Выбрать места</Link>

                  : <Link to='/order' className='ticket-card__btn link btn btn_theme_white btn_size_small'
                    onClick={this.props.onLinkClick}>Изменить</Link>}
              </div>
            </div>
          </div>))}
      </div>
    )
  }
}