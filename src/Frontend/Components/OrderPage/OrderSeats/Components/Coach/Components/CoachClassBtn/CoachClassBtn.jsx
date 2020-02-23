import React from 'react';
import SvgIcon from '../../../../../../GeneralBlocks/SvgIcon/SvgIcon';

export default class CoachClassBtn extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <button
        className={data.active ? 'coach__class-btn btn coach_btn_active' : 'coach__class-btn btn'}
        onClick={this.props.onClick}
        data-class={data.class} >
          
        <SvgIcon icon={data.icon} className='coach__class-icon' />
        <p className="coach__class-name">{data.name}</p>
      </button>
    )
  }
} 