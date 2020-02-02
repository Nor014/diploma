import React from "react";
import { getLastTickets } from '../../../Redux/actions/actions';
import { connect } from 'react-redux';

class LastTickets extends React.Component {

  componentDidMount = () => {
    let url = 'https://netology-trainbooking.herokuapp.com/routes/last';
    this.props.getLastTickets(url, 'LastTickets');
  }

  render() {
    const { data } = this.props.lastTicketsData;

    console.log(data)

    return (
      <div className="last-tickets">
        <h2 className="last-tickets__title">Последние билеты</h2>

        <div className="last-tickets__inner">
          <div className="last-tickets__item">
            
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { lastTicketsData } = state;

  return {
    lastTicketsData: lastTicketsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLastTickets: (url, fromComponent) => dispatch(getLastTickets(url, fromComponent))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LastTickets)