import React from 'react';
import { connect } from 'react-redux';

import PassengerRegistrationForm from './Components/PassengerRegistrationForm/PassengerRegistrationForm';

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      adult: this.props.orderDetailsData.ticketCategories.find(category => category.categoryName === 'adult').currentDepartureAmountOfTickets,
      children: this.props.orderDetailsData.ticketCategories.find(category => category.categoryName === 'children').currentDepartureAmountOfTickets,
      totalTicketsAmount: this.props.orderDetailsData.ticketCategories
        .find(category => category.categoryName === 'adult').currentDepartureAmountOfTickets + this.props.orderDetailsData.ticketCategories
          .find(category => category.categoryName === 'children').currentDepartureAmountOfTickets,
      ticketsWithOpenForm: 1
    }
  }

  changePassengersAmountAvailableToRegistration = (category, action = 'subtraction') => {
    if (action === 'subtraction') {
      this.setState(prevState => {
        return { ...prevState, [category]: prevState[category] - 1 }
      }, () => console.log(this.state))
    }
  }

  render() {
    console.log(this.state);
    const amountOfRegistrationFormsToRender = Array(this.state.totalTicketsAmount).fill('');

    return (
      <div className="registration">
        {amountOfRegistrationFormsToRender.map((el, index) => {
          return <PassengerRegistrationForm
            key={index}
            formNumber={index + 1}
            isOpenForm={index < this.state.ticketsWithOpenForm ? true : false}
            adultAvailableAmountOfTickets={this.state.adult}
            childrenAvailableAmountOfTickets={this.state.children}
            changePassengersAmountAvailableToRegistration={this.changePassengersAmountAvailableToRegistration}
          />
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