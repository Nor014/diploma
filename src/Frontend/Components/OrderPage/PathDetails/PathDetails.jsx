import React from 'react';
import { ReactComponent as DirectionArrow } from '../PathDetails/path-details__path-arrow.svg';


export default class PathDetails extends React.Component {

  render() {
    const componentClass = this.props.className
      ? `path-details ${this.props.className}`
      : "path-details";

    return (
      <div className={componentClass}>
        <div className="path-details__item path-details_type_train">
          <div className="path-details__inner">
            <p className="path-details__train-name">116С</p>
            <p className="path-details__train-path"> Москва → <br /> Санкт-Петербург</p>
          </div>
        </div>

        <div className="path-details__item path-details_type_path">
          <div className="path-details__direction">
            <p className="path-details__time">00:10</p>
            <p className="path-details__city ">Москва</p>
            <p className="path-details__station">Курский вокзал</p>
          </div>

          <DirectionArrow />

          <div className="path-details__direction">
            <p className="path-details__time">00:10</p>
            <p className="path-details__city ">Санкт-Петербург</p>
            <p className="path-details__station">Курский вокзал</p>
          </div>
        </div>

        <div className="path-details__item path-details_type_time">
          <div className="path-details__inner">
            <p className="path-details__duration"> 9 часов <br />42 минуты </p>
          </div>
        </div>
      </div>
    )
  }
}

