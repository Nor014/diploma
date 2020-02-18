import React from "react";
import { getLastTickets } from '../../../Redux/actions/actions';
import { connect } from 'react-redux';

import { ReactComponent as WifiIcon } from '../OrderTickets/Components/Tickets/order-tickets_icon-wifi.svg';
import { ReactComponent as Express } from '../OrderTickets/Components/Tickets/order-tickets_icon-express.svg';
import { ReactComponent as Eating } from '../OrderTickets/Components/Tickets/order-tickets__icon-eating.svg';

class LastTickets extends React.Component {

  componentDidMount = () => {
    let url = 'https://netology-trainbooking.herokuapp.com/routes/last';
    this.props.getLastTickets(url, 'LastTickets');
  }

  render() {
    const { data } = this.props.lastTicketsData;
    
    return (
      <div className="last-tickets">
        <h2 className="last-tickets__title">Последние билеты</h2>

        <div className="last-tickets__inner">
          {data.length > 0 &&
            data.map(el => {
              return (
                <div className="last-tickets__item" key={el.departure._id}>
                  <div className="last-tickets__path-details">
                    <div className="last-tickets__path">
                      <p className="last-tickets__city">{el.departure.from.city.name}</p>
                      <p className="last-tickets__station">{el.departure.from.railway_station_name}</p>
                    </div>
                    <div className="last-tickets__path">
                      <p className="last-tickets__city">{el.departure.to.city.name}</p>
                      <p className="last-tickets__station">{el.departure.to.railway_station_name}</p>
                    </div>
                  </div>

                  <div className="last-tickets__other-details">
                    <div className="last-tickets__services">
                      {el.departure.have_wifi
                        ? <WifiIcon className='last-tickets__icon' />
                        : null}
                      {el.departure.is_express
                        ? <Express className='last-tickets__icon' />
                        : null}
                      <Eating className='last-tickets__icon' />
                    </div>

                    <p className="last-tickets__cost">от <span className='last-tickets__cost-span'>{el.departure.min_price}</span> <span className='last-tickets__ruble'>₽</span></p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  const { lastTicketsData } = state;

  return {
    lastTicketsData: lastTicketsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLastTickets: (url, fromComponent) => dispatch(getLastTickets(url, fromComponent))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LastTickets)