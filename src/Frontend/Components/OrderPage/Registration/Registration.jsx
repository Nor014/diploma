import React from 'react';
import { connect } from 'react-redux';

import PassengerRegistrationForm from './Components/PassengerRegistrationForm/PassengerRegistrationForm';

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      departure: {
        adult: {
          ticketsAmount: this.props.orderDetailsData.ticketCategories
            .find(category => category.categoryName === 'adult').currentDepartureAmountOfTickets,
          ticketRegistered: 0
        },
        children: {
          ticketsAmount: this.props.orderDetailsData.ticketCategories
            .find(category => category.categoryName === 'children').currentDepartureAmountOfTickets,
          ticketRegistered: 0
        }
      },
      arrival: {
        adult: {
          ticketsAmount: this.props.orderDetailsData.ticketCategories
            .find(category => category.categoryName === 'adult').currentArrivalAmountOfTickets,
          ticketRegistered: 0
        },
        children: {
          ticketsAmount: this.props.orderDetailsData.ticketCategories
            .find(category => category.categoryName === 'children').currentArrivalAmountOfTickets,
          ticketRegistered: 0
        }
      },
      totalTicketsAmount: this.props.orderDetailsData.ticketCategories
        .find(category => category.categoryName === 'adult').totalAmountOfTickets + this.props.orderDetailsData.ticketCategories
          .find(category => category.categoryName === 'children').totalAmountOfTickets,
      ticketsWithOpenForm: 3
    }
  }

  render() {
    console.log(this.state);
    const amountOfRegistrationFormsToRender = Array(this.state.totalTicketsAmount).fill('');

    return (
      <div className="registration">
        {amountOfRegistrationFormsToRender.map((el, index) => {
          return <PassengerRegistrationForm key={index} formNumber={index + 1} isOpenForm={index <= 1 ? true : false} />
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