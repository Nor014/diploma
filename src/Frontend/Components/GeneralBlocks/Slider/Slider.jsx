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
    let groupedContent = [];

    // if (parentClassName === 'reviews__slider') {
    //   for (let i=0; i<=slideContent.length-1; i++) {
    //     groupedContent.push(slideContent.slise(0, 2))
    //   }
    // }

    console.log(slideContent)

    return (
      <Carousel
        showArrows={false}
        showThumbs={false}
        autoPlay={true}
        showStatus={false}
        className={sliderClass} >

        
          {slideContent.map((el, index) => {
            if (index < 2) {
              return  (
                <div className="">
                  <Review reviewData={el} key={index} />
                </div>
              ) 
            } else return
           
          })}}
        

      </Carousel>
    )
  }
}

