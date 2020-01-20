import React from "react";
import { connect } from 'react-redux';
import { setDate } from '../../../Redux/actions/actions';
import DatePicker from "react-datepicker";
// import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';

class DateInput extends React.Component {
  state = {
    date: null
  };

  onDateChange = (date) => {
    this.setState({ date });

    let paramsName = this.props.name === 'fromDate' ? 'date_start' : 'date_end';
    this.props.setDate(date, paramsName)
  }

  render() {
    const { inputClass, name } = this.props;
    const startDate = this.props.findTicketsStore.date_start;

    return (
      <DatePicker
        dateFormat="dd.MM.yyyy"
        locale={ru}
        placeholderText="ДД/ММ/ГГ"
        className={`input ${inputClass}`}
        selected={this.state.date}
        onChange={date => this.onDateChange(date)}
        value={this.state.date}
        minDate={startDate !== null && name === 'toDate' ? new Date(startDate) : new Date()} />
    );
  }
}

const mapStateToProps = (state) => {
  const { findTicketsStore } = state;
  return {
    findTicketsStore: findTicketsStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (date, paramsName) => dispatch(setDate(date, paramsName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateInput)

