import React from 'react';


export default class RadioToggle extends React.Component {
  render() {
    const { label, radioName, firstItem, secondItem, parentClass, changeGender } = this.props;

    return (
      <div className={`radio-toogle ${parentClass}`}>
        <p className="radio-toogle__label">{label}</p>

        <div className="radio-toogle__form">
          <div className="radio-toogle__form__item">
            <input type="radio"
              className='radio-toogle__form-input'
              id={firstItem.radioId}
              data-value-to-disable={firstItem.valueToDisable}
              name={radioName}
              checked={firstItem.checked}
              onChange={changeGender}
            />

            <label htmlFor={firstItem.radioId} className='radio-toogle__form-label'>{firstItem.labelValue}</label>
          </div>

          <div className="radio-toogle__form__item">
            <input type="radio"
              className='radio-toogle__form-input'
              id={secondItem.radioId}
              data-value-to-disable={secondItem.valueToDisable}
              name={radioName}
              checked={secondItem.checked}
              onChange={changeGender}
            />

            <label htmlFor={secondItem.radioId} className='radio-toogle__form-label'>{secondItem.labelValue}</label>
          </div>
        </div>
      </div>
    )
  }
} 