import React from 'react';

import HoverDropDown from '../../../../GeneralBlocks/HoverDropDown/HoverDropDown';

import { ReactComponent as ToggleIcon } from '../PassengerRegistrationForm/registration-form_icon_toggle.svg';
import { ReactComponent as CloseIcon } from '../PassengerRegistrationForm/registration-form_icon_close.svg';


export default class PassengerRegistrationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ticketTypes: [
        {
          value: 'adult',
          innerText: 'Взрослый',
          active: true
        },
        {
          value: 'children',
          innerText: 'Детский',
          active: false
        },
      ]
    }
  }

  render() {

    return (
      <div className="registration-form">
        <div className="registration-form__head">
          <button className="btn registration-form__btn registration-form__toggle-btn">
            <ToggleIcon className='registration-form__toggle-icon' />
          </button>

          <h2 className='registration-form__title'>Пассажир 1</h2>

          <button className="btn registration-form__btn registration-form__close-btn">
            <CloseIcon className='registration-form__toggle-icon' />
          </button>
        </div>

        <div className="registration-form__body">
          <form action="" className="registration-form__personal-data">
            <div className="registration-form__ticket-type">
              <HoverDropDown
                currentValue={this.state.ticketTypes.find(type => type.active).innerText}
                listItems={this.state.ticketTypes} />
            </div>

            

          </form>
        </div>

      </div>
    )
  }
} 