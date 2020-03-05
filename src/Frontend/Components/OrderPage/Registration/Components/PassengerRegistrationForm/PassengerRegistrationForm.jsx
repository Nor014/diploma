import React from 'react';

import HoverDropDown from '../../../../GeneralBlocks/HoverDropDown/HoverDropDown';
import RegistrationInput from '../../../../GeneralBlocks/RegistrationInput/RegistrationInput';
import RadioToggle from '../../../../GeneralBlocks/RadioToggle/RadioToggle';
import RegistrationCheckBox from '../../../../GeneralBlocks/RegistrationCheckBox/RegistrationCheckBox';

import { ReactComponent as ToggleIcon } from '../PassengerRegistrationForm/registration-form_icon_toggle.svg';
import { ReactComponent as CloseIcon } from '../PassengerRegistrationForm/registration-form_icon_close.svg';

export default class PassengerRegistrationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      passengerCategory: [
        { value: 'adult', innerText: 'Взрослый', active: true },
        { value: 'children', innerText: 'Детский', active: false },
      ],
      fullName: {
        surname: '',
        firstName: '',
        patronymic: ''
      },
      gender: {
        man: false,
        woman: false
      },
    }
  }

  changePassengerCategory = (event) => {
    const selectedCategory = event.target.value;
    const newState = this.state.passengerCategory
      .map(category => {
        category.active = category.value === selectedCategory ? true : false;
        return category
      })
      .sort((a, b) => b.active - a.active);

    this.setState(prevState => {
      return { ...prevState, passengerCategory: newState };
    })
  }

  onFullNameChange = (event) => {
    const { id, value } = event.target;
    const newState = { ...this.state.fullName };

    newState[id] = value;

    this.setState(prevState => ({ ...prevState, fullName: newState }));
  }

  changeGender = (event) => {
    const valueToChoose = event.target.id;
    const valueToDisable = event.target.dataset.valueToDisable;
    const newState = { ...this.state.gender };

    newState[valueToChoose] = true;
    newState[valueToDisable] = false;

    this.setState(prevState => ({ ...prevState, gender: newState }));
  }

  render() {

    return (
      <div className="registration-form">
        <div className="registration-form__head">
          <button className="btn registration-form__btn registration-form__toggle-btn">
            <ToggleIcon className='registration-form__toggle-icon' /></button>

          <h2 className='registration-form__title'>Пассажир 1</h2>

          <button className="btn registration-form__btn registration-form__close-btn">
            <CloseIcon className='registration-form__toggle-icon' /></button>
        </div>

        <div className="registration-form__body">
          <form action="" className="registration-form__personal-data">
            <div className="registration-form__ticket-type">
              <HoverDropDown
                currentValue={this.state.passengerCategory.find(category => category.active).innerText}
                listItems={this.state.passengerCategory}
                selectItem={this.changePassengerCategory} />
            </div>

            <div className="registration-form__row">
              <RegistrationInput label='Фамилия'
                paramsName='surname'
                value={this.state.fullName.surname}
                onChange={this.onFullNameChange} />

              <RegistrationInput label='Имя'
                paramsName='firstName'
                value={this.state.fullName.firstName}
                onChange={this.onFullNameChange} />

              <RegistrationInput label='Отчество'
                paramsName='patronymic'
                value={this.state.fullName.patronymic}
                onChange={this.onFullNameChange} />
            </div>

            <div className="registration-form__row">
              <RadioToggle label='Пол' parentClass='registration-form__radio-toggle'
                paramsName='gender'
                radioName='gender'
                firstItem={{ radioId: 'man', valueToDisable: 'woman', labelValue: 'М', checked: this.state.gender.man }}
                secondItem={{ radioId: 'woman', valueToDisable: 'man', labelValue: 'Ж', checked: this.state.gender.woman }}
                changeGender={this.changeGender} />

              <RegistrationInput label='Дата рождения' paramsName='dateOfBirth' placeholder='ДД/ММ/ГГ' />
            </div>

            <div className="registration-form__row">
              <RegistrationCheckBox label='ограниченная подвижность' paramsName='' />
            </div>
          </form>
        </div>
      </div>
    )
  }
} 