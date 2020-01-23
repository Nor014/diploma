import React from 'react';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import { changeRangeParams } from '../../../Redux/actions/actions';

import 'react-input-range/lib/css/index.css';



class RangeInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 3000, max: 5000 },
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
    const { label, min, max, hint } = this.props;

    return (
      <div className="range-input">
        {label && <label className='range-input__label'>{label}</label>}

        {hint &&
          <div className='range-input__hint'>
            <p className="range-input__hint-text">{hint.forMinValue}</p>
            <p className="range-input__hint-text">{hint.forMaxValue}</p>
          </div>}

        <InputRange
          minValue={min}
          maxValue={max}
          step={10}
          value={this.state.value}
          onChange={value => this.onRangeChange(value)} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { findTicketsState } = state;

  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeRangeParams: (params) => dispatch(changeRangeParams(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeInput)