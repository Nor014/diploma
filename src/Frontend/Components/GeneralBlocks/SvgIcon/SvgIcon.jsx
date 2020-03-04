import React from 'react';

// Tickets/Last Tickets
import { ReactComponent as TicketWifiIcon } from '../SvgIcon/tickets_icon-wifi.svg';
import { ReactComponent as TicketExpress } from '../SvgIcon/tickets_icon-express.svg';
import { ReactComponent as TicketFood } from '../SvgIcon/tickets__icon-food.svg';
// Coach
import { ReactComponent as FirstClassIcon } from '../SvgIcon/coach_icon_first-class.svg';
import { ReactComponent as SecondClassIcon } from '../SvgIcon/coach_icon_second-class.svg';
import { ReactComponent as ThirdClassIcon } from '../SvgIcon/coach_icon_third-class.svg';
import { ReactComponent as FourthClassIcon } from '../SvgIcon/coach_icon_fourth-class.svg';
import { ReactComponent as AirIcon } from '../SvgIcon/coach_icon_condi.svg';
import { ReactComponent as WifiIcon } from '../SvgIcon/coach_icon_wifi.svg';
import { ReactComponent as LinensIcon } from '../SvgIcon/coach_icon_linens.svg';
import { ReactComponent as FoodIcon } from '../SvgIcon/coach_icon_food.svg';


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
    if (icon === 'food') {
      return <FoodIcon className={className} />
    }

    // tickets/last tickets
    if (icon === 'ticket-wifi') {
      return <TicketWifiIcon className={className} />
    }
    if (icon === 'ticket-express') {
      return <TicketExpress className={className} />
    }
    if (icon === 'ticket-food') {
      return <TicketFood className={className} />
    }

  }
}

