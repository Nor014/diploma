import React from 'react';
import { connect } from 'react-redux';


class CoachScheme extends React.Component {

  // componentDidUpdate = () => {
   
  //   let schemeSeats = document.querySelectorAll('.coach-seat');
  //   let seatsData = this.props.seatsData.length > 0 ? this.props.seatsData[1].seats : null;

  //   // console.log(schemeSeats, seatsData)

  //   if (this.props.seatsData.length > 0) {

  //     seatsData.forEach((el, index) => {
  //       if (el.available && schemeSeats[el.index - 1] !== undefined) {
         
  //       }
  //     })
  //   }

  // }

  render() {
    // console.log(this.props)

    return (
      <div className='coach-scheme'>
        {this.props.children}
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

export default connect(mapStateToProps, mapDispatchToProps)(CoachScheme)