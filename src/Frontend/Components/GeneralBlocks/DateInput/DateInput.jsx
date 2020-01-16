import React from "react";
import DatePicker from "react-datepicker";
// import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';

export default class DateInput extends React.Component {
  state = {
    date: null
  };

  onDateChange = (date) => {
    this.setState({ date });
    let formattedDate = {
      name: this.props.name === 'fromDate' ? 'fromDate' : 'toDate',
      value: date
    }
    this.props.changeDate(formattedDate)
  }

  render() {
    const { inputClass, fromDate } = this.props;

    return (
      <DatePicker
        dateFormat="dd.MM.yyyy"
        locale={ru}
        placeholderText="ДД/ММ/ГГ"
        className={`input ${inputClass}`}
        selected={this.state.date}
        onChange={date => this.onDateChange(date)}
        value={this.state.date}
        minDate={fromDate !== undefined ? new Date(fromDate) : new Date()}
      />
    );
  }
}

