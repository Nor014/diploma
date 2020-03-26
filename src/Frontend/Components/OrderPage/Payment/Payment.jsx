import React from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { setUserParams } from '../../../Redux/actions/actions';
import { validateParams } from '../../../index';

import RegistrationInput from '../../GeneralBlocks/RegistrationInput/RegistrationInput';
import AttentionPopup from '../../GeneralBlocks/AttentionPopup/AttentionPopup';

class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      validation: {
        valid: null,
        errorMessage: ''
      }
    }
  }

  onFormSubmit = () => {
    const { user } = this.props.submitTicketsData;
    let valid = true, errorMessage = '';

    for (let [key, value] of Object.entries(user)) {
      if (key !== 'payment_method' && !validateParams[key].pattern.test(value)) {
        valid = false;
        errorMessage = validateParams[key].errorMessage;
        break;
      }

      if (key === 'payment_method' && value === null) {
        valid = false;
        errorMessage = 'Не выбран способ оплаты';
        break;
      }
    }

    this.setState(prevState => ({ ...prevState, validation: { valid: valid, errorMessage: errorMessage } }), () => console.log(this.state))
  }

  changeFormState = (event) => {
    let target = event.target;
    let paramsName, value;

    paramsName = target.type === 'text' ? target.id : target.name;
    value = target.type === 'text' ? target.value : target.id;

    this.props.setUserParams(paramsName, value);
  }

  render() {
    const formState = this.props.submitTicketsData.user;

    return (
      <div className='payment'>

        <form action="" className='payment__form'>
          <div className="payment__form-section">
            <div className="payment__form-head payment__form_border_dashed">
              <h2 className="payment__form-title">Персональные данные</h2>
            </div>

            <div className="payment__form-body payment__form_border_dashed">
              <div className="payment__form-inner">
                <RegistrationInput
                  id='last_name'
                  label='Фамилия'
                  paramsName='last_name'
                  value={formState.last_name}
                  onChange={this.changeFormState} />

                <RegistrationInput
                  id='first_name'
                  label='Имя'
                  paramsName='first_name'
                  value={formState.first_name}
                  onChange={this.changeFormState} />

                <RegistrationInput
                  id='patronymic'
                  label='Отчество'
                  paramsName='patronymic'
                  value={formState.patronymic}
                  onChange={this.changeFormState} />
              </div>

              <div className="payment__form-inner">
                <RegistrationInput
                  id='phone'
                  label='Контактный телефон'
                  paramsName='phone'
                  placeholder='+7 ___ ___ __ __'
                  mask={[/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                  value={formState.phone}
                  onChange={this.changeFormState}
                  size='big' />
              </div>

              <div className="payment__form-inner">
                <RegistrationInput
                  id='email'
                  label='E-mail'
                  paramsName='email'
                  placeholder='inbox@gmail.ru'
                  value={formState.email}
                  onChange={this.changeFormState}
                  size='big' />
              </div>
            </div>
          </div>

          <div className="payment__form-section">
            <div className="payment__form-head payment__form_border_dashed">
              <h2 className="payment__form-title">Способ оплаты</h2>
            </div>

            <div className="payment__form-content payment__form_border_dashed">
              <div className="payment__method ">
                <div className="payment__form-radio">
                  <input className='payment__form-radio-input'
                    type="radio"
                    name='payment_method'
                    id='online'
                    onChange={this.changeFormState}
                    checked={formState.payment_method !== null && formState.payment_method === 'online' ? true : false} />
                  <label htmlFor="online" className='payment__form-label'>Онлайн</label>
                </div>

                <div className="payment__form-methods">
                  <p className="payment__form-method">Банковской картой</p>
                  <p className="payment__form-method">PayPal</p>
                  <p className="payment__form-method">Visa QIWI Wallet</p>
                </div>
              </div>
            </div>

            <div className="payment__form-content">
              <div className="payment__method ">
                <div className="payment__form-radio">
                  <input className='payment__form-radio-input'
                    type="radio"
                    name='payment_method'
                    id='cash'
                    onChange={this.changeFormState}
                    checked={formState.payment_method !== null && formState.payment_method === 'cash' ? true : false} />
                  <label htmlFor="cash" className='payment__form-label'>Наличными</label>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="order-page__link-wrap">
          <button to='/order/payment' className={`link btn btn_theme_yellow btn_size_big order-page__link`}
            onClick={this.onFormSubmit}>Купить билеты</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { submitTicketsData } = state;

  return {
    submitTicketsData: submitTicketsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserParams: (paramsName, value) => dispatch(setUserParams(paramsName, value))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Payment)