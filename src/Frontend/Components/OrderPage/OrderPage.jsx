import React from 'react';
import { Switch, Route } from "react-router-dom";

import FindTickets from '../GeneralBlocks/FindTickets/FindTickets';
import OrderSteps from './OrderSteps/OrderSteps';
import OrderFilters from './OrderFilters/OrderFilters';
import LastTickets from './LastTickets/LastTickets';
import OrderTickets from './OrderTickets/OrderTickets';
import OrderSeats from './OrderSeats/OrderSeats';


export default class OrderPage extends React.Component {
  constructor() {
    super();
    this.contentRef = React.createRef();
  }

  render() {
    return (
      <div className="order-page">
        <div className="order-page__head">
          <div className="container">
            <FindTickets scrollTo={this.contentRef} />
          </div>
        </div>

        <OrderSteps />

        <div className="order-page__body ">
          <div className="order-page__inner container">
            <div className="order-page__aside">
              <OrderFilters />
              <LastTickets />
            </div>
            <div className="order-page__content" ref={this.contentRef}>
              <Switch>
                <Route exact path='/order' component={OrderTickets} />
                <Route exact path='/order/:id' component={OrderSeats} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}