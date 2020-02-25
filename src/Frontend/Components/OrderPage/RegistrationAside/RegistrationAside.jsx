import React from 'react';
import DropDown from '../../GeneralBlocks/DropDown/DropDown';

import { connect } from 'react-redux';

class RegistrationAside extends React.Component {
  render() {
    const { pathDetails, ticketCategories } = this.props.orderDetailsData;
    const adultCategory = ticketCategories.find(el => el.categoryName === 'adult');
    const childrenCategory = ticketCategories.find(el => el.categoryName === 'children');
    const adultCategoryCost = adultCategory.ticketsData.reduce((acc, ticket) => acc + ticket.totalCost, 0);
    const childrenCategoryCost = childrenCategory.ticketsData.reduce((acc, ticket) => acc + ticket.totalCost, 0);
    console.log(this.props)

    return (
      <div className="registration-aside">
        <h2 className="registration-aside__title">Детали поездки</h2>

        <DropDown className='registration-aside__drop-down'
          headContent={{
            title: 'Туда',
            date: pathDetails.from !== undefined ? pathDetails.from.fullDateToRender : '',
            titleClass: 'drop-down_title-type_there'
          }}>

          {pathDetails.from !== undefined &&
            <>
              <div className="registration-aside__info registration-aside_type_train">
                <div className="registration-aside__inner">
                  <p className="registration-aside__label">№ Поезда</p>
                  <p className="registration-aside__train registration-aside_text-align_right">{pathDetails.train.name}</p>
                </div>
                <div className="registration-aside__inner">
                  <p className="registration-aside__label">Название</p>
                  <p className="registration-aside__path registration-aside_text-align_right">{pathDetails.from.city.name} <br />{pathDetails.to.city.name}</p>
                </div>
              </div>

              <div className="registration-aside__info registration-aside_type_date">
                <div className="registration-aside__inner ">
                  <div className="registration-aside__date">
                    <p className="registration-aside__datetime">{pathDetails.from.datetimeToRender}</p>
                    <p className="registration-aside__full-date">{pathDetails.from.fullDateToRender}</p>
                  </div>
                  <p className="registration-aside__duration arrow-pointer arrow-pointer_type_departure"> {pathDetails.duration} </p>
                  <div className="registration-aside__date registration-aside_text-align_right">
                    <p className="registration-aside__datetime">{pathDetails.to.datetimeToRender}</p>
                    <p className="registration-aside__full-date">{pathDetails.to.fullDateToRender}</p>
                  </div>
                </div>
              </div>

              <div className="registration-aside__info registration-aside_type_location">
                <div className="registration-aside__inner ">
                  <div className="registration-aside__location">
                    <p className="registration-aside__city">{pathDetails.from.city.name}</p>
                    <p className="registration-aside__station">{pathDetails.from.railway_station_name}</p>
                  </div>
                  <div className="registration-aside__location registration-aside_text-align_right">
                    <p className="registration-aside__city">{pathDetails.to.city.name}</p>
                    <p className="registration-aside__station">{pathDetails.to.railway_station_name}</p>
                  </div>
                </div>
              </div>
            </>}
        </DropDown>

        <DropDown className='registration-aside__drop-down'
          headContent={{
            title: 'Пассажиры',
            titleClass: 'drop-down_title-type_passengers'
          }}>
          <>
            <div className="registration-aside__inner ">
              <p className="registration-aside__label">{adultCategory.currentAmountOfTickets} Взрослых</p>
              <p className="registration-aside__cost">{adultCategoryCost} <span className='registration-aside__ruble'>₽</span></p>
            </div>

            <div className="registration-aside__inner ">
              <p className="registration-aside__label">{childrenCategory.currentAmountOfTickets} Детских</p>
              <p className="registration-aside__cost">{childrenCategoryCost} <span className='registration-aside__ruble'>₽</span></p>
            </div>
          </>
        </DropDown>

        <div className="registration-aside__total-cost">
          <p className="registration-aside__total-cost-label">Итог</p>
          <p className="registration-aside__total-cost-value">{adultCategoryCost + childrenCategoryCost}
            <span className='registration-aside__ruble'>₽</span></p>
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  const { orderDetailsData } = state;

  return {
    orderDetailsData: orderDetailsData
  }
}

export default connect(mapStateToProps, null)(RegistrationAside)