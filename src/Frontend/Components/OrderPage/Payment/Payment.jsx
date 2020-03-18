import React from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { setUserParams } from '../../../Redux/actions/actions';

import RegistrationInput from '../../GeneralBlocks/RegistrationInput/RegistrationInput';

class Payment extends React.Component {

  changeFormState = (event) => {
    const { id, value } = event.target;
    this.props.setUserParams(id, value);
  }

  render() {
    console.log(this.props)

    const formState = this.props.submitTicketsData.user;

    return (
      <div className='payment'>

        <form action="" className='payment__form'>
          <div className="payment__form-section">
            <div className="payment__form-head">
              <h2 className="payment__form-title">Персональные данные</h2>
            </div>

            <div className="payment__form-body">
              <div className="payment__form-inner">
                <RegistrationInput label='Фамилия'
                  paramsName='last_name'
                  value={formState.last_name}
                  onChange={this.changeFormState} />

                <RegistrationInput label='Имя'
                  paramsName='first_name'
                  value={formState.first_name}
                  onChange={this.changeFormState} />

                <RegistrationInput label='Отчество'
                  paramsName='patronymic'
                  value={formState.patronymic}
                  onChange={this.changeFormState} />
              </div>

              <div className="payment__form-inner">
                <RegistrationInput
                  label='Контактный телефон'
                  paramsName='phone'
                  placeholder='+7 ___ ___ __ __'
                  mask={[/\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
                  value={formState.phone}
                  onChange={this.changeFormState}
                  size='big' />
              </div>

              <div className="payment__form-inner">
                <RegistrationInput label='E-mail'
                  paramsName='email'
                  placeholder='inbox@gmail.ru'
                  value={formState.email}
                  onChange={this.changeFormState}
                  size='big' />
              </div>
            </div>
          </div>

          <div className="payment__form-section">
            <div className="payment__form-head">
              <h2 className="payment__form-title">Способ оплаты</h2>
            </div>

            <div className="payment__form-body">
              <div className="payment__form-radio">
                <div className="payment__form-radio-inner">
                  <input className='payment__form-radio-input' type="radio" name='patment__method' id='payment-online' />
                  <label htmlFor="payment-online" className='payment__form-label'>Онлайн</label>
                </div>

                <div className="payment__form-methods">
                  <p className="payment__form-method">Банковской картой</p>
                  <p className="payment__form-method">PayPal</p>
                  <p className="payment__form-method">Visa QIWI Wallet</p>
                </div>
              </div>
            </div>

            
          </div>
        </form>
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