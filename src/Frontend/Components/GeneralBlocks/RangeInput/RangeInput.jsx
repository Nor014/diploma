import React from 'react';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import { changeRangeParams } from '../../../Redux/actions/actions';

import 'react-input-range/lib/css/index.css';

class RangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { min: this.props.startMin, max: this.props.startMax },
    };
  }

  onRangeChange = (value) => {
    this.setState({ value })

    const params = {
      [this.props.paramsName.forMinValue]: value.min,
      [this.props.paramsName.forMaxValue]: value.max,
    }

    this.props.changeRangeParams(params);
  }

  render() {
    const { label, min, max, hint, className, step, format } = this.props;
    const rangeInputClass = className ? `range-input ${className}` : 'range-input'

    return (
      <div className={rangeInputClass}>
        {label && <p className='range-input__label'>{label}</p>}

        {hint &&
          <div className='range-input__hint'>
            <p className="range-input__hint-text">{hint.forMinValue}</p>
            <p className="range-input__hint-text">{hint.forMaxValue}</p>
          </div>}

        <InputRange
          formatLabel={value => format === 'time' ? `${value}:00` : value}
          minValue={min}
          maxValue={max}
          step={step}
          value={this.state.value}
          onChange={value => this.onRangeChange(value)} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeRangeParams: (params) => dispatch(changeRangeParams(params))
  }
}

export default connect(null, mapDispatchToProps)(RangeInput)