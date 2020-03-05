import React from 'react';

export default class RegistrationInput extends React.Component {
  render() {
    const { label, placeholder, paramsName, value, onChange } = this.props;

    return (
      <div className="registration-input">
        <label htmlFor={paramsName} className='registration-input__label'>{label}</label>
        <input type="text"
          id={paramsName}
          className='input registration-input__input'
          value={value}
          placeholder={placeholder ? placeholder : null}
          onChange={onChange} />
      </div>
    )
  }
} 