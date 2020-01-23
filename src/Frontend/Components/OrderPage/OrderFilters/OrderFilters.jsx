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
          <RangeInput label='Стоимость' min={1920} max={7000}
            hint={{
              forMinValue: 'от 1920',
              forMaxValue: 'до 7000'
            }}
            paramsName={{
              forMinValue: 'price_from',
              forMaxValue: 'price_to'
            }} />
        </div>

        <DropDown headContent={{ title: 'Туда', }} className='order-filters__drop-down'/>
      </div>
    )
  }
}