import React from 'react';
import Welcome from './Welcome/Welcome';
import AboutUs from './AboutUs/AboutUs';
import HowItWorks from './HowItWorks/HowItWorks';
import Reviews from './Reviews/Reviews';


export default class MainPage extends React.Component {

  render() {
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