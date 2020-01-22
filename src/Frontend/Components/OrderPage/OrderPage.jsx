import React from 'react';

import FindTickets from '../GeneralBlocks/FindTickets/FindTickets';
import OrderSteps from './OrderSteps/OrderSteps';


export default class MainPage extends React.Component {

  render() {
    return (
      <div className="order-page">
        <div className="order-page__head container">
          <FindTickets />
        </div>
        
        <OrderSteps />
      </div>
    )
  }
}