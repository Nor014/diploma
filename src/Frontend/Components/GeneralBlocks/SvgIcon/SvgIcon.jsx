import React from 'react';

import { ReactComponent as FirstClassIcon } from '../SvgIcon/coach_icon_first-class.svg';
import { ReactComponent as SecondClassIcon } from '../SvgIcon/coach_icon_second-class.svg';
import { ReactComponent as ThirdClassIcon } from '../SvgIcon/coach_icon_third-class.svg';
import { ReactComponent as FourthClassIcon } from '../SvgIcon/coach_icon_fourth-class.svg';
import { ReactComponent as AirIcon } from '../SvgIcon/coach_icon_condi.svg';
import { ReactComponent as WifiIcon } from '../SvgIcon/coach_icon_wifi.svg';
import { ReactComponent as LinensIcon } from '../SvgIcon/coach_icon_linens.svg';
import { ReactComponent as EatingIcon } from '../SvgIcon/coach_icon_eating.svg';

// import { ReactComponent as SecondClassScheme } from '../Coach/coach_scheme_second-class.svg';


export default class SvgIcon extends React.Component {

  render() {
    const { icon, className } = this.props;

    // coach classes icons
    if (icon === 'first-coach-class') {
      return <FirstClassIcon className={className} />
    }
    if (icon === 'second-coach-class') {
      return <SecondClassIcon className={className} />
    }
    if (icon === 'third-coach-class') {
      return <ThirdClassIcon className={className} />
    }
    if (icon === 'fourth-coach-class') {
      return <FourthClassIcon className={className} />
    }

    // coach servises icons
    if (icon === 'air-conditioning') {
      return <AirIcon className={className} />
    }
    if (icon === 'wifi') {
      return <WifiIcon className={className} />
    }
    if (icon === 'linens') {
      return <LinensIcon className={className} />
    }
    if (icon === 'eating') {
      return <EatingIcon className={className} />
    }

  }
}

