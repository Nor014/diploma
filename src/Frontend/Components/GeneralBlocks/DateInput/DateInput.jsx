import React from "react";
import { connect } from 'react-redux';
import { setDate } from '../../../Redux/actions/actions';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';

class DateInput extends React.Component {
  componentDidUpdate = () => {
    const startDate = this.props.findTicketsState.date_start;
    const currentDateValue = this.props.name === 'fromDate'
      ? this.props.findTicketsState.date_start
      : this.props.findTicketsState.date_end;

    if (this.props.name === 'toDate' // если дата отбытия больше даты прибытия, меняем дату прибытия
      && currentDateValue !== null && currentDateValue < startDate) {
      this.onDateChange(startDate)
    }
  }

  onDateChange = (date) => {
    let paramsName = this.props.name === 'fromDate' ? 'date_start' : 'date_end';
    this.props.setDate(date, paramsName)
  }

  render() {
    const { inputClass, name, label, findTicketsState } = this.props;
    const startDate = this.props.findTicketsState.date_start;
    const currentDateValue = name === 'fromDate' ? findTicketsState.date_start : findTicketsState.date_end;

    return (
      <React.Fragment>
        {label &&
          <p className='date-input__label'>{label}</p>}

        <DatePicker
          dateFormat="dd.MM.yyyy"
          locale={ru}
          placeholderText="ДД/ММ/ГГ"
          className={`input ${inputClass}`}
          selected={currentDateValue}
          onChange={date => this.onDateChange(date)}
          value={currentDateValue}
          minDate={startDate !== null && name === 'toDate' ? new Date(startDate) : new Date('2018-01-01')} />
      </React.Fragment>
    );
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
    setDate: (date, paramsName) => dispatch(setDate(date, paramsName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateInput)

