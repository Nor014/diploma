import React from 'react';
import MaskedInput from 'react-text-mask';

export default class RegistrationInput extends React.Component {
  render() {
    const { label, placeholder, paramsName, value, onChange, mask } = this.props;

    return (
      <div className="registration-input">
        <label htmlFor={paramsName} className='registration-input__label'>{label}</label>

        {!mask
          ? <input type="text"
            id={paramsName}
            className='input registration-input__input'
            value={value}
            placeholder={placeholder ? placeholder : null}
            onChange={onChange}
            autoComplete='off'
            required />
          : <MaskedInput
            id={paramsName}
            mask={mask}
            placeholder={placeholder ? placeholder : null}
            guide={false}
            className='input registration-input__input'
            value={value}
            onChange={onChange}
            autoComplete='off'
            required />}
      </div>
    )
  }
} 