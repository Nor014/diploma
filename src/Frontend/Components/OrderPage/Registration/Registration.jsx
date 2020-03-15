import React from 'react';
import { connect } from 'react-redux';

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

  changePassengersAmountAvailableToRegistration = (category, action = 'subtraction') => {
    if (action === 'subtraction') {
      this.setState(prevState => {
        const newState = { ...prevState[category] };

        newState.availableAmountOfPassengersToRegistrate -= 1;
        newState.alreadyRegistered += 1;

        return { ...prevState, [category]: newState }
      }, () => console.log(this.state))
    }
  }

  render() {
    console.log(this.state);
    const amountOfRegistrationFormsToRender = Array(this.state.totalTicketsAmount).fill('');

    return (
      <div className="registration">
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

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Registration)