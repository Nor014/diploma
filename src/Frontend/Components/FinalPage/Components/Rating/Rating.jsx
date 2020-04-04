import React from 'react';
import { ReactComponent as Star } from '../Rating/rating__star.svg';



export default class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stars: 5,
      hovered_index: null,
      choosen: false
    }
  }

  onMouseEnter = (starIndex) => {
    this.setState(prevState => {
      return { ...prevState, hovered_index: starIndex }
    })
  }

  onMouseLeave = () => {
    this.setState(prevState => {
      return { ...prevState, hovered_index: null }
    })
  }

  onClick = (starIndex) => {
    this.setState(prevState => {
      return { ...prevState, choosen: true, hovered_index: starIndex }
    })
  }

  render() {
    return (
      <div className='rating'>
        <p className='rating__label'>Оценить сервис</p>

        <div className='rating__stars'>
          {Array(this.state.stars).fill('').map((star, index) => {
            return <Star className={this.state.hovered_index !== null && index <= this.state.hovered_index ? 'rating__star rating__star_active' : 'rating__star'}
              key={index}
              onMouseEnter={!this.state.choosen ? () => this.onMouseEnter(index) : null}
              onMouseLeave={!this.state.choosen ? this.onMouseLeave : null}
              onClick={() => this.onClick(index)} />
          })}
        </div>
      </div>
    )
  }
}
