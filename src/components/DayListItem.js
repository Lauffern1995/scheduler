import React from "react";
import 'components/DayListItem.scss'
import classNames from "classnames";

export default function DayListItem(props) {

  let dayClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': props.spots === 0}) 



  const formatSpots = function(spot) {
    if (spot === 0)  {

      return spot = 'no spots remaining'

    } else if (spot === 1) {

      return spot = '1 spot remaining'

    } else {

      return spot  + ' spots remaining'
    }
  };
    
  let newSpots = formatSpots(props.spots)


  return (
    <li
    data-testid='day'
    className={dayClass} 
    onClick={props.setDay}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{newSpots}</h3>
    </li>
  );
}
