import React from "react";
import { connect } from 'react-redux';

class LastTickets extends React.Component {
  
  componentDidMount = () => {
    
  }

  render() {

    return (
      <div className="last-tickets">

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

export default connect(mapStateToProps, mapDispatchToProps)(LastTickets)