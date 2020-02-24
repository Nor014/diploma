import React from 'react';

import OrderFilters from '../OrderFilters/OrderFilters';
import LastTickets from '../LastTickets/LastTickets';

export default class OrderAside extends React.Component {
  render() {
    return (
      <div className="order-aside">
        <OrderFilters />
        <LastTickets />
      </div>
    )
  }
} 