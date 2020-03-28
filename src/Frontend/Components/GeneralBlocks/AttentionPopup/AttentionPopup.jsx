import React from 'react';

import { connect } from 'react-redux';
import { removeError } from '../../../Redux/actions/actions';


class AttentionPopup extends React.Component {

  render() {
    const { active, popup_type, popup_message } = this.props.attentionPopupData;
    const className = active ? 'popup-wrap popup-wrap_visible' : 'popup-wrap';

    return (
      <div className={className}>
        {active &&
          <div className={`popup popup_type_${popup_type}`}>
            <div className="popup__body">
              <p className="popup__text">{popup_message}</p>
            </div>

            <div className='popup__footer'>
              <button className='btn popup__btn btn_size_small btn_theme_transparent' onClick={this.props.removeError}>Понятно</button>
            </div>
          </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { attentionPopupData } = state;

  return {
    attentionPopupData: attentionPopupData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeError: () => dispatch(removeError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttentionPopup)