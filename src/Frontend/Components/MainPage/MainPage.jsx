import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Welcome from './Welcome/Welcome';
import AboutUs from './AboutUs/AboutUs';
import HowItWorks from './HowItWorks/HowItWorks';
import Reviews from './Reviews/Reviews';


class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    this.ref.current.scrollIntoView({ // scroll to top
      behavior: 'smooth',
      block: 'start',
    });
  }

  render() {
    const { ticketsData } = this.props;

    if (ticketsData.redirectFromMainPage) {
      return <Redirect to='/order' />
    }

    return (
      <div className="main-page" ref={this.ref}>
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

