import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import PathDetails from './Components/PathDetails/PathDetails';
import Passengers from './Components/Passengers/Passengers';
import Coach from './Components/Coach/Coach';
import Preloader from '../../GeneralBlocks/Preloader/Preloader';

import { getSeatsData, setPathDetails, clearOrderDetailsData } from '../../../Redux/actions/actions';

class OrderSeats extends React.Component {
  constructor(props) {
    super(props)
    this.seatsRef = React.createRef()
  }

  componentDidMount = () => {
    this.seatsRef.current.scrollIntoView({ // scroll to top
      behavior: 'smooth',
      block: 'start',
    });

    // get seatsData
    const directions = this.props.location.state;

    directions.forEach(direction => { // запрос данных для departure и arrival
      if (direction.data !== null) {
        let url = `https://netology-trainbooking.herokuapp.com/routes/${direction.data._id}/seats?`;
        let directionName = direction.name;

        this.props.getSeatsData(url, directionName, 'OrderSeats');
        this.props.clearOrderDetailsData(); // очищаем данные о пассажирах при перезагрузке, иначе отразятся данные из localStorage, в данном случае это не нужно

        // set path details
        const pathData = direction.data,
          pathDetailsObj = {
            train: pathData.train,
            from: pathData.from,
            to: pathData.to,
            duration: pathData.durationToRender
          }

        this.props.setPathDetails(pathDetailsObj);
      }
    })
  }

  render() {
    // const directions = this.props.seatsData;
    const { data, loading, error } = this.props.seatsData;
    const { ticketCategories } = this.props.orderDetailsData;

    // общее число выбранных пассажиров для дизейбла/активации кнопки перехода к оформлению пассажиров 
    const passengersAmount = ticketCategories.reduce((acc, el) => acc + el.currentAmountOfTickets, 0)
    const toRegistrationLinkClass = passengersAmount > 0
      ? "link order-seats__to-registration-link btn btn_theme_yellow btn_size_small"
      : "link order-seats__to-registration-link btn btn_theme_yellow btn_size_small link_disabled"

    if (loading) {
      return <Preloader />
    }

    return (
      <div className="order-seats" ref={this.seatsRef}>
        <h2 className="order-seats__title">Выбор мест</h2>

        {data.map((direction, index) => {
          return direction.seatsData !== null
            ? <div className="order-seats__inner" key={index}>
              <div className="order-seats__link-wrap">
                <Link to='/order' className="link order-seats__cahnge-train-link" onClick={this.props.clearOrderDetailsData}>Выбрать другой поезд</Link>
              </div>

              <PathDetails className='order-seats__path-details' pathData={this.props.location.state.find(el => el.name === direction.name).data} />
              <Passengers />
              <Coach direction={direction.name} />
            </div>
            : null
        })}

        <div className="order-seats__to-registration-link-wrap">
          <Link to='/order/registration' className={toRegistrationLinkClass}>Далее</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { seatsData, orderDetailsData } = state;

  return {
    seatsData: seatsData,
    orderDetailsData: orderDetailsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSeatsData: (url, directionName, fromComponent) => dispatch(getSeatsData(url, directionName, fromComponent)),
    setPathDetails: (ditails) => dispatch(setPathDetails(ditails)),
    clearOrderDetailsData: () => dispatch(clearOrderDetailsData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSeats)