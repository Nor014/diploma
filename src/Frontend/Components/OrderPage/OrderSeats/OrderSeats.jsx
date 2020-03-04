import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import PathDetails from './Components/PathDetails/PathDetails';
import Passengers from './Components/Passengers/Passengers';
import Coach from './Components/Coach/Coach';
import Preloader from '../../GeneralBlocks/Preloader/Preloader';

import { getSeatsData, setPathDetails, clearOrderDetailsData, clearSeatsData, changeOrderStep } from '../../../Redux/actions/actions';

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

    this.backReducersToDefaultState(); // очищаем данные о пассажирах при перезагрузке, иначе отразятся данные из sessionStorage, в данном случае это не нужно

    // get seatsData
    const directions = this.props.location.state;

    directions.forEach(direction => { // запрос данных для departure и arrival
      if (direction.data !== null) {
        const url = `https://netology-trainbooking.herokuapp.com/routes/${direction.data._id}/seats?`;
        const directionName = direction.name;

        this.props.getSeatsData(url, directionName, 'OrderSeats');

        // set path details
        const pathData = direction.data,
          pathDetailsObj = {
            train: pathData.train,
            from: pathData.from,
            to: pathData.to,
            duration: pathData.durationToRender
          }

        this.props.setPathDetails(pathDetailsObj, direction.name);
      }
    })
  }

  backReducersToDefaultState = () => { // возврат дефолтного состояния редьюсеров
    this.props.clearOrderDetailsData();
    this.props.clearSeatsData();
  }

  render() {
    const { data, loading, error } = this.props.seatsData;
    const { ticketCategories } = this.props.orderDetailsData;
    console.log(this.props)

    // общее число выбранных пассажиров для дизейбла/активации кнопки перехода к оформлению пассажиров 
    // (только по отправлению, заказ билета для arrival без departure не имеет смысла) 
    const passengersAmount = ticketCategories.reduce((acc, el) => acc + el.currentDepartureAmountOfTickets, 0)
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
          return direction.directionSeatsData !== null &&
            <div className="order-seats__inner" key={index}>
              <div className={`order-seats__link-wrap order-seats__link_type_${direction.name === 'departure' ? 'to' : 'from'}`}>
                <Link to='/order' className="link order-seats__cahnge-train-link" onClick={this.backReducersToDefaultState}>Выбрать другой поезд</Link>
              </div>

              <PathDetails className='order-seats__path-details'
                pathData={this.props.location.state.find(el => el.name === direction.name).data}
                direction={direction.name} />

              <Passengers direction={direction.name} />
              <Coach direction={direction.name} />
            </div>
        })}

        <div className="order-seats__to-registration-link-wrap">
          <Link to='/order/registration' className={toRegistrationLinkClass}
            onClick={() => this.props.changeOrderStep(2)}>Далее</Link>
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
    setPathDetails: (ditails, direction) => dispatch(setPathDetails(ditails, direction)),
    clearOrderDetailsData: () => dispatch(clearOrderDetailsData()),
    clearSeatsData: () => dispatch(clearSeatsData()),
    changeOrderStep: (stepIndex) => dispatch(changeOrderStep(stepIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSeats)