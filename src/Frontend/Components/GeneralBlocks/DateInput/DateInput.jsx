import React from "react";
import DatePicker from "react-datepicker";
import Input from '../Input/Input'

import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';


export default class DateInput extends React.Component {
  state = {
    startDate: ''
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <DatePicker

        selected={this.state.startDate}
        onChange={this.handleChange}
        locale={ru}
        // customInput={<Input iconClass='input_type_direction'/>}
      />
    );
  }
}