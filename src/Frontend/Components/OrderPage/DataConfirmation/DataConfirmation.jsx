import React from 'react';

import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { changeOrderStep, postSubmitData } from '../../../Redux/actions/actions';

import moment from 'moment';

import Tickets from '../Tickets/Tickets';


class DataConfirmation extends React.Component {

  componentDidUpdate = () => {
    if (this.props.submitTicketsData.post_status) { // если POST запрос успешен редирект на финальную страницу
      // this.props.history.push('http://localhost:3000/order-success');
    }
  }

  onConfirmationBtn = () => {
    const dateToPost = { ...this.props.submitTicketsData.data };

    dateToPost.departure.seats.forEach(el => {
      el.person_info.birthday = moment(el.person_info.birthday).format('YYYY-MM-DD')
    })

    dateToPost.departure.seats = filter(dateToPost.departure.seats);

    if (dateToPost.arrival.route_direction_id !== null) {
      dateToPost.arrival.seats = filter(dateToPost.arrival.seats);
    }

    function filter(arr) {
      return arr.map(el => {
        let obj = {};

        for (let [key, value] of Object.entries(el)) {
          if (key !== 'passengerId') {
            obj[key] = value;
          }
        }

        return obj
      })
    }

    console.log(dateToPost);
    this.props.postSubmitData(dateToPost);
  }

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

    const totalPrice = adultCategoryDepartureCost + childrenCategoryDepartureCost + adultCategoryArrivalCost + childrenCategoryArrivalCost;

    console.log(this.props)

    if (submitTicketsData.post_status) {
      return <Redirect to={{
        pathname: '/order-success',
        state: {
          name: submitTicketsData.data.user.first_name + ' ' + submitTicketsData.data.user.last_name + ' ' + submitTicketsData.data.user.patronymic,
          price: totalPrice
        }
      }} />
    }

    return (
      <div className='confirmation'>
        <div className="confirmation__inner">
          <h2 className='confirmation__title'>Поезд</h2>

          <Tickets data={[this.props.orderDetailsData.fullPathData]}
            maxTicketsToShow={1}
            renderFromConfirmation={true}
            onLinkClick={() => this.props.changeOrderStep(1)} />
        </div>

        <div className="confirmation__inner">
          <h2 className='confirmation__title'>Пассажиры</h2>

          <div className="confirmation__body">
            <div className="confirmation__content">
              {submitTicketsData.data.departure.seats.map((seat, index) => (
                <div className="confirmation__passenger" key={index}>
                  <p className="confirmation__passenger-category">{seat.person_info.is_adult ? 'Взрослый' : 'Детский'}</p>

                  <div className="confirmation__passenger-data">
                    <p className="confirmation__passenger-name">{seat.person_info.last_name + ' ' + seat.person_info.first_name + ' ' + seat.person_info.patronymic}</p>
                    <p className="confirmation__passenger-text">Пол {seat.person_info.gender ? 'мужской' : 'женский'}</p>
                    <p className="confirmation__passenger-text">Дата рождения {seat.person_info.birthday}</p>
                    <p className="confirmation__passenger-text">{seat.person_info.document_type === 'паспорт'
                      ? 'Паспорт РФ'
                      : 'Свидетельство о рождении'} {seat.person_info.document_data}</p>
                  </div>
                </div>))}
            </div>

            <div className="confirmation__asside">
              <p className="confirmation__passengers-total-cost">Всего <span className='confirmation__passengers-span'>{totalPrice} <span className='confirmation__passengers-ruble'>₽</span></span></p>

              <Link to='/order/registration' className='link btn btn_theme_white btn_size_small' onClick={() => this.props.changeOrderStep(2)}>Изменить</Link>
            </div>
          </div>
        </div>

        <div className="confirmation__inner">
          <h2 className='confirmation__title'>Способ оплаты</h2>

          <div className="confirmation__body">
            <div className="confirmation__content">
              <p className="confirmation__payment-type">{submitTicketsData.data.user.payment_method === 'online' ? 'Онлайн' : 'Наличными'}</p>
            </div>

            <div className="confirmation__asside">
              <Link to='/order/payment' className='link btn btn_theme_white btn_size_small' onClick={() => this.props.changeOrderStep(3)}>Изменить</Link>
            </div>
          </div>
        </div>

        <div className="order-page__link-wrap confirmation__link-wrap">
          <button className="link btn btn_theme_yellow btn_size_big order-page__link" onClick={this.onConfirmationBtn}>Подтвердить</button>
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
    changeOrderStep: (stepIndex) => dispatch(changeOrderStep(stepIndex)),
    postSubmitData: (data) => dispatch(postSubmitData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataConfirmation)