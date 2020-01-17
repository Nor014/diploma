import React from 'react';

export default class Review extends React.Component {

  render() {
    const { reviewData } = this.props;

    return (
      <div className="review">
        <div className="review__avatar">
          <img src={reviewData.avatar} alt="фото пользователя" className='review__img'/>
        </div>
        <div className="review__content">
          <p className="review__name text text_weight_500">{reviewData.name}</p>
          <p className="review__text text_theme_grey text_weight_300">{reviewData.text}</p>
        </div>
      </div>
    )
  }
}