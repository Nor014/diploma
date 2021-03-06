import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import PathDetails from './Components/PathDetails/PathDetails';
import Passengers from './Components/Passengers/Passengers';
import Coach from './Components/Coach/Coach';
import Preloader from '../../GeneralBlocks/Preloader/Preloader';

import { getSeatsData, setPathDetails, clearOrderDetailsData, clearSeatsData, changeOrderStep, setFullPathData, orderStepComplete } from '../../../Redux/actions/actions';

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
    const directions = this.props.location.state.date_with_breakdown;

    directions.forEach(direction => { // запрос данных для departure и arrival
      if (direction.data !== null) {
        const url = `https://netology-trainbooking.herokuapp.com/routes/${direction.data._id}/seats?`;
        const directionName = direction.name;

        this.props.getSeatsData(url, directionName, 'OrderSeats');

        const pathData = direction.data; // set path details
        const pathDetailsObj = {
          pathId: pathData._id,
          train: pathData.train,
          from: pathData.from,
          to: pathData.to,
          duration: pathData.durationToRender
        }

        this.props.setPathDetails(pathDetailsObj, direction.name);
      }

      this.props.setFullPathData(this.props.location.state.full_path_date); // костыль специально для рендера карточки на странице подтверждения данных
    })
  }

  backReducersToDefaultState = () => { // возврат дефолтного состояния редьюсеров
    this.props.clearOrderDetailsData();
    this.props.clearSeatsData();
  }

  onLinkClick = () => {
    this.props.changeOrderStep(2);
    this.props.orderStepComplete('order-seats');
  }

  render() {
    const { data, loading } = this.props.seatsData;
    const { ticketCategories } = this.props.orderDetailsData;

    const arraivalData = data.find(direction => direction.name === 'arrival').directionSeatsData;
    const departurePassengersAmount = ticketCategories.reduce((acc, el) => acc + el.currentDepartureAmountOfTickets, 0);
    const arrivalPassengersAmount = ticketCategories.reduce((acc, el) => acc + el.currentArrivalAmountOfTickets, 0);

    const toRegistrationLinkClass = arraivalData === null // кнопка активна если нет arrival и есть хотябы один выбранный билет
      ? departurePassengersAmount > 0
        ? "order-page__link_active"
        : "order-page__link_disabled"
      : departurePassengersAmount !== 0 && departurePassengersAmount === arrivalPassengersAmount // кнопка активна если количество билетов arrival и departure совпадают 
        ? "order-page__link_active"
        : "order-page__link_disabled";

    if (loading) {
      return <Preloader />
    }

    return (
      <div className="order-seats" ref={this.seatsRef}>
        <h2 className="order-seats__title">Выбор мест</h2>

        {arraivalData !== null &&
          <p className='order-seats__attention-info'>Количество билетов для отправления и прибытия должно быть одинаково, т.е. предполагается, что человек покупает билет для одних и тех же людей в обе стороны!</p>}

        {data.map((direction, index) => direction.directionSeatsData !== null &&
          <div className="order-seats__inner" key={index}>
            <div className={`order-seats__link-wrap order-seats__link_type_${direction.name === 'departure' ? 'to' : 'from'}`}>
              <Link to='/order' className="link order-seats__cahnge-train-link" onClick={this.backReducersToDefaultState}>Выбрать другой поезд</Link>
            </div>

            <PathDetails pathData={this.props.location.state.date_with_breakdown.find(el => el.name === direction.name).data} direction={direction.name} />
            <Passengers direction={direction.name} />
            <Coach direction={direction.name} />
          </div>
        )}

        <div className="order-page__link-wrap">
          <Link to='/order/registration' className={`link order-page__link btn btn_theme_yellow btn_size_small ${toRegistrationLinkClass}`}
            onClick={this.onLinkClick}>Далее</Link>
        </div>
      </div >
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
    changeOrderStep: (stepIndex) => dispatch(changeOrderStep(stepIndex)),
    setFullPathData: (data) => dispatch(setFullPathData(data)),
    orderStepComplete: (fromComponent) => dispatch(orderStepComplete(fromComponent))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSeats)