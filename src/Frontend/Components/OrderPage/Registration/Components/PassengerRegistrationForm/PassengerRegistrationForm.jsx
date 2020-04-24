import React from 'react';

import nanoid from 'nanoid';
import { connect } from 'react-redux';

import { validateParams } from '../../../../../index';
import { setSubmitTicketData, removeSubmitTicketData } from '../../../../../Redux/actions/actions';

import HoverDropDown from '../../../../GeneralBlocks/HoverDropDown/HoverDropDown';
import RegistrationInput from '../../../../GeneralBlocks/RegistrationInput/RegistrationInput';
import RadioToggle from '../../../../GeneralBlocks/RadioToggle/RadioToggle';
import RegistrationCheckBox from '../../../../GeneralBlocks/RegistrationCheckBox/RegistrationCheckBox';

import { ReactComponent as ToggleIcon } from '../PassengerRegistrationForm/registration-form_icon_toggle.svg';
import { ReactComponent as CloseIcon } from '../PassengerRegistrationForm/registration-form_icon_close.svg';

class PassengerRegistrationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formId: nanoid(),
      isFormActive: this.props.isOpenForm,
      passengerCategory: [
        { value: 'adult', innerText: 'Взрослый', active: true, chosen: false },
        { value: 'children', innerText: 'Детский', active: false, chosen: false },
      ],
      documents: [
        { value: 'passport', innerText: 'Паспорт', active: true },
        { value: 'birth-certificate', innerText: 'Свидетельство о рождении', active: false }
      ],
      personData: {
        last_name: '',
        first_name: '',
        patronymic: '',
        dateOfBirth: '',
        passportSeries: '',
        passportNumber: '',
        birthCertificate: '',
        gender: { values: { man: false, woman: false }, errorMessage: 'Не выбран пол' }
      },
      validation: { valid: null, message: '', }
    }
  }

  toggleFormVisibility = () => {
    this.setState(prevState => ({ ...prevState, isFormActive: !prevState.isFormActive }))
  }

  changeDropDownCategory = (event) => {
    const selectedCategory = event.target.value;
    const stateCategory = event.target.dataset.name === 'ticket-type-drop-down' ? 'passengerCategory' : 'documents';

    const newState = this.state[stateCategory].map(category => {
      category.active = category.value === selectedCategory ? true : false;
      return category
    }).sort((a, b) => b.active - a.active);

    this.setState(prevState => {
      return { ...prevState, [stateCategory]: newState };
    })
  }

  onPersonDataChange = (event) => {
    const paramsName = event.target.dataset.paramsName;
    const value = event.target.value;

    const newState = { ...this.state.personData };
    newState[paramsName] = value;

    this.setState(prevState => ({ ...prevState, personData: newState }));
  }

  changeGender = (event) => {
    const valueToChoose = event.target.dataset.valueToChoose;
    const valueToDisable = event.target.dataset.valueToDisable;
    const newState = { ...this.state.personData };

    newState.gender.values[valueToChoose] = true;
    newState.gender.values[valueToDisable] = false;

    this.setState(prevState => ({ ...prevState, personData: newState }));
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const documentToValidate = this.state.documents.find(document => document.active).value;
    const category = this.state.passengerCategory.find(category => category.active).value;
    const { adultCategory, childrenCategory } = this.props;

    let valid = true;
    let errorMessage = null;

    for (let [key, value] of Object.entries(this.state.personData)) {
      if (documentToValidate === 'passport' && key === 'birthCertificate') continue;
      if (documentToValidate === 'birth-certificate' && key === 'passportSeries') continue;
      if (documentToValidate === 'birth-certificate' && key === 'passportNumber') continue;

      if (key !== 'gender') {
        if (!validateParams[key].pattern.test(value)) {
          valid = false;
          errorMessage = validateParams[key].errorMessage;
          break;
        }
      } else {
        if (!this.state.personData.gender.values.man && !this.state.personData.gender.values.woman) { // не выбран пол
          valid = false;
          errorMessage = this.state.personData.gender.errorMessage;
          break;
        }
      }
    }

    if (valid) { // валидация на доступность категории adult/children

      if (category === 'adult' && adultCategory.availableAmountOfPassengersToRegistrate === 0) {
        valid = false;
        errorMessage = 'Все пассажиры для категории "Взрослый" уже зарегестрированны, выберите другую категорию';
      } else if (category === 'children' && childrenCategory.availableAmountOfPassengersToRegistrate === 0) {
        valid = false;
        errorMessage = 'Все пассажиры для категории "Детский" уже зарегестрированны, выберите другую категорию';
      }
    }

    this.setState(prevState => {
      const newState = { ...prevState.validation };
      newState.valid = valid;
      newState.message = errorMessage !== null ? errorMessage : 'Готово';

      return { ...prevState, validation: newState }
    })

    if (valid) { // dispatch данных о пассажире и месте в поезде
      const gender = this.state.personData.gender.values;
      const documentData = documentToValidate === 'passport'
        ? (this.state.personData.passportSeries + this.state.personData.passportNumber).replace(/([0-9]{2})([0-9]{8})/g, "$1 $2")
        : this.state.personData.birthCertificate;

      const ticketIndex = category === 'adult' ? this.props.adultCategory.alreadyRegistered : this.props.childrenCategory.alreadyRegistered;
      const currentTicketDetails = this.props.orderDetailsData.ticketCategories.find(el => el.categoryName === category).ticketsData
        .find(el => el.name === 'departure').data[ticketIndex];

      const departureTicketData = {
        passengerId: this.state.formId,
        coach_id: currentTicketDetails.coachId,
        person_info: {
          is_adult: category === 'adult' ? true : false,
          first_name: this.state.personData.first_name,
          last_name: this.state.personData.last_name,
          patronymic: this.state.personData.patronymic,
          gender: gender.man === true ? true : false,
          birthday: this.state.personData.dateOfBirth,
          document_type: documentToValidate === 'passport' ? 'паспорт' : 'свидетельство о рождении',
          document_data: documentData
        },
        seat_number: currentTicketDetails.seatNumber,
        is_child: category !== 'adult' ? true : false,
        include_children_seat: false
      }

      this.props.setSubmitTicketData('departure', departureTicketData); // dispatch данных о текущем билете

      if (this.props.withArrivalPath) { // dispatch данных о текущем билете для arrival
        const arrivalTicketData = { ...departureTicketData };
        const currentArrivalTicketDetails = this.props.orderDetailsData.ticketCategories.find(el => el.categoryName === category).ticketsData
          .find(el => el.name === 'arrival').data[ticketIndex];

        arrivalTicketData.coach_id = currentArrivalTicketDetails.coachId;
        arrivalTicketData.seat_number = currentArrivalTicketDetails.seatNumber;

        this.props.setSubmitTicketData('arrival', arrivalTicketData);
      }
      // меняем информацию о доступных к регистрации пассажиров и количестве уже зарегестрированных
      this.props.changePassengersAmountAvailableToRegistration(category);
    }
  }

  formToDefaultState = () => {
    if (this.state.validation.valid) { // если форма уже валидированна, убираем данные из редьюсера
      const category = this.state.passengerCategory.find(category => category.active).value;

      this.props.removeSubmitTicketData(this.state.formId);
      this.props.changePassengersAmountAvailableToRegistration(category, 'add');

      this.setState(prevState => {
        return { ...prevState, validation: { valid: null, message: '' } }
      })
    }
  }

  render() {
    const toggleButtonClass = `btn registration-form__btn registration-form__toggle-btn ${!this.state.isFormActive
      ? 'registration-form__toggle-btn_hidden'
      : ''}`;

    const activeDocumentType = this.state.documents.find(document => document.active).value;
    const isValidForm = this.state.validation.valid;

    const formClass = isValidForm !== null
      ? !isValidForm
        ? 'registration-form__form registration-form__form_invalid'
        : 'registration-form__form registration-form__form_valid'
      : 'registration-form__form';

    const submitBlockClass = isValidForm !== null
      ? !isValidForm
        ? 'registration-form__submit_type_invalid'
        : 'registration-form__submit_type_valid'
      : '';

    return (
      <div className="registration-form">
        <div className="registration-form__head registration-form__block">
          <button className={toggleButtonClass} onClick={this.toggleFormVisibility}>
            <ToggleIcon className='registration-form__toggle-icon' /></button>

          <h2 className='registration-form__title'>Пассажир {this.props.formNumber}</h2>

          <button className="btn registration-form__btn registration-form__close-btn" onClick={this.formToDefaultState}>
            <CloseIcon className='registration-form__toggle-icon' /></button>
        </div>

        {this.state.isFormActive &&
          <div className="registration-form__body">
            <form action="" onSubmit={this.onFormSubmit} className={formClass} ref={this.formRef}>
              <div className="registration-form__block">
                <div className="registration-form__ticket-type registration-form__drop-down">
                  <HoverDropDown
                    currentValue={this.state.passengerCategory.find(category => category.active).innerText}
                    listItems={this.state.passengerCategory}
                    selectItem={this.changeDropDownCategory}
                    name='ticket-type-drop-down' />
                </div>

                <div className="registration-form__row">
                  <RegistrationInput label='Фамилия'
                    id={`last_name-${this.state.formId}`}
                    paramsName='last_name'
                    value={this.state.personData.last_name}
                    onChange={this.onPersonDataChange} />

                  <RegistrationInput label='Имя'
                    id={`first_name-${this.state.formId}`}
                    paramsName='first_name'
                    value={this.state.personData.first_name}
                    onChange={this.onPersonDataChange} />

                  <RegistrationInput label='Отчество'
                    id={`patronymic-${this.state.formId}`}
                    paramsName='patronymic'
                    value={this.state.personData.patronymic}
                    onChange={this.onPersonDataChange} />
                </div>

                <div className="registration-form__row">
                  <RadioToggle label='Пол' parentClass='registration-form__radio-toggle'
                    id={`gender-${this.state.formId}`}
                    paramsName='gender'
                    firstItem={{ valueToChoose: 'man', valueToDisable: 'woman', labelValue: 'М', checked: this.state.personData.gender.values.man }}
                    secondItem={{ valueToChoose: 'woman', valueToDisable: 'man', labelValue: 'Ж', checked: this.state.personData.gender.values.woman }}
                    changeGender={this.changeGender} />

                  <RegistrationInput
                    id={`dateOfBirth-${this.state.formId}`}
                    label='Дата рождения'
                    paramsName='dateOfBirth'
                    placeholder='ДД/ММ/ГГ'
                    mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                    value={this.state.personData.dateOfBirth}
                    onChange={this.onPersonDataChange}
                    size='middle' />
                </div>

                <div className="registration-form__row">
                  <RegistrationCheckBox label='ограниченная подвижность'
                    id={`limited-mobility-${this.state.formId}`}
                    paramsName='limited-mobility'
                  />
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
                      id={`passportSeries-${this.state.formId}`}
                      label='Серия'
                      paramsName='passportSeries'
                      placeholder='_ _ _ _'
                      mask={[/\d/, /\d/, /\d/, /\d/]}
                      value={this.state.personData.passportSeries}
                      onChange={this.onPersonDataChange}
                      size='small' />

                    <RegistrationInput
                      id={`passportNumber-${this.state.formId}`}
                      label='Номер'
                      paramsName='passportNumber'
                      placeholder='_ _ _ _ _ _'
                      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                      value={this.state.personData.passportNumber}
                      onChange={this.onPersonDataChange}
                      size='small' />
                  </>
                }

                {activeDocumentType === 'birth-certificate' &&
                  <RegistrationInput
                    id={`birthCertificate-${this.state.formId}`}
                    label='Номер'
                    paramsName='birthCertificate'
                    placeholder='_ _ _ _ _ _ _ _ _ _ _ _'
                    mask={[/\d/, /\d/, /\d/, /\d/, ' ', /^[А-я]+$/, /^[А-я]+$/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                    value={this.state.personData.birthCertificate}
                    onChange={this.onPersonDataChange}
                    size='middle' />}
              </div>

              <div className={`registration-form__block registration-form__submit ${submitBlockClass}`} >
                <p className="registration-form__validation-text">{this.state.validation.message !== null ? this.state.validation.message : ''}</p>
                <button type='submit' className="btn registration-form__submit-btn">Зарегестировать пассажира</button>
              </div>
            </form>
          </div>}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSubmitTicketData: (directiond, data) => dispatch(setSubmitTicketData(directiond, data)),
    removeSubmitTicketData: (id) => dispatch(removeSubmitTicketData(id))
  }
}

export default connect(null, mapDispatchToProps)(PassengerRegistrationForm)