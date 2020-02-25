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
    const ticketData = this.props.location.state;
    let url = `https://netology-trainbooking.herokuapp.com/routes/${ticketData._id}/seats?`;

    // let params = [];

    // for (let [key, value] of Object.entries(ticketData)) {
    //   if (key === 'have_wifi' || key === 'have_air_conditioning') {
    //     params.push({ name: key, value: value })
    //   }
    // }

    // params.forEach(el => {
    //   url += el.name + '=' + el.value + '&';
    // })

    this.props.getSeatsData(url, 'OrderSeats');
    this.props.clearOrderDetailsData(); // очищаем данные о пассажирах при перезагрузке, иначе отразятся данные из localStorage, в данном случаэ это не нужно

    // set path details
    const pathData = this.props.location.state,
      pathDetailsObj = {
        train: pathData.train,
        from: pathData.from,
        to: pathData.to,
        duration: pathData.durationToRender
      }

    this.props.setPathDetails(pathDetailsObj);
  }

  render() {
    const pathData = this.props.location.state;
    const { data, loading, error } = this.props.seatsData;
    const { ticketCategories } = this.props.orderDetailsData;

    // общее число выбранных пассажиров для дизейбла/активации кнопки перехода к оформлению пассажиров 
    const passengersAmount = ticketCategories.reduce((acc, el) => acc + el.currentAmountOfTickets, 0)
    const toRegistrationLinkClass = passengersAmount > 0
      ? "link order-seats__to-registration-link btn btn_theme_yellow btn_size_small"
      : "link order-seats__to-registration-link btn btn_theme_yellow btn_size_small link_disabled"

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
    getSeatsData: (url, fromComponent) => dispatch(getSeatsData(url, fromComponent)),
    setPathDetails: (ditails) => dispatch(setPathDetails(ditails)),
    clearOrderDetailsData: () => dispatch(clearOrderDetailsData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSeats)