import React from 'react';
import PathDetails from '../PathDetails/PathDetails';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class OrderSeats extends React.Component {

  render() {

    return (
      <div className="order-seats">
        <h2 className="order-seats__title">Выбор мест</h2>

        <div className="order-seats__inner">
          <div className="order-seats__link-wrap">
            <Link to='/order' className="link order-seats__cahnge-train-link">Выбрать другой поезд</Link>
          </div>

          <PathDetails />

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSeats)