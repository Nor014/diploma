import React from 'react';
import MaskedInput from 'react-text-mask';

export default class RegistrationInput extends React.Component {
  render() {
    const { label, placeholder, paramsName, value, onChange, mask, size, id } = this.props;
    const className = size ? `registration-input registration-input_size_${size}` : 'registration-input';


    return (
      <div className={className}>
        <label htmlFor={id} className='registration-input__label'>{label}</label>

        {!mask
          ? <input type="text"
            id={id}
            data-params-name={paramsName}
            className='input registration-input__input'
            value={value}
            placeholder={placeholder ? placeholder : null}
            onChange={onChange}
            autoComplete='off'
            required />

          : <MaskedInput
            id={id}
            data-params-name={paramsName}
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