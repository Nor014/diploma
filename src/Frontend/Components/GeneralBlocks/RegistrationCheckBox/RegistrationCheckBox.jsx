import React from 'react';

export default class RegistrationCheckBox extends React.Component {
  render() {
    const { label, paramsName, id } = this.props;

    return (
      <div className="registration-check-box">
        <input className='registration-check-box__input'
          type="checkbox"
          id={id}
          data-params-name={paramsName} />

        <label htmlFor={id} className='registration-check-box__label'>{label}</label>
      </div>
    )
  }
} 