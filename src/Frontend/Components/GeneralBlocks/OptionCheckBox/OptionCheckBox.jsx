import React from 'react';
import { connect } from 'react-redux';

import { checkService } from '../../../Redux/actions/actions';


class OptionCheckBox extends React.Component {

  onInputChange = (event) => {
    const serviceName = event.target.dataset.servicename;
    this.props.changeService(serviceName, this.props.direction);
  }

  render() {
    const { disabled, className, hint, name, checked } = this.props;
    const componentClass = className ? `option-checkbox ${className}` : "option-checkbox";

    return (
      <div className={componentClass}>
        <label className='option-checkbox__label' data-hint={hint}>
          <input type="checkbox"
            className='check option-checkbox__check'
            disabled={disabled}
            data-servicename={name}
            checked={checked}
            onChange={this.onInputChange} />
          {this.props.children}
        </label>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeService: (serviceName, direction) => dispatch(checkService(serviceName, direction))
  }
}

export default connect(null, mapDispatchToProps)(OptionCheckBox)