import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import PathDetails from './Components/PathDetails/PathDetails';
import Passengers from './Components/Passengers/Passengers';
import Coach from './Components/Coach/Coach';
import Preloader from '../../GeneralBlocks/Preloader/Preloader';

import { getSeatsData, clearOrderDetailsData } from '../../../Redux/actions/actions';

class OrderSeats extends React.Component {
  constructor(props) {
    super(props)
    this.seatsRef = React.createRef()
  }

  componentDidMount = () => {
    // scroll to top
    this.seatsRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

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

    this.props.getSeatsData(url, 'OrderSeats');
  }

  render() {
    const pathData = this.props.location.state;
    const { data, loading, error } = this.props.seatsData;
    console.log(this.props)

    if (loading) {
      return <Preloader />
    }

    return (
      <div className="order-seats" ref={this.seatsRef}>
        <h2 className="order-seats__title">Выбор мест</h2>

        <div className="order-seats__inner">
          <div className="order-seats__link-wrap">
            <Link to='/order' className="link order-seats__cahnge-train-link" onClick={this.props.clearOrderDetailsData}>Выбрать другой поезд</Link>
          </div>

          <PathDetails className='order-seats__path-details' pathData={pathData} />
          <Passengers />
          <Coach seatsData={this.props.seatsData.data} />
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
    getSeatsData: (url, fromComponent) => dispatch(getSeatsData(url, fromComponent)),
    clearOrderDetailsData: () => dispatch(clearOrderDetailsData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSeats)