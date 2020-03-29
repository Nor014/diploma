import React from 'react';
import { connect } from 'react-redux';

import Tickets from '../OrderTickets/Components/Tickets/Tickets';


class DataConfirmation extends React.Component {

  render() {
    console.log(this.props)

    return (
      <div className='confirmation'>

        <div className="confirmation__inner">
          <div className="confirmation__head">
            <h2 className='confirmation__title'>Поезд</h2>
          </div>

          <Tickets data={[this.props.orderDetailsData.fullPathData]} maxTicketsToShow={1} />
        </div>


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { orderDetailsData } = state;

  return {
    orderDetailsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataConfirmation)