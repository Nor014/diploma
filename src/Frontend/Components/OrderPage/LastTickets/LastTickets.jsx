import React from "react";
import { getLastTickets } from '../../../Redux/actions/actions';
import { connect } from 'react-redux';

import SvgIcon from '../../GeneralBlocks/SvgIcon/SvgIcon';

class LastTickets extends React.Component {
  componentDidMount = () => {
    const url = 'https://netology-trainbooking.herokuapp.com/routes/last';
    this.props.getLastTickets(url, 'LastTickets');
  }

  render() {
    const { lastTickets } = this.props.lastTicketsData;
    return (
      <>
        {lastTickets.length > 0 &&
          <div className="last-tickets">
            <h2 className="last-tickets__title">Последние билеты</h2>
            <div className="last-tickets__inner">
              {lastTickets.map(ticket =>
                <div className="last-tickets__item" key={ticket.departure._id}>
                  <div className="last-tickets__path-details">
                    <div className="last-tickets__path">
                      <p className="last-tickets__city">{ticket.departure.from.city.name}</p>
                      <p className="last-tickets__station">{ticket.departure.from.railway_station_name}</p>
                    </div>
                    <div className="last-tickets__path">
                      <p className="last-tickets__city">{ticket.departure.to.city.name}</p>
                      <p className="last-tickets__station">{ticket.departure.to.railway_station_name}</p>
                    </div>
                  </div>

                  <div className="last-tickets__other-details">
                    <div className="last-tickets__services">
                      {ticket.departure.have_wifi &&
                        <SvgIcon icon='ticket-wifi' className='last-tickets__icon' />}
                      {ticket.departure.is_express &&
                        <SvgIcon icon='ticket-express' className='last-tickets__icon' />}

                      <SvgIcon icon='ticket-food' className='last-tickets__icon' />
                    </div>

                    <p className="last-tickets__cost">от <span className='last-tickets__cost-span'>{ticket.departure.min_price}</span> <span className='last-tickets__ruble'>₽</span></p>
                  </div>
                </div>)}
            </div>
          </div >}
      </>
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