import React from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { setRouteDirectionId, changeOrderStep } from '../../../Redux/actions/actions';

import PassengerRegistrationForm from './Components/PassengerRegistrationForm/PassengerRegistrationForm';

class Registration extends React.Component {
  constructor(props) {
    super(props)
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
    const registrationLinkClass = this.state.adult.availableAmountOfPassengersToRegistrate === 0 && this.state.children.availableAmountOfPassengersToRegistrate === 0
      ? 'registration__link_active'
      : 'registration__link_disabled';

    return (
      <div className='registration'>
        <div className="registration__inner">
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

        <div className="registration__link-wrap">
          <Link to='/order/payment' className={`link btn btn_theme_yellow btn_size_small registration__link ${registrationLinkClass}`}
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
    changeOrderStep: (stepIndex) => dispatch(changeOrderStep(stepIndex))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Registration)