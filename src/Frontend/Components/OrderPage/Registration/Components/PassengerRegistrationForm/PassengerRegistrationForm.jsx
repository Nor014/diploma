import React from 'react';

import nanoid from 'nanoid';
import moment from 'moment';
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
      personData: [
        { name: 'lastName', value: '', },
        { name: 'firstName', value: '', },
        { name: 'patronymic', value: '', },
        { name: 'dateOfBirth', value: '', },
        { name: 'passportSeries', value: '', },
        { name: 'passportNumber', value: '', },
        { name: 'birthCertificate', value: '', },
        { name: 'gender', gender: { man: false, woman: false }, errorMessage: 'Не выбран пол' },
      ],
      validation: { valid: null, message: '', }
    }
    this.baseState = this.state;
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
    const { id, value } = event.target;

    const newState = this.state.personData.map(el => {
      if (el.name === id) el.value = value
      return el
    });

    this.setState(prevState => ({ ...prevState, personData: newState }));
  }

  changeGender = (event) => {
    const valueToChoose = event.target.dataset.valueToChoose;
    const valueToDisable = event.target.dataset.valueToDisable;
    const newState = [... this.state.personData];

    const genderField = newState.find(el => el.name === 'gender');

    genderField.gender[valueToChoose] = true;
    genderField.gender[valueToDisable] = false;

    this.setState(prevState => ({ ...prevState, personData: newState }));
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const documentToValidate = this.state.documents.find(document => document.active).value;
    const category = this.state.passengerCategory.find(category => category.active).value;
    const { adultCategory, childrenCategory } = this.props;

    const dateToValidate = this.state.personData.filter(date => { // исключаем формы в зависимости от выбранного документа
      if (documentToValidate === 'passport') {
        return date.name !== 'birthCertificate';
      }

      if (documentToValidate === 'birth-certificate') {
        return date.name === 'passportSeries' || date.name === 'passportNumber' ? false : true;
      }
    })

    let valid = true;
    let errorMessage = null;

    for (let i = 0; i <= dateToValidate.length - 1; i++) { // валидация форм до первой ошибки
      if (dateToValidate[i].name !== 'gender') {
        if (!validateParams[dateToValidate[i].name].pattern.test(dateToValidate[i].value)) {
          valid = false;
          errorMessage = validateParams[dateToValidate[i].name].errorMessage;
          break;
        }
      } else {
        if (!dateToValidate[i].gender.man && !dateToValidate[i].gender.woman) { // не выбран пол
          valid = false;
          errorMessage = dateToValidate[i].errorMessage;
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
      const gender = this.state.personData.find(el => el.name === 'gender').gender;
      const documentData = documentToValidate === 'passport'
        ? (this.state.personData.find(el => el.name === 'passportSeries').value + this.state.personData.find(el => el.name === 'passportNumber').value)
          .replace(/([0-9]{2})([0-9]{8})/g, "$1 $2")
        : this.state.personData.find(el => el.name === 'birthCertificate').value;

      const ticketIndex = category === 'adult' ? this.props.adultCategory.alreadyRegistered : this.props.childrenCategory.alreadyRegistered;
      const currentTicketDetails = this.props.orderDetailsData.ticketCategories.find(el => el.categoryName === category).ticketsData
        .find(el => el.name === 'departure').data[ticketIndex];

      const departureTicketData = {
        passengerId: this.state.formId,
        coach_id: currentTicketDetails.coachId,
        person_info: {
          is_adult: category === 'adult' ? true : false,
          first_name: this.state.personData.find(el => el.name === 'firstName').value,
          last_name: this.state.personData.find(el => el.name === 'lastName').value,
          patronymic: this.state.personData.find(el => el.name === 'patronymic').value,
          gender: gender.man === true ? true : false,
          birthday: moment(this.state.personData.find(el => el.name === 'dateOfBirth').value).format('YYYY-MM-DD'),
          document_type: documentToValidate === 'passport' ? 'паспрорт' : 'свидетельство о рождении',
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
      console.log(this.state.formId)
      this.props.removeSubmitTicketData(this.state.formId);
      
    }

    this.setState({
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
      personData: [
        { name: 'lastName', value: '', },
        { name: 'firstName', value: '', },
        { name: 'patronymic', value: '', },
        { name: 'dateOfBirth', value: '', },
        { name: 'passportSeries', value: '', },
        { name: 'passportNumber', value: '', },
        { name: 'birthCertificate', value: '', },
        { name: 'gender', gender: { man: false, woman: false }, errorMessage: 'Не выбран пол' },
      ],
      validation: { valid: null, message: '', }
    })
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

    console.log(this.props, this.state.formId)

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
                    paramsName='lastName'
                    value={this.state.personData.find(el => el.name === 'lastName').value}
                    onChange={this.onPersonDataChange} />

                  <RegistrationInput label='Имя'
                    paramsName='firstName'
                    value={this.state.personData.find(el => el.name === 'firstName').value}
                    onChange={this.onPersonDataChange} />

                  <RegistrationInput label='Отчество'
                    paramsName='patronymic'
                    value={this.state.personData.find(el => el.name === 'patronymic').value}
                    onChange={this.onPersonDataChange} />
                </div>

                <div className="registration-form__row">
                  <RadioToggle label='Пол' parentClass='registration-form__radio-toggle'
                    id={this.state.formId}
                    paramsName='gender'
                    firstItem={{ valueToChoose: 'man', valueToDisable: 'woman', labelValue: 'М', checked: this.state.personData.find(el => el.name === 'gender').gender.man }}
                    secondItem={{ valueToChoose: 'woman', valueToDisable: 'man', labelValue: 'Ж', checked: this.state.personData.find(el => el.name === 'gender').gender.woman }}
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
                      label='Серия'
                      paramsName='passportSeries'
                      placeholder='_ _ _ _'
                      mask={[/\d/, /\d/, /\d/, /\d/]}
                      value={this.state.personData.find(el => el.name === 'passportSeries').value}
                      onChange={this.onPersonDataChange}
                      size='small' />

                    <RegistrationInput
                      label='Номер'
                      paramsName='passportNumber'
                      placeholder='_ _ _ _ _ _'
                      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
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
                    mask={[/\d/, /\d/, /\d/, /\d/, ' ', /^[А-я]+$/, /^[А-я]+$/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                    value={this.state.personData.find(el => el.name === 'birthCertificate').value}
                    onChange={this.onPersonDataChange}
                    size='middle' />}
              </div>

              <div className={`registration-form__block registration-form__submit ${submitBlockClass}`} >
                <p className="registration-form__validation-text">{this.state.validation.message !== null ? this.state.validation.message : ''}</p>
                <button type='submit' className="btn registration-form__submit-btn">Следующий пассажир</button>
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