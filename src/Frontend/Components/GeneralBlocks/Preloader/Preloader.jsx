import React from 'react';

import { ReactComponent as Train } from './preloader__train.svg';
import { ReactComponent as Line } from './preloader__line.svg';


export default class Preloader extends React.Component {
  render() {
    return (
      <div className="preloader">
        <Train className='preloader__train'/>
        <Line className='preloader__line'/>
      </div>
    )
  }
}

