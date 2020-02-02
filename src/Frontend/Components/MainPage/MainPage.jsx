import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Welcome from './Welcome/Welcome';
import AboutUs from './AboutUs/AboutUs';
import HowItWorks from './HowItWorks/HowItWorks';
import Reviews from './Reviews/Reviews';


class MainPage extends React.Component {

  render() {
    const { ticketsData } = this.props;

    if (ticketsData.data.items) {
      return <Redirect to='/order' />
    }

    return (
      <div className="main-page">
        <Welcome />
        <AboutUs />
        <HowItWorks />
        <Reviews />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { ticketsData } = state;
  return {
    ticketsData: ticketsData
  }
}

export default connect(mapStateToProps, null)(MainPage);

