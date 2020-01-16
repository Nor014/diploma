import React from 'react';
import FindTickets from '../../GeneralBlocks/FindTickets/FindTickets';


export default class Welcome extends React.Component {

  render() {
    return (
      <div className="welcome">
        <div className="welcome__inner container">
          <h1 className='welcome__title text text_level_first text_theme_white'>
            <span className='text text_weight_200'>Вся жизнь -</span> путешествие!</h1>
          <FindTickets fromComponent='Welcome' />
        </div>
      </div>
    )
  }
}