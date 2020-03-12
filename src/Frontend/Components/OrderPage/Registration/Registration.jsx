import React from 'react';
import { connect } from 'react-redux';

import PassengerRegistrationForm from './Components/PassengerRegistrationForm/PassengerRegistrationForm';

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      adult: {
        ticketsAmount: this.props.orderDetailsData.ticketCategories
          .find(category => category.categoryName === 'adult').currentDepartureAmountOfTickets,
        ticketRegistered: 0
      },
      children: {
        ticketsAmount: this.props.orderDetailsData.ticketCategories
          .find(category => category.categoryName === 'children').currentDepartureAmountOfTickets,
        ticketRegistered: 0
      },
      totalTicketsAmount: this.props.orderDetailsData.ticketCategories
        .find(category => category.categoryName === 'adult').currentDepartureAmountOfTickets + this.props.orderDetailsData.ticketCategories
          .find(category => category.categoryName === 'children').currentDepartureAmountOfTickets,
      ticketsWithOpenForm: 3
    }
  }

  changeTicketRegisteredAmount = (category, action = 'add') => {
    if (action === 'add') {
      this.setState(prevState => {
        const newState = { ...prevState[category] }
        newState.ticketRegistered++;

        return { ...prevState, [category]: newState }
      }, () => console.log(this.state))
    }

    console.log(category, action)
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
            isOpenForm={index <= 1 ? true : false}
            adultAvailableAmountOfTickets={Number(this.state.adult.ticketsAmount) - this.state.adult.ticketRegistered}
            childrenAvailableAmountOfTickets={Number(this.state.children.ticketsAmount) - this.state.children.ticketRegistered}
            changeTicketRegisteredAmount={this.changeTicketRegisteredAmount}
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