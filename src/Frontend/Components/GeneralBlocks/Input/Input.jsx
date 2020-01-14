import React from 'react';

export default class Input extends React.Component {

  render() {
    let { className, placeholder } = this.props;

    return (
      <span className={`input ${className}`}>
        <input type="text" className='input-form' placeholder={placeholder} />
      </span>
    )
  }
}