import React from 'react';
import { connect } from 'react-redux';

class AttentionPopup extends React.Component {

 
  render() {

    return (
      <div className="popup-wrap popup-wrap_visible">
        <div className='popup popup_type_error'>
          <div className="popup__body">
            <p className="popup__text">Повседневная практика показывает, что сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных</p>
          </div>

          <div className='popup__footer'>
            <button className='btn popup__btn btn_size_small btn_theme_transparent'>Понятно</button>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AttentionPopup)