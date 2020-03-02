import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Review from '../../GeneralBlocks/Review/Review';
import { Carousel } from 'react-responsive-carousel';


export default class Slider extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { parentClassName, slideContent } = this.props;
    const sliderClass = parentClassName ? `slider ${parentClassName}` : 'slider';

    return (
      <Carousel
        showArrows={false}
        showThumbs={false}
        autoPlay={true}
        showStatus={false}
        className={sliderClass}
        emulateTouch={true}
        autoPlay={true}
        infiniteLoop={true}>

        {parentClassName === 'reviews__slider'
          ? slideContent.map((slide, index) =>
            <div className="slide-content" key={index}>
              {slide.map((review, index) => <Review key={index} reviewData={review} />)}
            </div>)
          : null
        }
      </Carousel>
    )
  }
}

