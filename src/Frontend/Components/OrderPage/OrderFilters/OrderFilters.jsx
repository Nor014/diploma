import React from 'react';
import DateInput from '../../GeneralBlocks/DateInput/DateInput';

export default class OrderFilters extends React.Component {

  render() {
    return (
      <div className="order-filters">
        <div className="order-filters__direction">
          <p className='order-filters__lable text text_theme_white'>Дата поездки</p>
          <DateInput name='fromDate' />
          <p className='order-filters__lable text text_theme_white'>Дата возвращения </p>
          <DateInput name='toDate' />
        </div>
      </div>
    )
  }
}