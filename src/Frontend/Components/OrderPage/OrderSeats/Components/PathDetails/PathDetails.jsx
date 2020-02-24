import React from 'react';
import moment from 'moment';
import { ReactComponent as DirectionArrow } from '../PathDetails/path-details__path-arrow.svg';


export default class PathDetails extends React.Component {
  secondsToDuration = (seconds) => {
    const totalDuration = seconds / 60 / 60;
    const hours = Math.floor(totalDuration);
    const minutes = ((totalDuration - hours) * 60).toFixed(0);

    return <p className="path-details__duration">{hours} часов <br /> {minutes} минут</p>
  }

  render() {
    const { pathData, className } = this.props;
    const componentClass = className
      ? `path-details ${className}`
      : "path-details";

    return (
      <div className={componentClass}>
        <div className="path-details__item path-details_type_train">
          <div className="path-details__inner">
            <p className="path-details__train-name">{pathData.train.name}</p>
            <p className="path-details__train-path"> {pathData.from.city.name} → <br /> {pathData.to.city.name}</p>
          </div>
        </div>

        <div className="path-details__item path-details_type_path">
          <div className="path-details__direction">
            <p className="path-details__time">{pathData.from.datetimeToRender}</p>
            <p className="path-details__city">{pathData.from.city.name}</p>
            <p className="path-details__station">{pathData.from.railway_station_name}</p>
          </div>

          <DirectionArrow />

          <div className="path-details__direction">
            <p className="path-details__time">{pathData.to.datetimeToRender}</p>
            <p className="path-details__city ">{pathData.to.city.name}</p>
            <p className="path-details__station">{pathData.to.railway_station_name}</p>
          </div>
        </div>

        <div className="path-details__item path-details_type_time">
          <div className="path-details__inner">{this.secondsToDuration(pathData.duration)}</div>
        </div>
      </div>
    )
  }
}

