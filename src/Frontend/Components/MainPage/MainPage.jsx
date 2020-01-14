import React from 'react';
import Welcome from './Welcome/Welcome';


export default class MainPage extends React.Component {

  render() {
    return (
      <div className="main-page">
        <Welcome />
      </div>
    )
  }
}