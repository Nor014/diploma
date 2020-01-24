import React from 'react';

import FindTickets from '../GeneralBlocks/FindTickets/FindTickets';
import OrderSteps from './OrderSteps/OrderSteps';
import OrderFilters from './OrderFilters/OrderFilters';
import LastTickets from './LastTickets/LastTickets';


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
            <div className="order-page__content order-page__side-bar">
              <OrderFilters />
              <LastTickets />
            </div>
          </div>
        </div>
      </div>
    )
  }
}