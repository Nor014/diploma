import React from 'react';
import { connect } from 'react-redux';


class OptionCheckBox extends React.Component {

  render() {
    const { disabled, className, hint } = this.props;
    const componentClass = className ? `option-checkbox ${className}` : "option-checkbox";

    return (
      <div className={componentClass}>
        <label className='option-checkbox__label' data-hint={hint}>
          <input type="checkbox" className='check option-checkbox__check' disabled={disabled} />
          {this.props.children}
        </label>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionCheckBox)