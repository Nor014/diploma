import React from 'react';
import { connect } from 'react-redux';
import { changeFiltersParams } from '../../../Redux/actions/actions';


class CheckBox extends React.Component {

  render() {
    const { label, className, paramsName, findTicketsState } = this.props;
    const labelClass = `checkbox__label ${className}`;
    const selected = findTicketsState[paramsName];

    return (
      <div className="checkbox">
        <label className={labelClass}>{label}
          <input type="checkbox" className='check' checked={selected}
            onChange={() => this.props.changeFiltersParams(this.props.paramsName)} />
          <span className='checkbox__toggle' />
        </label>
      </div>
    )
  } 
}

const mapStateToProps = (state) => {
  const { findTicketsState } = state;

  return {
    findTicketsState: findTicketsState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFiltersParams: (paramsName) => dispatch(changeFiltersParams(paramsName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox)