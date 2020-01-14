import React from 'react';

export default class Input extends React.Component {

  render() {
    let { className, placeholder, iconClass, withLabel } = this.props;

    if (iconClass) {
      return (
        <div className={`input-wrap ${className}`}>
          <input type="text" className={`input ${iconClass}`} placeholder={placeholder} />
          <label></label>
        </div>
      )
    }

  }
}