import React from 'react';
import PathDetails from '../PathDetails/PathDetails';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { getSeatsData } from '../../../Redux/actions/actions';

class OrderSeats extends React.Component {

  componentDidMount = () => {
    const ticketData = this.props.location.state;
    let url = `https://netology-trainbooking.herokuapp.com/routes/${ticketData._id}/seats?`;

    let params = [];

    for (let [key, value] of Object.entries(ticketData)) {
      if (key === 'have_wifi' || key === 'have_air_conditioning') {
        params.push({ name: key, value: value })
      }
    }

    // params.forEach(el => {
    //   url += el.name + '=' + el.value + '&';
    // })

    this.props.getSeatsData(url, 'OrderSeats')
  }

  render() {
    console.log(this.props)

    return (
      <div className="order-seats">
        <h2 className="order-seats__title">Выбор мест</h2>

        <div className="order-seats__inner">
          <div className="order-seats__link-wrap">
            <Link to='/order' className="link order-seats__cahnge-train-link">Выбрать другой поезд</Link>
          </div>

          <PathDetails />

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { seatsData } = state;
  return {
    seatsData: seatsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSeatsData: (url, fromComponent) => dispatch(getSeatsData(url, fromComponent))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSeats)