import React from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { setRouteDirectionId, changeOrderStep, submitDataToDefaultState } from '../../../Redux/actions/actions';

import PassengerRegistrationForm from './Components/PassengerRegistrationForm/PassengerRegistrationForm';

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.registrationRef = React.createRef();
    this.state = {
      adult: {
        availableAmountOfPassengersToRegistrate: this.props.orderDetailsData.ticketCategories.find(category => category.categoryName === 'adult').currentDepartureAmountOfTickets,
        alreadyRegistered: 0
      },
      children: {
        availableAmountOfPassengersToRegistrate: this.props.orderDetailsData.ticketCategories.find(category => category.categoryName === 'children').currentDepartureAmountOfTickets,
        alreadyRegistered: 0
      },
      totalTicketsAmount: this.props.orderDetailsData.ticketCategories
        .find(category => category.categoryName === 'adult').currentDepartureAmountOfTickets + this.props.orderDetailsData.ticketCategories
          .find(category => category.categoryName === 'children').currentDepartureAmountOfTickets,
      ticketsWithOpenForm: 1
    }
  }

  componentDidMount = () => {
    this.registrationRef.current.scrollIntoView({ // scroll to top
      behavior: 'smooth',
      block: 'start',
    });

    this.props.submitDataToDefaultState(); // возврат дефолтного состояния редьюсера - для работы с sessionStorage

    this.props.orderDetailsData.pathDetails.forEach(path => {
      if (path.details !== null) {
        this.props.setRouteDirectionId(path.name, path.details.pathId)
      }
    })
  }

  changePassengersAmountAvailableToRegistration = (category, action = 'subtraction') => {
    if (action === 'subtraction') {
      this.setState(prevState => {
        const newState = { ...prevState[category] };

        newState.availableAmountOfPassengersToRegistrate -= 1;
        newState.alreadyRegistered += 1;

        return { ...prevState, [category]: newState }
      }, () => console.log(this.state))
    }

    if (action === 'add') {
      this.setState(prevState => {
        const newState = { ...prevState[category] };

        newState.availableAmountOfPassengersToRegistrate += 1;
        newState.alreadyRegistered -= 1;

        return { ...prevState, [category]: newState }
      }, () => console.log(this.state))
    }
  }

  render() {
    console.log(this.state);
    const amountOfRegistrationFormsToRender = Array(this.state.totalTicketsAmount).fill('');
    const orderPageLinkClass = this.state.adult.availableAmountOfPassengersToRegistrate === 0 && this.state.children.availableAmountOfPassengersToRegistrate === 0
      ? 'order-page__link_active'
      : 'order-page__link_disabled';

    return (
      <div className='registration'>
        <div className="registration__inner" ref={this.registrationRef}>
          {amountOfRegistrationFormsToRender.map((el, index) => {
            return <PassengerRegistrationForm key={index}
              formNumber={index + 1}
              isOpenForm={index < this.state.ticketsWithOpenForm ? true : false}
              adultCategory={this.state.adult}
              childrenCategory={this.state.children}
              changePassengersAmountAvailableToRegistration={this.changePassengersAmountAvailableToRegistration}
              orderDetailsData={this.props.orderDetailsData}
              withArrivalPath={this.props.orderDetailsData.pathDetails.find(el => el.name === 'arrival').details !== null ? true : false} />
          })}
        </div>

        <div className="order-page__link-wrap">
          <Link to='/order/payment' className={`link btn btn_theme_yellow btn_size_small order-page__link ${orderPageLinkClass}`}
            onClick={() => this.props.changeOrderStep(3)}>Далее</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { orderDetailsData } = state;

  return {
    orderDetailsData: orderDetailsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRouteDirectionId: (direction, id) => dispatch(setRouteDirectionId(direction, id)),
    changeOrderStep: (stepIndex) => dispatch(changeOrderStep(stepIndex)),
    submitDataToDefaultState: () => dispatch(submitDataToDefaultState())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Registration)