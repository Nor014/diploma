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
      isFormActive: true,
      passengerCategory: [
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
      ],
      documents: [
        {
          value: 'passport',
          innerText: 'Паспорт',
          active: true
        },
        {
          value: 'birth-certificate',
          innerText: 'Свидетельство о рождении',
          active: false
        }
      ],
      personData: [
        {
          name: 'lastName',
          value: '',
          pattern: /^[А-я]{1,15}/,
          errorMessage: 'Поле Фамилия заполнено не верно. Пример - Михайлов'
        },
        {
          name: 'firstName',
          value: '',
          pattern: /^[А-я]{1,15}/,
          errorMessage: 'Поле Имя заполнено не верно. Пример - Стас'
        },
        {
          name: 'patronymic',
          value: '',
          pattern: /^[А-я]{1,15}/,
          errorMessage: 'Поле Отчество заполнено не верно. Пример - Михайлович'
        },
        {
          name: 'gender',
          gender: { man: false, woman: false },
          errorMessage: 'Не выбран пол'
        },
        {
          name: 'dateOfBirth',
          value: '',
          pattern: /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}/,
          errorMessage: 'Поле Дата рождения заполнено не верно. Пример - 01.01.2000'
        },
        {
          name: 'passportSeries',
          value: '',
          pattern: /[0-9]{1} [0-9]{1} [0-9]{1} [0-9]{1}/,
          errorMessage: 'Поле Серия паспорта заполнено не верно. Пример - 0 0 0 0'
        },
        {
          name: 'passportNumber',
          value: '',
          pattern: /[0-9]{1} [0-9]{1} [0-9]{1} [0-9]{1} [0-9]{1} [0-9]{1}/,
          errorMessage: 'Поле Номер паспорта заполнено не верно. Пример - 0 0 0 0 0 0'
        },
        {
          name: 'birthCertificate',
          value: '',
          pattern: /[0-9]{1} [0-9]{1} [0-9]{1} [0-9]{1}—[А-я]{1} [А-я]{1}—[0-9]{1} [0-9]{1} [0-9]{1} [0-9]{1} [0-9]{1} [0-9]{1}/,
          errorMessage: 'Номер свидетельства о рожденни указан некорректно. Пример: 1212 - ЫП - 123456'
        },
      ],
      validation: {
        valid: null,
        errorMessage: '',
        validationPassMessage: 'Готово'
      }
    }
  }

  toggleFormVisibility = () => {
    this.setState(prevState => {
      return { ...prevState, isFormActive: !prevState.isFormActive }
    })
  }

  changeDropDownCategory = (event) => {
    const selectedCategory = event.target.value;
    const stateCategory = event.target.dataset.name === 'ticket-type-drop-down' ? 'passengerCategory' : 'documents';

    const newState = this.state[stateCategory]
      .map(category => {
        category.active = category.value === selectedCategory ? true : false;
        return category
      })
      .sort((a, b) => b.active - a.active);

    this.setState(prevState => {
      return { ...prevState, [stateCategory]: newState };
    })
  }

  onPersonDataChange = (event) => {
    const { id, value } = event.target;

    const newState = this.state.personData.map(el => {
      if (el.name === id) {
        el.value = value
      }

      return el
    });

    this.setState(prevState => ({ ...prevState, personData: newState }), () => console.log(this.state));
  }

  changeGender = (event) => {
    const valueToChoose = event.target.id;
    const valueToDisable = event.target.dataset.valueToDisable;
    const newState = [... this.state.personData];

    const genderField = newState.find(el => el.name === 'gender');

    genderField.gender[valueToChoose] = true;
    genderField.gender[valueToDisable] = false;

    this.setState(prevState => ({ ...prevState, personData: newState }));
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const dateToValidate = this.state.personData;
    const documentToValidate = this.state.documents.find(document => document.active).value;

    let valid = true;
    let errorMessage = '';

    for (let i = 0; i <= dateToValidate.length - 1; i++) { // валидация форм до первой ошибки
      if (documentToValidate === 'passport' && dateToValidate[i].name === 'birthCertificate') {
        continue
      }

      if (documentToValidate === 'birth-certificate' &&
        (dateToValidate[i].name === 'passportSeries' || dateToValidate[i].name === 'passportNumber')) {
        continue
      }

      if (dateToValidate[i].name !== 'gender') {
        if (!dateToValidate[i].pattern.test(dateToValidate[i].value)) {
          valid = false;
          errorMessage = dateToValidate[i].errorMessage;
          break;
        }
      } else {
        if (!dateToValidate[i].gender.man && !dateToValidate[i].gender.woman) {
          valid = false;
          errorMessage = dateToValidate[i].errorMessage;
          break;
        }
      }
    }

    this.setState(prevState => {
      const newState = { ...prevState.validation };
      newState.valid = valid;
      newState.errorMessage = errorMessage;

      return { ...prevState, validation: newState }
    })
  }

  render() {
    const toggleButtonClass = `btn registration-form__btn registration-form__toggle-btn ${!this.state.isFormActive ? 'registration-form__toggle-btn_hidden' : ''}`;
    const activeDocumentType = this.state.documents.find(document => document.active).value;
    const isValidForm = this.state.validation.valid;

    return (
      <div className="registration-form">
        <div className="registration-form__head registration-form__block">
          <button className={toggleButtonClass} onClick={this.toggleFormVisibility}>
            <ToggleIcon className='registration-form__toggle-icon' />
          </button>

          <h2 className='registration-form__title'>Пассажир 1</h2>

          <button className="btn registration-form__btn registration-form__close-btn">
            <CloseIcon className='registration-form__toggle-icon' />
          </button>
        </div>

        {this.state.isFormActive &&
          <div className="registration-form__body">
            <form action="" onSubmit={this.onFormSubmit} className="registration-form__form">
              <div className="registration-form__block registration-form_border_dashed">
                <div className="registration-form__ticket-type registration-form__drop-down">
                  <HoverDropDown
                    currentValue={this.state.passengerCategory.find(category => category.active).innerText}
                    listItems={this.state.passengerCategory}
                    selectItem={this.changeDropDownCategory}
                    name='ticket-type-drop-down' />
                </div>

                <div className="registration-form__row">
                  <RegistrationInput label='Фамилия'
                    paramsName='lastName'
                    value={this.state.personData.find(el => el.name === 'lastName').value}
                    onChange={this.onPersonDataChange}
                  />

                  <RegistrationInput label='Имя'
                    paramsName='firstName'
                    value={this.state.personData.find(el => el.name === 'firstName').value}
                    onChange={this.onPersonDataChange}
                  />

                  <RegistrationInput label='Отчество'
                    paramsName='patronymic'
                    value={this.state.personData.find(el => el.name === 'patronymic').value}
                    onChange={this.onPersonDataChange}
                  />
                </div>

                <div className="registration-form__row">
                  <RadioToggle label='Пол' parentClass='registration-form__radio-toggle'
                    paramsName='gender'
                    radioName='gender'
                    firstItem={{ radioId: 'man', valueToDisable: 'woman', labelValue: 'М', checked: this.state.personData.find(el => el.name === 'gender').gender.man }}
                    secondItem={{ radioId: 'woman', valueToDisable: 'man', labelValue: 'Ж', checked: this.state.personData.find(el => el.name === 'gender').gender.woman }}
                    changeGender={this.changeGender} />

                  <RegistrationInput
                    label='Дата рождения'
                    paramsName='dateOfBirth'
                    placeholder='ДД/ММ/ГГ'
                    mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                    value={this.state.personData.find(el => el.name === 'dateOfBirth').value}
                    onChange={this.onPersonDataChange}
                    size='middle' />
                </div>

                <div className="registration-form__row">
                  <RegistrationCheckBox label='ограниченная подвижность' paramsName='' />
                </div>
              </div>

              <div className="registration-form__block registration-form__block_type_documents">
                <div className="registration-form__drop-down-wrap">
                  <p className="registration-form__drop-down-label">Тип документа</p>
                  <div className="registration-form__drop-down">
                    <HoverDropDown
                      currentValue={this.state.documents.find(document => document.active).innerText}
                      listItems={this.state.documents}
                      selectItem={this.changeDropDownCategory}
                      name='document-type-drop-down' />
                  </div>
                </div>

                {activeDocumentType === 'passport' &&
                  <>
                    <RegistrationInput
                      label='Серия'
                      paramsName='passportSeries'
                      placeholder='_ _ _ _'
                      mask={[/\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/]}
                      value={this.state.personData.find(el => el.name === 'passportSeries').value}
                      onChange={this.onPersonDataChange}
                      size='small' />

                    <RegistrationInput
                      label='Номер'
                      paramsName='passportNumber'
                      placeholder='_ _ _ _ _ _'
                      mask={[/\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/]}
                      value={this.state.personData.find(el => el.name === 'passportNumber').value}
                      onChange={this.onPersonDataChange}
                      size='small' />
                  </>
                }

                {activeDocumentType === 'birth-certificate' &&
                  <RegistrationInput
                    label='Номер'
                    paramsName='birthCertificate'
                    placeholder='_ _ _ _ _ _ _ _ _ _ _ _'
                    mask={[/\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, '—', /^[А-я]+$/, ' ', /^[А-я]+$/, '—', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/]}
                    value={this.state.personData.find(el => el.name === 'birthCertificate').value}
                    onChange={this.onPersonDataChange}
                    size='middle' />}
              </div>

              <div className="registration-form__block registration-form__block_type_submit ">
                <p className="registration-form__validation-text"></p>
                <button type='submit' className="btn registration-form__submit-btn">Следующий пассажир</button>
              </div>
            </form>
          </div>}
      </div>
    )
  }
} 