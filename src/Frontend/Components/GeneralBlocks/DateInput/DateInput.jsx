import React from "react";
import { connect } from 'react-redux';
import { setDate } from '../../../Redux/actions/actions';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';

class DateInput extends React.Component {
  state = {
    date: null
  };

  componentDidUpdate = () => {
    const startDate = this.props.findTicketsState.date_start;

    if (this.props.name === 'toDate'
      && this.state.date !== null && this.state.date < startDate) {
      this.onDateChange(startDate)
    }
  }

  onDateChange = (date) => {
    this.setState({ date });

    let paramsName = this.props.name === 'fromDate' ? 'date_start' : 'date_end';
    this.props.setDate(date, paramsName)
  }

  render() {
    const { inputClass, name, label } = this.props;
    const startDate = this.props.findTicketsState.date_start;

    return (
      <React.Fragment>
        {label &&
          <p className='date-input__label'>{label}</p>}

        <DatePicker
          dateFormat="dd.MM.yyyy"
          locale={ru}
          placeholderText="ДД/ММ/ГГ"
          className={`input ${inputClass}`}
          selected={this.state.date}
          onChange={date => this.onDateChange(date)}
          value={this.state.date}
          minDate={startDate !== null && name === 'toDate' ? new Date(startDate) : new Date(1514764800000)} />
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

