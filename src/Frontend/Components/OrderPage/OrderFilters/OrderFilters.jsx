import React from 'react';
import DateInput from '../../GeneralBlocks/DateInput/DateInput';
import CheckBox from '../../GeneralBlocks/CheckBox/CheckBox';
import RangeInput from '../../GeneralBlocks/RangeInput/RangeInput';
import DropDown from '../../GeneralBlocks/DropDown/DropDown';

export default class OrderFilters extends React.Component {

  render() {

    return (
      <div className="order-filters">
        <div className="order-filters__direction">
          <DateInput name='fromDate' label='Дата поездки' />
          <DateInput name='toDate' label='Дата возвращения' />
        </div>

        <div className="order-filters__params">
          <CheckBox label='Купе' paramsName='have_second_class' className='checkbox_type_second-class' />
          <CheckBox label='Плацкарт' paramsName='have_third_class' className='checkbox_type_third-class' />
          <CheckBox label='Сидячий' paramsName='have_fourth_class' className='checkbox_type_fourth-class' />
          <CheckBox label='Люкс' paramsName='have_first_class' className='checkbox_type_first-class' />
          <CheckBox label='Wi-Fi' paramsName='have_wifi' className='checkbox_type_wifi' />
          <CheckBox label='Экспресс' paramsName='have_express' className='checkbox_type_express' />
        </div>

        <div className="order-filters__cost">
          <RangeInput label='Стоимость' min={1920} max={7000} step={10} startMin={3000} startMax={5500}
            hint={{
              forMinValue: 'от 1920',
              forMaxValue: 'до 7000'
            }}
            paramsName={{
              forMinValue: 'price_from',
              forMaxValue: 'price_to'
            }} />
        </div>

        <DropDown headContent={{ title: 'Туда', titleClass: 'drop-down_title-type_there' }}
          className='order-filters__drop-down'>
          <RangeInput label='Время отбытия' min={0.00} max={24.00}
            className='drop-down__range-input'
            startMin={0} startMax={15} format='time'
            paramsName={{ forMinValue: 'start_departure_hour_from', forMaxValue: 'start_departure_hour_to' }} />
          <RangeInput label='Время прибытия' min={0.00} max={24.00}
            className='drop-down__range-input'
            startMin={13} startMax={22} format='time'
            paramsName={{ forMinValue: 'start_arrival_hour_from', forMaxValue: 'start_arrival_hour_to' }} />
        </DropDown>

        <DropDown headContent={{ title: 'Обратно', titleClass: 'drop-down_title-type_back' }}
          className='order-filters__drop-down'>
          <RangeInput label='Время отбытия' min={0.00} max={24.00}
            className='drop-down__range-input'
            startMin={0} startMax={11} format='time'
            paramsName={{ forMinValue: 'end_departure_hour_from', forMaxValue: 'end_departure_hour_to' }} />
          <RangeInput label='Время прибытия' min={0.00} max={24.00}
            className='drop-down__range-input'
            startMin={13} startMax={22} format='time'
            paramsName={{ forMinValue: 'end_arrival_hour_from', forMaxValue: 'end_arrival_hour_to' }} />
        </DropDown>
      </div>
    )
  }
}