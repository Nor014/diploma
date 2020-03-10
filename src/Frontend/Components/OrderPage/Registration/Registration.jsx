import React from 'react';
import { connect } from 'react-redux';

import PassengerRegistrationForm from './Components/PassengerRegistrationForm/PassengerRegistrationForm';

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    console.log(this.props)

    return (
      <div className="registration">
        <PassengerRegistrationForm />
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