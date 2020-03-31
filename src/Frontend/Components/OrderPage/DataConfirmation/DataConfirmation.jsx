import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { changeOrderStep } from '../../../Redux/actions/actions';

import Tickets from '../Tickets/Tickets';


class DataConfirmation extends React.Component {

  render() {
    const { submitTicketsData } = this.props;

    const { ticketCategories } = this.props.orderDetailsData;
    const adultCategory = ticketCategories.find(el => el.categoryName === 'adult');
    const childrenCategory = ticketCategories.find(el => el.categoryName === 'children');
    // стоимость по категориям и направлениям
    let adultCategoryDepartureCost = 0;
    let childrenCategoryDepartureCost = 0;
    let adultCategoryArrivalCost = 0;
    let childrenCategoryArrivalCost = 0;

    adultCategory.ticketsData.forEach(direction => {
      const result = direction.data.reduce((acc, ticket) => acc + ticket.totalCost, 0);
      direction.name === 'departure' ? adultCategoryDepartureCost = result : adultCategoryArrivalCost = result;
    });

    childrenCategory.ticketsData.forEach(direction => {
      const result = direction.data.reduce((acc, ticket) => acc + ticket.totalCost, 0);
      direction.name === 'departure' ? childrenCategoryDepartureCost = result : childrenCategoryArrivalCost = result;
    });

    console.log(this.props)

    return (
      <div className='confirmation'>
        <div className="confirmation__inner">
          <div className="confirmation__head">
            <h2 className='confirmation__title'>Поезд</h2>
          </div>

          <Tickets data={[this.props.orderDetailsData.fullPathData]}
            maxTicketsToShow={1}
            renderFromConfirmation={true}
            onLinkClick={() => this.props.changeOrderStep(1)} />
        </div>

        <div className="confirmation__inner">
          <div className="confirmation__head">
            <h2 className='confirmation__title'>Пассажиры</h2>
          </div>

          <div className="confirmation__body">
            <div className="confirmation__content">
              {submitTicketsData.departure.seats.map(seat => {
                return (
                  <div className="confirmation__passenger" key={seat.passengerId}>
                    <p className="confirmation__passenger-category">{seat.person_info.is_adult ? 'Взрослый' : 'Детский'}</p>

                    <div className="confirmation__passenger-data">
                      <p className="confirmation__passenger-name">{seat.person_info.last_name + ' ' + seat.person_info.first_name + ' ' + seat.person_info.patronymic}</p>
                      <p className="confirmation__passenger-text">Пол {seat.person_info.gender ? 'мужской' : 'женский'}</p>
                      <p className="confirmation__passenger-text">Дата рождения {seat.person_info.birthday}</p>
                      <p className="confirmation__passenger-text">{seat.person_info.document_type === 'паспорт'
                        ? 'Паспорт РФ'
                        : 'Свидетельство о рождении'} {seat.person_info.document_data}</p>
                    </div>
                  </div>)
              })}
            </div>

            <div className="confirmation__asside">
              <p className="confirmation__passengers-total-cost">Всего <span className='confirmation__passengers-span'>{adultCategoryDepartureCost + childrenCategoryDepartureCost + adultCategoryArrivalCost + childrenCategoryArrivalCost} <span className='confirmation__passengers-ruble'>₽</span></span></p>

              <Link to='/order/registration' className='link btn btn_theme_white btn_size_small' onClick={() => this.props.changeOrderStep(2)}>Изменить</Link>
            </div>
          </div>
        </div>

        <div className="confirmation__inner">
          <div className="confirmation__head">
            <h2 className='confirmation__title'>Способ оплаты</h2>
          </div>

          <div className="confirmation__body">
            <div className="confirmation__content">
              <p className="confirmation__payment-type">{submitTicketsData.user.payment_method === 'online' ? 'Онлайн' : 'Наличными'}</p>
            </div>

            <div className="confirmation__asside">
              <Link to='/order/payment' className='link btn btn_theme_white btn_size_small' onClick={() => this.props.changeOrderStep(3)}>Изменить</Link>
            </div>
          </div>
        </div>

        <div className="order-page__link-wrap confirmation__link-wrap">
          <button className="link btn btn_theme_yellow btn_size_big order-page__link">Подтвердить</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { orderDetailsData, submitTicketsData } = state;

  return {
    orderDetailsData,
    submitTicketsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeOrderStep: (stepIndex) => dispatch(changeOrderStep(stepIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataConfirmation)