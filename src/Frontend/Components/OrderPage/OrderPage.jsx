import React from 'react';

import FindTickets from '../GeneralBlocks/FindTickets/FindTickets';
import OrderSteps from './OrderSteps/OrderSteps';
import OrderFilters from './OrderFilters/OrderFilters';
import LastTickets from './LastTickets/LastTickets';
import OrderTickets from './OrderTickets/OrderTickets';


export default class OrderPage extends React.Component {

  render() {
    return (
      <div className="order-page">
        <div className="order-page__head">
          <div className="container">
            <FindTickets />
          </div>
        </div>

        <OrderSteps />

        <div className="order-page__body ">
          <div className="order-page__inner container">
            <div className="order-page__aside">
              <OrderFilters />
              <LastTickets />
            </div>

            <div className="order-page__cards">
              <OrderTickets />
            </div>
          </div>
        </div>
      </div>
    )
  }
}