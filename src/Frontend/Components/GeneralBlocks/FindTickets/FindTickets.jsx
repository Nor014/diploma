import React from 'react';
import DateInput from '../DateInput/DateInput';
import DirectionInput from '../DirectionInput/DirectionInput';

import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { changeDirectionValues, findTickets, changeOrderStep } from '../../../Redux/actions/actions';

import moment from 'moment';

class FindTickets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  onFindTicketsSubmit = (event) => {
    event.preventDefault();

    let getParams = [];

    for (let [key, value] of Object.entries(this.props.findTicketsState)) {
      if (value !== null && value !== false) {
        if (key.includes('date')) {
          value = moment(value).format('YYYY-MM-DD');
        }

        getParams.push({ name: key, value: value });
      }
    }

    let url = 'https://netology-trainbooking.herokuapp.com/routes?';

    getParams.forEach(el => {
      url += el.name + '=' + el.value + '&'
    })


    const redirect = this.props.fromComponent === 'Welcome' ? true : false; // нужен ли редирект с главной страницы 
    this.props.findTickets(url, 'FindTickets', redirect);


    // редирект если запрос происходит не из главной страницы или страницы билетов
    if (!this.props.fromComponent && window.location.pathname !== '/order') {
      this.props.changeOrderStep(1);

      this.setState(prevState => ({ ...prevState, redirect: true }), () => {
        this.setState(prevState => ({ ...prevState, redirect: false }))
      })
    }

    // scroll to block
    if (this.props.scrollTo) {
      this.props.scrollTo.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  render() {
    let { fromComponent } = this.props;
    let componentClass = `find-tickets ${fromComponent === 'Welcome'
      ? 'find-tickets_direction_column'
      : 'find-tickets_direction_row'}`

    return (
      <>
        <form id='find-tickets-form' onSubmit={this.onFindTicketsSubmit} className={componentClass}>
          <div className='find-tickets__inner'>
            <div className="find-tickets__content">
              <p className="find-tickets__label text text_theme_white text_level_third text_weight_300">Направление</p>
              <div className="find-tickets__input-group">
                <DirectionInput
                  parentClass='find-tickets__direction-input'
                  inputClass='input_size_big input_type_direction'
                  placeholder='Откуда'
                  name='fromLocation'
                  paramsName='from_city_id' />

                <button className='btn find-tickets__change-direction-btn'
                  type='button'
                  onClick={() => this.props.changeDirectionValues()} />

                <DirectionInput
                  parentClass='find-tickets__direction-input'
                  inputClass='input_size_big input_type_direction'
                  placeholder='Куда'
                  name='toLocation'
                  paramsName='to_city_id' />
              </div>
            </div>

            <div className="find-tickets__content">
              <p className="find-tickets__label text text_theme_white text_level_third text_weight_300">Дата</p>
              <div className="find-tickets__input-group">
                <DateInput inputClass='input_size_big' name='fromDate' />
                <DateInput inputClass='input_size_big' name='toDate' />
              </div>
            </div>
          </div>

          <div className="find-tickets__btn-inner">
            <button className="btn find-tickets__btn btn_size_big btn_theme_yellow text text_transform_uppercase" type='submit' >Найти билеты</button>
          </div>
        </form>

        {this.state.redirect ? <Redirect to='/order' /> : null}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { findTicketsState } = state;
  return {
    findTicketsState: findTicketsState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeDirectionValues: () => dispatch(changeDirectionValues()),
    findTickets: (url, fromComponent, redirectFromMain) => dispatch(findTickets(url, fromComponent, redirectFromMain)),
    changeOrderStep: (step) => dispatch(changeOrderStep(step))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindTickets)