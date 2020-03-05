import React from 'react';

export default class RegistrationCheckBox extends React.Component {
  render() {
    const { label } = this.props;
    
    return (
      <div className="registration-check-box">
        <input className='registration-check-box__input' type="checkbox" id='checkBox' />
        <label htmlFor='checkBox' className='registration-check-box__label'>{label}</label>
      </div>
    )
  }
} 