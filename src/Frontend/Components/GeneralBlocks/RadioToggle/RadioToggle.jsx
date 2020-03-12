import React from 'react';


export default class RadioToggle extends React.Component {
  render() {
    const { label, paramsName, firstItem, secondItem, parentClass, changeGender, id } = this.props;
    const firstRadioBtnId = `${firstItem.valueToChoose}-form:${id}`;
    const secondRadioBtnId = `${secondItem.valueToChoose}-form:${id}`;

    return (
      <div className={`radio-toogle ${parentClass}`}>
        <p className="radio-toogle__label">{label}</p>

        <div className="radio-toogle__form">
          <div className="radio-toogle__form__item">
            <input type="radio"
              className='radio-toogle__form-input'
              id={firstRadioBtnId}
              data-value-to-disable={firstItem.valueToDisable}
              data-value-to-choose={firstItem.valueToChoose}
              name={paramsName}
              checked={firstItem.checked}
              onChange={changeGender} />

            <label htmlFor={firstRadioBtnId} className='radio-toogle__form-label'>{firstItem.labelValue}</label>
          </div>

          <div className="radio-toogle__form__item">
            <input type="radio"
              className='radio-toogle__form-input'
              id={secondRadioBtnId}
              data-value-to-disable={secondItem.valueToDisable}
              data-value-to-choose={secondItem.valueToChoose}
              name={paramsName}
              checked={secondItem.checked}
              onChange={changeGender} />

            <label htmlFor={secondRadioBtnId} className='radio-toogle__form-label'>{secondItem.labelValue}</label>
          </div>
        </div>
      </div>
    )
  }
} 